import React, { useState, useEffect } from 'react';
import './View.css';
import bikeImage from '../Assests/bike.jpg';
import Api from '../Api/Api';
import UserNav from './UserNav';

const View = () => {
    const [bikes, setBikes] = useState([]);
    const [searchBrand, setSearchBrand] = useState('');
    const [searchModel, setSearchModel] = useState('');

    useEffect(() => {
        fetchBikes();
    }, []);

    const fetchBikes = async () => {
        try {
            const response = await Api.get('/api/bikes');
            const data = response.data;
            console.log(data);
            setBikes(data);
        } catch (error) {
            console.error('Error fetching bikes:', error);
        }
    };

    const handleBrandInputChange = (e) => {
        setSearchBrand(e.target.value);
    };

    const handleModelInputChange = (e) => {
        setSearchModel(e.target.value);
    };

    const filteredBikes = () => {
        let filtered = [...bikes];
        if (searchBrand) {
            filtered = filtered.filter(bike => 
                bike.brand.toLowerCase().includes(searchBrand.toLowerCase())
            );
        }
        if (searchModel) {
            filtered = filtered.filter(bike => 
                bike.model.toLowerCase().includes(searchModel.toLowerCase())
            );
        }
        return filtered;
    };

    return (
        <>
            <UserNav />
            <div className="view-page">
                <div className="image-container">
                    <img src={bikeImage} alt="" />
                    <div className="text-container">
                        <h1 className="page-title">Quality pre-owned bikes</h1>
                        <p className="page-description">Explore, buy, and sell conveniently online.</p>
                    </div>
                </div>
            </div>
            <div className="search-container">
                <div className="search-box">
                   
                    <input
                        type="text"
                        id="searchBrand"
                        value={searchBrand}
                        onChange={handleBrandInputChange}
                        placeholder="Enter brand to search..."
                    />
                </div>
                <div className="search-box">
                   
                    <input
                        type="text"
                        id="searchModel"
                        value={searchModel}
                        onChange={handleModelInputChange}
                        placeholder="Enter model to search..."
                    />
                </div>
            </div>
            <div className="bike-list">
               
                <div className="bikes">
                    {filteredBikes().map(bike => (
                        <div key={bike._id} className="bike">
                            <img src={bike.imgs} alt={bike.brand} />
                            <div>
                                <h3>{bike.brand}</h3>
                                <p>Model: {bike.model}</p>
                                <p>Price: ₹{bike.price}</p>
                                <p>Location: {bike.location}</p>
                                <p>Showroom Name: {bike.shopName}</p>
                                <p>PhoneNumber: {bike.phonenumber}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default View;
