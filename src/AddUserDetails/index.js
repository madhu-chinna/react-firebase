import { async } from "@firebase/util";
import React,{useState} from "react";
import {db, storage} from '../firebase-config' 

import {collection,addDoc} from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"

import { format } from 'date-fns'

import Header from "../Header"
import './index.css'



const AddUserDetails = () =>{
    const [name,setName] = useState("")
    const [mobileNumber,setMobileNumber] = useState(0)
    const [image,setImage] = useState(null)
    
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const usersCollectionRef = collection(db,"users")

    

    const handleSubmit = (event)=>{
        event.preventDefault()

        const file = event.target[0]?.files[0]

        // console.log(file)

        if (!file) return;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                });}


        )
        
        addUserDetails()

    }

    const addUserDetails = async () =>{

        console.log("outer image URL",imgUrl)

        await addDoc(usersCollectionRef,{name:name, mobile:mobileNumber, date: format(new Date(), 'MM/dd/yyyy'), imgUrl: imgUrl})
    }

    const handleChange = (event)=>{
        if (event.target.files[0]){
            setImage(event.target.files[0])
        }
    }

      return (
        <>
        <Header/>
        <div className="input-container">
            <h1>ADD USER DETAILS</h1>
            <input className="input-element" placeholder="Enter your Name" onChange={(event)=>{setName(event.target.value)}}/>
            <input className="input-element" type="number" placeholder="Enter Mobile Number" onChange={(event)=>{setMobileNumber(event.target.value)}}/>
           

            <form className='form' onSubmit={handleSubmit}>
                <input type='file' />
                <br></br>
                <button type='submit'>Upload</button>
            </form>

        </div>
        
        </>
        
      );
}

export default AddUserDetails