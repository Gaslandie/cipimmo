@props(['photos', 'title', 'detail' => false, 'badge' => null])
<div class="listing-gallery {{ $detail ? 'gallery-detail' : '' }}" data-gallery role="group" aria-roledescription="galerie" aria-label="Photos : {{ $title }}">
    <div class="gallery-frame">
        <div class="gallery-track" data-gallery-track tabindex="0" aria-label="Parcourir les photos : {{ $title }}">
            @foreach($photos as $photo)
                <figure class="gallery-slide" data-gallery-slide role="group" aria-label="Photo {{ $loop->iteration }} sur {{ count($photos) }}">
                    <img src="{{ asset('images/'.$photo['image']) }}" alt="{{ $photo['alt'] }}" width="{{ $photo['width'] }}" height="{{ $photo['height'] }}" @if($detail && $loop->first) fetchpriority="high" @else loading="lazy" @endif decoding="async">
                </figure>
            @endforeach
        </div>
        @if($badge)<span class="listing-badge">{{ $badge }}</span>@endif
        @if(count($photos) > 1)
            <div class="gallery-controls" data-gallery-controls hidden>
                <button class="gallery-arrow gallery-previous" type="button" data-gallery-prev aria-label="Photo précédente : {{ $title }}"><x-icon name="chevron-left" :size="20" /></button>
                <button class="gallery-arrow gallery-next" type="button" data-gallery-next aria-label="Photo suivante : {{ $title }}"><x-icon name="chevron-right" :size="20" /></button>
            </div>
            <div class="gallery-caption">
                <span class="gallery-counter" data-gallery-status role="status" aria-live="polite" aria-atomic="true">{{ count($photos) }} photos</span>
                <div class="gallery-dots" data-gallery-controls hidden>
                    @foreach($photos as $photo)<button type="button" data-gallery-select="{{ $loop->index }}" aria-label="Afficher la photo {{ $loop->iteration }} : {{ $title }}" aria-pressed="{{ $loop->first ? 'true' : 'false' }}"><span></span></button>@endforeach
                </div>
            </div>
        @endif
    </div>
    @if($detail && count($photos) > 1)
        <div class="gallery-thumbnails" data-gallery-controls hidden>
            @foreach($photos as $photo)
                <button type="button" data-gallery-select="{{ $loop->index }}" aria-label="Voir la photo {{ $loop->iteration }} : {{ $title }}" aria-pressed="{{ $loop->first ? 'true' : 'false' }}"><img src="{{ asset('images/'.$photo['image']) }}" alt="" width="{{ $photo['width'] }}" height="{{ $photo['height'] }}" loading="lazy" decoding="async"></button>
            @endforeach
        </div>
    @endif
</div>
