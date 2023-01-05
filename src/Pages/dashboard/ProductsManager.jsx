import React, { useContext, useRef, useState } from 'react'
// import { Link } from 'react-router-dom';
import { ProductsContext } from '../../global/ProductsContext'
import { Link } from 'react-router-dom';

export const ProductsManager = () => {
    
    const { products } = useContext(ProductsContext);
    const [isOptionsDisplayed, setIsOptionsDisplayed] = useState(false);
    const TheProductAndOptions = useRef(null);
    
    function openSlidOptions() {
        setIsOptionsDisplayed(prevTheProductAndOptions => !prevTheProductAndOptions);
    }
    
    return <>
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-and-options' ref={TheProductAndOptions}>
                        <div className='product dashboard-product' key={product.ProductID}>
                            <Link to={`/product/${product.ProductID}`} className='onclick-div-product'>
                                <img className='prouduct-img' src={product.ProductImg} alt="not found" />
                                <div className='product-details'>
                                    <p className='prouduct-name'>{product.ProductName}</p>
                                    <p className='prouduct-price'>{product.ProductPrice}$</p>
                                </div>
                            </Link>
                            <button className='prouduct-add'onClick={openSlidOptions}><i className="fa-solid fa-plus"></i></button>
                        </div>
                        <div className={isOptionsDisplayed ? 'more-option-slide more-option-slide-animation' : 'more-option-slide'}>
                            <button className='more-option-btn dashboard-delete-btn'>Supprimer</button>
                            <button className='more-option-btn dashboard-edit-btn'>Editer</button>
                        </div>
                    </div>
                ))}
            </div>
    </>
}