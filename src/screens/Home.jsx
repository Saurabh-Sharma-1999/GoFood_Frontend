import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import './Style.css';



export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("https://gofood-backend-vbo3.onrender.com/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        response = await response.json();
        setFoodItem(response[0] || []);
        setFoodCat(response[1] || []);
        // console.log(response[0], response[1]);
    }
    useEffect(() => {
        loadData()
    }, [])





    return (
        <div className="wrapper" style={{"width": "100%", "overflowX": "hidden"}}>
            <div ><Navbar /></div>
            <div className="content">
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{zIndex: "10"}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {(setSearch(e.target.value))}} />
                                {/* <button className="btn btn-success text-white " type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div className="container">
    {foodCat.length !== 0 ? (
        foodCat.map((data) => {
            const filteredItems = foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())));

            // Check if any items are filtered for the current category
            if (filteredItems.length > 0) {
                return (
                    <div key={data._id} className="row mb-3">
                        <div className="fs-3 m-3">{data.CategoryName}</div>
                        <hr />
                        {filteredItems.map((filterItems) => (
                            <div key={filterItems._id} className="col-12 d-flex justify-content-center col-md-6 col-lg-3">
                                <Card foodItem={filterItems} options={filterItems.options[0]} />
                            </div>
                        ))}
                    </div>
                );
            } else {
                return null; // Hide the category if no items are filtered
            }
        })
    ) : (
        <div>No categories available</div>
    )}
</div>

                <br></br>  <br></br> 
                <div ><Footer /></div>

            
        </div>
    )
}