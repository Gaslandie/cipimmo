@php
    [$title, $description] = match ($status) {
        401 => ['Connexion nécessaire', 'Connectez-vous pour accéder à cet espace.'],
        403 => ['Accès non autorisé', 'Vous ne pouvez pas accéder à cette page avec votre compte actuel.'],
        404 => ['Page introuvable', 'Cette page n’existe pas ou son adresse a changé. Retrouvez nos appartements à louer en Guinée.'],
        405 => ['Action non disponible', 'Cette action ne peut pas être effectuée depuis cette page.'],
        419 => ['Votre session a expiré', 'Reconnectez-vous, puis recommencez votre action.'],
        429 => ['Un instant, s’il vous plaît', 'Vous avez effectué plusieurs demandes rapprochées. Patientez avant de réessayer.'],
        503 => ['Le site est en maintenance', 'Nous effectuons une intervention. Merci de revenir dans quelques instants.'],
        default => $status >= 500
            ? ['Le service rencontre un problème', 'Nous ne pouvons pas afficher cette page pour le moment. Réessayez dans quelques instants ou contactez CIP IMMO.']
            : ['La demande ne peut pas aboutir', 'Vérifiez votre demande ou revenez à l’accueil.'],
    };
@endphp
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow, noarchive">
    <title>{{ $title }} — CIP IMMO</title>
    <link rel="icon" href="/icon.svg" type="image/svg+xml">
    <style>
        *{box-sizing:border-box}body{margin:0;background:#f5f7fa;color:#12314c;font:1rem/1.65 system-ui,sans-serif}main{overflow-wrap:anywhere;width:min(100% - 2rem,44rem);margin:clamp(2rem,10vh,7rem) auto;padding:clamp(1.25rem,5vw,3rem);background:white;border:1px solid #d8e0e8;border-radius:1.25rem}img{max-width:100%;height:auto}.code{font-size:.9rem;color:#526779;margin:2rem 0 .5rem}h1{font-size:clamp(1.7rem,5vw,2.4rem);line-height:1.25;margin:0 0 1rem}p{margin:0 0 1.5rem}nav{display:flex;flex-wrap:wrap;gap:.75rem}a{color:#12314c}nav a{min-width:0;max-width:100%;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:.65rem 1rem;border:1px solid #12314c;border-radius:.5rem;text-decoration:none;font-weight:650}nav a:first-child{background:#12314c;color:white}nav a:hover{box-shadow:0 0 0 2px #12314c}a:focus-visible{outline:3px solid #b77b00;outline-offset:4px}.contact{margin:1.5rem 0 0}.contact a{display:inline-block;padding:.5rem 0;text-underline-offset:3px}@media(max-width:400px){nav a{width:100%}}
    </style>
</head>
<body>
<main id="main-content">
    <a href="/" aria-label="CIP IMMO — Accueil"><img src="/admin-logo.svg" width="220" height="52" alt="CIP IMMO"></a>
    <p class="code">Erreur {{ $status }}</p>
    <h1>{{ $title }}</h1>
    <p>{{ $description }}</p>
    <nav aria-label="Retrouver une page">
        <a href="/">Retour à l’accueil</a>
        @if ($status === 419 || request()->is('admin', 'admin/*'))
            <a href="/admin">Se connecter</a>
        @else
            <a href="/listing-left-sidebar/">Voir nos logements</a>
        @endif
    </nav>
    <p class="contact"><a href="/contacts/">Contacter CIP IMMO</a></p>
</main>
</body>
</html>
