// Myorder.jsx (Frontend)

import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './Style.css';


export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchMyOrder = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                const response = await fetch("https://gofood-backend-vbo3.onrender.com/myOrder", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: userEmail })
                });
                const data = await response.json();
                setOrderData(data.order_data || []); // Set orderData to an empty array if order_data is not available
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMyOrder();
    }, []);

    return (
        <div className='wrapper'>
            <div  className='mb-3'><Navbar /></div>
            <div className='content'>
            <div className='container'>
                <div className='row'>
                    {orderData.map((order, index) => (
                        <div key={index}>
                            {order.Order_date && (
                                <div className='m-auto mt-5'>
                                    {order.Order_date}
                                    <hr />
                                </div>
                            )}
                            {order.order_data && order.order_data.map((item, idx) => (
                                <div key={idx} className='col-12 col-md-6 col-lg-3'>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                    {/* <img src="./screens/ordercompleted.jpg" className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}

                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                <span className='m-1'>Qty: {item.qty}</span>
                                                <span className='m-1'>Size: {item.size}</span>
                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                    ₹{item.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            </div>
            <br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <Footer />
        </div>
    );
}






