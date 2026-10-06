<x-layout :demo="$demo" :contact="$contact">
<section class="hero site-container" aria-labelledby="hero-title">
    <div class="hero-photo"><picture><source media="(max-width: 640px)" srcset="{{ asset('images/hero-mobile.jpg') }}"><img src="{{ asset('images/hero-interior.jpg') }}" alt="Photo d’ambiance illustrative d’un salon contemporain" width="800" height="1200" fetchpriority="high" decoding="async"></picture></div>
    <div class="hero-content">
        <p class="eyebrow">BIENVENUE CHEZ CIP IMMO</p>
        <h1 id="hero-title">De passage ou pour longtemps, trouvez votre chez-vous.</h1>
        <p class="hero-description">Découvrez les photos, comparez les prix et choisissez les logements qui vous plaisent. CIP IMMO vous accompagne pour la suite.</p>
        <form class="search-form" method="get" action="{{ route('home') }}#logements" aria-label="Rechercher un logement">
            <div class="search-field"><x-icon name="pin" /><div><label for="city">Où cherchez-vous ?</label><select id="city" name="city"><option value="">Choisir une ville</option>@foreach($cities as $city)<option value="{{ $city['slug'] }}" @selected(($filters['city'] ?? '') === $city['slug'])>{{ $city['name'] }}</option>@endforeach</select></div></div>
            <div class="search-field"><x-icon name="calendar" /><div><label for="duration">Pour quelle durée ?</label><select id="duration" name="duration"><option value="">Toutes les durées</option><option value="court-sejour" @selected(($filters['duration'] ?? '') === 'court-sejour')>Court séjour</option><option value="longue-duree" @selected(($filters['duration'] ?? '') === 'longue-duree')>Longue durée</option></select></div></div>
            <div class="search-field"><x-icon name="home" /><div><label for="furnished">Quel logement ?</label><select id="furnished" name="furnished"><option value="">Peu importe</option><option value="meuble" @selected(($filters['furnished'] ?? '') === 'meuble')>Meublé</option><option value="non-meuble" @selected(($filters['furnished'] ?? '') === 'non-meuble')>Non meublé</option></select></div></div>
            <button class="button button-primary" type="submit"><x-icon name="search" />Voir les logements</button>
        </form>
        @if($contact['whatsapp'])<p class="hero-contact"><a href="{{ $contact['whatsapp'] }}"><x-icon name="chat" :size="18" />Une question ? Parlons-en sur WhatsApp.</a></p>@endif
    </div>
</section>
<section id="logements" class="section site-container">
    <x-section-heading eyebrow="UN LIEU POUR VOUS" title="Découvrez nos logements" description="Pour un séjour ou une installation, trouvez le logement qui correspond à vos besoins." />
    @if($filterErrors->any())<div class="notice error" role="alert"><strong>La recherche n’a pas pu être appliquée.</strong><p>{{ $filterErrors->first() }}</p><a href="{{ route('home') }}#logements">Réinitialiser la recherche</a></div>@endif
    @if($filtered)<div class="results-heading" role="status"><p>{{ count($listings) }} {{ count($listings) > 1 ? 'logements correspondent' : 'logement correspond' }} à votre recherche.</p><a class="text-link" href="{{ route('home') }}#logements">Réinitialiser les filtres</a></div>@endif
    @if(count($listings))<div class="listings-grid">@foreach($listings as $listing)<x-listing-card :listing="$listing" />@endforeach</div>@else<div class="empty-state"><span class="empty-icon"><x-icon name="search" :size="32" /></span><h3>{{ $demo ? 'Aucun logement pour ces critères' : 'Aucun logement à afficher pour le moment' }}</h3><p>{{ $demo ? 'Essayez une autre ville ou changez la durée et le type de logement.' : 'Revenez consulter notre sélection prochainement.' }}</p>@if($demo)<a class="button button-primary" href="{{ route('home') }}#logements">Voir tous les logements</a>@else<a class="button button-primary" href="#contact">Nous contacter</a>@endif</div>@endif
    @if(count($listings))<div class="section-action"><a class="button button-outline" href="{{ route('home') }}#logements">Voir tous les logements<x-icon name="arrow" :size="18" /></a></div>@endif
