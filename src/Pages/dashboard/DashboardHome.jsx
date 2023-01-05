import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../../css/Dashboard.css"

export default function ProductManagment(props) {
    
    useEffect(() => {
        if (props.user !== null) {
            if (props.user.User_type !== "admin") {
                return <p>Erreur 404</p>
            }
        }
    })
    
    return (
        <div className='dashboard'>
            <Link to='/'><button className='leav-dashboard-btn'><i className="fa-solid fa-arrow-left"></i></button></Link>
            <div className='dashboard-sections-container'>
                <Link to='/Dashboard/AllProduct' className='dashboard-options'>Gérer les produits</Link>
                <Link to='' className='dashboard-options'>Commandes</Link>
            </div>
        </div>
    )
}
