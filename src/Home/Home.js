import React from 'react';
import './Home.css';

const Home = ({ bikes, newBike, handleInputChange, handleFileInputChange, addBike }) => {
    return (
        <div className="home-container">
            <h2>Bike Listings</h2>
            <ul className="bike-list">
                {bikes.map(bike => (
                    <li key={bike.id} className="bike-list-item">
                        <div className='box'>
                            <h3>{bike.brand} {bike.model}</h3>
                            <p>Price: RS{bike.price}</p>
                            <p>Location: {bike.location}</p> {/* Display the location */}
                            <p>Shop: {bike.shopName}</p> {/* Display the shop name */}
                            {bike.imgs && <img src={bike.imgs} alt="Bike" />}
                        </div>
                    </li>
                ))}
            </ul>
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
                    Images:
                    <input type="file" accept="image/*" name="imgs" onChange={handleFileInputChange} />
                </label>
                <label>
                    Location:
                    <input type='text' name="details" value={newBike.details} onChange={handleInputChange} />
                </label>
                <label>
                    Shop Name:
                    <input type='text' name="shopName" value={newBike.shopName} onChange={handleInputChange} />
                </label>
                <button onClick={addBike}>Add Bike</button>
            </div>
        </div>
    );
}

export default Home;
