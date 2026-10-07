<x-layout :demo="$demo" :contact="$contact" title="Contact — CIP IMMO">
<section class="section site-container page-content">
    <div class="page-heading"><p class="eyebrow">PARLONS DE VOTRE PROJET</p><h1>Contactez CIP IMMO</h1><p>Une question sur un logement ou besoin d’aide pour votre recherche ? Échangeons sur les possibilités.</p></div>
    <div class="contact-grid">
        <x-contact-form :contact="$contact" />
        <aside class="contact-panel contact-aside"><p class="eyebrow">À VOTRE ÉCOUTE</p><h2>Échangeons directement</h2><p class="contact-description">Vous préférez nous appeler ou commencer une discussion ? Notre équipe vous accompagne dans votre recherche.</p><x-contact-buttons :contact="$contact" />
            @unless($contact['whatsapp'] || $contact['phone'])<a class="button button-outline" href="{{ route('listings.index') }}">Consulter les logements</a>@endunless
            <div class="contact-help"><h3>Pour vous aider plus vite</h3><p>Indiquez la ville souhaitée, la durée de votre séjour et votre budget. Si un logement vous plaît, ajoutez son titre.</p></div>
        </aside>
    </div>
    <section class="location-card" aria-labelledby="location-heading" data-location-card>
        <div class="location-copy">
            <span class="location-icon"><x-icon name="pin" :size="26" /></span>
            <p class="eyebrow">NOS LOGEMENTS EN GUINÉE</p>
            <h2 id="location-heading">Repérez votre prochaine ville</h2>
            <p>Découvrez Conakry, Coyah et Kankan sur la carte, puis retrouvez les logements de la ville qui vous intéresse.</p>
            <nav class="location-cities" aria-label="Villes sur la carte">
                @foreach(['conakry' => 'Conakry', 'coyah' => 'Coyah', 'kankan' => 'Kankan'] as $slug => $city)
                    <a href="https://www.google.com/maps/search/?api=1&amp;query={{ rawurlencode($city.', Guinée') }}" target="_blank" rel="noopener noreferrer" data-map-city="{{ $slug }}" @if($loop->first) aria-current="true" @endif>{{ $city }}</a>
                @endforeach
            </nav>
            <p class="location-city" data-map-label aria-live="polite">Conakry, Guinée</p>
            <p class="location-note">La carte montre la ville. Notre équipe vous communiquera l’adresse exacte du logement.</p>
            <a class="button button-primary" data-map-listings href="{{ route('listings.index', ['city' => 'conakry']) }}">Voir les logements<x-icon name="arrow" :size="18" /></a>
            <a class="location-map-link" data-map-link href="https://www.google.com/maps/search/?api=1&amp;query=Conakry%2C%20Guin%C3%A9e" target="_blank" rel="noopener noreferrer">Ouvrir dans Google Maps<x-icon name="arrow" :size="16" /></a>
        </div>
        <div class="location-map">
            <iframe data-map-frame title="Carte de Conakry, Guinée — vue générale de la ville" src="https://maps.google.com/maps?q=Conakry%2C%20Guin%C3%A9e&amp;z=12&amp;output=embed" loading="lazy" referrerpolicy="no-referrer"></iframe>
        </div>
    </section>
    <div class="section-action"><a class="button button-outline" href="{{ route('renting') }}">Comprendre les étapes de location<x-icon name="arrow" :size="18" /></a></div>
</section>
</x-layout>
