
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import View from './Home/View';
import { useState } from 'react';
import Owner from './Home/Owner';
import rbike from './Assests/r15.webp'
import apbike from './Assests/apache.webp'
import hunter from './Assests/hunter.webp'

function App() {

  const [bikes, setBikes] = useState([
    { id: 1, brand: 'R15', model: 'v2', price: 30000, imgs:rbike,location:'Erode',shopName:'Sri Bike' },
    { id: 2, brand: 'apache', model: 'rtr 200', price: 25000, imgs: apbike,location:'Rmp',shopName:'TVS Showroom' },
    { id: 3, brand: 'hunter', model: '350', price: 40000, imgs:hunter,location:'Chennai',shopName:'R15 Showroom' }
]);

const [newBike, setNewBike] = useState({
    brand: '',
    model: '',
    price: '',
    imgs: '',
    location:''
});


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBike({ ...newBike, [name]: value });
};

const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        setNewBike({ ...newBike, imgs: reader.result });
    };
    if (file) {
        reader.readAsDataURL(file);
    }
};
const addBike = () => {
 

  const newBikeObject = {
      id: bikes.length + 1,
      brand: newBike.brand,
      model: newBike.model,
      price: newBike.price,
      imgs: newBike.imgs,
      location: newBike.location,
      shopName: newBike.shopName,
  };

  setBikes([...bikes, newBikeObject]);

  setNewBike({
      brand: '',
      model: '',
      price: '',
      imgs: '',
      location: '',
      shopName: '',
  });

  alert('Bike added successfully!');
};


  return (
  <>
  
  <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/home"
       element={<Home 
        bikes={bikes}
        newBike={newBike}
                addBike={addBike}
                handleFileInputChange={handleFileInputChange}
                handleInputChange={handleInputChange}
                />}/>
      <Route path="/view" element={<View bikes={bikes}/>}/>
      <Route path="/Owner" element={<Owner/>}/>
     
    </Routes>
  </Router>
 
  </>

  );
}

export default App;
