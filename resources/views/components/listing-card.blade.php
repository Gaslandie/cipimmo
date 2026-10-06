@props(['listing'])
<article class="listing-card">
    <div class="listing-photo">
        <img src="{{ asset('images/'.$listing['image']) }}" alt="{{ $listing['alt'] }}" width="{{ $listing['width'] }}" height="{{ $listing['height'] }}" loading="lazy" decoding="async">
        <span class="listing-badge">{{ $listing['furnished'] === 'meuble' ? 'Meublé' : 'Non meublé' }}</span>
    </div>
    <div class="listing-content">
        <p class="listing-location"><x-icon name="pin" :size="16" />{{ $listing['city_name'] }}</p>
        <h3>{{ $listing['title'] }}</h3>
        <p class="listing-features"><span><x-icon name="bed" :size="18" />{{ $listing['rooms'] }} {{ $listing['rooms'] > 1 ? 'chambres' : 'chambre' }}</span><span><x-icon name="area" :size="17" />{{ $listing['area'] }} m²</span></p>
        <div class="listing-bottom"><p class="price">{{ number_format($listing['price'], 0, ',', ' ') }} <span>GNF / {{ $listing['period'] }}</span></p><a class="card-link" href="{{ route('demo.listing', $listing['slug']) }}">Voir le logement<x-icon name="arrow" :size="18" /></a></div>
    </div>
</article>
