
import React from "react";
import '../assets/css/style.css';
import AdminNavbar from "../components/navbar/AdminNavbar";

const Adminlayout = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            {/* Sidebar (AdminNavbar) */}
            <AdminNavbar />
            <main className="w-full md:w-3/4 p-6">
                {children}
            </main>
        </div>
    );
};

export default Adminlayout;
