import React, {useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './SignIn.css';
import { useNavigate, Link } from "react-router-dom";


const SignIn = () => {
    const [formData, setFormData] = useState({
        email:"",
        password: "",
    });
    
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const { email, password } = formData;

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        navigate("/");
        const user = userCredentials.user;
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className='card' onSubmit={onSubmit}>
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
      <button className="sign-in">Sign In</button>
    
    {/* <Link to="/forgot-password" className="forgotPasswordLink">
      Forgot Password
    </Link> */}
  </form>
    //<button onClick={signInHandler}>Sign In</button>
  )
}

export default SignIn