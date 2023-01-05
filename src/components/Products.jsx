import React, { useContext } from 'react'
import { ProductsContext } from '../global/ProductsContext'
import { CartContext } from '../global/CartContext'
import { Link } from 'react-router-dom';

export const Products = () => {
    
    const { products } = useContext(ProductsContext);
    const { dispatch } = useContext(CartContext);
    
    return <>
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product' key={product.ProductID}>
                        <Link to={`/product/${product.ProductID}`} className='onclick-div-product'>
                            <img className='prouduct-img' src={product.ProductImg} alt="not found" />
                            <div className='product-details'>
                                <p className='prouduct-name'>{product.ProductName}</p>
                                <p className='prouduct-price'>{product.ProductPrice}$</p>
                            </div>
                        </Link>
                        <button className='prouduct-add' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}><i className="fa-solid fa-plus"></i></button>
                    </div>
                ))}
            </div>
    </>
}