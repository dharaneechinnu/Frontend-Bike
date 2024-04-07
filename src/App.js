
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import View from './Home/View';
import Owner from './Home/Owner'
import OwnerPost from './Home/OwnerPost';
import OwnerMain from './Home/OwnerMain';

function App() {



  return (
  <>
  
  <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/home"
       element={<Home 
                />}/>
      <Route path="/view" element={<View />}/>
      <Route path="/OwnerMain" element={<OwnerMain />}/>
      <Route path="/MyBike" element={<OwnerPost />}/>
      <Route path="/Owner" element={<Owner/>}/>
    </Routes>
  </Router>
 
  </>

  );
}

export default App;
