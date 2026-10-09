import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Comment() {
    return (
        <div className="reply-comment mb_40 ">
            <div className="title d-flex align-items-center justify-content-between mb_20">
                <h5>Vos avis</h5>
                <Link
                    href="#leaveComment"
                    className="tf-btn btn-bg-1 btn-px-28"
                >
                    <span>Partager votre avis</span>
                    <span className="bg-effect"></span>
                </Link>
            </div>
            <div className="reply-comment-wrap">
                <div className="reply-comment-item">
                    <div className="avatar">
                        <Image
                            src="/assets/images/avatar/avatar-1.jpg?v=cip-photos-1"
                            width={60}
                            height={60}
                            alt="CIP IMMO"
                        />
                    </div>
                    <div className="content">
                        <div className="info mb_12">
                            <h6 className="name text_primary-color mb_4">
                                <Link href="#" className="link">
                                    Aïssatou D.
                                </Link>
                            </h6>
                            <p className="text-body-default">18 septembre 2026</p>
                        </div>
                        <ul className="ratings d-flex mb_10">
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                        </ul>
                        <p className="comment text-body-2">
                            Nous cherchions un appartement avec assez de place pour notre famille. Les informations sur les chambres et la surface nous ont aidés à faire notre choix, puis CIP IMMO nous a accompagnés pour la suite.
                        </p>
                    </div>
                </div>
                <div className="reply-comment-item">
                    <div className="avatar">
                        <Image
                            src="/assets/images/avatar/avatar-2.jpg?v=cip-photos-1"
                            width={60}
                            height={60}
                            alt="CIP IMMO"
                        />
                    </div>
                    <div className="content">
                        <div className="info mb_12">
                            <h6 className="name text_primary-color mb_4">
                                <Link href="#" className="link">
                                    Mamadou C.
                                </Link>
                            </h6>
                            <p className="text-body-default">
                                10 septembre 2026
                            </p>
                        </div>
                        <ul className="ratings d-flex mb_10">
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                        </ul>
                        <p className="comment text-body-2">
                            L’équipe a pris le temps de comprendre notre budget et le quartier souhaité. Nous avons apprécié les échanges directs et les explications sur les conditions de location.
                        </p>
                    </div>
                </div>
                <div className="reply-comment-item">
                    <div className="avatar">
                        <Image
                            src="/assets/images/avatar/avatar-3.jpg?v=cip-photos-1"
                            width={60}
                            height={60}
                            alt="CIP IMMO"
                        />
                    </div>
                    <div className="content">
                        <div className="info mb_12">
                            <h6 className="name text_primary-color mb_4">
                                <Link href="#" className="link">
                                    Fatoumata B.
                                </Link>
                            </h6>
                            <p className="text-body-default">5 septembre 2026</p>
                        </div>
                        <ul className="ratings d-flex mb_10">
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                            <li>
                                <i className="icon-favorite_major"></i>
                            </li>
                        </ul>
                        <p className="comment text-body-2">
                            J’ai pu préparer mon séjour en consultant les photos et les détails du logement. Mes questions ont trouvé une réponse auprès de l’équipe avant mon arrivée.
                        </p>
                    </div>
                </div>
            </div>
            <a
                href="#"
                className="all-review hover-underline-link text_primary-color text-button"
            >
                Tous les avis
            </a>
        </div>
    );
}
