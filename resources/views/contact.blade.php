<x-layout :demo="$demo" :contact="$contact" title="Contact — CIP IMMO">
<section class="section site-container page-content">
    <div class="page-heading"><p class="eyebrow">PARLONS DE VOTRE PROJET</p><h1>Contactez CIP IMMO</h1><p>Une question sur un logement ou besoin d’aide pour votre recherche ? Échangeons sur les possibilités.</p></div>
    <div class="contact-panel"><h2>Parlons de votre recherche</h2><p class="contact-description">Dites-nous où vous cherchez, pour combien de temps et avec quel budget. Si un logement vous plaît, précisez son titre pour que notre équipe puisse vous renseigner.</p><x-contact-buttons :contact="$contact" />
        @unless($contact['whatsapp'] || $contact['phone'])<p class="contact-description">En attendant de pouvoir joindre notre équipe, vous pouvez consulter les logements et leurs informations.</p><a class="button button-outline" href="{{ route('listings.index') }}">Consulter les logements</a>@endunless
    </div>
    <div class="page-copy"><h2>Les informations utiles à nous transmettre</h2><ul><li>La ville souhaitée et le logement qui vous intéresse.</li><li>Vos dates ou la durée prévue de votre location.</li><li>Le nombre de personnes et votre préférence pour un logement meublé ou non meublé.</li><li>Votre budget, en précisant s’il est par nuit ou par mois.</li></ul><p>Notre équipe vous confirmera la disponibilité, le prix applicable et les conditions. Aucun paiement ne se fait sur le site.</p></div>
    <div class="section-action"><a class="button button-outline" href="{{ route('renting') }}">Comprendre les étapes de location<x-icon name="arrow" :size="18" /></a></div>
</section>
</x-layout>
