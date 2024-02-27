import {initializeApp} from 'firebase/app';
import {getAuth } from 'firebase/auth'; 
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCTnS_jqF7rE7X48OrWb6ROKUDiGM2BxPY",
    authDomain: "spacecall-661d6.firebaseapp.com",
    projectId: "spacecall-661d6",
    storageBucket: "spacecall-661d6.appspot.com",
    messagingSenderId: "154443114121",
    appId: "1:154443114121:web:c9aa5e8e75b9704efd0858",
    measurementId: "G-NPX04WZN7M"
};

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export {auth,db,storage}
