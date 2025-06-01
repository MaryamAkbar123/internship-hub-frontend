import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUserGraduate,
  FaBriefcase,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../../assets/images/fyplogo1.png";
import Logout from "../../pages/Logout";

const AdminNavbar = () => {
  return (
    <aside className="w-full md:w-1/4 bg-blue-950 text-white p-4 min-h-screen shadow-lg">
      {/* Logo and Title */}
          <div className="flex items-center mb-4">
      <img
        src={Logo}
        alt="Logo"
        className="mr-2 rounded-full border-2 border-white w-20 md:w-24"
      />
      
      <div>
        <h3 className="text-xl md:text-2xl font-semibold">Internship Hub</h3>
        <p className="text-xl md:text-2xl font-semibold">(Admin Dashboard)</p>
      </div>
    </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2 text-lg ">
          <NavItem to="/admin/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
          <NavItem to="/admin/software-houses" icon={<FaBuilding />} label="Manage Software Houses" />
          <NavItem to="/admin/registered-users" icon={<FaUserGraduate />} label="Manage Students" />
          <NavItem to="/admin/internship-lists" icon={<FaBriefcase />} label="Internship Listings" />
          <NavItem to="/admin/applications" icon={<FaClipboardList />} label="Manage SH Applications" />
          <li>
            <div className="flex items-center hover:bg-blue-700 p-2 rounded transition cursor-pointer">
              <FaSignOutAlt className="mr-3" />
              <Logout />
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// NavItem Reusable Component
const NavItem = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-2 rounded transition font-medium 
         hover:bg-blue-700 text-white no-underline ${
           isActive ? "bg-blue-800" : ""
         }`
      }
    >
      <span className="mr-3 text-lg">{icon}</span>
      {label}
    </NavLink>
  </li>
);


export default AdminNavbar;
