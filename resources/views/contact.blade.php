<x-layout :demo="$demo" :contact="$contact" title="Contact — CIP IMMO">
<section class="section site-container page-content">
    <div class="page-heading"><p class="eyebrow">PARLONS DE VOTRE PROJET</p><h1>Contactez CIP IMMO</h1><p>Une question sur un logement ou besoin d’aide pour votre recherche ? Échangeons sur les possibilités.</p></div>
    <div class="contact-grid">
        <div class="contact-form-panel">
            <h2>Parlez-nous de votre projet</h2>
            <p class="contact-form-intro">Remplissez ce formulaire. Votre message sera préparé dans WhatsApp, où vous pourrez le relire et l’envoyer à notre équipe.</p>
            <p class="contact-form-required">Les champs marqués d’un * sont obligatoires.</p>
            <form method="post" action="{{ route('contact') }}" data-contact-form data-whatsapp="{{ $contact['whatsapp'] ?? '' }}" aria-label="Votre demande de contact">
                <div class="contact-fields">
                    <div class="contact-field"><label for="contact-name">Votre nom *</label><input id="contact-name" name="name" autocomplete="name" required maxlength="100" placeholder="Prénom et nom"></div>
                    <div class="contact-field"><label for="contact-phone">Votre téléphone *</label><input id="contact-phone" name="phone" type="tel" autocomplete="tel" required minlength="8" maxlength="30" pattern="[+0-9\(\) .\-]{8,30}" placeholder="Ex. : +224 600 00 00 00"></div>
                    <div class="contact-field"><label for="contact-email">Votre e-mail <span>(facultatif)</span></label><input id="contact-email" name="email" type="email" autocomplete="email" maxlength="150" placeholder="vous@exemple.com"></div>
                    <div class="contact-field"><label for="contact-subject">Votre demande *</label><select id="contact-subject" name="subject" required><option value="">Choisissez un sujet</option><option>Rechercher un logement</option><option>Question sur un logement</option><option>Informations sur la location</option><option>Autre demande</option></select></div>
                    <div class="contact-field contact-field-wide"><label for="contact-message">Votre message *</label><textarea id="contact-message" name="message" rows="5" required minlength="10" maxlength="2000" placeholder="Précisez la ville, vos dates, votre budget ou le logement qui vous intéresse."></textarea></div>
                </div>
                <p class="contact-form-note">Ces informations servent à préparer votre demande. Aucun paiement ni document personnel n’est nécessaire.</p>
                <p data-contact-error class="contact-form-error" role="alert" hidden></p>
                <button class="button button-primary contact-submit" type="button" data-contact-submit disabled><x-icon name="chat" :size="20" />Continuer sur WhatsApp</button>
                <noscript><p class="contact-form-note">Activez JavaScript pour préparer votre message, ou utilisez les coordonnées ci-dessous.</p></noscript>
                @unless($contact['whatsapp'])<p class="contact-form-note">Le formulaire sera disponible dès que notre numéro WhatsApp sera renseigné.</p>@endunless
            </form>
        </div>
        <aside class="contact-panel contact-aside"><p class="eyebrow">À VOTRE ÉCOUTE</p><h2>Échangeons directement</h2><p class="contact-description">Vous préférez nous appeler ou commencer une discussion ? Notre équipe vous accompagne dans votre recherche.</p><x-contact-buttons :contact="$contact" />
            @unless($contact['whatsapp'] || $contact['phone'])<a class="button button-outline" href="{{ route('listings.index') }}">Consulter les logements</a>@endunless
            <div class="contact-help"><h3>Pour vous aider plus vite</h3><p>Indiquez la ville souhaitée, la durée de votre séjour et votre budget. Si un logement vous plaît, ajoutez son titre.</p></div>
        </aside>
    </div>
    <section class="location-card" aria-labelledby="location-heading" data-location-card>
        <div class="location-copy">
            <span class="location-icon"><x-icon name="pin" :size="26" /></span>
            <p class="eyebrow">NOS LOGEMENTS EN GUINÉE</p>
            <h2 id="location-heading">Repérez votre prochaine ville</h2>
            <p>Découvrez Conakry, Coyah et Kankan sur la carte, puis retrouvez les logements de la ville qui vous intéresse.</p>
            <nav class="location-cities" aria-label="Villes sur la carte">
                @foreach(['conakry' => 'Conakry', 'coyah' => 'Coyah', 'kankan' => 'Kankan'] as $slug => $city)
                    <a href="https://www.google.com/maps/search/?api=1&amp;query={{ rawurlencode($city.', Guinée') }}" target="_blank" rel="noopener noreferrer" data-map-city="{{ $slug }}" @if($loop->first) aria-current="true" @endif>{{ $city }}</a>
                @endforeach
            </nav>
            <p class="location-city" data-map-label aria-live="polite">Conakry, Guinée</p>
            <p class="location-note">La carte montre la ville. Notre équipe vous communiquera l’adresse exacte du logement.</p>
            <a class="button button-primary" data-map-listings href="{{ route('listings.index', ['city' => 'conakry']) }}">Voir les logements<x-icon name="arrow" :size="18" /></a>
            <a class="location-map-link" data-map-link href="https://www.google.com/maps/search/?api=1&amp;query=Conakry%2C%20Guin%C3%A9e" target="_blank" rel="noopener noreferrer">Ouvrir dans Google Maps<x-icon name="arrow" :size="16" /></a>
        </div>
        <div class="location-map">
            <iframe data-map-frame title="Carte de Conakry, Guinée — vue générale de la ville" src="https://maps.google.com/maps?q=Conakry%2C%20Guin%C3%A9e&amp;z=12&amp;output=embed" loading="lazy" referrerpolicy="no-referrer"></iframe>
        </div>
    </section>
    <div class="section-action"><a class="button button-outline" href="{{ route('renting') }}">Comprendre les étapes de location<x-icon name="arrow" :size="18" /></a></div>
</section>
</x-layout>
