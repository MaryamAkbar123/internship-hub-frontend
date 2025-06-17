import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import myImage from "../assets/images/fypbg.jpg";

const StudentRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibil
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const formatName = (name) => {
        return name
            .trim()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    // Validations
    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        // Validate Name
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        } else if (!/^[A-Za-z\s'-]{2,50}$/.test(formData.name)) {
            newErrors.name = "Name must contain only letters, spaces, hyphens, or apostrophes (2-50 characters)";
            isValid = false;
        } else {
            formData.name = formatName(formData.name);
        }

        // Validate Email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        // Validate Password
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            isValid = false;
        // } else if (!/[A-Z]/.test(formData.password)) {
        //     newErrors.password = "Password must contain at least one uppercase letter";
        //     isValid = false;
        } else if (!/[a-z]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one lowercase letter";
            isValid = false;
        } else if (!/[0-9]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one number";
            isValid = false;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one special character";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post("https://internship-hub-backend.vercel.app/api/auth/register", { ...formData, role: "student" });
            setMessage(response.data.message);
            navigate("/student/login");
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="student-login-container flex items-center justify-center min-h-screen min-w-screen"
            style={{ backgroundImage: `url(${myImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <div className="relative p-10 rounded-lg shadow-2xl bg-blue-900 bg-opacity-40 hover:border-black border-2 max-w-md w-full">
                <button onClick={() => navigate('/')} className="absolute top-2 right-2 text-white hover:bg-red-600 p-2 rounded-xl">
                    <AiOutlineClose size={24} />
                </button>
                <h2 className="text-4xl font-bold text-center text-white mb-6">Student Registration</h2>

                {message && <p className='text-red-500 bg-white p-2 rounded mb-4'>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-semibold mb-2">Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your name" />
                        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-white text-sm font-semibold mb-2">Email</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email" />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                    </div>

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
                            
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold py-2 rounded-lg">
                        Register
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-white mt-2">
                            Already have an account? <span className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => navigate('/student/login')}>Login here</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentRegistration;
