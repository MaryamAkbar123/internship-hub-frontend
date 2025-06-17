import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const ForgotPassword = ({ onClose }) => {
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetMessage("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "https://internship-hub-backend.vercel.app/api/users/forgetpassword",
        {
          email: resetEmail,
        }
      );
      setResetMessage(response.data.message);
    } catch (error) {
      setResetMessage(
        error.response?.data?.message || "Failed to reset password."
      );
    }
  };

  return (
    <div className="relative w-full max-w-md p-10 bg-blue-900 border-2 rounded-lg shadow-2xl bg-opacity-40 hover:border-black">
      <button
        onClick={onClose}
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
            Email
          </label>
          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email to reset password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 font-bold text-white rounded-lg bg-gradient-to-r from-blue-700 to-blue-900"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
