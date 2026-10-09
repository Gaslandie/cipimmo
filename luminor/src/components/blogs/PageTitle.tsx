import Image from "next/image";
import Link from "next/link";

export default function PageTitle() {
    return (
        <div className="page-title style-default">
            <div className="thumbs">
                <Image
                    src="/assets/images/page-title/page-title-1.jpg?v=cip-photos-1"
                    width={1920}
                    height={300}
                    alt=""
                />
            </div>
            <div className="content text-center">
                <div className="tf-container">
                    <h2 className="title text_white mb_12">Conseils et actualités</h2>
                    <ul className="breadcrumb justify-content-center text-button fw-4">
                        <li>
                            <Link href="/">Accueil</Link>
                        </li>
                        <li>Conseils</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
