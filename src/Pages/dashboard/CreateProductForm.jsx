import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { db, storage } from '../../config/config';

export default function CreateProductForm() {
    
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(null);
    const [productQuantity, setProductQuantity] = useState(null);
    const [productImg, setProductImg] = useState(null);
    const [bgroundImgInput, setBgroundImgInput] = useState("");
    const [error, setError] = useState('');
    
    const inputFile = useRef(null);
    
    const productImgHandler = (e) => {
        let selectedFile = inputFile.current.files[0];
        console.log(selectedFile);
        setProductImg(selectedFile);
        setBgroundImgInput(URL.createObjectURL(selectedFile));
        setError('');
    }
    
    // add product
    const addProduct = (e) => {
        console.log(productName, productDescription, productPrice, productQuantity, productImg, bgroundImgInput);
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductDescription: productDescription,
                        ProductPrice: Number(productPrice),
                        ProductQuantity: Number(productQuantity),
                        ProductImg: url
                    }).then(() => {
                        setProductName('');
                        setProductDescription('');
                        setProductPrice(0);
                        setProductQuantity(0);
                        setProductImg('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
    }
    
    let theImgSelected = bgroundImgInput;
    const inputFileImgBg = {
        background: "url(" + theImgSelected + ")"
    };
    
    return (
    <form autoComplete="off" className='form-group' onSubmit={addProduct}>
        <Link to='/Dashboard/AllProduct'><button className='leav-dashboard-btn'><i className="fa-solid fa-arrow-left"></i></button></Link>
        <div className='creat-product'>
            <div className='creat-product-filds'>
                <div className='first-row-product-filds'>
                    <input style={inputFileImgBg} id='dashboard-img-input' ref={inputFile} className='dashboard-img-input' type="file" accept="image/*" required onChange={productImgHandler} />
                    <div className='name-and-price-input'>
                        <input className='dashboard-input-type' type="text" placeholder='Product name' required onChange={(e) => setProductName(e.target.value)} value={productName}/>
                        <input className='dashboard-input-type' type="number" placeholder='Product Price' required onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                    </div>
                </div>
                <div className='third-row-product-details'>
                    <h4 className='specific-description-title'>Description</h4>
                    <hr/>
                    <textarea className='creat-product-textarea' required onChange={(e) => setProductDescription(e.target.value)} placeholder="Enter la description du produit" cols="30" rows="10">{productDescription}</textarea>
                    <input className='dashboard-input-type' type="number" id='product-in-stock-input' placeholder='Nombre disponible en stock' required onChange={(e) => setProductQuantity(e.target.value)} value={productQuantity} />
                    <button type='submit' className='buy-now-btn'>Ajouter</button>
                </div>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </div>
    </form>
    )
}
