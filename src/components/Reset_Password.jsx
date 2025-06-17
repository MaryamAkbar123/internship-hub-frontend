import React, { useState } from "react";
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons for showing and hiding password
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import myImage from "../assets/images/fypbg.jpg"; // Add your background image path here

const ResetPassword = ({ onClose }) => {
  const [resetPassword, setResetPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { token } = useParams();
  const navigate = useNavigate(); // Declare the navigate function

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetPassword) {
      setResetMessage("Please enter your new password.");
      return;
    }

    try {
      const response = await axios.post(
        `https://internship-hub-backend.vercel.app/api/users/resetpassword/${token}`,
        {
          newPassword: resetPassword,
        }
      );
      setResetMessage(response.data.message);
    } catch (error) {
      setResetMessage(
        error.response?.data?.message || "Failed to reset password."
      );
    }
  };

  // Close and navigate to the login page
  const handleClose = () => {
    navigate("/"); // Redirect to the login page
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${myImage})` }}
    >
      <div className="relative w-full max-w-md p-10 bg-blue-900 border-2 rounded-lg shadow-2xl bg-opacity-40 hover:border-black">
        {/* Close Icon */}
        <button
          onClick={handleClose} // Call handleClose for redirection
          className="absolute p-2 text-white top-2 right-2 hover:bg-red-600 rounded-xl"
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="mb-6 text-4xl font-bold text-center text-white">
          Reset Password
        </h2>

        {resetMessage && (
          <p className="p-2 mb-4 text-green-500 bg-white rounded">
            {resetMessage}
          </p>
        )}

        <form onSubmit={handleResetPassword}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-white">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your new password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} className="text-gray-400" />
                ) : (
                  <AiOutlineEye size={24} className="text-gray-400" />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-bold text-white rounded-lg bg-gradient-to-r from-blue-700 to-blue-900"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
