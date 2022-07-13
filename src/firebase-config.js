import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyBdjRki1b12rLYTvmm_ghJGDgTdK_6V7kI",
    authDomain: "add-and-get-user-details.firebaseapp.com",
    projectId: "add-and-get-user-details",
    storageBucket: "add-and-get-user-details.appspot.com",
    messagingSenderId: "472820139837",
    appId: "1:472820139837:web:e68cea66ea462256ff2754",
    measurementId: "G-CP0KB79Z28"
  };

  const app = initializeApp(firebaseConfig)


export const db = getFirestore(app);
export const storage = getStorage(app)