<x-layout :demo="$demo" :contact="$contact" title="Nos logements — CIP IMMO">
<section class="section site-container page-content">
    <div class="page-heading"><p class="eyebrow">UN LIEU POUR VOUS</p><h1>Nos logements</h1><p>Choisissez votre ville, la durée de location et votre préférence pour un logement meublé ou non meublé.</p></div>
    <x-search-form :cities="$cities" :filters="$filters" />
    <div id="logements" class="catalog-results">
    @if($filterErrors->any())<div class="notice error" role="alert"><strong>La recherche n’a pas pu être appliquée.</strong><p>{{ $filterErrors->first() }}</p><a href="{{ route('listings.index') }}#logements">Réinitialiser la recherche</a></div>@endif
    @unless($filterErrors->any())<div class="results-heading" role="status"><p>{{ count($listings) }} {{ count($listings) === 1 ? 'logement trouvé' : 'logements trouvés' }}{{ $filtered ? ' pour votre recherche.' : '.' }}</p>@if($filtered)<a class="text-link" href="{{ route('listings.index') }}#logements">Réinitialiser les filtres</a>@endif</div>@endunless
    @if(count($listings))<div class="listings-grid">@foreach($listings as $listing)<x-listing-card :listing="$listing" />@endforeach</div>@else<div class="empty-state"><span class="empty-icon"><x-icon name="search" :size="32" /></span><h3>{{ $demo ? 'Aucun logement pour ces critères' : 'Aucun logement à afficher pour le moment' }}</h3><p>{{ $demo ? 'Essayez une autre ville ou changez la durée et le type de logement.' : 'Revenez consulter notre sélection prochainement.' }}</p>@if($demo)<a class="button button-primary" href="{{ route('listings.index') }}#logements">Voir tous les logements</a>@else<a class="button button-primary" href="{{ route('contact') }}">Nous contacter</a>@endif</div>@endif

    </div>
</section>
</x-layout>
