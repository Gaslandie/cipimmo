@props(['contact'])
@if($contact['whatsapp'] || $contact['phone'])
<div class="contact-buttons">
    @if($contact['whatsapp'])
        <a class="button button-primary" href="{{ $contact['whatsapp'] }}"><x-icon name="chat" />Écrire sur WhatsApp</a>
    @endif
    @if($contact['phone'])
        <a class="button button-outline" href="{{ $contact['phone'] }}"><x-icon name="phone" />Appeler CIP IMMO</a>
    @endif
</div>
@endif
