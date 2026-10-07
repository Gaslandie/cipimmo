@props(['title' => 'CIP IMMO — De passage ou pour longtemps, trouvez votre chez-vous.', 'demo' => false, 'contact'])
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Découvrez les logements meublés et non meublés de CIP IMMO en Guinée, pour un court séjour ou une location longue durée.">
    @if($demo)<meta name="robots" content="noindex, nofollow">@endif
    <meta name="theme-color" content="#002e63">
    <title>{{ $title }}</title>
    <link rel="icon" href="{{ asset('images/cip-immo-symbol.svg') }}" type="image/svg+xml">
    <link rel="preload" href="{{ Vite::asset('resources/fonts/manrope-latin-variable.woff2') }}" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="{{ Vite::asset('resources/fonts/outfit-latin-variable.woff2') }}" as="font" type="font/woff2" crossorigin>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
<a class="skip-link" href="#contenu">Aller au contenu</a>
<header class="site-header">
    <div class="site-container header-content">
        <x-brand />
        <nav class="desktop-nav" aria-label="Navigation principale"><a href="{{ route('listings.index') }}" @if(request()->routeIs('listings.*', 'demo.listing')) aria-current="page" @endif>Nos logements</a><a href="{{ route('renting') }}" @if(request()->routeIs('renting')) aria-current="page" @endif>Comment louer</a><a href="{{ route('about') }}" @if(request()->routeIs('about')) aria-current="page" @endif>À propos</a></nav>
        <a class="button button-primary header-contact" href="{{ route('contact') }}" @if(request()->routeIs('contact')) aria-current="page" @endif>Nous contacter<x-icon name="arrow" :size="18" /></a>
        <details class="mobile-menu">
            <summary aria-label="Menu de navigation"><span class="menu-lines" aria-hidden="true"></span></summary>
            <div class="mobile-menu-panel">
                <div class="mobile-menu-heading"><x-brand /><button class="mobile-menu-close" type="button" aria-label="Fermer le menu" data-menu-close hidden><x-icon name="close" :size="24" /></button></div>
                <nav class="mobile-menu-links" aria-label="Navigation mobile">
                    <a href="{{ route('home') }}" @if(request()->routeIs('home')) aria-current="page" @endif>Accueil<x-icon name="arrow" :size="20" /></a>
                    <a href="{{ route('listings.index') }}" @if(request()->routeIs('listings.*', 'demo.listing')) aria-current="page" @endif>Nos logements<x-icon name="arrow" :size="20" /></a>
                    <a href="{{ route('renting') }}" @if(request()->routeIs('renting')) aria-current="page" @endif>Comment louer<x-icon name="arrow" :size="20" /></a>
                    <a href="{{ route('about') }}" @if(request()->routeIs('about')) aria-current="page" @endif>À propos<x-icon name="arrow" :size="20" /></a>
                    <a href="{{ route('contact') }}" @if(request()->routeIs('contact')) aria-current="page" @endif>Nous contacter<x-icon name="arrow" :size="20" /></a>
                </nav>
                <div class="mobile-menu-cities"><p class="eyebrow">CHOISIR UNE VILLE</p><div>
                    @foreach(['conakry' => 'Conakry', 'coyah' => 'Coyah', 'kankan' => 'Kankan'] as $slug => $city)<a href="{{ route('listings.index', ['city' => $slug]) }}">{{ $city }}</a>@endforeach
                </div></div>
                <a class="mobile-menu-help" href="{{ route('renting') }}#questions"><x-icon name="chat" :size="20" />Questions fréquentes<x-icon name="arrow" :size="18" /></a>
                <div class="mobile-menu-contact"><h2>Parlons de votre recherche</h2><x-contact-buttons :contact="$contact" :phone-first="true" :prominent-phone="true" /><p>CIP IMMO · Coyah, Guinée</p></div>
            </div>
        </details>
    </div>
</header>
<main id="contenu">{{ $slot }}</main>
<footer class="site-footer">
    <div class="site-container footer-main"><div><x-brand /><p>Logements meublés et non meublés en Guinée, pour vos courts séjours et vos locations longue durée.</p></div><nav aria-label="Navigation du pied de page"><a href="{{ route('listings.index') }}" @if(request()->routeIs('listings.*', 'demo.listing')) aria-current="page" @endif>Nos logements</a><a href="{{ route('about') }}" @if(request()->routeIs('about')) aria-current="page" @endif>À propos</a><a href="{{ route('contact') }}" @if(request()->routeIs('contact')) aria-current="page" @endif>Contact</a></nav></div>
    <div class="site-container footer-bottom"><p>© {{ date('Y') }} CIP IMMO. Tous droits réservés.</p></div>
</footer>
</body>
</html>
