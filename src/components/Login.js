import React, { useEffect, useState } from 'react';
import "./Signup.css";
import { logo1 } from '../media/media';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [list, setList] = useState([]);
  const [state , setState ] = useState({
    email : "",
    password : "",
  });

  const navigate = useNavigate();
  const { email, password } = state;

  useEffect(() => {
    axios.get("http://localhost:8000/collections")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log("data error: " + err)
      })
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (email === "admin@email.com" && password === "Admin@123") {
      navigate("/admin")
    } else {
      const user = list.find((user) => user.email === email && user.password === password);
      console.log("user: " , user)
      if (user) {
        const updatedUser = { ...user,
          count : parseInt(user.count) + 1, 
          lastLogin : new Date().toLocaleString('default', { month: 'long' })
        }
        console.log(updatedUser)
        
        // Update user in the list
        const updatedList = list.map(item => (item.email === updatedUser.email ? updatedUser : item));
        setList(updatedList);

        axios.put(`http://localhost:8000/collections/${user._id}`, updatedUser)
          .then((res) => {
           
            console.log("Updated user", res.data)
      navigate("/profile")

            
          })

          .catch((error) => {
            console.error("Error updating user data:", error);
          });
      } else {
        alert("Please enter valid email or password")
      }
    }
  }
  
  return (
    <div>
      <div className="container">
        <div className="left">
          <img src={logo1} alt="SignupImage" />
        </div>
        <div className="right">
          <h2>Login</h2>
          <form className='form'>
            <input className='input1' onChange={handleChange} value={email}  name="email" type="email" placeholder="Email Address" required /><br />
            <input className='input1' onChange={handleChange} value={password} name='password' type="password" placeholder="Password" required />
            <div className="gender">
              <label htmlFor="male">Gender</label>
              <input type="radio" id="male" name="gender" value="male" />
              <label htmlFor="female">Female</label>
              <input type="radio" id="female" name="gender" value="female" />
            </div>
            <div className='btnContainer'>
              <button className='signupBtn' id='btn2' onClick={handleSubmit} type="submit">Sign In</button>
              <Link to="/signup"><button className='signupBtn' id='btn1' type="button">Sign Up</button></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
