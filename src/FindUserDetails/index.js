import {useState, useEffect} from 'react'
import{db} from '../firebase-config'
import { collection, getDocs } from "firebase/firestore"


import Header from "../Header"
import UserDetails from '../UserDetails/index'

import './index.css'

const FindUserDetails = ()=>{
    const [users, setUser] = useState([])
    const [mobileNumber,setMobileNumber] = useState(0)
    const [isFetchUserDetails, changeUserState] = useState(false)
    const [userBasedOnMobileNumber, setUserBasedOnMObile] = useState({})



    useEffect(()=>{
        const getUsers = async () => {
            const usersCollectionRef = collection(db, "users")
            const data = await getDocs(usersCollectionRef)
            // console.log(data.docs)
            setUser(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
        }

        getUsers()
    }, [])

    
    const loadUserDetails = () =>{
        haveSpecificUser()
        changeUserState(true)
    }

    const haveSpecificUser = () =>(
        users.map((user)=>{
            if (mobileNumber === user.mobile){
                setUserBasedOnMObile(user)
            }
        })
        )


    return(
        <>
            <Header/>
            <div className='user-details-container'>
            <div className='container-1'>
                <p>Total User {users.length}</p>
                <h1>Find User details</h1>
                <input className='input-element' placeholder='Enter Mobile Number' onChange={(event)=>{setMobileNumber(event.target.value)}}/>
                <button className='user-details-button' onClick={loadUserDetails}>Submit</button>
            </div>
            <div >
                {isFetchUserDetails ? <UserDetails user={userBasedOnMobileNumber}/>:<p>Enter mobile number</p>}
            </div>
            </div>
            
        </>
            
    )
    
}
export default FindUserDetails