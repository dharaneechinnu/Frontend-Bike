import React, { useState, useEffect } from 'react';
import Api from '../Api/Api';
import './OwnerPost.css';
import Navbar from '../Navbar/Nav';

const OwnerPost = () => {
    const [bikes, setBikes] = useState([]);

    // Fetch user's posted bikes on component mount
    useEffect(() => {
        fetchUserBikes();
    }, []);

    const fetchUserBikes = async () => {
        try {
            // Assuming userId is fetched from localStorage
            const userId = localStorage.getItem('userId');
            const response = await Api.get(`/api/userBikes/${userId}`);
            const data = await response.data;
            setBikes(data);
        } catch (error) {
            console.error('Error fetching user bikes:', error);
        }
    };

    const deleteBike = async (bikeId) => {
        try {
            const response = await Api.delete(`/api/deleteBike/${bikeId}`);
            if (response.status === 200) {
                // Remove the deleted bike from the state
                setBikes(bikes.filter(bike => bike._id !== bikeId));
                console.log('Bike deleted successfully');
            } else {
                console.error('Failed to delete bike');
            }
        } catch (error) {
            console.error('Error deleting bike:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="owner-post-container">
            <h2>User's Posted Bikes</h2>
            <table className="bike-table">
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Shop Name</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bikes.map(bike => (
                        <tr key={bike._id}>
                            <td>{bike.brand}</td>
                            <td>{bike.model}</td>
                            <td>{bike.price}</td>
                            <td>{bike.location}</td>
                            <td>{bike.shopName}</td>
                            <td>
                                <img src={bike.imgs} alt="Bike" className="bike-image" />
                            </td>
                            <td>
                                <button onClick={() => deleteBike(bike._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default OwnerPost;
