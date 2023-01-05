import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import '../css/Blog.css'
import '../css/Footer.css'
import {CartContext} from '../global/CartContext'

export default class Blog extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
        user: null,
        }
    }
    static contextType = CartContext
    
    render() {
        const cart = this.context
        return <div className='blog'>
            <Nav itemsNum={cart.totalQty} userInfo={this.props.user}/>
            <div className='blog-banner'>
                <p>Vous retrouvez ici plusieurs articles de conseils et d'astuces pour profiter au mieux de votre équipement !</p>
                <p>Les publications arrivent bientôt et vous en serez informés via les réseaux sociaux, abonnez-vous vite !</p>
                <p>A bientôt la #soloopfamily !</p>
            </div>
            <article className='blog-article'>
                <h2 className='article-title'>Comment choisir vos patins?</h2>
                <p>A chaque rentrée, nombreux sont les patineurs à se demander si ils doivent ou non changer de patins.</p>
                <p>Alors nous allons commencer par vous expliquer ce qui doit compter dans votre choix ! [...]</p>
                <Link to="/Blog/Ccp"><button>Lire l'article</button></Link>
            </article>
            <article className='blog-article'>
                <h2 className='article-title'>Comment bien entretenir vos patins ?</h2>
                <p>Les patins s’entretiennent mais pas n’importe comment ! Voyons les étapes ensemble.</p>
                <p>Préparation :</p>
                <p>PRÉCAUTION : Ne portez pas de blanc et il est préférable de le faire à l’extérieur ou dans un endroit aéré pour des raisons d’odeurs et de salissures ! [...]</p>
                <Link to="/Blog/Cep"><button>Lire l'article</button></Link>
            </article>
            <article className='blog-article'>
                <h2 className='article-title'>SOLOOP est aussi sur Youtube !</h2>
                <p>Pour y retrouver des vidéos tutos ou des vidéos conseils pleines d'informations ! </p>
                <a href='https://www.youtube.com/channel/UCPXnFImxBHWE2a659au6opg'><button>Voir la chaîne</button></a>
            </article>
            <Footer/>
        </div>
    }
}