</section>
<section id="villes" class="section cities-section"><div class="site-container">
    <x-section-heading eyebrow="À CHAQUE ENVIE, UN LIEU" title="Où souhaitez-vous vous installer ?" description="Explorez nos logements par ville et découvrez les offres qui vous correspondent." />
    <div class="cities-grid">@forelse($cities as $city)<article class="city-card"><div class="city-mark"><x-icon name="pin" :size="32" /></div><h3>{{ $city['name'] }}</h3><p>{{ $city['count'] }} {{ $city['count'] > 1 ? 'logements' : 'logement' }}</p><a href="{{ route('home', ['city' => $city['slug']]) }}#logements">Voir les logements<x-icon name="arrow" :size="18" /></a></article>@empty<p class="pending-cities">Aucune ville à afficher pour le moment.</p>@endforelse</div>
</div></section>
<section id="comment-louer" class="section site-container">
    <x-section-heading eyebrow="SIMPLEMENT, AVEC VOUS" title="Votre location commence ici" />
    <div class="steps-grid">
        <article class="step"><span class="step-number">01</span><span class="step-icon"><x-icon name="search" :size="30" /></span><h3>Trouvez votre logement</h3><p>Choisissez une ville et affinez votre recherche selon vos besoins et votre budget.</p></article>
        <article class="step"><span class="step-number">02</span><span class="step-icon"><x-icon name="home" :size="30" /></span><h3>Consultez les détails</h3><p>Découvrez les photos, les équipements et le prix du logement.</p></article>
        <article class="step"><span class="step-number">03</span><span class="step-icon"><x-icon name="chat" :size="30" /></span><h3>Échangez avec CIP IMMO</h3><p>Contactez-nous sur WhatsApp ou par téléphone pour confirmer la disponibilité et connaître les conditions de location.</p></article>
    </div><p class="rental-note"><x-icon name="check" :size="20" /><span>La location se confirme directement avec notre équipe. Aucun paiement ne se fait sur le site.</span></p>
</section>
<section id="a-propos" class="section site-container about-section">
    <div class="about-photo"><img src="{{ asset('images/apartment-interior.jpg') }}" alt="Photo d’ambiance illustrative d’un intérieur accueillant" width="977" height="733" loading="lazy" decoding="async"></div>
    <div class="about-copy"><x-section-heading eyebrow="FAISONS CONNAISSANCE" title="CIP IMMO, à vos côtés pour trouver votre logement" /><p class="reading-copy">Vous cherchez un logement pour un court séjour ou pour vous installer ? CIP IMMO vous propose des logements meublés et non meublés et vous accompagne dans votre recherche.</p><p class="reading-copy">Parlez-nous de la ville souhaitée, de votre budget et de la durée de location. Nous vous renseignons sur les offres qui correspondent à votre demande.</p><div class="section-action"><a class="button button-outline" href="#contact">Parlons de votre recherche<x-icon name="arrow" :size="18" /></a></div></div>
</section>
<section id="faq" class="section site-container faq-section">
    <x-section-heading eyebrow="AVANT DE VOUS INSTALLER" title="Vous avez des questions ?" />
    <div class="faq-list">
        <details><summary>Peut-on louer pour un court séjour ou une longue durée ?</summary><p>Oui. CIP IMMO propose les deux. Les possibilités dépendent du logement : consultez sa fiche ou contactez-nous pour en savoir plus.</p></details>
        <details><summary>Les logements sont-ils tous meublés ?</summary><p>Non. Nous proposons des logements meublés et non meublés. Vous pouvez sélectionner votre préférence dans les filtres de recherche.</p></details>
        <details><summary>Comment savoir si un logement est disponible ?</summary><p>Contactez-nous depuis la fiche du logement, sur WhatsApp ou par téléphone. Notre équipe vous confirmera sa disponibilité pour la période souhaitée.</p></details>
        <details><summary>Peut-on réserver ou payer directement sur le site ?</summary><p>Non. Le site vous permet de consulter les logements et leurs prix. La disponibilité, les conditions et la confirmation de location se règlent directement avec CIP IMMO.</p></details>
        <details><summary>Comment connaître les charges et les conditions de location ?</summary><p>Consultez les informations de la fiche, puis échangez avec notre équipe pour connaître les charges éventuelles, la caution et les conditions applicables au logement.</p></details>
    </div>
</section>
<section id="contact" class="section site-container"><div class="contact-panel"><p class="eyebrow">PARLONS DE VOTRE PROJET</p><h2>Besoin d’aide pour trouver votre logement ?</h2><p class="contact-description">Dites-nous où vous cherchez, pour combien de temps et avec quel budget. Échangeons sur les possibilités.</p><x-contact-buttons :contact="$contact" /></div></section>
</x-layout>
