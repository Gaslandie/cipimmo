@props(['contact', 'phoneFirst' => false, 'prominentPhone' => false])
@if($contact['whatsapp'] || $contact['phone'])
<div class="contact-buttons">
    @foreach($phoneFirst ? ['phone', 'whatsapp'] : ['whatsapp', 'phone'] as $channel)
        @if($contact[$channel])
            @if($channel === 'phone')
                <a class="button {{ $prominentPhone ? 'button-gold' : 'button-outline' }}" href="{{ $contact['phone'] }}"><x-icon name="phone" />Appeler CIP IMMO</a>
            @else
                <a class="button button-primary" href="{{ $contact['whatsapp'] }}"><x-icon name="chat" />Écrire sur WhatsApp</a>
            @endif
        @endif
    @endforeach
</div>
@endif
