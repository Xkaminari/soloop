import React,  { Component } from 'react'
import { Link} from 'react-router-dom';
import '../css/Nav.css'
import SoloopLogo from '../Media/Soloop-Logo.png'
import { auth, db } from '../config/config';

export default class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDisplayed: false,
            user: null,
            isUserAdmin: false,
        }
    }
    
    componentDidMount() {
        let user = this.props.userInfo;
        if (user !== null) {
            if (user.User_type === "admin") {
                this.setState({
                    isUserAdmin: true,
                });
            }
        }
    }
    
    showNav() {
        let nav = document.querySelector('.nav-elements');
        let xcross = document.querySelector('#xcross-bar');
        let burger = document.querySelector('#burger');
        if (!this.state.isDisplayed) {
            nav.classList.remove('leave-animation')
            nav.style.display = 'flex';
            setTimeout( ()=> {
                nav.style.visibility = 'visible';
                nav.classList.add('enter-animation')
            },100);
            xcross.style.display = "block";
            burger.style.display = "none";
            this.setState({
                isDisplayed: true,
            });
        }
        else {
            nav.classList.remove('enter-animation')
            nav.classList.add('leave-animation')
            setTimeout( ()=> {
                nav.style.visibility = 'hidden';
                nav.style.display = 'none';
            },100);
            this.setState({
                isDisplayed: false
            })
            xcross.style.display = "none";
            burger.style.display = "block";
        }
    }
    
    render() {
        let cartContains = this.props.itemsNum.totalQty;
        let userInfo = this.props.userInfo;
        let navContaint;
        // render nav content
        if (userInfo === null || userInfo === '') {
            navContaint = <>
            <Link to="/SignUp"><button className='sign-up'>SIGN UP</button></Link>
            <Link to="/Login"><button className='login'>LOG IN</button></Link>
            <Link to="/Cart" className='cart-group' href="#"><i className="fa-solid fa-cart-shopping"></i><div className='cart-cercle'>{cartContains}</div></Link>
            </>;
        }
        else {
            navContaint = <>
            <Link to="/Profil"><p className='user-name'>{userInfo.Name}</p></Link>
            <button className='Lougou-btn' on onClick={() => auth.signOut()}>Log out</button>
            <Link to="/Cart" className='cart-group' href="#"><i className="fa-solid fa-cart-shopping"></i><div className='cart-cercle'>{cartContains}</div></Link>
            </>;
        }
        return <>
            <nav className="navbar">
                <div className="logo">
                    <img className='logo-soloop' src={SoloopLogo} alt="Logo Soloop" />
                </div>
                <div className="nav-elements">
                    <div className='connexion-btn'>
                        {navContaint}
                    </div>
                    <ul className='nav-links'>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/Apropos">A propos</Link></li>
                        <li><Link to="/Blog">Blog</Link></li>
                        <li><Link to="/Boutique">Boutique</Link></li>
                        {this.state.isUserAdmin && <li><Link to="/Dashboard">Dashboard</Link></li>}
                    </ul>
                </div>
                <button onClick={this.showNav.bind(this)} className='mobile-menu-icon'><i className='fas fa-bars' id='burger'></i><i className="fa-solid fa-xmark" id='xcross-bar'></i></button>
            </nav>
        </>
    }
}