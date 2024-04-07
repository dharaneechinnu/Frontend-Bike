import React, { useState, useEffect } from 'react';
import './Ownermain.css';
import Navbar from '../Navbar/Nav';
import owner from '../Assests/ownermain.jpeg';

const OwnerMain = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);

    const words = ["Welcome to Preowned", "Explore your bikes here"];

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < words.length) {
                setText(prevText => prevText + words[index].charAt(prevText.length));
            } else {
                clearInterval(interval);
            }
        }, 50); // Adjust typing speed as needed

        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {
        if (text === words[index]) {
            setTimeout(() => {
                setIndex(prevIndex => (prevIndex + 1) % words.length);
                setText('');
            }, 3000); // Adjust pause duration after each word
        }
    }, [text, index]);

    return (
        <>
            <Navbar />
            <div className='pic'>
                <img src={owner} alt="Owner" />
                <div className="text-container">
                    <h1>{text}</h1>
                </div>
            </div>
        </>
    );
}

export default OwnerMain;
