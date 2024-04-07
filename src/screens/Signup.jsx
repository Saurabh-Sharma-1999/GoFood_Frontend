import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './Style.css';

export default function CreateUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    })
    let navigate = useNavigate();

    const handleInputChange = (event) => {
        setFormData((currdata) => {
            return {...currdata, [event.target.name]: event.target.value}
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("https://gofood-backend-vbo3.onrender.com/users",{
            method: 'POST', // Corrected method name
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password, location: formData.geolocation }) // Fixed location field name
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid credential")
        }
        if (json.success) {
            // localStorage.setItem("userEmail", formData.email);
            // console.log(localStorage.getItem("userEmail"))
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/");
        }
        setFormData({
            name: "",
            email: "",
            geolocation: "",
            password: "",   
        });
    }

    return (
        <div className='wrapper'>
            <div className='mb-3'><Navbar/></div>
            <div className='content mb-3'>
        <div className='container'>
            <h2>Join Us! Create your account to get started</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={formData.name} onChange={handleInputChange} name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={formData.email} onChange={handleInputChange} name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="geolocation" className="form-label">Address</label>
                    <input type="text" className="form-control" id="geolocation" value={formData.geolocation} onChange={handleInputChange} name="geolocation" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={formData.password} onChange={handleInputChange} name="password" />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/login" className="ms-3 btn btn-danger">Already a user</Link>
            </form>
        </div>
        </div>
        <Footer />
        </div>
    )
}
