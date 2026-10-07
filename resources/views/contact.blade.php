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
    <section class="location-card" aria-labelledby="location-heading">
        <div class="location-copy">
            <span class="location-icon"><x-icon name="pin" :size="26" /></span>
            <p class="eyebrow">NOTRE ENTREPRISE</p>
            <h2 id="location-heading">Retrouvez-nous à Coyah</h2>
            <p>CIP IMMO est basée à Coyah, en Guinée.</p>
            <p class="location-city">Coyah, Guinée</p>
            <p class="location-note">Vue de la ville. Contactez-nous pour l’adresse du bureau.</p>
            @if($contact['whatsapp'])
                <a class="button button-primary" href="{{ $contact['whatsapp'].'?text='.rawurlencode('Bonjour CIP IMMO, pouvez-vous me communiquer l’adresse de votre bureau à Coyah ?') }}"><x-icon name="chat" :size="18" />Demander l’adresse</a>
            @elseif($contact['phone'])
                <a class="button button-primary" href="{{ $contact['phone'] }}"><x-icon name="phone" :size="18" />Appeler pour l’adresse</a>
            @endif
            <a class="location-map-link" href="https://www.google.com/maps/search/?api=1&amp;query=Coyah%2C%20Guin%C3%A9e" target="_blank" rel="noopener noreferrer">Voir Coyah sur Google Maps<x-icon name="arrow" :size="16" /></a>
        </div>
        <div class="location-map">
            <iframe title="Carte de Coyah, Guinée — vue générale, adresse du bureau à confirmer" src="https://maps.google.com/maps?q=Coyah%2C%20Guin%C3%A9e&amp;z=12&amp;output=embed" loading="lazy" referrerpolicy="no-referrer"></iframe>
        </div>
    </section>
    <div class="section-action"><a class="button button-outline" href="{{ route('renting') }}">Comprendre les étapes de location<x-icon name="arrow" :size="18" /></a></div>
</section>
</x-layout>
