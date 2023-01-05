import React, { Component } from 'react'

export default class DiscountBanner extends Component {
    render() {
        return <div className='discount-banner-conatiner'>
            <h2 className='discount-banner-title'>-20% + livraison offert</h2>
            <p className='discount-banner-description'>pour les commandes depassant 300€</p>
        </div>
    }
}
