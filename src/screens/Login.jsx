import { useState } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './Style.css';

export default function Login() {
  const [formData, setFormData] = useState({

    email: "",
    password: "",

  })
  let navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData((currdata) => {
      return { ...currdata, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("https://gofood-backend-vbo3.onrender.com/login", {
      method: 'POST', // Corrected method name
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formData.email, password: formData.password }) // Fixed location field name
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credential")
    }
    if (json.success) {
      localStorage.setItem("userEmail", formData.email);
      console.log(localStorage.getItem("userEmail"))
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
    setFormData({
      email: "",
      password: "",
    });
  }
  return (
    <div className='wrapper'>
      <div  className='mb-3'><Navbar/></div>
      <div className='content'>
    <div className='container mb-3 mt-2'>
      <h2>Log in to access your account.</h2>
      <form onSubmit={handleSubmit} noValidate className='needs-validation'>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={formData.email} onChange={handleInputChange} name="email" required/>
          <div className="valid-feedback"> Looks good! </div>
          <div className="invalid-feedback">Please enter a valid email </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={formData.password} onChange={handleInputChange} name="password" required/>
          <div className="invalid-feedback">Please enter a valid password </div>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <Link to="/users" className="ms-3 btn btn-danger">I'm a new user</Link>
      </form>
    </div>
    </div>
    <Footer />
    </div>
  )
}
