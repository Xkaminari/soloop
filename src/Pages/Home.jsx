import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {CartContext} from '../global/CartContext'
import Nav from '../components/Nav'
import MobileBg from '../Media/MobileBgHome.png'
import HomeSlogant from '../Media/HomeSlogan.png'
import '../css/Home.css'


export default function Home(props) {
    
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    return (
        <>
            <div className='Home-bg-container'><img className='Home-bg' src={MobileBg} alt="baground soloop" /></div>
            <div className='Home'>
                <Nav itemsNum={{totalQty}} userInfo={props.user}/>
                <footer className='Home-footer'>
                    <Link className='home-btn-Boutique' to="/Boutique"><button>Boutique</button></Link>
                    <img className='home-slogant' src={HomeSlogant} alt="Les meilleur rollers pour faire parler votre art" />
                </footer>
            </div>
        </>
    )
}