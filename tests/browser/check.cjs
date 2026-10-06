const { chromium } = require(process.env.CIPIMMO_PLAYWRIGHT_PATH || 'playwright-core');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CIPIMMO_CHROME_PATH || '/usr/bin/google-chrome', headless: true, chromiumSandbox: true });
  const errors = [];
  const reports = [];
  const origin = 'http://127.0.0.1:8000';
  fs.mkdirSync('storage/app/qa', {recursive:true});
  for (const width of [375, 768, 1440]) {
    const context = await browser.newContext({viewport:{width,height:900}});
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    const requests = [];
    page.on('request', request => requests.push(request.url()));
    const response = await page.goto(origin, {waitUntil:'networkidle'});
    if (response.status() !== 200) throw Error('Accueil inaccessible');
    await page.evaluate(async () => { document.documentElement.style.scrollBehavior="auto"; for (let y=0; y<document.body.scrollHeight; y+=600) { window.scrollTo(0,y); await new Promise(resolve=>setTimeout(resolve,50)); } window.scrollTo(0,0); });
    await page.waitForLoadState('networkidle');
    const metrics = await page.evaluate(() => ({
      width: innerWidth, document: document.documentElement.scrollWidth,
      h1: document.querySelectorAll('h1').length,
      images: [...document.images].map(i=>({src:i.src, loaded:i.complete && i.naturalWidth>0})),
      storage: {local:localStorage.length,session:sessionStorage.length},
    }));
    if (metrics.width < metrics.document || metrics.h1 !== 1 || metrics.images.some(i=>!i.loaded)) throw Error('Problème de rendu '+JSON.stringify(metrics));
    if (requests.some(url=>!url.startsWith(origin))) throw Error('Requête vers un tiers '+requests.join(','));
    await page.screenshot({path:`storage/app/qa/home-${width}.png`,fullPage:true});
    await page.screenshot({path:`storage/app/qa/first-screen-${width}.png`});
    if(width===1440) await page.locator("#logements").screenshot({path:"storage/app/qa/listings-desktop.png"});
    if (width < 1024) {
      await page.locator('.mobile-menu summary').click();
      if (!await page.locator('.mobile-menu').evaluate(e=>e.open)) throw Error('Menu fermé');
      await page.keyboard.press('Escape');
      if (await page.locator('.mobile-menu').evaluate(e=>e.open)) throw Error('Échap menu');
      if (!await page.locator('.mobile-menu summary').evaluate(e=>e===document.activeElement)) throw Error('Focus menu');
      await page.locator('.mobile-menu summary').click();
      await page.locator('.mobile-menu a').filter({hasText:'À propos'}).click();
      if (await page.locator('.mobile-menu').evaluate(e=>e.open)) throw Error('Menu après ancre');
    }
    const faq = page.locator('.faq-list details').first();
    await faq.locator('summary').click();
    if (!await faq.evaluate(e=>e.open)) throw Error('FAQ fermée');
    await faq.locator('summary').press('Enter');
    if (await faq.evaluate(e=>e.open)) throw Error('FAQ clavier');
    await page.locator('#city').selectOption('conakry');
    await page.locator('#duration').selectOption('court-sejour');
    await page.locator('#furnished').selectOption('meuble');
    await Promise.all([page.waitForURL(/city=conakry/),page.locator('.search-form button').click()]);
    if (await page.locator('.listing-card').count() !== 2) throw Error('Filtres');
    await page.locator('.card-link').first().click();
    await page.waitForURL('**/demo/logements/*');
    if (!await page.getByRole('heading', {name:'Les informations du logement',exact:true}).isVisible()) throw Error('Fiche');
    await page.goto(origin+'/?city=kindia&duration=court-sejour#logements');
    if (!await page.getByText('Aucun logement pour ces critères').isVisible()) throw Error('Vide');
    await page.locator('.empty-state .button').click();
    await page.waitForURL(url=>url.search==='');
    if (await page.locator('.listing-card').count() !== 4) throw Error('Réinitialisation');
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    const zoom = await page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth}));
    await page.screenshot({path:`storage/app/qa/zoom-${width}.png`,fullPage:true});
    if (zoom.document>zoom.width) throw Error('Débordement à 200 % '+width);
    reports.push({width, metrics,zoom, requests:requests.length});
    await context.close();
  }
  const context = await browser.newContext({javaScriptEnabled:false,reducedMotion:'reduce',viewport:{width:375,height:900}});
  const page = await context.newPage();
  await page.goto(origin);
  await page.locator('.mobile-menu summary').click();
  await page.locator('.mobile-menu a').filter({hasText:'Nos logements'}).click();
  await page.locator('.mobile-menu summary').click();
  await page.locator('.faq-list summary').first().click();
  await page.locator('#city').selectOption('labe');
  await page.locator('.search-form button').click();
  await page.waitForURL(/city=labe/);
  if (await page.locator('.listing-card').count()!==1) throw Error('Sans JS');
  await page.locator('.card-link').click();
  await page.waitForURL('**/demo/logements/*');
  const noJS = true;
  const probe = await browser.newContext();
  const privateResponses=[];
  for (const path of ['/.env','/composer.lock','/docs/03-technique-hebergement-etat.md','/storage/logs/laravel.log','/images/../.htaccess','/demo/logements/inconnu']) {
    const r=await probe.request.get(origin+path);
    privateResponses.push({path,status:r.status()});
    if (![403,404].includes(r.status())) throw Error('Chemin privé visible '+path+' '+r.status());
  }
  const linksPage=await probe.newPage(); await linksPage.goto(origin);
  const destinations=await linksPage.locator('a[href]').evaluateAll(links=>[...new Set(links.map(a=>a.href))]);
  for (const href of destinations) {
    const url=new URL(href);
    if (url.protocol==='tel:') {
      if (!/^tel:\+[1-9][0-9]{7,14}$/.test(href)) throw Error('Téléphone invalide');
      continue;
    }
    if (url.protocol==='https:' && url.hostname==='wa.me') {
      if (!/^\/[1-9][0-9]{7,14}$/.test(url.pathname)) throw Error('WhatsApp invalide');
      continue;
    }
    if (url.hash) {
      const r=await probe.request.get(url.origin+url.pathname+url.search);
      const html=await r.text();
      if (!html.includes('id="'+url.hash.slice(1)+'"')) throw Error('Ancre invalide '+href);
    }
    const r=await probe.request.get(url.origin+url.pathname+url.search);
    if (r.status()!==200) throw Error('Lien invalide '+href);
  }
  if(errors.length) throw Error(errors.join('\n'));
  fs.writeFileSync('storage/app/qa/browser-report.json',JSON.stringify({reports,noJS,privateResponses,linksChecked:destinations.length,errors},null,2));
  console.log(JSON.stringify({reports:reports.map(r=>({width:r.width,overflow:r.metrics.document>r.width,zoomOverflow:r.zoom.document>r.width})),noJS,privateResponses,linksChecked:destinations.length,errors}));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
