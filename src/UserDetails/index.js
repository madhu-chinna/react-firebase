import './index.css'

const UserDetails = (props) =>{
    const {user} = props
    console.log(user)

    if(Object.keys(user).length === 0){
        // console.log("User not found")
        return(
            <div>
                <h1 className='user-not-found-heading'>USER NOT FOUND</h1>
            </div>
        )
    }else{
        return(
            <div className='user-container'>
                <h1 className='name-heading'>NAME: {user.name}</h1>
                <h1 className='mobile-heading'>MOBILE NUMBER: {user.mobile}</h1>
                <h1 className='date-heading'>DATE OF REGISTRATION: {user.date}</h1>
                <div className='image-container'>
                    <img className='image-size' src={user.imgUrl} alt="user-pic"/>
                </div>
            </div>
        )
    }


    
}

export default UserDetails