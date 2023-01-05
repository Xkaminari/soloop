import React from 'react'
import { Link } from 'react-router-dom'
import { ProductsManager } from './ProductsManager'

export default function AllProduct() {
    return (
        <div className='AllProduct'>
            <Link to='/Dashboard'><button className='leav-dashboard-btn'><i className="fa-solid fa-arrow-left"></i></button></Link>
            <Link to='/Dashboard/AllProduct/CreateProductForm'><button className='add-product-btn'>Ajouter un produit</button></Link>
            <ProductsManager/>
        </div>
    )
}
