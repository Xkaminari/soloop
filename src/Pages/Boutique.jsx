import React, { useContext } from 'react'
import DiscountBanner from '../components/DiscountBanner'
import Footer from '../components/Footer'
import { Products } from '../components/Products'
import '../css/Boutique.css'
import '../css/Footer.css'
import '../css/DiscountBanner.css'
import Nav from '../components/Nav'
import {CartContext} from '../global/CartContext'

export default function Boutique(props) {
    const { totalQty } = useContext(CartContext);
    return (
        <div className='boutique'>
            <Nav itemsNum={{totalQty}} userInfo={props.user}/>
            <DiscountBanner/>
            <Products/>
            <Footer/>
        </div>
    )
}