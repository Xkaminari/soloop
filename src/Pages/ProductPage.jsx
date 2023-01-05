import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DiscountBanner from '../components/DiscountBanner';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { db } from '../config/config';
import { CartContext } from '../global/CartContext'
import '../css/ProductPage.css'

export default function ProductPage(props) {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { totalQty } = useContext(CartContext);
    const { dispatch } = useContext(CartContext);
    
    useEffect(() => {
        const getProduct = async () => {
        try {
            const snapshot = await db.collection('Products').doc(productId).get();
            setProduct(snapshot.data());
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
        }
        getProduct();
    }, [productId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='product-page'>
            <Nav itemsNum={{totalQty}} userInfo={props.user}/>
            <DiscountBanner/>
            <div className='all-product-details'>
                <div className='first-row-product-details'>
                    <img className='specific-img-product' src={product.ProductImg} alt="not found" />
                    <div>
                        <p className='specific-name-product'>{product.ProductName}</p>
                        <p className='specific-price-product'>{product.ProductPrice}$</p>
                    </div>
                </div>
                <div className='second-row-product-details'>
                    <button className='buy-now-btn'>Buy now</button>
                    <button className='add-to-cart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>Ajouter</button>
                </div>
                <div className='third-row-product-details'>
                    <h4 className='specific-description-title'>Description</h4>
                    <hr/>
                    <p className='specific-description-product'>{product.ProductDescription}</p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}