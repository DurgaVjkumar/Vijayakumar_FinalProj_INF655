import React from 'react'
import { getAuth, signOut } from "firebase/auth";


const SignOut = (props) => {
    

    const signOutHandler = ()=>{

        props.onSignOut();
    }

  return (
      <>
     
     {props.user
     && (
         <div className='navName-div'>
             <p>Welcome, {props.user.displayName}</p>
            <button  className="sign-out" onClick={signOutHandler}>Sign Out</button>
        </div>
      )}
      </>
  )
}

export default SignOut