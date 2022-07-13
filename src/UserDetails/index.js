
import './index.css'



const UserDetails = (props) =>{
    const {user} = props
    console.log(user)
    return(
        <div className='user-container'>
        <h1>NAME: {user.name}</h1>
        <h1>MOBILE NUMBER: {user.mobile}</h1>
        <h1>DATE OF REGISTRATION: {user.date}</h1>
        <img className='image-size' src={user.imgUrl} alt="image "/>
        </div>
    )
}

export default UserDetails