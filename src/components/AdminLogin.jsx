
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import myImage from "../assets/images/fypbg.jpg";
import axios from 'axios';
import { useAuth } from '../layouts/AuthContext';
import ForgotPassword from './forgetpassword'; // Import ForgotPassword Component

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false); // Toggle between login and reset mode
  const { login } = useAuth();
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://internship-hub-backend.vercel.app/api/auth/login', {
        email, password, role: 'admin'
      });
      login(response.data.token);
      
      localStorage.setItem('id', response.data.user._id);
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('role', response.data.user.role);

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login failed', error.response.data.message);
      setErrMessage(error.response.data.message);
    }
  };

  return (
    <div
      className="admin-login-container flex items-center justify-center min-h-screen min-w-screen"
      style={{
        backgroundImage: `url(${myImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {isResetMode ? (
        <ForgotPassword onClose={() => setIsResetMode(false)} />
      ) : (
        <div
          className="relative p-8 md:p-10 rounded-lg shadow-2xl bg-blue-900 bg-opacity-40 hover:border-black border-2 max-w-sm w-full login-form items-center justify-center"
          style={{ position: 'relative', zIndex: 2 }}
        >
          {/* Cancel Icon */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-2 right-2 text-white hover:bg-red-600 p-2 rounded-xl"
          >
            <AiOutlineClose size={24} />
          </button>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
            Admin Login
          </h2>
          {errMessage && <p className='text-red-500 bg-white p-2 rounded mb-4'>{errMessage}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
                placeholder="Enter your password"
                required
              />
          <div className="items-center mt-2">
                                <input type="checkbox" id="showPassword" checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)} className="mr-2" />
                                <label htmlFor="showPassword" className="text-white text-sm">Show Password</label>
                                <p className="text-blue-500 float-end cursor-pointer hover:underline" onClick={() => setIsResetMode(true)}>
                                Forgot Password?</p>
                            </div>
                            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:bg-gray-200 text-white font-bold py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:translate-y-1 border-white border-solid hover:border-2"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
