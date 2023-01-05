import React, { Component } from 'react'
import { auth } from '../config/config';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import {CartContext} from '../global/CartContext'
import '../css/Login.css'

export default class Login extends Component {
    
    static contextType = CartContext
    
    constructor(props){
        super(props);
        this.state = {
            mail:'',
            password:'',
            error:'',
            redirectionPath:'',
        }
        document.title = "ContactMe"
    }
    
    login(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(this.state.mail, this.state.password).then(() => {
            this.setState({
                mail:'',
                password:'',
                redirectionPath:'/Boutique',
            });
        }).catch(err => this.setState({error: err.message}));
    }
    
    handleChage(e) {
        let nameInput = e.target.id
        this.setState({
            [nameInput] : e.target.value
        })
    }
    
    render() {
        const cart = this.context
        return  <div className='login-container'>
        <Nav itemsNum={cart.totalQty} userInfo={this.props.user}/>
        <form className='login-form' autoComplete='off' onSubmit={this.login.bind(this)}>
            <h2 className='Login-title'>Login</h2>
            <div className="login-fild">
                <input value={this.state.mail} onChange={this.handleChage.bind(this)} type="email" id="mail" placeholder="exemple@gmail.com"/>
                <p className='errorMail error'></p>
            </div>
            <div className="login-fild">
                <input value={this.state.password} onChange={this.handleChage.bind(this)}  type="password" id="password" placeholder="exemple: Uj4D/8hjz$"/>
                <p className='errorPassword error'></p>
            </div>
            <button className="connect-btn" type="submit">Login</button>
            <Link className="redirecting-Login-btn" to="/Boutique">don't have an account ?  create one !</Link>
            <p>{this.state.error && <span className='connection-error'>Email or password incorect</span>}</p>
        </form>
        <Footer/>
        {this.state.redirectionPath && <Navigate to={this.state.redirectionPath}/>}
    </div>
    }
}