@props(['listing'])
<article class="listing-card">
    <x-listing-gallery :photos="$listing['images']" :title="$listing['title']" :badge="$listing['furnished'] === 'meuble' ? 'Meublé' : 'Non meublé'" />
    <div class="listing-content">
        <p class="listing-features"><span><x-icon name="bed" :size="18" />{{ $listing['rooms'] }} {{ $listing['rooms'] > 1 ? 'chambres' : 'chambre' }}</span><span><x-icon name="area" :size="17" />{{ $listing['area'] }} m²</span></p>
        <p class="listing-location"><x-icon name="pin" :size="16" />{{ $listing['city_name'] }}</p>
        <h3><a href="{{ route('listings.show', $listing['slug']) }}">{{ $listing['title'] }}</a></h3>
        <div class="listing-bottom"><p class="price">{{ number_format($listing['price'], 0, ',', ' ') }} <span>GNF / {{ $listing['period'] }}</span></p><a class="card-link" href="{{ route('listings.show', $listing['slug']) }}">Voir le logement<x-icon name="arrow" :size="18" /></a></div>
    </div>
</article>
