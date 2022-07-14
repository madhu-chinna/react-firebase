import {Link} from 'react-router-dom'
import './index.css'

const Header = () =>{
    return(
        <nav className='nav-header'>
            <div className='nav-content'>
                <ul className='nav-menu'>
                    <Link to="/" className="nav-link">
                    <li className='text'>Add User Details</li>
                    </Link>
                    <Link to="/userdetails" className="nav-link">
                    <li className='text'>Find User Details</li>
                    </Link>
                    
                </ul>
            </div>
        </nav>
    )
}

export default Header