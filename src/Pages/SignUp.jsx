import React, { Component } from 'react';
import { auth, db } from '../config/config';
import '../css/SignUp.css';
import { Link, Navigate} from "react-router-dom";
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import {CartContext} from '../global/CartContext'

// const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

export default class SignUp extends Component {
    
    static contextType = CartContext
    
    errorName = React.createRef();
    errorMail = React.createRef();
    errorPassword = React.createRef();
    errorConfirmPassword = React.createRef();
    errorForm = React.createRef();
    
    constructor(props){
        super(props);
        this.state = {
            name:'',
            mail:'',
            password:'',
            confirmedPassword:'',
            error:'',
            redirectionPath:'',
        }
        document.title = "ContactMe"
    }
    
    Signup(e) {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(this.state.mail, this.state.password).then((cred) => {
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                Name: this.state.name,
                Email: this.state.mail,
                User_type: 'user',
                Password: this.state.password
            }).then(() => {
                this.setState({
                    name:'',
                    mail:'',
                    password:'',
                    confirmedPassword:'',
                    redirectionPath:'/Boutique',
                });
                this.props.navigate.push("/Boutique")
            }).catch(err => this.setState({error: err.message}));
        }).catch(err => this.setState({error: err.message}));
    }
    
    // ----------------------------------------forme imputs Values----------------------------------------
    
    errorMsg(theMsg, pRef) {
        pRef.current.style.color = "red";
        pRef.current.innerHTML = theMsg;
        setTimeout(() => {
            pRef.current.innerHTML = "";
        }, 10000)
    }
    
    goodAnswer(pRef) {
        pRef.current.style.color = "#FFFFFF";
        pRef.current.innerHTML = "";
    }
    
    checkNameValidity() {
        if (this.state.name.length < 2) {
            this.errorMsg("Too short !", this.errorName);
            return false;
        }
        else if (this.state.name.match(/\d/)) {
            this.errorMsg("A name can not contain digits !", this.errorName);
            return false;
        }
        else {
            this.goodAnswer(this.errorName);
            return true
        }
    }
    
    checkEmailValidity() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.mail)) {
            this.goodAnswer(this.errorMail);
            return true
        }
        else {
            this.errorMsg("Entre a valid email adresse !", this.errorMail);
            return false;
        }
    }
    
    checkPasswordValidity() {
        if (this.state.password.length < 2) {
            this.errorMsg("A password must contain <br/> at least 8 characters !", this.errorPassword);
            return false;
        }
        else if (this.state.password.match(/\d/) === null) {
            this.errorMsg("The passeword should contain <br/> at least a nuber !", this.errorPassword);
            return false;
        }
        else if (this.state.password.match(/\W|_/g) === null) {
            this.errorMsg("The passeword should contain <br/> at least special character !", this.errorPassword);
            return false;
        }
        else {
            this.goodAnswer(this.errorPassword);
            return true
        }
    }
    
    checkConfirmPassword(confirmPasswordInput, passwordInput) {
        if (confirmPasswordInput.value === passwordInput) {
            this.goodAnswer(this.errorConfirmPassword);
            return true
        }
        else {
            this.errorMsg("Passwords are not the same!", this.errorConfirmPassword);
            return false;
        }
    }

    checkFormValidity() {
        if (this.checkNameValidity()
            && this.checkEmailValidity()
            && this.checkPasswordValidity()
            && this.checkConfirmPassword(this.state.confirmedPassword ,this.state.password)) {
                this.goodAnswer(this.errorConfirmPassword);
            }
        else {
            this.errorMsg("a field was not properly filled in !", this.errorForm);
        }
    }
    
    handleChage(e) {
        let nameInput = e.target.id
        this.setState({
            [nameInput] : e.target.value
        })
        if (e.target.type === "text") {
            this.checkNameValidity(e.target);
        }
        else if (e.target.type === "email"){
            this.checkEmailValidity(e.target);
        }
        else if (e.target.id === "password"){
            this.checkPasswordValidity(e.target);
        }
        else if (e.target.id === "confirmedPassword"){
            this.checkConfirmPassword(e.target, this.state.password);
        }
    }
    
    // --------------------------------------------------------------------------------------------------
    
    render() {
        const cart = this.context
        return <main className='SignUp-container'>
            <Nav  itemsNum={cart.totalQty} userInfo={this.props.user}/>
            <form className='SignUp-form' autoComplete="off" onSubmit={this.Signup.bind(this)}>
                <h2 className='SignUp-Title'>SignUp</h2>
                <div className="SignUp-fild">
                    <input value={this.state.name} onChange={this.handleChage.bind(this)} type="text" id="name" placeholder='Nom complet'/>
                    <p ref={this.errorName} className='error errorName'></p>
                </div>
                <div className="SignUp-fild">
                    <input value={this.state.mail} onChange={this.handleChage.bind(this)} type="email" id="mail" placeholder="exemple@gmail.com"/>
                    <p ref={this.errorMail} className='error errorMail'></p>
                </div>
                <div className="SignUp-fild">
                    <input value={this.state.password} onChange={this.handleChage.bind(this)}  type="password" id="password" placeholder="exemple: Uj4D/8hjz$"/>
                    <p ref={this.errorPassword} className='error errorPassword'></p>
                </div>
                <div className="SignUp-fild">
                    <input value={this.state.confirmedPassword} onChange={this.handleChage.bind(this)}  type="password" id="confirmedPassword" placeholder='Confirmer mot de passe'/>
                    <p ref={this.errorConfirmPassword} className='error errorConfirmPassword'></p>
                </div>
                <div className='footer-SignUp'>
                    <button onClick={this.checkFormValidity.bind(this)} className="register_buttom" type="submit">Register</button>
                    <p ref={this.errorForm} className='error connection-error errorForm'>{this.state.error && <span>A field was not filled in correctly</span>}</p>
                </div>
                <Link className="redirecting-SignUp-btn" to="/Login">Already have an account ? <p> Log in to it !</p></Link>
            </form>
            {this.state.redirectionPath && <Navigate to={this.state.redirectionPath}/>}
            <Footer/>
        </main>
    }
}