import React, { Component } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "../css/Apropos.css";
import "../css/Footer.css";
import { CartContext } from "../global/CartContext";
import ludivineAbout1 from "../Media/Apropos.media/LUDIVIN ABOUT 1.png";
import ludivineAbout2 from "../Media/Apropos.media/LUDIVIN ABOUT 2.png";
import ludivineAbout3 from "../Media/Apropos.media/LUDIVIN ABOUT 3.png";

export default class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        user: null,
        };
    }
    static contextType = CartContext;

    render() {
        const cart = this.context;
        return (
        <div className="Apropos">
            <Nav itemsNum={cart.totalQty} userInfo={this.props.user} />
            <div className="Apropos-main-content">
                <div className="apropos-card">
                    <h3 className="apropos-title-card">Une nouvelle aventure commence !</h3>
                    <div className="apropos-content-card">
                        <p>
                            Derrière Soloop se cache une passionnée, multiple championne de
                            France, en Equipe de France et toujours patineuse !
                        </p>
                        <br />
                        <p>
                            Je suis Ludivine Malle, une jeune femme qui à l’âge de 3 ans était déjà
                            sur ses patins.
                        </p>
                        <br />
                        <p>
                            Imposées, danse, couple artistique et solo
                            artistique, au niveau international pour toutes ces disciplines,
                            je me suis mise à rêver au-delà de ma discipline !
                        </p>
                        <br />
                        <p>Aujourd’huic’est une nouvelle aventure qui commence !</p>
                        <br />
                        <p><b>Mon objectif : vous offrir le meilleur !</b></p>
                        <br />
                        <p>
                            Vous trouverez sur Soloop, les meilleures
                            marques, que les grands champions portent et recommandent ainsi
                            que de nombreux conseils pour vous aiguiller dans vos choix.
                            </p>
                        <br />
                        <p>  
                            <b>
                                Patineuse, entraîneur et bénévole, je vous accompagnerai dans
                                votre sélection.
                            </b>
                        </p>
                        <img className="apropos-img" src={ludivineAbout1} alt="ludivine malle skate parck" />
                    </div>
                </div>
                <div className="apropos-card">
                    <h3 className="apropos-title-card">L'histoire de Soloop</h3>
                    <div className="apropos-content-card">
                        <p>
                            Tout a commencé pendant le grand confinement 2020. A la fin de
                            mes études, confinée avec mes rollers et <b>un rêve en tête :
                            partager ma passion et mes connaissances</b> !
                        </p>
                        <br />
                        <p>
                            Soloop s’est créée à
                            Rennes dans mon petit appartement d’étudiante. Pendant des
                            semaines et des nuits, l’idée a mûri et aujourd'hui je suis
                            fière de vous présenter cette <b>jeune entreprise bretonne, moderne
                            et dynamique</b> !
                        </p>
                        <br />
                        <p>
                            La <b>“loop”</b> boucle en anglais est l’unique élément
                            qui se pratique dans toutes les disciplines, saut et pas. La
                            boucle représente aussi le courage face à l’échec, l’amitié ! De
                            grandes valeurs que je souhaite vous faire partager à travers
                            mon expérience.
                        </p>
                        <br />
                        <p><b>Êtes-vous prêts à vivre cette belle histoireensemble ?</b></p>
                        <br />
                        <img className="apropos-img" src={ludivineAbout2} alt="ludivine malle in forest" />
                    </div>
                </div>
                <div className="apropos-card">
                    <h3 className="apropos-title-card">#Soloopfamily : Ecrivons l'histoire ensemble !</h3>
                    <div className="apropos-content-card">
                        <p>
                            Soloop c’est aussi la grande famille du patin : <b>#soloopfamily</b> !
                            Mon entourage et mes rencontres ont toujours été présents pour
                            me conseiller et partager ma passion qui m’animait.
                        </p>
                        <br />
                        <p>
                            <b>Aujourd’hui,je veux être là pour vous, les passionnés d’aujourd’hui, les
                            étoiles de demain .</b> Pour cela, je viens à votre rencontre !
                        </p>
                        <br />
                        <p>
                            Suivez @soloop_boutique sur Instagram et Facebook et partageons
                            cette histoire ensemble sur les réseaux sociaux via le#soloopfamily.
                        </p>
                        <br />
                        <p><b>Et n’hésitez pas à me contacter !</b></p>
                        <img className="apropos-img" src={ludivineAbout3} alt="ludivine malle practicing roller" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        );
    }
}
