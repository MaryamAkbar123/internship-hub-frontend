import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../layouts/AuthContext";
import myImage from "../assets/images/fypbg.jpg";
import ForgotPassword from "./forgetpassword"; // Import ForgotPassword Component

const StudentLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!email) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = "Invalid email format";
            isValid = false;
        }

        if (!password) {
            errors.password = "Password is required";
            isValid = false;
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
            isValid = false;
        // } else if (!/[A-Z]/.test(password)) {
        //     errors.password = "Password must contain at least one uppercase letter";
        //     isValid = false;
        } else if (!/[a-z]/.test(password)) {
            errors.password = "Password must contain at least one lowercase letter";
            isValid = false;
        } else if (!/[0-9]/.test(password)) {
            errors.password = "Password must contain at least one number";
            isValid = false;
        } else if (!/[!@#$%^&*]/.test(password)) {
            errors.password = "Password must contain at least one special character (!@#$%^&*)";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post("https://internship-hub-backend.vercel.app/api/auth/login", {
                email, password, role: "student"
            });
            login(response.data.token);
            localStorage.setItem("id", response.data.user._id);
            localStorage.setItem("name", response.data.user.name);
            localStorage.setItem("email", response.data.user.email);
            localStorage.setItem("role", response.data.user.role);
            navigate("/student/dashboard");
        } catch (error) {
            setErrMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="student-login-container flex items-center justify-center min-h-screen min-w-screen"
            style={{ backgroundImage: `url(${myImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            {isResetMode ? (
                <ForgotPassword onClose={() => setIsResetMode(false)} />
            ) : (
                <div className="relative p-10 rounded-lg shadow-2xl bg-blue-900 bg-opacity-40 hover:border-black border-2 max-w-md w-full">
                    <button onClick={() => navigate('/')} className="absolute top-2 right-2 text-white hover:bg-red-600 p-2 rounded-xl">
                        <AiOutlineClose size={24} />
                    </button>
                    <h2 className="text-4xl font-bold text-center text-white mb-6">Student Login</h2>

                    {errMessage && <p className='text-red-500 bg-white p-2 rounded mb-4'>{errMessage}</p>}

                    <form onSubmit={handleLogin}>
                        <div className="mb-6">
                            <label className="block text-white text-sm font-semibold mb-2">Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your Email" />
                            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-white text-sm font-semibold mb-2">Password</label>
                            <input type={showPassword ? 'text' : 'password'} value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password" />
                            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
                            <div className="items-center mt-2">
                                <input type="checkbox" id="showPassword" checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)} className="mr-2" />
                                <label htmlFor="showPassword" className="text-white text-sm">Show Password</label>
                                <p className="text-blue-500 float-end cursor-pointer hover:underline" onClick={() => setIsResetMode(true)}>
                                Forgot Password?</p>
                            </div>
                            
                        </div>

                        <button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold py-2 rounded-lg">
                            Login
                        </button>
                        <div className="text-center mt-4">
                            <p className="text-center mt-4 cursor-pointer text-white">Don't have an account?
                                <span className="text-center mt-4 cursor-pointer hover:underline text-blue-500" onClick={() => navigate("/student/registration")}>Register here</span>
                             </p>
                             
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StudentLogin;
