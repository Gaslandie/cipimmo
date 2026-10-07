<x-layout :demo="$demo" :contact="$contact" title="À propos — CIP IMMO">
<section class="section site-container page-content">
    <div class="page-heading"><p class="eyebrow">FAISONS CONNAISSANCE</p><h1>CIP IMMO, à vos côtés pour trouver votre logement</h1><p>Un accompagnement pour votre court séjour ou votre installation en Guinée.</p></div>
    <div class="about-section">
        <div class="about-photo"><img src="{{ asset('images/apartment-interior.jpg') }}" alt="Photo d’ambiance illustrative d’un intérieur accueillant" width="977" height="733" decoding="async"></div>
        <div class="about-copy">
            <h2>Un logement qui correspond à votre besoin</h2>
            <p class="reading-copy">Vous cherchez un logement pour un court séjour ou pour vous installer ? CIP IMMO vous propose des logements meublés et non meublés et vous accompagne dans votre recherche.</p>
            <p class="reading-copy">Parlez-nous de la ville souhaitée, de votre budget et de la durée de location. Nous vous renseignons sur les offres qui correspondent à votre demande.</p>
        </div>
    </div>
    <div class="page-copy"><h2>Des informations pour faire votre choix</h2><p>Consultez les photos, la surface, le nombre de chambres et le prix par nuit ou par mois. La fiche de chaque logement vous permet ensuite de contacter notre équipe pour vérifier sa disponibilité et ses conditions de location.</p><h2>Un échange direct avec notre équipe</h2><p>La location se confirme directement avec CIP IMMO. Aucun paiement ne se fait sur le site. Notre équipe vous renseigne sur les démarches avant votre séjour ou votre installation.</p></div>
    <div class="section-action"><a class="button button-primary" href="{{ route('listings.index') }}">Découvrir nos logements<x-icon name="arrow" :size="18" /></a><a class="button button-outline" href="{{ route('contact') }}">Parlons de votre recherche</a></div>
</section>
</x-layout>
