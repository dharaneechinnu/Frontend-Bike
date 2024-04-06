import React, { useState, useEffect } from 'react';
import './View.css';
import bikeImage from '../Assests/bike.jpg';

const View = ({ bikes }) => {
    const [visibleChars, setVisibleChars] = useState(0);
    const [sortByBrand, setSortByBrand] = useState('');
    const [sortByLocation, setSortByLocation] = useState(''); 
    const [sortByPrice, setSortByPrice] = useState(''); 
    const [sortByShop, setSortByShop] = useState(''); 
    const [sortedBikes, setSortedBikes] = useState(bikes);
    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleChars(prevVisibleChars => prevVisibleChars + 1);
        }, 50);

        return () => clearInterval(interval);
    }, []);

  
    const handleSortBy = (e, sortBy) => {
        const inputValue = e.target.value.toLowerCase(); 
              switch (sortBy) {
            case 'brand':
                setSortByBrand(inputValue);
                break;
            case 'location':
                setSortByLocation(inputValue);
                break;
            case 'price':
                setSortByPrice(inputValue);
                break;
            case 'shop':
                setSortByShop(inputValue);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        let sorted = [...bikes]; 
        if (sortByPrice !== '') {
            sorted.sort((a, b) => a.price - b.price); 
        }
        if (sortByBrand !== '') {
            sorted = sorted.filter(bike => bike.brand.toLowerCase().includes(sortByBrand));
        }
        if (sortByLocation !== '') {
            sorted = sorted.filter(bike => bike.location.toLowerCase().includes(sortByLocation));
        }
        if (sortByShop !== '') {
            sorted = sorted.filter(bike => bike.shopName.toLowerCase().includes(sortByShop));
        }
        setSortedBikes(sorted); 
    }, [bikes, sortByBrand, sortByLocation, sortByPrice, sortByShop]);

    return (
        <>
            <div className="view-page">
                <div className="image-container">
                    <img src={bikeImage} alt="" />
                    <div className="text-container">
                        <h1 className="page-title">Quality pre-owned bikes</h1>
                        <p className="page-description">{visibleChars > 0 ? 'Explore, buy, and sell conveniently online.'.slice(0, visibleChars) : ''}</p>
                    </div>
                </div>
            </div>
            <div className="bike-details">
                <div className="sort-controls">
                    <label>
                        Sort by Brand:
                        <input type="text" value={sortByBrand} onChange={(e) => handleSortBy(e, 'brand')} />
                    </label>
                    <label>
                        Sort by Location:
                        <input type="text" value={sortByLocation} onChange={(e) => handleSortBy(e, 'location')} />
                    </label>
                    <label>
                        Sort by Price:
                        <input type="text" value={sortByPrice} onChange={(e) => handleSortBy(e, 'price')} />
                    </label>
                    <label>
                        Sort by Shop Name:
                        <input type="text" value={sortByShop} onChange={(e) => handleSortBy(e, 'shop')} />
                    </label>
                </div>
                <ul className="bike-list">
                    {sortedBikes.map(bike => (
                        <li key={bike.id} className="bike-list-item">
                            <h2>{bike.brand} {bike.model}</h2>
                            <p>RS{bike.price}</p>
                            <p>Location: {bike.location}</p>
                            <p>Shop: {bike.shopName}</p>
                            {bike.imgs && <img src={bike.imgs} alt="Bike" />}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default View;
