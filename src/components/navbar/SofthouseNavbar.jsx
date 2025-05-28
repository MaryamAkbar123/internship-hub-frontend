


// import React from "react";
// import { Link } from "react-router-dom";
// import ChatBot from "../ChatBot";
// import Logo from "../../assets/images/fyplogo1.png";
// import Logout from "../../pages/Logout";

// const SHNavbar = () => {
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
//             <Link to="/softwarehouse/dashboard" style={styles.link}>
//               Dashboard
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/softwarehouse/internships" style={styles.link}>
//               Internships
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/softwarehouse/applications" style={styles.link}>
//               Applications
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition" >
//             <Link to="/softwarehouse/assign-task" style={styles.link}>
//               Assign Tasks
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition" >
//             <Link to="/softwarehouse/approvedstudents" style={styles.link}>
//               Approved Students
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition" >
//             <Link to="/softwarehouse/tracktasks" style={styles.link}>
//               Track Tasks
//             </Link>
//           </li>
//           <li className="hover:bg-blue-600 rounded p-2 transition">
//             <Link to="/softwarehouse/profile" style={styles.link}>
//              Profile
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

// export default SHNavbar;


import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaClipboardList,
  FaTasks,
  FaUserCheck,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../../assets/images/fyplogo1.png";
import Logout from "../../pages/Logout";

const SHNavbar = () => {
  return (
    <aside className="w-full md:w-1/4 bg-blue-950 text-white p-3 min-h-screen">
      {/* <div className="flex items-center mb-4">
        <img
          src={Logo}
          alt="Logo"
          className="mr-2 rounded-full border-2 border-white w-20 md:w-24"
        />
        <h3 className="text-xl md:text-2xl font-semibold">Internship Hub</h3>
        <p className="text-xl md:text-2xl font-semibold" >Software Houses</p>
      </div> */}
          <div className="flex items-center mb-4">
          <img
            src={Logo}
            alt="Logo"
            className="mr-2 rounded-full border-2 border-white w-20 md:w-24"
          />
          
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Internship Hub</h3>
            <p className="text-xl md:text-2xl font-semibold">(Software Houses)</p>
          </div>
        </div>

      <nav>
        <ul className="space-y-1">
          <NavItem to="/softwarehouse/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
          <NavItem to="/softwarehouse/internships" icon={<FaBriefcase />} label="Internships" />
          <NavItem to="/softwarehouse/applications" icon={<FaClipboardList />} label="Applications" />
          <NavItem to="/softwarehouse/assign-task" icon={<FaTasks />} label="Assign Tasks" />
          <NavItem to="/softwarehouse/approvedstudents" icon={<FaUserCheck />} label="Approved Students" />
          <NavItem to="/softwarehouse/tracktasks" icon={<FaChartLine />} label="Track Tasks" />
          <NavItem to="/softwarehouse/profile" icon={<FaUserCircle />} label="Profile" />
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

export default SHNavbar;
