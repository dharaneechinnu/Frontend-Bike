import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from '../Api/Api';
import { Link, useNavigate } from 'react-router-dom';
import ownpic from '../Assests/owner.jpg'
const Owner = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp,setOTP]=useState('')
  const [name, setName] = useState('')
  const [doctorid,setdoctorid] = useState('')
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  const history = useNavigate()

  const handleGenerateOTP = async () => {
    try {
      if (!email) {
        console.log('Please enter your email to generate OTP.');
        return;
      }

      setOtpGenerated(true);
      const response = await Api.post('/doc/reg/generate', { email });
      toast.success("OTP Sent to Email");
      console.log(response.data.message);
    } catch (error) {
      console.error('Error frontend generating OTP:', error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await Api.post('/doc/reg/verify-otp', { email, otp });
      toast.success("OTP Verified");
      console.log(response.data.message);
      setIsVerified(true);
    } catch (error) {
      toast.error("OTP Not Verify");
      console.error('Error frontend verifying OTP:', error);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    // Password strength validation
    const isLengthValid = password.length >= 8;
    const isUppercase = /[A-Z]/.test(password);
    const isLowercase = /[a-z]/.test(password);
    const isNumber = /[0-9]/.test(password);
    const isSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordStrength({
      length: isLengthValid,
      uppercase: isUppercase,
      lowercase: isLowercase,
      number: isNumber,
      specialChar: isSpecialChar
    });

    if (!isLengthValid && !isUppercase && !isLowercase && !isNumber &&!isSpecialChar) {
          toast.error("Enter Strong Password")
    }
  };

  const handleSign = async (e) => {
    e.preventDefault();
    

    
    try {
        if(isVerified){
      await Api.post('/doc/reg', { name, email, password,doctorid });
      history('/');
        }
    }

    catch (err) {
      console.log(err);
    }
  };
  return (
  <>
   <div className="center-containers">
        <ToastContainer />
        <div className="register-containers">
          <h2 className='registers_title'>Registion For Only Owner</h2>
          <form onSubmit={handleSign} id='registerForm'>
            <div className="form-groups">
              <label className='Names' htmlFor='name'>Name:</label>
              <input
                type="text"
                className='nametext'
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-groups">
              <label className='Names' htmlFor='name'>Shop Name</label>
              <input
                type="text"
                className='nametext'
                
                onChange={(e) => setdoctorid(e.target.value)}
                required
              />
            </div>
            <div className="form-groups">
              <label className='email' htmlFor='email'>Email:</label>
              <input
                type="email"
                className='emailtext'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="button" className='generate-otp' onClick={handleGenerateOTP}>
              Generate OTP
            </button>
            {otpGenerated && (
              <>
                <div className="form-groups">
                  <label className='otp' htmlFor='otp'>Enter OTP:</label>
                  <input
                    type="text"
                    className='emailtext'
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                </div>
                <button type="button" className='verify-otp' onClick={handleVerifyOTP}>
                  Verify OTP
                </button>
              </>
            )}
            <div className="form-groups">
              <label className='pwd' htmlFor='pwd'>Create Password:</label>
              <input
                type="password"
                className='pwdtext'
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className='submit' disabled={!isVerified || !Object.values(passwordStrength).every(val => val)}>
              Register
            </button>
          </form><br></br>
          <Link to='/' className='for'>I have Account</Link>
         
        </div>
      </div>
      <div className="regpic"><img src={ownpic} alt="" srcset="" /></div>
  </>
  )
}

export default Owner