import React, { useState } from 'react'
import "./Signup.css"
import { logo } from '../media/media'
import axios from "axios"
import {Link, useNavigate} from "react-router-dom";
const Signup = () => {

  let [state, setState] = useState({
    name : "",
    email : "",
    password : "",
    count : "0",
    lastLogin : " ",

  });


  let navigate =  useNavigate();



//Destructing the state object
  let {name, email, password} = state;

  let handleChange = (e) =>{
      let { name, value } = e.target;
      setState({...state, [name]:value})
  }


  let handleSubmit = (e) =>{
    e.preventDefault();
    console.log(state);
    if(name && email && password){
      // axios.post("http://localhost:3000/user",state).then(
      axios.post("http://localhost:8000/",state).then(
        (res) =>{
          console.log(res);
          navigate("/login")
        }
      ).catch((err) =>{
        console.log("data is not posted to server");
      })
    }
    else{
      console.log("Fill the form ");
    }
  }


  return (
    <div>
        <div className="container">
    <div className="left">
      <img src={logo} alt="SignupImage" />
    </div>
    <div className="right">
    <h2>Create Account</h2>

      <form className="form">
        <input className='input1' onChange={handleChange} value={name} name='name' type="text" placeholder="Full Name" required /><br />
        <input className='input1' onChange={handleChange} value={email} name='email' type="email" placeholder="Email Address" required /><br />
        <input className='input1' onChange={handleChange} value={password} name='password' type="password" placeholder="Password" required />
        <div className="gender">
        <label for="male">Gender</label>
          <input type="radio" id="male" name="gender" value="male" />
          <label for="male">Male</label>
          <input type="radio" id="female" name="gender" value="female" />
          <label for="female">Female</label>

        </div>
        <div className='btnContainer'>
            <button className='signupBtn' id='btn1' type="submit" onClick={handleSubmit}>Sign Up</button>
           <Link to="/login"> <button className='signupBtn' id='btn2' type="button">Sign In</button></Link>
        </div>
      </form>
    </div>
  </div>
    </div>
  )
}

export default Signup