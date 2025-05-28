import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import myImage from "../assets/images/fypbg.jpg";
import axios from 'axios';

const SoftHouseRegistration = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', location: '', description: '', role: 'softwareHouse', status: 0
  });
  const [countryCode, setCountryCode] = useState("+92");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    let tempErrors = {};

    // Validate Company Name (only alphabets, spaces, hyphens, and apostrophes allowed)
    if (!formData.name) {
      tempErrors.name = "Company name is required";
    } else if (!/^[A-Za-z\s'-]+$/.test(formData.name)) {
      tempErrors.name = "Company name must contain only letters, spaces, hyphens, and apostrophes";
    } else if (formData.name.length < 2 || formData.name.length > 50) {
      tempErrors.name = "Company name must be between 2 and 50 characters";
    }

    // Validate Location (only alphabets, spaces, commas, and hyphens allowed)
    if (!formData.location) {
      tempErrors.location = "Location is required";
    } else if (!/^[A-Za-z\s,-]+$/.test(formData.location)) {
      tempErrors.location = "Location must contain only letters, spaces, commas, and hyphens";
    } else if (formData.location.length < 3 || formData.location.length > 100) {
      tempErrors.location = "Location must be between 3 and 100 characters";
    }

    // Validate Description (alphabets, numbers, spaces, and common punctuation allowed)
    if (!formData.description) {
      tempErrors.description = "Company description is required";
    } else if (!/^[A-Za-z0-9\s.,!?'"-]+$/.test(formData.description)) {
      tempErrors.description = "Description must contain only letters, numbers, spaces, and common punctuation";
    } else if (formData.description.length < 10 || formData.description.length > 500) {
      tempErrors.description = "Description must be between 10 and 500 characters";
    }

    // Validate Email
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = "Invalid email format";

    // Validate Password
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 8) tempErrors.password = "Password must be at least 8 characters long";
    else if (!/[A-Za-z]/.test(formData.password)) tempErrors.password = "Password must contain at least one letter";
    else if (!/\d/.test(formData.password)) tempErrors.password = "Password must contain at least one digit";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) tempErrors.password = "Password must contain at least one special character";

    // Validate Phone Number
    if (!phoneNumber) tempErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phoneNumber)) tempErrors.phone = "Phone number must be exactly 10 digits";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const fullPhoneNumber = countryCode + phoneNumber;
    try {
      const response = await axios.post('http://localhost:5000/api/softwarehouses', {
        ...formData,
        phone: fullPhoneNumber,
      });
      await axios.post('http://localhost:5000/api/users', {
        ...formData,
        phone: fullPhoneNumber,
      });
      if (response.data) {
        alert('Registration submitted successfully!');
        setFormData({ name: '', email: '', password: '', phone: '', location: '', description: '', role: 'softwareHouse', status: 1 });
        setPhoneNumber('');
        navigate('/softwarehouse/login');
      }
    } catch (error) {
      console.error('Error Registration:', error);
      alert('Failed to register. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div
      className="software-login-container flex items-center justify-center min-h-screen min-w-screen"
      style={{ backgroundImage: `url(${myImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative p-10 rounded-lg shadow-2xl bg-blue-900 bg-opacity-40 border-2 max-w-lg w-full">
        <button onClick={handleCancel} className="absolute top-2 right-2 text-white hover:bg-red-600 p-2 shadow-xl rounded-xl">
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-4xl font-bold text-center text-white mb-6">Software House Registration</h2>
        <form onSubmit={handleSubmit}>
          {['name', 'location', 'email'].map((field) => (
            <div className="mb-6" key={field}>
              <label className="block text-white text-sm font-semibold mb-2" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter your ${field}`}
                required
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Password Field with Eye Icon */}
          <div className="mb-6 relative">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
              <span className="absolute right-4 top-4 cursor-pointer text-gray-600" onClick={togglePasswordVisibility}>
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          {/* Phone Number Field with Country Code */}
          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="phone">Phone</label>
            <div className="flex">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400"
              >
                <option value="+92">🇵🇰 +92</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
              </select>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-400 ml-2"
                placeholder="Enter your phone number"
                required
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-400"
              placeholder="Describe your company"
              rows="4"
              required
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 rounded-lg shadow-lg">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
           <p className="text-white">Already have an account? <Link to="/softwarehouse/login" className="text-blue-500 hover:underline">Login here</Link></p>
       </div>
      </div>
    </div>
  );
};

export default SoftHouseRegistration;