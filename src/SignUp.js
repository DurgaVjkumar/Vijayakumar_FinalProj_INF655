import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//firestore modules
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "./firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";



export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      //Register user with createUserWithEmailAndPassword
      //Creates a new user account associated with the specified email address and password.
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      updateProfile(auth.currentUser, { displayName: name });

      //copy of formData
      const formDataCopy = { ...formData };
      delete formDataCopy.password; //don't save password in db
      //formDataCopy.timeStamp = serverTimestamp();
      console.log(formDataCopy);
      //store user in database
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div>
      
      <form className="card" onSubmit={onSubmit}>
        <input
          type="text"
          className="nameInput"
          placeholder="Name"
          id="name"
          value={name}
          onChange={onChange}
        />
        <input
          type="email"
          className="emailInput"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />
        
          <input
            type="password"
            className="passwordInput"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />
        <div className="singUpBar">
          <button className="signUpButton">Sign Up</button>
        </div>
      </form>
      <Link to ="/login">Already have an account?</Link>
     </div>
  );
}