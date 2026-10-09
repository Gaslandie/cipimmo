import Image from "next/image";

export default function MapFallback({ city = "Coyah" }: { city?: string }) {
    return <div className="map-container" style={{ position: "relative", minHeight: 320, height: "100%", overflow: "hidden", borderRadius: "inherit" }}>
        <Image src="/assets/images/home/cip-apartment-interior.jpg" alt="Un logement proposé par CIP IMMO en Guinée" fill sizes="(max-width: 768px) 100vw, 70vw" style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", display: "grid", alignContent: "center", justifyItems: "center", gap: 16, padding: 24, textAlign: "center" }}>
            <h4 className="text_white">Nos logements en Guinée</h4>
            <p className="text_white">Coléah · Coyah Km54 · Ansoumaniah</p>
            <a className="tf-btn btn-bg-white" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city + ", Guinée")}`} target="_blank" rel="noopener noreferrer">Découvrir le secteur sur la carte</a>
        </div>
    </div>;
}
