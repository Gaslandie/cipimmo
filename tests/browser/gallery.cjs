const { chromium } = require(process.env.CIPIMMO_PLAYWRIGHT_PATH || 'playwright-core');
const assert = require('node:assert/strict');
const origin = process.env.CIPIMMO_BASE_URL || 'http://127.0.0.1:8000';

async function selected(gallery, index) {
  const track = gallery.locator('[data-gallery-track]');
  await track.evaluate((element, i) => new Promise((resolve, reject) => {
    const deadline = performance.now() + 3000;
    function check() {
      if (Math.abs(element.scrollLeft - i * element.clientWidth) < 2) return resolve();
      if (performance.now() > deadline) return reject(Error('La photo choisie ne s’affiche pas'));
      requestAnimationFrame(check);
    }
    check();
  }), index);
  assert.equal(await gallery.locator('[data-gallery-status]').textContent(), `Photo ${index + 1} / 2`);
  for (const button of await gallery.locator('[data-gallery-select]').all()) {
    assert.equal(await button.getAttribute('aria-pressed'), String(Number(await button.getAttribute('data-gallery-select')) === index));
  }
}

(async () => {
  const browser = await chromium.launch({executablePath: process.env.CIPIMMO_CHROME_PATH || '/usr/bin/google-chrome', headless:true, chromiumSandbox:true});
  const errors = [];
  const results = [];
  for (const width of [375, 768, 1440]) {
    const context = await browser.newContext({viewport:{width,height:900}, reducedMotion:width === 768 ? 'reduce' : 'no-preference'});
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(origin, {waitUntil:'networkidle'});
    const gallery = page.locator('.listing-card [data-gallery]').first();
    const other = page.locator('.listing-card [data-gallery]').nth(1);
    const photos = await gallery.locator('[data-gallery-slide] img').evaluateAll(images => images.map(i=>i.src));
    await gallery.locator('[data-gallery-select="1"]').click();
    await selected(gallery, 1);
    await selected(other, 0);
    await gallery.locator('[data-gallery-select="0"]').click();
    await selected(gallery, 0);
    assert.equal(await gallery.locator('.gallery-arrow').count(), 0);
    await gallery.locator('[data-gallery-track]').press('ArrowLeft');
    await selected(gallery, 1);
    await gallery.locator('[data-gallery-select="0"]').click();
    await selected(gallery, 0);
    const track = gallery.locator('[data-gallery-track]');
    for (const [key,index] of [['ArrowRight',1],['ArrowLeft',0],['End',1],['Home',0]]) {
      await track.press(key);
      await selected(gallery,index);
    }
    await page.locator('.listing-card .card-link').first().click();
    await page.waitForURL('**/logements/*');
    const detail = page.locator('[data-gallery]');
    assert.deepEqual(await detail.locator('[data-gallery-slide] img').evaluateAll(images=>images.map(i=>i.src)), photos);
    await detail.locator('.gallery-thumbnails [data-gallery-select="1"]').click();
    await selected(detail,1);
    await detail.locator('[data-gallery-next]').click();
    await selected(detail,0);
    await detail.locator('[data-gallery-prev]').click();
    await selected(detail,1);
    await page.setViewportSize({width:width===1440 ? 1024 : width + 20,height:900});
    await page.waitForTimeout(150); // Let the browser settle its resize and scroll-snap events.
    await selected(detail,1);
    const contactPage = await context.newPage();
    await contactPage.goto(origin+'/contact');
    const phone = await contactPage.getByRole('link',{name:'Appeler CIP IMMO',exact:true}).getAttribute('href');
    const publicWhatsapp = new URL(await contactPage.getByRole('link',{name:'Écrire sur WhatsApp',exact:true}).getAttribute('href'));
    await contactPage.close();
    assert.match(phone, /^tel:\+[1-9][0-9]{7,14}$/);
    assert.equal(await page.getByRole('link',{name:'Appeler CIP IMMO',exact:true}).getAttribute('href'),phone);
    const whatsapp = new URL(await page.getByRole('link',{name:'Écrire à CIP IMMO sur WhatsApp',exact:true}).getAttribute('href'));
    assert.equal(whatsapp.origin,'https://wa.me');
    assert.equal(whatsapp.pathname,publicWhatsapp.pathname);
    assert.ok(whatsapp.searchParams.get('text').includes('Un appartement lumineux'));
    // Inspect contact URLs only: never place a call or send a message in tests.
    await page.setViewportSize({width,height:900});
    await page.waitForTimeout(150);
    await selected(detail,1);
    await page.screenshot({path:`storage/app/qa/detail-gallery-${width}.png`,fullPage:true});
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth), 'Fiche à 200 % sans débordement');
    results.push({width,controls:true,keyboard:true,wrap:true,sharedPhotos:true,resize:true,detailZoom:true});
    await context.close();
  }
  const context = await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:900}});
  const page = await context.newPage();
  await page.goto(origin);
  await page.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
  const gallery = page.locator('.listing-card [data-gallery]').first();
  assert.equal(await gallery.locator('[data-gallery-controls]:visible').count(),0);
  const track = gallery.locator('[data-gallery-track]');
  await track.scrollIntoViewIfNeeded();
  await track.hover();
  await page.mouse.wheel(500,0);
  await page.waitForTimeout(1000); // Native wheel scrolling and CSS snap need to finish.
  assert.ok(await track.evaluate(element=>Math.abs(element.scrollLeft-element.clientWidth)<2), 'Défilement natif sans JavaScript');
  assert.equal(await gallery.locator('[data-gallery-slide][aria-hidden="true"]').count(),0);
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({results,noJSNativeScroll:true,errors}));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
