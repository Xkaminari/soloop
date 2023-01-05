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
    const [userID, setUserID] = useState(null);
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
            setUserID(currentUser.uid);
        })
    });
    
    // Edit form values
    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [email, setEmail] = useState('');
    const [num, setNum] = useState('');
    // const [error, setError] = useState('');
    
    function validateUserInput() {
        function EmptyFildCorrecter(fildState, fildName) {
            function updateState(stateName, value) {
                const setFunction = `set${stateName}`;
                eval(setFunction + '(' + value + ')');
            };
            if (!fildState.length || fildState === ' ') {
                const setfildInfo = `user.${fildName}`;
                updateState(fildName, setfildInfo)
            }
        }
        
        const update = new Promise((resolve) => {
            EmptyFildCorrecter(name, 'Name');
            EmptyFildCorrecter(adress, 'Adress');
            EmptyFildCorrecter(email, 'Email');
            EmptyFildCorrecter(num, 'Num');
            if (name != '' && adress != '' && email != '' && num != '') {
                console.log("c'est bon");
                resolve();
            }
        })
        
        const updateUser = async () => {
                const userRef = await db.collection('SignedUpUsersData').doc(userID)
                userRef.update({
                    Name: name,
                    Email: email,
                    Adress: adress,
                    Num: num,
                });
                console.log("updated");
            }
            update.then(() => {updateUser()});
        }
    
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
                    <input type="text" id='Name' placeholder={user.Name} onChange={(e) => setName(e.target.value)} value={name}/>
                </div>
                <div className='userProfil-form-section'>
                    <label htmlFor="Name">Votre addresse</label>
                    <input type="text" id='Name' placeholder={user.Adress} onChange={(e) => setAdress(e.target.value)} value={adress}/>
                </div>
                <div className='userProfil-form-section'>
                    <label htmlFor="Name">Email</label>
                    <input type="text" id='Name' placeholder={user.Email} onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className='userProfil-form-section'>
                    <label htmlFor="Name">Numéros de téléphone</label>
                    <input type="tel" id='Name' placeholder={user.Num} onChange={(e) => setNum(e.target.value)} value={num}/>
                </div>
                <button type="button" onClick={(e) => {validateUserInput();}} className='Edit-profil-btn'>Valider</button>
            </form>
            {/* {error && <span>{error}</span>} */}
        </div>
        <Footer/>
    </div>
    )
}
