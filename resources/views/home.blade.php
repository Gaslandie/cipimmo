<x-layout :demo="$demo" :contact="$contact">
<section class="hero site-container" aria-labelledby="hero-title">
    <div class="hero-photo"><picture><source media="(max-width: 640px)" srcset="{{ asset('images/hero-mobile.jpg') }}"><img src="{{ asset('images/hero-interior.jpg') }}" alt="Photo d’ambiance illustrative d’un salon contemporain" width="800" height="1200" fetchpriority="high" decoding="async"></picture></div>
    <div class="hero-content">
        <p class="eyebrow">BIENVENUE CHEZ CIP IMMO</p>
        <h1 id="hero-title">De passage ou pour longtemps, trouvez votre chez-vous.</h1>
        <p class="hero-description">Découvrez les photos, comparez les prix et choisissez les logements qui vous plaisent. CIP IMMO vous accompagne pour la suite.</p>
        <x-search-form :cities="$cities" />
        @if($contact['whatsapp'])<p class="hero-contact"><a href="{{ $contact['whatsapp'] }}"><x-icon name="chat" :size="18" />Une question ? Parlons-en sur WhatsApp.</a></p>@endif
    </div>
</section>
<section id="logements" class="section site-container">
    <x-section-heading eyebrow="UN LIEU POUR VOUS" title="Découvrez nos logements" description="Pour un séjour ou une installation, trouvez le logement qui correspond à vos besoins." />
    @if(count($listings))<div class="listings-grid">@foreach($listings as $listing)<x-listing-card :listing="$listing" />@endforeach</div>@else<div class="empty-state"><h3>Aucun logement à afficher pour le moment</h3><p>Revenez consulter notre sélection prochainement.</p></div>@endif
    <div class="section-action"><a class="button button-outline" href="{{ route('listings.index') }}">Voir tous les logements<x-icon name="arrow" :size="18" /></a></div>
</section>
<section id="villes" class="section cities-section"><div class="site-container">
    <x-section-heading eyebrow="À CHAQUE ENVIE, UN LIEU" title="Où souhaitez-vous vous installer ?" description="Explorez nos logements par ville et découvrez les offres qui vous correspondent." />
    <div class="cities-grid">@forelse($popularCities as $city)<article class="city-card"><div class="city-mark"><x-icon name="pin" :size="32" /></div><h3>{{ $city['name'] }}</h3><p>{{ $city['count'] }} {{ $city['count'] > 1 ? 'logements' : 'logement' }}</p><a href="{{ route('listings.index', ['city' => $city['slug']]) }}#logements">Voir les logements<x-icon name="arrow" :size="18" /></a></article>@empty<p class="pending-cities">Aucune ville à afficher pour le moment.</p>@endforelse</div>
    <p class="section-action">Vous cherchez une autre ville ? <a class="text-link" href="{{ route('listings.index') }}#city">Cliquez ici</a></p>
</div></section>
<section id="comment-louer" class="section site-container">
    <x-section-heading eyebrow="SIMPLEMENT, AVEC VOUS" title="Votre location commence ici" />
    <div class="steps-grid">
        <article class="step"><span class="step-number">01</span><span class="step-icon"><x-icon name="search" :size="30" /></span><h3>Trouvez votre logement</h3><p>Choisissez une ville, une durée et votre préférence de mobilier.</p></article>
        <article class="step"><span class="step-number">02</span><span class="step-icon"><x-icon name="home" :size="30" /></span><h3>Consultez les détails</h3><p>Regardez les photos et les informations du logement.</p></article>
        <article class="step"><span class="step-number">03</span><span class="step-icon"><x-icon name="chat" :size="30" /></span><h3>Échangez avec CIP IMMO</h3><p>Contactez notre équipe pour la disponibilité et les conditions.</p></article>
    </div><p class="rental-note"><x-icon name="check" :size="20" /><span>La location se confirme directement avec notre équipe. Aucun paiement ne se fait sur le site.</span></p>
<div class="section-action"><a class="button button-outline" href="{{ route('renting') }}">Découvrir comment louer<x-icon name="arrow" :size="18" /></a></div>
</section>
<section id="a-propos" class="section site-container about-section">
    <div class="about-photo"><img src="{{ asset('images/apartment-interior.jpg') }}" alt="Photo d’ambiance illustrative d’un intérieur accueillant" width="977" height="733" loading="lazy" decoding="async"></div>
    <div class="about-copy"><x-section-heading eyebrow="FAISONS CONNAISSANCE" title="CIP IMMO, à vos côtés pour trouver votre logement" /><p class="reading-copy">Vous cherchez un logement pour un court séjour ou pour vous installer ? CIP IMMO vous propose des logements meublés et non meublés et vous accompagne dans votre recherche.</p><div class="section-action"><a class="button button-outline" href="{{ route('about') }}">Découvrir CIP IMMO<x-icon name="arrow" :size="18" /></a></div></div>
</section>
<section id="faq" class="section site-container faq-section">
    <x-section-heading eyebrow="AVANT DE VOUS INSTALLER" title="Vous avez des questions ?" />
    <div class="faq-list">
        <details><summary>Peut-on louer pour un court séjour ou une longue durée ?</summary><p>Oui. CIP IMMO propose les deux. Les possibilités dépendent du logement : consultez sa fiche ou contactez-nous pour en savoir plus.</p></details>
        <details><summary>Les logements sont-ils tous meublés ?</summary><p>Non. Nous proposons des logements meublés et non meublés. Vous pouvez sélectionner votre préférence dans les filtres de recherche.</p></details>
    </div>
    <div class="section-action"><a class="button button-outline" href="{{ route('renting') }}#questions">Voir toutes les réponses<x-icon name="arrow" :size="18" /></a></div>
</section>
<section id="contact" class="section site-container"><div class="contact-panel"><p class="eyebrow">PARLONS DE VOTRE PROJET</p><h2>Besoin d’aide pour trouver votre logement ?</h2><p class="contact-description">Dites-nous où vous cherchez, pour combien de temps et avec quel budget. Échangeons sur les possibilités.</p><a class="button button-primary" href="{{ route('contact') }}">Nous contacter<x-icon name="arrow" :size="18" /></a></div></section>
</x-layout>
