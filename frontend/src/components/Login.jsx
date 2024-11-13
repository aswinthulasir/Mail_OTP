import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to request OTP
  const requestOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/send-otp', { email });
      setMessage(response.data.message);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending OTP');
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/verify-otp', { email, otp });
      setMessage(response.data.message);
      
      // If OTP is verified, navigate to the Dashboard
      if (response.data.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error verifying OTP');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>OTP Login</h2>
      {step === 1 && (
        <div>
          <input
            className='Form'
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={requestOtp} className='Btn'>Send OTP</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            className='Form'
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp} className='Btn'>Verify OTP</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
