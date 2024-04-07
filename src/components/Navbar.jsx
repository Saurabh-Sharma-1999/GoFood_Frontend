import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Model from '../Model';
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const [collapsed, setCollapsed] = useState(true); // State to manage navbar collapse
    const navigate = useNavigate();
    
    let data = useCart();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate("/login");
    }

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-success navbar-dark sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" onClick={toggleNavbar} aria-expanded={!collapsed ? "true" : "false"}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${collapsed ? '': 'show'}`} id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ? (
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                            ) : null}
                        </ul>
                        {(!localStorage.getItem("authToken")) ? (
                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/users">SignUp</Link>
                            </div>
                        ) : (
                            <div>
                                <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                                   <span>My Cart</span>{" "}
                                    <Badge pill bg="danger"  >{data.length}</Badge>
                                </div>
                                {cartView ? <Model onClose={() => setCartView(false)}><Cart /></Model> : null}
                                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
