import Image from "next/image";
import Link from "next/link";

export default function PageTitle() {
    return (
        <div className="page-title style-default">
            <div className="thumbs">
                <Image
                    src="/assets/images/page-title/page-title-13.jpg?v=cip-photos-1"
                    width={1920}
                    height={300}
                    alt=""
                    priority
                />
            </div>
            <div className="content text-center">
                <div className="tf-container">
                    <h1 className="title h2 text_white mb_12">À propos de CIP IMMO</h1>
                    <ul className="breadcrumb justify-content-center text-button fw-4">
                        <li>
                            <Link href="/">Accueil</Link>
                        </li>
                        <li>CIP IMMO</li>
                        <li>À propos</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
