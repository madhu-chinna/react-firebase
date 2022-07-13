import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBdjRki1b12rLYTvmm_ghJGDgTdK_6V7kI",
    authDomain: "add-and-get-user-details.firebaseapp.com",
    projectId: "add-and-get-user-details",
    storageBucket: "add-and-get-user-details.appspot.com",
    messagingSenderId: "472820139837",
    appId: "1:472820139837:web:e68cea66ea462256ff2754",
    measurementId: "G-CP0KB79Z28"
  };
  
firebase.initializeApp(firebaseConfig) 

const storage = firebase.storage()

export {storage, firebase as default}
