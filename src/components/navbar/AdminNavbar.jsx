// import React from "react";
// import { Link } from "react-router-dom";
// import { 
//   FaTachometerAlt, 
//   FaBuilding, 
//   FaUserGraduate, 
//   FaUsers,
//   FaBriefcase,
//   FaFileAlt,
//   FaClipboardList,
//   FaSignOutAlt
// } from "react-icons/fa";
// import Logo from "../../assets/images/fyplogo1.png";
// import Logout from "../../pages/Logout";

// const AdminNavbar = () => {
//   return (
//     <aside className="w-full md:w-1/4 bg-blue-950 text-white p-3">
//       <div className="flex items-center mb-3">
//         <img
//           src={Logo}
//           alt="Logo"
//           className="mr-2 rounded-full border-2 border-white w-24 md:w-28"
//         />
//         <h3 className="text-xl md:text-2xl">Internship Hub</h3>
//       </div>
//       <nav>
//         <ul className="space-y-1">
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/admin/dashboard" className="flex items-center" style={styles.link}>
//               <FaTachometerAlt className="mr-2" />
//               Dashboard
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/admin/software-houses" className="flex items-center" style={styles.link}>
//               <FaBuilding className="mr-2" />
//               Manage Software Houses
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/admin/registered-users" className="flex items-center" style={styles.link}>
//               <FaUserGraduate className="mr-2" />
//               Manage Students
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition" hidden>
//             <Link to="/admin/registered-users" className="flex items-center" style={styles.link}>
//               <FaUsers className="mr-2" />
//               Registered Users
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/admin/internship-lists" className="flex items-center" style={styles.link}>
//               <FaBriefcase className="mr-2" />
//               Internship Listings
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition" hidden>
//             <Link to="/admin/registrations" className="flex items-center" style={styles.link}>
//               <FaFileAlt className="mr-2" />
//               Registrations
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/admin/applications" className="flex items-center" style={styles.link}>
//               <FaClipboardList className="mr-2" />
//               Manage SH Applications
//             </Link>
//           </li>
//           <li hidden className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/admin/report" className="flex items-center" style={styles.link}>
//               <FaFileAlt className="mr-2" />
//               Report
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <div className="flex items-center">
//               <FaSignOutAlt className="mr-2" />
//               <Logout />
//             </div>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// // Simple Inline Styles
// const styles = {
//   link: {
//     textDecoration: 'none',
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// };

// export default AdminNavbar;import React from "react";
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
