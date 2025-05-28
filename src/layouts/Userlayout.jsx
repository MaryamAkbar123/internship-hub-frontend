import React from "react";
import UserNavbar from "../components/UserNavbar";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <UserNavbar />
      
      {/* Main Content Area */}
      <div className="p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
