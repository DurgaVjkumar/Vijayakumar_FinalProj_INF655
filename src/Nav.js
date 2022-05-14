import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import SearchForm from './SearchForm'
import SignOut from './SignOut'
import Signup from './SignUp'


 const Nav = (props) => {
  return (
    <nav className='Nav'>
        <ul>
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/search">Search</Link> </li>
          <li> <Link to="/signup">Sign Up</Link> </li>
          <li> <Link to="/login">Login</Link> </li>
{/*          
          <li> Login </li>
          <li> My Movie List </li>
          <li> Search</li>
          <SignOut user={props.user} onSignOut={props.signOutHandler}/>
           */}
        </ul>
    </nav>
  )
}
export default Nav