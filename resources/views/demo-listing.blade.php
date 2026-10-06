<x-layout :demo="$demo" :contact="$contact" :title="$listing['title'].' — CIP IMMO'">
<div class="site-container section detail-page">
    <a class="text-link back-link" href="{{ route('home') }}#logements">← Retour aux logements</a>
    <h1>{{ $listing['title'] }}</h1>
    <p class="detail-location">{{ $listing['city_name'] }}</p>
    <div class="detail-grid">
        <x-listing-gallery :photos="$listing['images']" :title="$listing['title']" :detail="true" />
        <aside class="detail-summary">
            <h2>Les informations du logement</h2>
            <p class="price">{{ number_format($listing['price'], 0, ',', ' ') }} <span>GNF / {{ $listing['period'] }}</span></p>
            <dl>
                <div><dt>Location</dt><dd>{{ $listing['duration'] === 'court-sejour' ? 'Court séjour' : 'Longue durée' }}</dd></div>
                <div><dt>Mobilier</dt><dd>{{ $listing['furnished'] === 'meuble' ? 'Meublé' : 'Non meublé' }}</dd></div>
                <div><dt>Chambres</dt><dd>{{ $listing['rooms'] }}</dd></div>
                <div><dt>Surface</dt><dd>{{ $listing['area'] }} m²</dd></div>
            </dl>
            <x-contact-icons :contact="$contact" :listing-title="$listing['title']" />
            <p class="detail-contact-note">La location se confirme directement avec notre équipe. Aucun paiement ne se fait sur le site.</p>
        </aside>
    </div>
    <div class="detail-description"><h2>À propos du logement</h2><p class="reading-copy">{{ $listing['description'] }}</p></div>
</div>
</x-layout>
