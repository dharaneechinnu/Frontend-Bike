import React, { useState } from 'react';
import './Home.css';
import Nav from '../Navbar/Nav';
import Api from '../Api/Api';

const Home = () => {
    const userid = localStorage.getItem("userId")
    const [newBike, setNewBike] = useState({
        userid,
        brand: '',
        model: '',
        price: '',
        imgs: '',
        location: '',
        shopName: '',
        phonenumber:''
    });

    const handleInputChange = (event) => {
        setNewBike({
            ...newBike,
            [event.target.name]: event.target.value
        });
    };

    const addBike = async () => {
        try {
            const response = await Api.post('/api/addBike', { newBike });
    
            if (response.status === 200) {
                alert("Successfully added the bike");
                console.log('Bike added successfully');
    
                // Reset the form fields
                setNewBike({
                    userid,
                    brand: '',
                    model: '',
                    price: '',
                    imgs: '',
                    location: '',
                    shopName: '',
                    phonenumber:''
                });
            } else {
                console.error('Failed to add bike');
            }
        } catch (error) {
            console.error('Error adding bike:', error);
        }
    };
    
    return (
        <>
            <Nav />
            <div className="home-container">
                <h2>Add New Bike</h2>
                <div className="add-bike-form">
                    <label>
                        Brand:
                        <input type="text" name="brand" value={newBike.brand} onChange={handleInputChange} />
                    </label>
                    <label>
                        Model:
                        <input type="text" name="model" value={newBike.model} onChange={handleInputChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="price" value={newBike.price} onChange={handleInputChange} />
                    </label>
                    <label>
                        Images URL:
                        <input type="text" name="imgs" value={newBike.imgs} onChange={handleInputChange} />
                    </label>
                    <label>
                        Location:
                        <input type="text" name="location" value={newBike.location} onChange={handleInputChange} />
                    </label>
                    <label>
                        Showroom Name:
                        <input type="text" name="shopName" value={newBike.shopName} onChange={handleInputChange} />
                    </label>
                    <label>
                        Phone-Number:
                        <input type="number" name="phonenumber" value={newBike.phonenumber} onChange={handleInputChange} />
                    </label>
                    <button onClick={addBike}>Add Bike</button>
                </div>
            </div>
        </>
    );
}

export default Home;
