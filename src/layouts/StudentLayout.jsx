import React from "react";
import '../assets/css/style.css';
import StdNavbar from "../components/navbar/StudentNavbar";

const StudentLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Navbar */}
      <StdNavbar />

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;
