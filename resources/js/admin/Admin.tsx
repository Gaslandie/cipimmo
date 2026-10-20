
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import type { Rental, RentalPhoto } from '../../../luminor/src/data/cipRentals';

type ManagedRental = Omit<Rental, 'published' | 'availability'> & { published: boolean; availability: string };
type Item = { rental: ManagedRental; revision: number; updated: string };
type Auth = { username: string; csrf: string };
type Tab = 'dashboard' | 'rentals' | 'settings';
const media = (src: string) => `/admin/api/media?path=${encodeURIComponent(src)}`;
const availability = ['À confirmer', 'Disponible', 'Indisponible'];
const emptyRental = (): ManagedRental => ({ slug: '', title: '', city: '', municipality: 'Conakry', duration: 'Court séjour', furnished: '', price: null, period: '', beds: null, area: null, imgSrc: '', imageAlt: '', description: '', category: 'Appartement', imgWidth: 820, imgHeight: 616, availability: 'À confirmer', published: false, photos: [] });
const price = (r: Pick<Rental, 'price' | 'period'>) => r.price === null ? 'À discuter' : `${r.price.toLocaleString('fr-FR')} GNF / ${r.period}`;
function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    rentals: <><path d="m3 10 9-7 9 7v11H3z"/><path d="M9 21v-8h6v8"/></>,
    settings: <><circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/></>,
    plus: <path d="M12 4v16M4 12h16"/>,
    logout: <><path d="M9 4H4v16h5m5-12 4 4-4 4m-6-4h13"/></>,
  };
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{paths[name] || paths.rentals}</svg>;
}
export default function Admin() {
  const [csrf, setCsrf] = useState(document.querySelector<HTMLMetaElement>('meta[name=csrf-token]')?.content || '');
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [tab, setTab] = useState<Tab>('dashboard');
  const [editing, setEditing] = useState<Item | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  const api = useCallback(async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`/admin/api/${url}`, { ...options, headers: {
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      'X-CSRF-TOKEN': auth?.csrf || csrf, 'Accept': 'application/json', ...options.headers,
    }, cache: 'no-store' });
    const data = await response.json();
    if (data.csrf) setCsrf(data.csrf);
    if (!response.ok) {
      if (response.status === 401) { setAuth(null); setItems([]); setEditing(null); }
      throw new Error(data.error || Object.values(data.errors || {}).flat().join(' ') || data.message || 'Action impossible.');
    }
    return data;
  }, [auth, csrf]);
  useEffect(() => {
    let active = true;
    fetch('/admin/api/session', { cache: 'no-store' }).then(async response => {
      if (response.ok) { const data = await response.json(); if (active) setAuth(data); }
      else if (response.status !== 401) { const data = await response.json(); if (active) setError(data.error || 'Serveur indisponible.'); }
    }).catch(() => { if (active) setError('Le serveur ne répond pas.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!auth) return;
    let active = true;
    api('rentals').then(data => { if (active) setItems(data.items); }).catch(e => { if (active) setError(e.message); });
    return () => { active = false; };
  }, [auth, api]);
  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => { if (editing) event.preventDefault(); };
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [editing]);
  function navigate(next: Tab) {
    if (editing && !window.confirm('Quitter sans enregistrer les modifications du logement ?')) return;
    setEditing(null); setTab(next); setError(''); setNotice('');
    requestAnimationFrame(() => heading.current?.focus());
  }
  async function signin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    try { setAuth(await api('login', { method: 'POST', body: JSON.stringify({ username: form.get('username'), password: form.get('password') }) })); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }
  async function signout() {
    if (editing && !window.confirm('Se déconnecter sans enregistrer ?')) return;
    setBusy(true);
    try { const result = await api('logout', { method: 'POST' }); setCsrf(result.csrf); setAuth(null); setItems([]); setEditing(null); setNotice(''); setError(''); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }
  if (loading) return <main className="login-page"><p role="status">Ouverture de l’administration…</p></main>;
  if (!auth) return <main className="login-page"><section className="card login-card"><div className="card-body p-4 p-md-5">
    <img src="/admin-logo.svg" width="190" height="60" alt="CIP IMMO" className="mb-4" />
    <p className="eyebrow">ESPACE PRIVÉ</p><h1>Bienvenue</h1><p className="text-body-secondary">Connecte-toi pour gérer les logements.</p>
    {error && <div className="alert alert-danger" role="alert">{error}</div>}
    <form onSubmit={signin}>
      <div className="mb-3"><label htmlFor="username" className="form-label">Adresse e-mail</label><input id="username" name="username" className="form-control" autoComplete="username" required type="email" maxLength={254} autoCapitalize="none" spellCheck={false} /></div>
      <div className="mb-4"><label htmlFor="password" className="form-label">Mot de passe</label><input id="password" name="password" type="password" className="form-control" autoComplete="current-password" maxLength={128} required /></div>
      <button className="btn btn-primary w-100" disabled={busy}>{busy ? 'Connexion…' : 'Se connecter'}</button>
    </form><p className="small text-body-secondary mt-4 mb-0">Accès réservé à CIP IMMO. Aucun compte visiteur.</p>
  </div></section></main>;

  const filtered = items.filter(({ rental: r }) => `${r.title} ${r.slug} ${r.city} ${r.municipality}`.toLocaleLowerCase('fr').includes(query.toLocaleLowerCase('fr')) && (!status || (status === 'hidden' ? !r.published : r.availability === status)));
  const published = items.filter(item => item.rental.published).length;
  const unknown = items.filter(item => item.rental.availability === 'À confirmer').length;
  const title = editing ? (editing.revision ? 'Modifier le logement' : 'Ajouter un logement') : tab === 'dashboard' ? 'Tableau de bord' : tab === 'rentals' ? 'Logements' : 'Paramètres et publication';
  return <div className="wrapper">
    <a className="skip-link" href="#main-content">Aller au contenu</a>
    <aside className="main-nav" aria-label="Menu principal">
      <div className="logo-box"><img src="/admin-logo.svg" width="190" height="60" alt="CIP IMMO — Administration" /></div>
      <div className="menu-title">GESTION IMMOBILIÈRE</div>
      <nav className="navbar-nav">{(['dashboard','rentals','settings'] as Tab[]).map(key => <div className="nav-item" key={key}><button type="button" className={`nav-link w-100 ${tab === key ? 'active' : ''}`} aria-current={tab === key ? 'page' : undefined} onClick={() => navigate(key)}><span className="nav-icon"><Icon name={key}/></span><span className="nav-text">{key === 'dashboard' ? 'Tableau de bord' : key === 'rentals' ? 'Logements' : 'Paramètres'}</span></button></div>)}</nav>
      <div className="sidebar-note"><span className="local-dot"/>Administration privée<br/><small>Publiez vos modifications depuis les paramètres.</small></div>
    </aside>
    <header className="topbar"><div className="topbar-inner"><span>Administration <strong>CIP IMMO</strong></span><div className="user-area"><span className="avatar-letter">{auth.username[0].toUpperCase()}</span><span>{auth.username}</span><button className="btn btn-outline-secondary btn-sm" type="button" onClick={signout} disabled={busy}><Icon name="logout"/><span>Se déconnecter</span></button></div></div></header>
    <main id="main-content" className="page-content"><div className="container-fluid">
      <div className="page-title-box"><div><p className="eyebrow">VOTRE CATALOGUE</p><h1 ref={heading} tabIndex={-1}>{title}</h1></div>{!editing && tab !== 'settings' && <button type="button" className="btn btn-primary" onClick={() => { setTab('rentals'); setEditing({ rental: emptyRental(), revision: 0, updated: '' }); setError(''); setNotice(''); }}><Icon name="plus"/>Ajouter un logement</button>}</div>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {notice && <div className="alert alert-success" role="status">{notice}</div>}
      {editing ? <RentalEditor key={editing.rental.slug || 'new'} item={editing} api={api} onCancel={() => { if (window.confirm('Revenir à la liste sans enregistrer ?')) { setEditing(null); setError(''); } }} onSaved={async () => { const data = await api('rentals'); setItems(data.items); setEditing(null); setNotice('Logement enregistré. Cliquez sur « Publier sur le site » dans les paramètres pour mettre à jour le catalogue public.'); setError(''); requestAnimationFrame(() => heading.current?.focus()); }} /> : <>
        {tab === 'dashboard' && <>
          <div className="stats-grid">{[{ label: 'Logements au catalogue', value: items.length, icon: 'rentals' }, { label: 'Prêts à être affichés', value: published, icon: 'dashboard' }, { label: 'Disponibilité à confirmer', value: unknown, icon: 'settings' }].map(stat => <section key={stat.label} className="card stat-card"><div><p>{stat.label}</p><strong>{stat.value}</strong></div><span className="stat-icon"><Icon name={stat.icon}/></span></section>)}</div>
          <section className="card welcome-card"><div><h2>Tout commence par vos logements</h2><p>Descriptions, tarifs et photos au même endroit. La disponibilité est toujours décidée par CIP IMMO.</p><button className="btn btn-light" onClick={() => navigate('rentals')}>Gérer les logements →</button></div><div className="welcome-mark" aria-hidden="true"><Icon name="rentals"/></div></section>
          <div className="section-heading"><h2>Les logements</h2><button className="btn btn-link" onClick={() => navigate('rentals')}>Voir tout →</button></div>
        </>}
        {tab !== 'settings' && <>
          {tab === 'rentals' && <section className="card"><div className="card-body filters"><div><label htmlFor="search" className="form-label">Rechercher un logement</label><input id="search" className="form-control" value={query} onChange={e => setQuery(e.target.value)} placeholder="Quartier, titre ou référence…" maxLength={100}/></div><div><label htmlFor="filter" className="form-label">Disponibilité ou publication</label><select id="filter" className="form-select" value={status} onChange={e => setStatus(e.target.value)}><option value="">Tous les logements</option>{availability.map(value => <option key={value}>{value}</option>)}<option value="hidden">Masqués / brouillons</option></select></div><p className="mb-0">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</p></div></section>}
          <div className="property-grid">{(tab === 'dashboard' ? items.slice(0, 4) : filtered).map(item => <article className="card property-card" key={item.rental.slug}>
            <div className="property-image">{item.rental.imgSrc ? <img src={media(item.rental.imgSrc)} alt={item.rental.imageAlt} loading="lazy"/> : <div className="photo-empty"><Icon name="rentals"/><span>Photos à venir</span></div>}<span className={`badge status-badge ${item.rental.availability === 'Disponible' ? 'status-available' : item.rental.availability === 'Indisponible' ? 'status-unavailable' : 'status-unknown'}`}>{item.rental.availability}</span></div>
            <div className="card-body"><p className="small text-body-secondary mb-2">{item.rental.city} · {item.rental.municipality}</p><h2>{item.rental.title}</h2><p className="property-reference">{item.rental.slug}</p><p className="property-price">{price(item.rental)}</p><p className="small text-body-secondary">{item.rental.beds === null ? 'Chambres à confirmer' : `${item.rental.beds} chambre(s)`} · {item.rental.area === null ? 'Surface à confirmer' : `${item.rental.area} m²`}</p><div className="property-bottom"><span className="small">{item.rental.published ? 'Prêt pour le site' : 'Masqué / brouillon'}</span><button className="btn btn-outline-primary btn-sm" aria-label={`Modifier ${item.rental.title}, ${item.rental.slug}`} onClick={() => { setTab('rentals'); setEditing(structuredClone(item)); setNotice(''); setError(''); requestAnimationFrame(() => heading.current?.focus()); }}>Modifier</button></div></div>
          </article>)}</div>{tab === 'rentals' && !filtered.length && <div className="card card-body"><h2>Aucun logement trouvé</h2><p>Essaie un autre quartier ou enlève les filtres.</p><button className="btn btn-outline-primary align-self-start" onClick={() => { setQuery(''); setStatus(''); }}>Effacer les filtres</button></div>}
        </>}
        {tab === 'settings' && <div className="settings-grid"><section className="card card-body"><h2>Publier les modifications</h2><p>Vérifiez vos logements et leurs photos, puis lancez la publication. Le site reste disponible pendant sa préparation.</p><button className="btn btn-primary align-self-start" disabled={busy} onClick={async () => { setBusy(true); setError(''); setNotice(''); try { const result = await api('publish', { method: 'POST' }); setNotice(result.message); } catch (e) { setError((e as Error).message); } finally { setBusy(false); } }}>{busy ? 'Demande en cours…' : 'Publier sur le site'}</button><a className="btn btn-outline-primary align-self-start mt-3" href="/admin/api/export" download>Télécharger une copie du catalogue</a><p className="small mt-3 mb-0">Une demande de publication ne signifie pas que la mise en ligne est terminée. Vérifiez ensuite les logements sur le site.</p></section><section className="card card-body"><h2>Accès et sauvegardes</h2><p>Compte connecté : <strong>{auth.username}</strong>.</p><p>Les anciennes versions des logements sont conservées. Les mises à jour du code doivent préserver vos données et vos photos.</p><p className="mb-0">L’administration reste réservée à CIP IMMO. Aucune réservation ni aucun paiement ne sont effectués ici.</p></section></div>}
      </>}
      <footer className="admin-footer">CIP IMMO · Administration privée · Base visuelle Lahomes adaptée</footer>
    </div></main>
  </div>;
}

type EditorProps = { item: Item; api: (url: string, options?: RequestInit) => Promise<any>; onSaved: () => Promise<void>; onCancel: () => void };
function RentalEditor({ item, api, onSaved, onCancel }: EditorProps) {
  const [rental, setRental] = useState<ManagedRental>(structuredClone(item.rental));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [photoMessage, setPhotoMessage] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const errorBox = useRef<HTMLDivElement>(null);
  const set = <K extends keyof ManagedRental>(key: K, value: ManagedRental[K]) => setRental(previous => ({ ...previous, [key]: value }));
  function setPhotos(photos: RentalPhoto[]) {
    setRental(previous => ({ ...previous, photos, imgSrc: photos[0]?.src || '', imageAlt: photos[0]?.alt || '', imgWidth: photos[0]?.width || 820, imgHeight: photos[0]?.height || 616 }));
  }
  function fail(message: string) { setError(message); requestAnimationFrame(() => errorBox.current?.focus()); }
  async function save(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      await api(item.revision ? `rentals/${rental.slug}` : 'rentals', { method: item.revision ? 'PATCH' : 'POST', body: JSON.stringify({ rental, revision: item.revision }) });
      await onSaved();
    } catch (e) { fail((e as Error).message); }
    finally { setBusy(false); }
  }
  async function upload() {
    setError(''); setPhotoMessage('');
    if (!file || !photoDescription.trim()) { fail('Choisis une photo et décris ce qu’elle montre.'); return; }
    if (file.size > 8 * 1024 * 1024) { fail('La photo dépasse 8 Mo.'); return; }
    setBusy(true);
    try {
      const form = new FormData(); form.set('file', file); form.set('alt', photoDescription);
      const photo = await api('photos', { method: 'POST', body: form });
      setPhotos([...(rental.photos || []), photo]);
      setFile(null); setPhotoDescription(''); if (fileInput.current) fileInput.current.value = '';
      setPhotoMessage('Photo ajoutée à la sélection. Enregistre le logement pour conserver cette sélection.');
    } catch (e) { fail((e as Error).message); }
    finally { setBusy(false); }
  }
  const input = (key: 'title'|'slug'|'city'|'description', label: string, max: number, multiline = false) => <div className={multiline ? 'full-width' : ''}><label className="form-label" htmlFor={key}>{label}</label>{multiline ? <textarea id={key} className="form-control" value={rental[key]} onChange={e => set(key, e.target.value)} maxLength={max} rows={5} required/> : <input id={key} className="form-control" value={rental[key]} onChange={e => set(key, e.target.value)} maxLength={max} required readOnly={key === 'slug' && !!item.revision} pattern={key === 'slug' ? '[a-z0-9]+(-[a-z0-9]+)*' : undefined}/>}</div>;
  const select = (key: 'municipality'|'duration'|'furnished'|'period'|'category'|'availability', label: string, options: string[]) => <div><label htmlFor={key} className="form-label">{label}</label><select id={key} className="form-select" value={rental[key]} onChange={e => set(key, e.target.value)}>{options.map(value => <option key={value} value={value}>{value || 'À confirmer'}</option>)}</select></div>;
  return <form onSubmit={save}>
    <div className="alert alert-info">Les champs inconnus restent vides. « Disponible » ne crée pas une réservation. Le site en ligne ne sera pas modifié par cet enregistrement.</div>
    {error && <div ref={errorBox} tabIndex={-1} className="alert alert-danger" role="alert">{error}</div>}
    <fieldset disabled={busy} className="editor-fieldset">
      <section className="card"><div className="card-header"><h2>Informations du logement</h2></div><div className="card-body form-grid">
        {input('title','Titre',160)}{input('slug','Référence dans le lien (définitive)',100)}{input('city','Quartier / lieu',100)}
        {select('municipality','Ville',['Conakry','Coyah','Kankan'])}{select('category','Type',['Appartement','Duplex','Logement','Villa','Maison','Studio'])}{select('duration','Location',['Court séjour','Longue durée'])}{select('furnished','Mobilier',['','Meublé','Non meublé'])}
        {(['price','beds','area'] as const).map(key => <div key={key}><label htmlFor={key} className="form-label">{key === 'price' ? 'Tarif en GNF (vide = à discuter)' : key === 'beds' ? 'Nombre de chambres (si confirmé)' : 'Surface en m² (si confirmée)'}</label><input id={key} type="number" className="form-control" min="0" max={key === 'price' ? 999999999999 : key === 'beds' ? 100 : 100000} step="1" value={rental[key] ?? ''} onChange={e => set(key, e.target.value === '' ? null : Number(e.target.value))}/></div>)}
        {select('period','Période du tarif',['','jour','nuit','mois'])}{select('availability','Disponibilité',availability)}
        {input('description','Description — uniquement les informations confirmées',6000,true)}
        <div className="full-width form-check"><input id="published" type="checkbox" className="form-check-input" checked={rental.published} onChange={e => set('published', e.target.checked)}/><label htmlFor="published" className="form-check-label">Inclure ce logement dans la prochaine publication</label><p className="small text-body-secondary mb-0">Décocher masque le logement sans le supprimer. Ce choix est indépendant de sa disponibilité.</p></div>
      </div></section>
      <section className="card"><div className="card-header"><h2>Équipements confirmés</h2></div><div className="card-body form-grid">{['Eau','Électricité','Climatisation','Cuisine','Parking','Wi-Fi'].map((name, index) => <div key={name}><label className="form-label" htmlFor={`equipment-${index}`}>{name}</label><input id={`equipment-${index}`} className="form-control" maxLength={300} placeholder="Laisser vide si non confirmé" value={rental.amenities?.[name as keyof NonNullable<Rental['amenities']>] || ''} onChange={e => { const next = { ...rental.amenities }; if (e.target.value) next[name as keyof typeof next] = e.target.value; else delete next[name as keyof typeof next]; set('amenities', next); }}/></div>)}</div></section>
      <section className="card"><div className="card-header"><h2>Photos du logement</h2></div><div className="card-body"><p>La première photo est la photo principale. Retirer une photo de la fiche ne supprime pas le fichier d’origine.</p>
        <div className="photo-grid">{(rental.photos || []).map((photo, index, photos) => <div className="photo-item" key={photo.src}>
          <img src={media(photo.src)} alt={photo.alt} loading="lazy"/><label className="form-label" htmlFor={`alt-${index}`}>Description {index + 1}{index === 0 ? ' — principale' : ''}</label><input id={`alt-${index}`} className="form-control form-control-sm" value={photo.alt} maxLength={300} required onChange={e => setPhotos(photos.map((p, i) => i === index ? { ...p, alt: e.target.value } : p))}/>
          {photo.caption && <p className="small mt-2 mb-1">{photo.caption}</p>}{photo.originalSrc && <a className="small" href={media(photo.originalSrc)} target="_blank" rel="noreferrer">Voir l’original</a>}
          <div className="photo-actions"><button className="btn btn-outline-secondary btn-sm" type="button" disabled={index === 0} aria-label={`Avancer la photo ${index + 1}`} onClick={() => { const next = [...photos]; [next[index - 1],next[index]] = [next[index],next[index - 1]]; setPhotos(next); }}>←</button><button className="btn btn-outline-secondary btn-sm" type="button" disabled={index === photos.length - 1} aria-label={`Reculer la photo ${index + 1}`} onClick={() => { const next = [...photos]; [next[index + 1],next[index]] = [next[index],next[index + 1]]; setPhotos(next); }}>→</button><button className="btn btn-outline-danger btn-sm" type="button" aria-label={`Retirer la photo ${index + 1}`} onClick={() => { if (window.confirm('Retirer cette photo de la sélection ? Le fichier original sera conservé.')) setPhotos(photos.filter((_, i) => i !== index)); }}>Retirer</button></div>
        </div>)}</div>
        {(rental.photos?.length || 0) < 30 && <div className="upload-box"><h3>Ajouter une photo</h3><p className="small">JPEG, PNG ou WebP · 8 Mo maximum · métadonnées privées retirées à l’import.</p><div className="form-grid"><div><label htmlFor="file" className="form-label">Fichier</label><input ref={fileInput} id="file" type="file" className="form-control" accept="image/jpeg,image/png,image/webp" onChange={e => setFile(e.target.files?.[0] || null)}/></div><div><label htmlFor="photo-alt" className="form-label">Ce que montre la photo</label><input id="photo-alt" className="form-control" value={photoDescription} onChange={e => setPhotoDescription(e.target.value)} maxLength={300}/></div></div><button className="btn btn-outline-primary mt-3" type="button" onClick={upload}>{busy ? 'Envoi…' : 'Ajouter à la sélection'}</button>{photoMessage && <p role="status" className="mt-3 mb-0">{photoMessage}</p>}</div>}
        <label htmlFor="photo-notice" className="form-label mt-3">Information publique sur les photos (retouches, photos partagées…)</label><textarea id="photo-notice" className="form-control" maxLength={1500} rows={3} value={rental.photoNotice || ''} onChange={e => set('photoNotice', e.target.value)}/>
      </div></section>
      <div className="editor-actions"><button type="submit" className="btn btn-primary">{busy ? 'Enregistrement…' : 'Enregistrer le logement'}</button><button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Annuler</button></div>
    </fieldset>
  </form>;
}
