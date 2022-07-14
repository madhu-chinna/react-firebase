import { async } from "@firebase/util";
import React,{useState,useEffect} from "react";
import {db, storage} from '../firebase-config' 

import {collection,addDoc} from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"

import { format } from 'date-fns'

import Header from "../Header"
import './index.css'



const AddUserDetails = () =>{
    const [name,setName] = useState("")
    const [mobileNumber,setMobileNumber] = useState(0)
    
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const [isButtonClicked, setButtonStatus] = useState(false)
    const [isUserDetailsUploaded, setUserDetailsStatus] = useState(false)

    const [isUserEnteringValidNumber, setValidNumberState] = useState(true)

    const usersCollectionRef = collection(db,"users")



    useEffect(()=>{
        if (isButtonClicked && imgUrl !== null){
            addUserDetails()
        }

        if(isNaN(mobileNumber)){
            setValidNumberState(false)
        }else{
            setValidNumberState(true)
        }


    })

    

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(name==="" || mobileNumber === 0){
            alert("enter user details in name and mobile number fields")
        }else{
            const file = await event.target[0]?.files[0]

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
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(function (downloadURL) {

                    console.log("down load img url", downloadURL);
                    setImgUrl(downloadURL);
                    setButtonStatus(true)
                });}
        )
        }
        

    }



    const addUserDetails = async () =>{

        console.log("outer image URL",imgUrl)
        await addDoc(usersCollectionRef,{name:name, mobile:mobileNumber, date: format(new Date(), 'MM/dd/yyyy'), imgUrl: imgUrl})
        setButtonStatus(false)
        setUserDetailsStatus(true)
        
    }


      return (
        <>
        <Header/>
        <div className="input-container">
            <h1 className="heading">ADD USER DETAILS</h1>
            <input className="input-element" placeholder="Enter your Name" onChange={(event)=>{
                setName(event.target.value) 
                setUserDetailsStatus(false)}}/>
            <input className="input-element" placeholder="Enter Mobile Number" onChange={(event)=>{
                setMobileNumber(event.target.value)
                setUserDetailsStatus(false)}}/>
            {isUserEnteringValidNumber?null:<p className="warning-text">Enter valid number</p>}
           

            <form className='form' onSubmit={handleSubmit}>
                {/* <input className="input-file" type='file' /> */}
                <label htmlFor="upload-photo">Click here to upload Photo</label>
                <br></br>
                <input type="file" name="photo" id="upload-photo" />
                <br></br>
                <button className="upload-button-style" type='submit'>Submit</button>
            </form>
            {isUserDetailsUploaded?<p className="user-details-upload-status">User Details Uploaded</p>:<p className="user-details-upload-status">Enter Details and Click on Submit Button</p>}
        </div>
        
        </>
        
      );
}

export default AddUserDetails