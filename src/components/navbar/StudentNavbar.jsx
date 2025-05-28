

// import React from "react";
// import { Link } from "react-router-dom";
// import ChatBot from "../ChatBot";
// import Logo from "../../assets/images/fyplogo1.png";
// import Logout from "../../pages/Logout";

// const StdNavbar = () => {
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
//             <Link to="/student/dashboard" style={styles.link}>
//               Dashboard
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/student/internships" style={styles.link}>
//               Internships
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/student/assigned-task" style={styles.link}>
//               Assigned Tasks
//             </Link>
//           </li>
//            <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/student/achievements" style={styles.link}>
//               Achievements
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition" >
//             <Link to="/student/profile" style={styles.link}>
//               Profile
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Logout />
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

// export default StdNavbar;


import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaTasks,
  FaTrophy,
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";
import Logo from "../../assets/images/fyplogo1.png";
import Logout from "../../pages/Logout";

const StdNavbar = () => {
  return (
    <aside className="w-full md:w-1/4 bg-blue-950 text-white p-3 min-h-screen">
          <div className="flex items-center mb-4">
      <img
        src={Logo}
        alt="Logo"
        className="mr-2 rounded-full border-2 border-white w-20 md:w-24"
      />
      
      <div>
        <h3 className="text-xl md:text-2xl font-semibold">Internship Hub</h3>
        <p className="text-xl md:text-2xl font-semibold">(Student Dashboard)</p>
      </div>
    </div>
      <nav>
        <ul className="space-y-1">
          <NavItem to="/student/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
          <NavItem to="/student/internships" icon={<FaBriefcase />} label="Internships" />
          <NavItem to="/student/assigned-task" icon={<FaTasks />} label="Assigned Tasks" />
          <NavItem to="/student/enrolled-internships" icon={<FaClipboardList />} label="Enrolled Internships" />
          <NavItem to="/student/applied-internships" icon={<FaCheckCircle />} label="Applies Internships" />
          <NavItem to="/student/achievements" icon={<FaTrophy />} label="Achievements" />
          <NavItem to="/student/profile" icon={<FaUserCircle />} label="Profile" />
          <li className="hover:bg-blue-700 rounded p-2 transition flex items-center cursor-pointer text-white font-medium">
            <FaSignOutAlt className="mr-2" />
            <Logout />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// Reusable Nav Item
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

export default StdNavbar;
