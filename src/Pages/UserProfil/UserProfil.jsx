import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import "../../css/UserProfil.css"
import {CartContext} from '../../global/CartContext'
import { auth, db} from '../../config/config';

export default function UserProfil(props) {
    const { totalQty } = useContext(CartContext);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const getUser = new Promise((resolve) => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                resolve(currentUser);
            }
        })
        getUser.then((currentUser) => {
            db.collection('SignedUpUsersData').doc(currentUser.uid).get().then(snapshot => {
                setUser(snapshot.data());
                setIsLoading(false);
            });
        })
    });
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
    <div className='userProfil'>
        <Nav itemsNum={{totalQty}} userInfo={props.user}/>
        <div className='userProfil-content'>
            <h2>{user.Name}</h2>
            <form>
                <div className='userProfil-form-section'>
                    <label htmlFor="Name">Nom complet</label>
                    <input type="text" id='Name' value={user.Name} readOnly/>
                </div>
                <div className='userProfil-form-section'>
                    <label htmlFor="Name">Votre addresse</label>
                    <input type="text" id='Name' value={user.Adress} readOnly/>
                </div>
                <div className='userProfil-form-section'>
                    <label htmlFor="Name">Email</label>
                    <input type="text" id='Name' value={user.Email} readOnly/>
                </div>
                <div className='userProfil-form-section'>
                    <label htmlFor="Name">Numéros de téléphone</label>
                    <input type="tel" id='Name' value={user.Num} readOnly/>
                </div>
                <Link to='/ProfilForm'><button type="button" className='Edit-profil-btn'>Editer le profil</button></Link>
            </form>
        </div>
        <Footer/>
    </div>
    )
}
