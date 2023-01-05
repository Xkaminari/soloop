import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBPHNifhPm6xyoQm_rkL4PLmhpa61S-wtk",
    authDomain: "soloop-v2-c3714.firebaseapp.com",
    projectId: "soloop-v2-c3714",
    storageBucket: "soloop-v2-c3714.appspot.com",
    messagingSenderId: "386513591576",
    appId: "1:386513591576:web:2498bb74629e55d722d26d"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export {auth, db, storage}