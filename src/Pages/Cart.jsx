import React, { useContext } from 'react';
import { CartContext } from '../global/CartContext';
import { Link } from 'react-router-dom'
// import { auth } from '../config/config'
import '../css/Cart.css'
import Footer from '../components/Footer';
import Nav from '../components/Nav';

export default function Cart(props) {
    
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    
    return (
        <>
            <div className='Cart'>
                <Nav itemsNum={{totalQty}} userInfo={props.user}/>
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && 
                        <div className='cart-no-item-case'>
                            <div className='No-item-msg'>Aucun article dans votre panier, allez en ajouter dans notre boutique !</div>
                            <Link className='back-shop-btn' to="/Boutique">Boutique</Link>
                        </div>
                    }
                    {
                        shoppingCart.length > 0 && 
                        <div className='recap-card'>
                        {shoppingCart.length > 0 && <h2 className='recape-title'>Recape</h2>}
                        {
                            shoppingCart && shoppingCart.map(cart => (
                            <div className='cart-card' key={cart.ProductID}>
                                <img  className='cart-img' src={cart.ProductImg} alt="img product in cart" />
                                <div className='name-price'>
                                    <div className='cart-item-details cart-name'>{cart.ProductName}</div>
                                    <div className='cart-item-details cart-price-orignal'>{cart.ProductPrice}$</div>
                                </div>
                                <div className='cart-item-details modif-quantity inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}><i className="fa-solid fa-plus"></i></div>
                                <div className='cart-item-details quantity'>{cart.qty}</div>
                                <div className='cart-item-details modif-quantity dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}><i className="fa-solid fa-minus"></i></div>
                                <button className='cart-delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        ))
                        }
                    </div>
                    }
                    {
                        shoppingCart.length > 0 && 
                        <div className='cart-summary'>
                            <h3 className='cart-summary-heading'>Sumarry</h3>
                            <div className='cart-summary-price'>
                                <span>ITEMS</span>
                                <span>{totalQty}</span>
                            </div>
                            <div className='cart-summary-price'>
                                <span>TOTAL PRICE</span>
                                <span>{totalPrice}€</span>
                            </div>
                            <Link to='cashout' className='cashout-link'><button className='Valid-purchase'>Valid purchase</button></Link>
                        </div>
                    }
                </div>
                <Footer/>
            </div>
        </>
    )
}