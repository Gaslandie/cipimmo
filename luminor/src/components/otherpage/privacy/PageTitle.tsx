import Image from "next/image";
import Link from "next/link";

export default function PageTitle() {
    return (
        <div className="page-title style-default">
            <div className="thumbs">
                <Image
                    src="/assets/images/page-title/page-title-14.jpg?v=cip-photos-1"
                    width={1920}
                    height={300}
                    alt=""
                    priority
                />
            </div>
            <div className="content text-center">
                <div className="tf-container">
                    <h1 className="h2 title text_white mb_12">Mentions légales et confidentialité</h1>
                    <ul className="breadcrumb justify-content-center text-button fw-4">
                        <li>
                            <Link href="/">Accueil</Link>
                        </li>
                        <li>CIP IMMO</li>
                        <li>Mentions légales et confidentialité</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
