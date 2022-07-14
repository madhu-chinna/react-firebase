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
            setUser(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
        }

        getUsers()
        
    }, [])

    
    const loadUserDetails = () =>{
        console.log("mobile number",typeof(mobileNumber))
        if(mobileNumber === 0 || mobileNumber === ""){
            alert("Enter valid mobile number")
        }else{
            haveSpecificUser()
            changeUserState(true)
        }
        
    }

    const haveSpecificUser = () =>{
        let validUser = false
        users.map((user)=>{
            console.log(mobileNumber)
            if (mobileNumber === user.mobile){
                setUserBasedOnMObile(user)
                validUser = true
            }

        })
        if(validUser === false){
            setUserBasedOnMObile({})
        }
    }
 

    return(
        <>
            <Header/>
            <div className='user-details-container'>
            <div className='container-1'>
                <p className='user-count'>Total User {users.length}</p>
                <h1 className='find-user-heading'>Find User details</h1>
                <input className='input-element' placeholder='Enter Mobile Number' onChange={(event)=>{
                    setMobileNumber(event.target.value)
                    changeUserState(false)
                    }}/>
                <button className='user-details-button' onClick={loadUserDetails}>Submit</button>
            </div>
            <div >
                {isFetchUserDetails ? <UserDetails user={userBasedOnMobileNumber}/>:<p className='instruction-text'>Enter mobile number and click on submit button to get user details</p>}
            </div>
            </div>
            
        </>
            
    )
    
}
export default FindUserDetails