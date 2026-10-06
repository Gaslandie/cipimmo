@props(['contact', 'listingTitle' => null])
@if($contact['phone'] || $contact['whatsapp'])
<div class="contact-icons" aria-label="Contacter CIP IMMO">
    @if($contact['phone'])<a class="contact-icon contact-phone" href="{{ $contact['phone'] }}" aria-label="Appeler CIP IMMO" title="Appeler CIP IMMO"><x-icon name="phone" :size="26" /></a>@endif
    @if($contact['whatsapp'])<a class="contact-icon contact-whatsapp" href="{{ $contact['whatsapp'] }}{{ $listingTitle ? '?text='.rawurlencode('Bonjour CIP IMMO, je souhaite des informations sur le logement : '.$listingTitle.'.') : '' }}" aria-label="Écrire à CIP IMMO sur WhatsApp" title="Écrire sur WhatsApp"><x-icon name="whatsapp" :size="28" /></a>@endif
</div>
@endif
