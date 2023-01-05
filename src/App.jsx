import React, { useState, useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router'
import { CartContextProvider } from './global/CartContext'
import { ProductsContextProvider } from './global/ProductsContext'
import { auth, db } from './config/config';
import Ccp from './Pages/Articles/Ccp'
import Cep from './Pages/Articles/Cep'
import Blog from './Pages/Blog'
import Apropos from './Pages//Apropos'
import Boutique from './Pages/Boutique'
import ProductPage from './Pages/ProductPage'
import Cart from './Pages/Cart'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import UserProfil from './Pages/UserProfil/UserProfil';
import UserProfilForm from './Pages/UserProfil/UserProfilForm';
import DashboardHome from './Pages/dashboard/DashboardHome';
import AllProduct from './Pages/dashboard/AllProduct';
import CreateProductForm from './Pages/dashboard/CreateProductForm';

const App = () => {
    const [user, setUser] = useState(null)
    const { productId } = useParams();
    const [product, setProduct] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
            setUser(snapshot.data())
            })
        } else {
            setUser(null)
        }
        })
    }, [])

    useEffect(() => {
        db.collection('Products').doc(productId).get().then(snapshot => {
            setProduct(snapshot.data())
        })
    }, [productId])

    return (
        <>
            <ProductsContextProvider>
                <CartContextProvider>
                    <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path="/Profil" element={<UserProfil user={user} />} />
                    <Route path="/ProfilForm" element={<UserProfilForm user={user} />} />
                    <Route path="/Boutique" element={<Boutique user={user} />} />
                    <Route
                        path="/product/:productId"
                        element={<ProductPage product={product} user={user}/>}
                    />
                    <Route path="/Cart" element={<Cart user={user} />} />
                    <Route path="/SignUp" element={<SignUp user={user} />} />
                    <Route path="/Login" element={<Login user={user} />} />
                    <Route path="/Apropos" element={<Apropos user={user} />} />
                    <Route path="/Blog" element={<Blog user={user} />} />
                    <Route path="/Blog/Ccp" element={<Ccp user={user} />} />
                    <Route path="/Blog/Cep" element={<Cep user={user} />} />
                    {/* admin dashboard */}
                    <Route path="/Dashboard" element={<DashboardHome user={user} />} />
                    <Route path="/Dashboard/AllProduct" element={<AllProduct user={user} />} />
                    <Route path="/Dashboard/AllProduct/CreateProductForm" element={<CreateProductForm user={user} />} />
                    </Routes>
                </CartContextProvider>
            </ProductsContextProvider>
        </>
    )
}
export default App