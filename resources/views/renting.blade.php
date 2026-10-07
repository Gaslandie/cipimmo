<x-layout :demo="$demo" :contact="$contact" title="Comment louer — CIP IMMO">
<section class="section site-container page-content">
    <div class="page-heading"><p class="eyebrow">SIMPLEMENT, AVEC VOUS</p><h1>Comment louer avec CIP IMMO</h1><p>Du choix du logement à la confirmation, notre équipe vous renseigne sur chaque étape.</p></div>
    <div class="steps-grid">
        <article class="step"><span class="step-number">01</span><span class="step-icon"><x-icon name="search" :size="30" /></span><h3>Trouvez votre logement</h3><p>Choisissez une ville et affinez votre recherche selon vos besoins et votre budget.</p></article>
        <article class="step"><span class="step-number">02</span><span class="step-icon"><x-icon name="home" :size="30" /></span><h3>Consultez les détails</h3><p>Découvrez les photos, les équipements et le prix du logement.</p></article>
        <article class="step"><span class="step-number">03</span><span class="step-icon"><x-icon name="chat" :size="30" /></span><h3>Échangez avec CIP IMMO</h3><p>Contactez-nous sur WhatsApp ou par téléphone pour confirmer la disponibilité et connaître les conditions de location.</p></article>
    </div><p class="rental-note"><x-icon name="check" :size="20" /><span>La location se confirme directement avec notre équipe. Aucun paiement ne se fait sur le site.</span></p>

    <div class="page-copy"><h2>Préparez votre demande</h2><p>Indiquez le logement qui vous plaît, vos dates ou votre durée de location, le nombre de personnes et votre budget. Ces informations permettent à notre équipe de vérifier les possibilités avec vous.</p><h2>Confirmez les conditions avant de vous engager</h2><p>Demandez le prix applicable à votre période, les charges éventuelles, la caution et les conditions de location. La disponibilité se vérifie auprès de CIP IMMO ; consulter une annonce ne constitue pas une réservation.</p></div>
    <div class="section-action"><a class="button button-primary" href="{{ route('listings.index') }}">Trouver un logement<x-icon name="arrow" :size="18" /></a><a class="button button-outline" href="{{ route('contact') }}">Contacter notre équipe</a></div>
</section>
<section id="questions" class="section site-container faq-section">
    <x-section-heading eyebrow="AVANT DE VOUS INSTALLER" title="Les réponses à vos questions" />
    <div class="faq-list">
        <details><summary>Peut-on louer pour un court séjour ou une longue durée ?</summary><p>Oui. CIP IMMO propose les deux. Les possibilités dépendent du logement : consultez sa fiche ou contactez-nous pour en savoir plus.</p></details>
        <details><summary>Les logements sont-ils tous meublés ?</summary><p>Non. Nous proposons des logements meublés et non meublés. Vous pouvez sélectionner votre préférence dans les filtres de recherche.</p></details>
        <details><summary>Comment savoir si un logement est disponible ?</summary><p>Contactez-nous depuis la fiche du logement, sur WhatsApp ou par téléphone. Notre équipe vous confirmera sa disponibilité pour la période souhaitée.</p></details>
        <details><summary>Peut-on réserver ou payer directement sur le site ?</summary><p>Non. Le site vous permet de consulter les logements et leurs prix. La disponibilité, les conditions et la confirmation de location se règlent directement avec CIP IMMO.</p></details>
        <details><summary>Comment connaître les charges et les conditions de location ?</summary><p>Consultez les informations de la fiche, puis échangez avec notre équipe pour connaître les charges éventuelles, la caution et les conditions applicables au logement.</p></details>
    </div>
</section>
</x-layout>
