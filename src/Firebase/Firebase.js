import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'
// import { auth, storage } from './Firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAM5mvYPVzKiqLgruPTXRIkdQMM28JXUgE",
    authDomain: "mapkit-js.firebaseapp.com",
    projectId: "mapkit-js",
    storageBucket: "mapkit-js.appspot.com",
    messagingSenderId: "298929638198",
    appId: "1:298929638198:web:8270bfe0b1532961ab8197"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export var auth = firebase.auth();
export var firestore = firebase.firestore();

export var serverTimestamp = () => firebase.firestore.FieldValue.serverTimestamp()

export default firebase;

