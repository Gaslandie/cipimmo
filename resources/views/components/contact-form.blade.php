@props(['contact'])
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
