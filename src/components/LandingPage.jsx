// // // import React, { useEffect, useState, useRef,scrollRef } from "react";
// // // import { FaCaretDown, FaBars, FaChevronLeft, FaChevronRight, FaPhoneAlt,FaSearch,FaEnvelope, FaComments  } from "react-icons/fa";
// // // import "../assets/css/landing.css";
// // // import myImage from "../assets/images/fypbg.jpg";
// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import Chatbot from '../components/ChatBot';

// // // import axios from "axios";

// // // const certificates = [
// // //   { id: 1, title: "Certificate 1", img: "src/assets/images/c1.png" },
// // //   { id: 2, title: "Certificate 2", img: "src/assets/images/c2.png" },
// // //   { id: 3, title: "Certificate 3", img: "src/assets/images/c3.png" },
// // //   { id: 4, title: "Certificate 4", img: "src/assets/images/c10.png" },
// // //   { id: 5, title: "Certificate 5", img: "src/assets/images/c5.png" },
// // //   { id: 6, title: "Certificate 6", img: "src/assets/images/c1.png" },
// // //   { id: 7, title: "Certificate 7", img: "src/assets/images/c7.png" },
// // //   { id: 8, title: "Certificate 8", img: "src/assets/images/c8.png" },
// // //   { id: 9, title: "Certificate 9", img: "src/assets/images/c9.png" },
// // //   { id: 10, title: "Certificate 10", img: "src/assets/images/c2.png" },
// // //   { id: 11, title: "Certificate 11", img: "src/assets/images/c5.png" },
// // // ];

// // // const LandingPage = () => {
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [filteredCertificates, setFilteredCertificates] =
// // //     useState(certificates);
// // //   const [dropdownOpen, setDropdownOpen] = useState(false);
// // //   const [currentIndex, setCurrentIndex] = useState(0);
// // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// // //   const [ internships, setInternships] =  useState([]);

// // //   const navigate = useNavigate();
// // //   const homeRef = useRef(null);
// // //   const aboutRef = useRef(null);
// // //   const servicesRef = useRef(null);
// // //   const internshipsRef = useRef(null);
// // //   const contactRef = useRef(null);

// // //   const fetchInternships = async () => {
// // //     try {
// // //     const response = await axios.get('http://localhost:5000/api/internships');
// // //     setInternships(response.data);
// // //     console.log(response.data)
// // //     } catch (error) {
// // //     console.error('Failed to fetch internships:', error);
// // //     }
// // // };

// // //   const handleSearch = (term) => {
// // //     const filtered = certificates.filter((certificate) =>
// // //       certificate.title.toLowerCase().includes(term.toLowerCase())
// // //     );
// // //     setFilteredCertificates(filtered);
// // //   };

// // //   const handleIconClick = () => {
// // //     handleSearch(searchTerm);
// // //   };

// // //   const scrollToSection = (sectionRef) => {
// // //     sectionRef.current.scrollIntoView({ behavior: "smooth" });
// // //   };

// // //   const toggleDropdown = () => {
// // //     setDropdownOpen(!dropdownOpen);
// // //   };

// // //   const handleLoginOptionClick = (role) => {
// // //     if (role === "Admin") navigate("/admin/login");
// // //     if (role === "Software House") navigate("/softwarehouse/registeration");
// // //     if (role === "Student") navigate("/student/login");
// // //     setDropdownOpen(false);
// // //   };

// // //     const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State to control the visibility of the chatbot
  
// // //     const toggleChatbot = () => {
// // //       setIsChatbotOpen(!isChatbotOpen); // Toggle chatbot visibility when the button is clicked
// // //     };

// // //   const navigateToPreviousCertificate = () => {
// // //     setCurrentIndex(
// // //       (currentIndex - 1 + filteredCertificates.length) %
// // //         filteredCertificates.length
// // //     );
// // //   };
// // //   const toggleMobileMenu = () => {
// // //     setIsMobileMenuOpen(!isMobileMenuOpen);
// // //   };
// // //   const navigateToNextCertificate = () => {
// // //     setCurrentIndex(
// // //       (prevIndex) => (prevIndex + 1) % filteredCertificates.length
// // //     );
// // //   };
// // //   useEffect(() => {
// // //     fetchInternships();
// // //     const interval = setInterval(() => {
// // //       navigateToNextCertificate();
// // //     }, 5000); // Change certificate every 5 seconds

// // //     return () => clearInterval(interval); // Cleanup interval on component unmount
// // //   }, []);
// // //   const InternshipsSection = ({ internshipsRef, searchTerm, setSearchTerm, handleIconClick }) => {
// // //     const scrollRef = useRef(null);
  
// // //     useEffect(() => {
// // //       const scrollContainer = scrollRef.current;
  
// // //       const scroll = () => {
// // //         if (scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth) {
// // //           scrollContainer.scrollLeft += 1; // Scrolls to the right
// // //         } else {
// // //           scrollContainer.scrollLeft = 0; // Resets to the beginning
// // //         }
// // //       };
  
// // //       const intervalId = setInterval(scroll, 30); // Adjust speed by changing the interval
  
// // //       return () => clearInterval(intervalId); // Clean up the interval on component unmount
// // //     }, []);}


// // //   return (
// // //     <div
// // //     style={{
// // //       backgroundImage: `url(${myImage})`,
// // //       backgroundPosition: "center",
// // //       backgroundSize: "cover",
// // //       height: "100vh",
// // //       backgroundRepeat: "no-repeat",
// // //       position: "relative",
// // //     }}
// // //   >_
// // //     <div
// // //       style={{
// // //         position: "absolute",
// // //         top: 0,
// // //         left: 0,
// // //         right: 0,
// // //         bottom: 0,
// // //         backgroundColor: "rgba(0, 0, 255, 0.1)",
// // //         backdropFilter: "blur(6px)",
// // //         height: "910px",
// // //         zIndex: 1,
// // //       }}
// // //     />
// // //     <div style={{ position: "relative", zIndex: 2, color: "white" }}>
// // //       {/* Logo */}
// // //       <img
// // //         src="src/assets/images/fyplogo1.png"
// // //         alt="Logo" hidden
// // //         className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl border-white border-2 absolute top-4 left-4 md:top-8 md:left-8"
// // //       />

// // //       {/* Navbar */}
// // //       <nav className="bg-blue-950 p-2 shadow-lg rounded-xl mt-10 md:mt-4 relative">
// // //       <div className="flex justify-between items-center">
// // //         {/* Logo */}
// // //         <img src="src/assets/images/fyplogo1.png" alt="Logo" className="h-20 w-20 rounded-full object-cover" />
// // //         {/* Mobile Hamburger Icon */}
// // //         <button
// // //           className="md:hidden text-white justify-end ml-80"
// // //           onClick={toggleMobileMenu}
// // //         >
// // //           <FaBars size={24} />
// // //         </button>
// // //           {/* Navbar links */}
// // //           <ul
// // //           className={`flex flex-col md:flex-row items-center justify-end space-y-4 md:space-y-0 md:space-x-8 text-white flex-grow transition-transform duration-300 ease-in-out ${
// // //             isMobileMenuOpen ? "block" : "hidden md:flex"
// // //           }`}
// // //         >
// // //           {/* Home */}
// // //           <li
// // //             className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
// // //             onClick={() => scrollToSection(homeRef)}
// // //           >
// // //             Home
// // //           </li>
// // //           {/* About Us */}
// // //           <li
// // //             className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
// // //             onClick={() => scrollToSection(aboutRef)}
// // //           >
// // //             About Us
// // //           </li>
// // //           {/* Services */}
// // //           <li
// // //             className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
// // //             onClick={() => scrollToSection(servicesRef)}
// // //           >
// // //             Services
// // //           </li>
// // //           {/* Internships */}
// // //           <li
// // //             className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
// // //             onClick={() => scrollToSection(internshipsRef)}
// // //           >
// // //             Internships
// // //           </li>
// // //           {/* Contact Us */}
// // //           <li
// // //             className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
// // //             onClick={() => scrollToSection(contactRef)}
// // //           >
// // //             Contact Us
// // //           </li>
// // //           {/* Login Button */}
// // //           <button
// // //             className="flex items-center bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition transform hover:scale-105 duration-300 ease-in-out border-2 border-white hover:shadow-xl w-full md:w-auto justify-center"
// // //             onClick={toggleDropdown}
// // //           >
// // //             Login <FaCaretDown className="ml-2" />
// // //           </button>
// // //         </ul>
// // //       </div>

      

// // //       {/* Dropdown Menu */}
// // //       {dropdownOpen && (
// // //         <div className="absolute right-0 bg-gradient-to-r from-blue-950 to-blue-800 shadow-lg rounded-lg mt-1 w-48 z-10 text-white">
// // //           <ul className="py-2">
// // //             <li
// // //               className="px-4 py-2 hover:bg-gradient-to-r from-blue-700 to-blue-950 cursor-pointer"
// // //               onClick={() => handleLoginOptionClick("Admin")}
// // //             >
// // //               Admin
// // //             </li>
// // //             <li
// // //               className="px-4 py-2 hover:bg-gradient-to-r from-blue-700 to-blue-950 cursor-pointer"
// // //               onClick={() => handleLoginOptionClick("Software House")}
// // //             >
// // //               Software House
// // //             </li>
// // //             <li
// // //               className="px-4 py-2 hover:bg-gradient-to-r from-blue-700 to-blue-950 cursor-pointer"
// // //               onClick={() => handleLoginOptionClick("Student")}
// // //             >
// // //               Student
// // //             </li>
// // //           </ul>
// // //         </div>
// // //       )}
// // //     </nav>
// // //       {/* Search Bar */}
// // //       <div className="flex justify-center mt-2 mb-1 relative w-auto">
// // //         <input
// // //           type="text"
// // //           placeholder="Search certificates..."
// // //           value={searchTerm}
// // //           onChange={(e) => setSearchTerm(e.target.value)}
// // //           className="border p-3 rounded-lg w-1/3 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 border-blue-900 text-black"
// // //         />
// // //         <FaSearch
// // //           className="relative right-9 top-6 transform -translate-y-1/2 text-blue-900 cursor-pointer"
// // //           onClick={handleSearch}
// // //         />
// // //       </div>

// // //       {/* Home section */}
// // //       <section
// // //         ref={homeRef}
// // //         className="min-h-screen p-4 md:p-8 flex flex-col md:flex-row justify-between items-center"
// // //       >
// // //         <div className="max-w-full w-full md:w-11/12 text-center md:text-left flex flex-col items-center md:items-start md:ml-40 mt-0">
// // //           <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white animate-fadeIn">
// // //             Welcome to
// // //           </h1>
// // //           <h2 className="text-5xl md:text-6xl mb-4 md:mb-6 w-full text-white animate-fadeIn font-bold">
// // //             CUI Internship Hub
// // //           </h2>
// // //           <p className="text-xl md:text-2xl mb-8 md:mb-64 text-white w-full mt-4 animate-fadeIn font-bold">
// // //             We connect students with the best software houses
// // //           </p>
// // //         </div>

// // //         {/* Certificate Display Section */}
// // //         <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center relative mt-8 md:mt-0">
// // //   <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-4 md:space-y-0">
    
// // //     {/* Previous Button with Icon */}
// // //     <button
// // //       className="bg-blue-900 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-transform duration-300 ease-in-out border-2 border-white hover:scale-105 hover:shadow-xl flex items-center justify-center"
// // //       onClick={() =>
// // //         setCurrentIndex(
// // //           (prevIndex) =>
// // //             (prevIndex - 1 + filteredCertificates.length) %
// // //             filteredCertificates.length
// // //         )
// // //       }
// // //     >
// // //       <FaChevronLeft className="mr-2" /> {/* Icon for Previous Button */}
// // //       Previous
// // //     </button>

// // //     {/* Certificate Display Section */}
// // //     <div className="relative">
// // //       <div className="transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden bg-white rounded-lg shadow-md">
// // //         {filteredCertificates.length > 0 && (
// // //           <div className="p-4 md:p-6 flex flex-col items-center space-y-4">
// // //             <img
// // //               src={filteredCertificates[currentIndex].img}
// // //               alt={filteredCertificates[currentIndex].title}
// // //               className="h-48 md:h-64 w-full object-cover rounded-md"
// // //             />
// // //             <div className="text-center w-full">
// // //               <h2 className="font-semibold text-lg md:text-xl text-gray-800">
// // //                 {filteredCertificates[currentIndex].title}
// // //               </h2>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>

// // //     {/* Next Button with Icon */}
// // //     <button
// // //       className="bg-blue-900 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-transform duration-300 ease-in-out border-2 border-white hover:scale-105 hover:shadow-xl flex items-center justify-center"
// // //       onClick={navigateToNextCertificate}
// // //     >
// // //       Next
// // //       <FaChevronRight className="ml-2" /> {/* Icon for Next Button */}
// // //     </button>

// // //   </div>
  
// // //   <button
// // //         className="sticky-chatbot-btn"
// // //         onClick={toggleChatbot}
// // //       >
// // //         <FaComments size={24} color="white" /> {/* Chat icon */}
// // //       </button>

// // //       {/* Conditionally render the chatbot */}
// // //       {isChatbotOpen && <Chatbot />}
 
// // // </div>

// // //       </section>
// // //     </div>
  
      

// // //       {/* about section */}
// // //       <section
// // //         ref={aboutRef}
// // //         className="min-h-screen flex flex-col md:flex-row p-8  bg-gray-200 transition duration-300 ease-in-out"
// // //       >
// // //         <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
// // //           <img
// // //             src="\src\assets\images\intern2.webp"
// // //             alt="CUI Internship Hub"
// // //             className="rounded-lg shadow-lg w-3/4 h-auto transition-transform transform hover:scale-105"
// // //           />
// // //         </div>
// // //         <div className="md:w-1/2 text-center mt-5 shadow-lg bg-blue-950  rounded-lg hover:scale-105 p-10 transition-transform duration-300  hover:-translate-y-1">
// // //           <h2 className="text-4xl font-bold text-white hover:text-gray-100 transition duration-300 ease-in-out">
// // //             About Us
// // //           </h2>
// // //           <p className="text-lg mt-3 text-justify text-white  transition-transform duration-300 hover:-translate-y-1 ">
// // //             CUI Internship Hub is an innovative web-based platform developed to
// // //             bridge the gap between students and internship providers. Our
// // //             mission is to streamline the internship application process by
// // //             providing a user-friendly interface where students can easily
// // //             register, browse available internships, and apply for opportunities
// // //             that align with their skills and aspirations. For software houses,
// // //             our platform offers a seamless experience to post internship
// // //             openings, manage applications, and connect with potential
// // //             candidates. With features like integrated chatbot communication and
// // //             a recognition system for student achievements, we aim to enhance the
// // //             overall internship experience for all stakeholders. At CUI
// // //             Internship Hub, we are committed to fostering valuable connections
// // //             that empower students to succeed in their careers while helping
// // //             organizations discover and nurture emerging talent.
// // //           </p>
// // //         </div>
// // //       </section>
// // //       {/* Services Section */}
// // //       <section
// // //         ref={servicesRef}
// // //         className="min-h-screen flex flex-col p-8 bg-gray-200"
// // //       >
// // //         <h2 className="text-4xl font-bold text-blue-900 text-center">
// // //           Services
// // //         </h2>
// // //         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {/* Service 1: */}
// // //           <div className="bg-blue-950 p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[350px]">
// // //             <div className="rounded-full bg-blue-100 text-blue-600 p-3 mb-4">
// // //               <svg
// // //                 xmlns="http://www.w3.org/2000/svg"
// // //                 className="h-6 w-6"
// // //                 fill="none"
// // //                 viewBox="0 0 24 24"
// // //                 stroke="currentColor"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.958 9.958 0 01-4.5-2.318m-.636-6.402a11.924 11.924 0 00-.524 7.6c.582 2.486 2.394 4.097 4.5 5.699a9.958 9.958 0 01 7.3-4.9"
// // //                 />
// // //               </svg>
// // //             </div>
// // //             <h3 className="text-2xl font-semibold text-white text-center">
// // //               Student Registration
// // //             </h3>
// // //             <p className="mt-2 text-white text-center">
// // //               A seamless registration process that allows students to create
// // //               their profiles and showcase their skills, making it easier to find
// // //               suitable internships.
// // //             </p>
// // //           </div>

// // //           {/* Service 2: Mentorship & Guidance */}
// // //           <div className="bg-blue-950  p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[300px]">
// // //             <div className="rounded-full bg-green-100 text-green-600 p-3 mb-4">
// // //               <svg
// // //                 xmlns="http://www.w3.org/2000/svg"
// // //                 className="h-6 w-6"
// // //                 fill="none"
// // //                 viewBox="0 0 24 24"
// // //                 stroke="currentColor"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
// // //                 />
// // //               </svg>
// // //             </div>
// // //             <h3 className="text-2xl font-semibold text-white text-center">
// // //               Internship Management
// // //             </h3>
// // //             <p className="mt-2 text-white text-center">
// // //               Software houses can easily post, manage, and track internship
// // //               opportunities, simplifying the process of finding the right
// // //               candidates.
// // //             </p>
// // //           </div>

// // //           {/* Service 3: Community Events */}
// // //           <div className="bg-blue-950  p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[300px]">
// // //             <div className="rounded-full bg-yellow-100 text-yellow-600 p-3 mb-4">
// // //               <svg
// // //                 xmlns="http://www.w3.org/2000/svg"
// // //                 className="h-6 w-6"
// // //                 fill="none"
// // //                 viewBox="0 0 24 24"
// // //                 stroke="currentColor"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2m0-5h5a2 2 0 012 2v3m-3 4h6m-6 0l-1 1h-2a1 1 0 01-1-1v-3a1 1 0 011-1H7v1a1 1 0 01-1 1m3 0h6m-3 0l1-1h2a1 1 0 011 1v2a1 1 0 01-1 1m-3 0h-6m-1 0l1 1h2a1 1 0 011 1v3m-4 0h4m-6 0l-1 1h-2a1 1 0 01-1-1v-3a1 1 0 011-1H7v1a1 1 0 01-1 1m3 0h12"
// // //                 />
// // //               </svg>
// // //             </div>
// // //             <h3 className="text-2xl font-semibold text-white text-center">
// // //               Chatbot Communication
// // //             </h3>
// // //             <p className="mt-2  text-white text-center">
// // //               Our integrated chatbot facilitates real-time communication between
// // //               students and software houses, ensuring efficient query resolution.
// // //             </p>
// // //           </div>

// // //           {/* Service 4: Task Assignment and Tracking */}
// // //           <div className="bg-blue-950  p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[350px]">
// // //             <div className="rounded-full bg-red-100 text-red-600 p-3 mb-4">
// // //               <svg
// // //                 xmlns="http://www.w3.org/2000/svg"
// // //                 className="h-6 w-6"
// // //                 fill="none"
// // //                 viewBox="0 0 24 24"
// // //                 stroke="currentColor"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
// // //                 />
// // //               </svg>
// // //             </div>
// // //             <h3 className="text-2xl font-semibold  text-white text-center">
// // //               Task Assignment & Tracking
// // //             </h3>
// // //             <p className="mt-2  text-white text-center">
// // //               Assign tasks to team members and track their progress in
// // //               real-time, ensuring efficient project management.
// // //             </p>
// // //           </div>

// // //           {/* Service 5: Student Recognition */}
// // //           <div className="bg-blue-950  p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[300px]">
// // //             <div className="rounded-full bg-purple-100 text-purple-600 p-3 mb-4">
// // //               <svg
// // //                 xmlns="http://www.w3.org/2000/svg"
// // //                 className="h-6 w-6"
// // //                 fill="none"
// // //                 viewBox="0 0 24 24"
// // //                 stroke="currentColor"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// // //                 />
// // //               </svg>
// // //             </div>
// // //             <h3 className="text-2xl font-semibold  text-white text-center">
// // //               Student Recognition
// // //             </h3>
// // //             <p className="mt-2  text-white text-center ">
// // //               Recognize and reward students for their achievements, motivating
// // //               them to excel in their studies.
// // //             </p>
// // //           </div>

// // //           {/* Service 6: Skill Development Programs */}
// // //           <div className="bg-blue-950  p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[300px]">
// // //             <div className="rounded-full bg-indigo-100 text-indigo-600 p-3 mb-4">
// // //               <svg
// // //                 xmlns="http://www.w3.org/2000/svg"
// // //                 className="h-6 w-6"
// // //                 fill="none"
// // //                 viewBox="0 0 24 24"
// // //                 stroke="currentColor"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d="M16 12H8m0 0V8m0 4v4m3 0h2a2 2 0 002-2v-4m0 0h1a1 1 0 011 1v5a1 1 0 01-1 1h-3m0 0v-4m-3 0H7a2 2 0 00-2 2v4a2 2 0 002 2h8"
// // //                 />
// // //               </svg>
// // //             </div>
// // //             <h3 className="text-2xl font-semibold  text-white text-center">
// // //               Skill Development
// // //             </h3>
// // //             <p className="mt-2  text-white text-center ">
// // //               Our platform offers various skill development programs to help
// // //               students enhance their competencies and increase employability.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </section>
// // //       {/* Internships Section */}
// // //       <section
// // //       ref={internshipsRef}
// // //       className="min-h-screen flex flex-col p-8 bg-gray-200"
// // //     >
// // //       <h2 className="text-4xl font-bold text-blue-900 text-center">
// // //         Internships
// // //       </h2>
// // //       <p className="text-lg mt-4 text-gray-700 text-center">
// // //         Explore exciting internship opportunities that match your skills and
// // //         career goals.
// // //       </p>
// // //       {/* Search Bar */}
// // //       <div className="flex justify-center mt-2 mb-1 relative w-auto">
// // //         <input
// // //           type="text"
// // //           placeholder="Search certificates..."
// // //           value={searchTerm}
// // //           onChange={(e) => setSearchTerm(e.target.value)}
// // //           className="border p-3 rounded-lg w-1/3 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 border-blue-900"
// // //         />
// // //         <FaSearch
// // //           className="relative right-9 top-6 transform -translate-y-1/2 text-blue-900 cursor-pointer"
// // //           onClick={handleIconClick}
// // //         />
// // //       </div>
// // //       <div className="mt-8 overflow-x-hidden"> {/* Hide overflow for the parent */}
// // //         <div ref={scrollRef} className="flex space-x-6 animate-scroll">
// // //           {/* Internship 1 */}
// // //           {internships.map((item) => (
// // //           <div key={item._id} className="bg-blue-950 p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col max-h-[550px] min-w-[350px]">
// // //             <img
// // //               src={`src/assets/images/${item?.image??'p1.jpeg'}`}
// // //               alt="Internship 1"
// // //               className="h-[300px] w-full object-cover rounded-t-lg"
// // //             />
// // //             <h3 className="text-2xl font-semibold text-white mt-4">
// // //               {item.title}
// // //             </h3>
// // //             <p className="mt-2 text-white">
// // //               {item.description}
// // //             </p>
// // //             <a
// // //               href="#"
// // //               className="mt-auto bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
// // //             >
// // //               Apply Now
// // //             </a>
// // //           </div>
// // //           ))}
  
          
          
// // //         </div>
// // //       </div>
// // //       </section>
// // // {/* Contact Us Section */}
// // // <section ref={contactRef} className="min-h-screen p-6 bg-gray-200 flex flex-col items-center">
// // //   <h2 className="text-4xl font-bold text-blue-900 text-center">Contact Us</h2>
// // //   <p className="text-lg mt-2 text-blue-900 text-center">
// // //     Get in touch with us for any queries or assistance.
// // //   </p>

// // //   <div className="mt-6 flex flex-wrap justify-center items-center gap-10 w-full max-w-5xl">
// // //     {/* Contact Form */}
// // //     <form className="p-6 rounded-lg shadow-md bg-blue-950 min-h-[500px] w-full max-w-[400px]">
// // //       <div className="grid grid-cols-1 gap-4">
// // //         <div>
// // //           <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
// // //           <input
// // //             type="text"
// // //             id="name"
// // //             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
// // //             required
// // //           />
// // //         </div>
// // //         <div>
// // //           <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
// // //           <input
// // //             type="email"
// // //             id="email"
// // //             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
// // //             required
// // //           />
// // //         </div>
// // //       </div>

// // //       <div className="mt-4">
// // //         <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
// // //         <textarea
// // //           id="message"
// // //           rows="4"
// // //           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
// // //           required
// // //         ></textarea>
// // //       </div>

// // //       <button
// // //         type="submit"
// // //         className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:bg-gray-200 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:translate-y-1 border-white border-solid hover:border-2 mt-6"
// // //       >
// // //         Send Message
// // //       </button>
// // //     </form>

// // //     {/* Contact Info & Social Media */}
// // //     <div className="flex flex-col items-center space-y-6 w-full max-w-[400px]">
// // //       {/* Email & Phone */}
// // //       <div className="flex flex-col items-center space-y-2">
// // //         <div className="flex items-center space-x-2">
// // //           <FaEnvelope className="h-6 w-6 text-blue-900" />
// // //           <span className="text-lg text-blue-900">cui@internshiphub.com</span>
// // //         </div>
// // //         <div className="flex items-center space-x-2">
// // //           <FaPhoneAlt className="h-6 w-6 text-blue-900" />
// // //           <span className="text-lg text-blue-900">+92 0300 0000000</span>
// // //         </div>
// // //       </div>

// // //       {/* Social Media Links */}
// // //       <div className="flex space-x-4">
// // //         <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
// // //           <img src="src/assets/images/linkedin.png" alt="LinkedIn" className="h-10 w-10 rounded-full border-white border-2 hover:scale-110 hover:shadow-lg" />
// // //         </a>
// // //         <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
// // //           <img src="src/assets/images/facebook.png" alt="Facebook" className="h-10 w-10 rounded-full border-white border-2 hover:scale-110 hover:shadow-lg" />
// // //         </a>
// // //         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
// // //           <img src="src/assets/images/twitter.png" alt="Twitter" className="h-10 w-10 rounded-full border-white border-2 hover:scale-110 hover:shadow-lg" />
// // //         </a>
// // //         <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer">
// // //           <img src="src/assets/images/whatsapp.png" alt="WhatsApp" className="h-10 w-10 rounded-full border-white border-2 hover:scale-110 hover:shadow-lg" />
// // //         </a>
// // //       </div>
// // //     </div>
// // //   </div>
// // // </section>

// // //       {/* Footer */}
// // //       <footer className="bg-gradient-to-r from-blue-800 to-blue-950 text-white p-6 mt-8 shadow-lg animate-slide-in-up">
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// // //           {/* Quick Navigation */}
// // //           <div>
// // //             <h3 className="text-lg font-semibold mb-2 text-white shadow-xl hover:text-blue-500">
// // //               Quick Navigation
// // //             </h3>
// // //             <ul className="space-y-2">
// // //               {["Home", "About Us", "Services", "Internships", "FAQ"].map(
// // //                 (item) => (
// // //                   <li key={item} className="hover:text-gray-400 cursor-pointer">
// // //                     <a href={`#${item.toLowerCase().replace(/\s+/g, "")}`} className="text-white" style={{ textDecoration:'none' }}>
// // //                       {item}
// // //                     </a>
// // //                   </li>
// // //                 )
// // //               )}
// // //             </ul>
// // //           </div>

// // //           {/* Information */}
// // //           <div>
// // //             <h3 className="text-lg font-semibold mb-2 text-white shadow-xl hover:text-blue-500">
// // //               Information
// // //             </h3>
// // //             <ul className="space-y-2">
// // //               {[
// // //                 "support@internshiphub.com",
// // //                 "Contact Us",
// // //                 "Terms of Service",
// // //                 "Privacy Policy",
// // //               ].map((info) => (
// // //                 <li key={info} className="hover:text-gray-400 cursor-pointer">
// // //                   {info}
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>

// // //           {/* Social Links */}
// // //           <div>
// // //             <h3 className="text-lg font-semibold mb-2 text-white shadow-xl hover:text-blue-500">
// // //               Stay Updated
// // //             </h3>
// // //             <div className="flex space-x-4 mt-5">
// // //               {["linkedin", "facebook", "twitter", "whatsapp"].map(
// // //                 (platform) => (
// // //                   <a
// // //                     key={platform}
// // //                     href={`https://${platform}.com`}
// // //                     target="_blank"
// // //                     rel="noopener noreferrer"
// // //                     className="hover:opacity-80 transition"
// // //                   >
// // //                     <img
// // //                       src={`/src/assets/images/${platform}.png`}
// // //                       alt={platform}
// // //                       className="footer-img"
// // //                     />
// // //                   </a>
// // //                 )
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="text-center mt-4">
// // //           <p>© 2024 CUI Internship Hub. All rights reserved.</p>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   );
// // // };

// // // export default LandingPage;


// // import React, { useEffect, useState, useRef } from "react";
// // import { FaCaretDown, FaBars, FaPhoneAlt, FaSearch, FaEnvelope, FaComments, FaArrowRight } from "react-icons/fa";
// // import "../assets/css/landing.css";
// // import myImage from "../assets/images/fypbg.jpg";
// // import { useNavigate } from "react-router-dom";
// // import Chatbot from '../components/ChatBot';
// // import axios from "axios";

// // const LandingPage = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [internships, setInternships] = useState([]);
// //   const [isChatbotOpen, setIsChatbotOpen] = useState(false);

// //   const navigate = useNavigate();
// //   const homeRef = useRef(null);
// //   const aboutRef = useRef(null);
// //   const servicesRef = useRef(null);
// //   const internshipsRef = useRef(null);
// //   const contactRef = useRef(null);
// //   const scrollRef = useRef(null);


// //   const fetchInternships = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:5000/api/internships');
// //       setInternships(response.data);
// //     } catch (error) {
// //       console.error('Failed to fetch internships:', error);
// //     }
// //   };

// //   const scrollToSection = (sectionRef) => {
// //     sectionRef.current.scrollIntoView({ behavior: "smooth" });
// //   };

// //   const toggleDropdown = () => {
// //     setDropdownOpen(!dropdownOpen);
// //   };
// //    const handleIconClick = () => {
// //   if (searchTerm.trim() === "") {
// //     // If search is empty, show all internships
// //     fetchInternships();
// //   } else {
// //     // Filter internships based on search term
// //     const filtered = internships.filter(internship => 
// //       internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       internship.description.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //     setInternships(filtered);
// //   }
// // };
// //   const handleLoginOptionClick = (role) => {
// //     if (role === "Admin") navigate("/admin/login");
// //     if (role === "Software House") navigate("/softwarehouse/registeration");
// //     if (role === "Student") navigate("/student/login");
// //     setDropdownOpen(false);
// //   };

// //   const toggleChatbot = () => {
// //     setIsChatbotOpen(!isChatbotOpen);
// //   };

// //   const toggleMobileMenu = () => {
// //     setIsMobileMenuOpen(!isMobileMenuOpen);
// //   };

// //   useEffect(() => {
// //     fetchInternships();
// //   }, []);

// //   return (
// //     <div
// //       style={{
// //         backgroundImage: `url(${myImage})`,
// //         backgroundPosition: "center",
// //         backgroundSize: "cover",
// //         height: "100vh",
// //         backgroundRepeat: "no-repeat",
// //         position: "relative",
// //       }}
// //     >
// //       <div
// //         style={{
// //           position: "absolute",
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           backgroundColor: "rgba(0, 0, 255, 0.1)",
// //           backdropFilter: "blur(6px)",
// //           height: "910px",
// //           zIndex: 1,
// //         }}
// //       />
// //       <div style={{ position: "relative", zIndex: 2, color: "white" }}>
// //         {/* Navbar */}-
// //         <nav className="bg-blue-950 p-2 shadow-lg rounded-xl mt-10 md:mt-4 relative">
// //           <div className="flex justify-between items-center">
// //             {/* Logo */}
// //             <img src="src/assets/images/fyplogo1.png" alt="Logo" className="h-20 w-20 rounded-full object-cover" />
// //             {/* Mobile Hamburger Icon */}
// //             <button
// //               className="md:hidden text-white justify-end ml-80"
// //               onClick={toggleMobileMenu}
// //             >
// //               <FaBars size={24} />
// //             </button>
// //             {/* Navbar links */}
// //             <ul
// //               className={`flex flex-col md:flex-row items-center justify-end space-y-4 md:space-y-0 md:space-x-8 text-white flex-grow transition-transform duration-300 ease-in-out ${
// //                 isMobileMenuOpen ? "block" : "hidden md:flex"
// //               }`}
// //             >
// //               <li
// //                 className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
// //                 onClick={() => scrollToSection(homeRef)}
// //               >
// //                 Home
// //               </li>
// //               <li
// //                 className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
// //                 onClick={() => scrollToSection(aboutRef)}
// //               >
// //                 About Us
// //               </li>
// //               <li
// //                 className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
// //                 onClick={() => scrollToSection(servicesRef)}
// //               >
// //                 Services
// //               </li>
// //               <li
// //                 className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
// //                 onClick={() => scrollToSection(internshipsRef)}
// //               >
// //                 Internships
// //               </li>
// //               <li
// //                 className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
// //                 onClick={() => scrollToSection(contactRef)}
// //               >
// //                 Contact Us
// //               </li>
// //               <button
// //                 className="flex items-center bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition transform hover:scale-105 duration-300 ease-in-out border-2 border-white hover:shadow-xl w-full md:w-auto justify-center"
// //                 onClick={toggleDropdown}
// //               >
// //                 Login <FaCaretDown className="ml-2" />
// //               </button>
// //             </ul>
// //           </div>

// //           {/* Dropdown Menu */}
// //           {dropdownOpen && (
// //             <div className="absolute right-0 bg-gradient-to-r from-blue-950 to-blue-800 shadow-lg rounded-lg mt-1 w-48 z-10 text-white">
// //               <ul className="py-2">
// //                 <li
// //                   className="px-4 py-2 hover:bg-gradient-to-r from-blue-700 to-blue-950 cursor-pointer"
// //                   onClick={() => handleLoginOptionClick("Admin")}
// //                 >
// //                   Admin
// //                 </li>
// //                 <li
// //                   className="px-4 py-2 hover:bg-gradient-to-r from-blue-700 to-blue-950 cursor-pointer"
// //                   onClick={() => handleLoginOptionClick("Software House")}
// //                 >
// //                   Software House
// //                 </li>
// //                 <li
// //                   className="px-4 py-2 hover:bg-gradient-to-r from-blue-700 to-blue-950 cursor-pointer"
// //                   onClick={() => handleLoginOptionClick("Student")}
// //                 >
// //                   Student
// //                 </li>
// //               </ul>
// //             </div>
// //           )}
// //         </nav>

// //         {/* Home section */}
// //         <section
// //           ref={homeRef}
// //           className="min-h-screen p-4 md:p-8 flex flex-col justify-center items-center text-center"
// //         >
// //           <div className="max-w-3xl mx-auto">
// //             <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fadeIn">
// //               Welcome to CUI Internship Hub
// //             </h1>
// //             <p className="text-xl md:text-2xl mb-8 text-white animate-fadeIn">
// //               Connecting talented students with top software houses for meaningful internship experiences
// //             </p>
// //             <button
// //               onClick={() => scrollToSection(internshipsRef)}
// //               className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center mx-auto"
// //             >
// //               Explore Internships <FaArrowRight className="ml-2" />
// //             </button>
// //           </div>

// //           {/* Chatbot Button */}
// //           <button
// //             className="fixed bottom-8 right-8 bg-blue-700 p-4 rounded-full shadow-lg hover:bg-blue-800 transition duration-300 z-50"
// //             onClick={toggleChatbot}
// //           >
// //             <FaComments size={24} color="white" />
// //           </button>
// //           {isChatbotOpen && <Chatbot />}
// //         </section>
// //        </div>
// //               {/* about section */}
// //        <section
// //         ref={aboutRef}
// //         className="min-h-screen flex flex-col md:flex-row p-8  bg-gray-200 transition duration-300 ease-in-out"
// //       >
// //         <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
// //           <img
// //             src="\src\assets\images\intern2.webp"
// //             alt="CUI Internship Hub"
// //             className="rounded-lg shadow-lg w-3/4 h-auto transition-transform transform hover:scale-105"
// //           />
// //         </div>
// //         <div className="md:w-1/2 text-center mt-5 shadow-lg bg-blue-950  rounded-lg hover:scale-105 p-10 transition-transform duration-300  hover:-translate-y-1">
// //           <h2 className="text-4xl font-bold text-white hover:text-gray-100 transition duration-300 ease-in-out">
// //             About Us
// //           </h2>
// //           <p className="text-lg mt-3 text-justify text-white  transition-transform duration-300 hover:-translate-y-1 ">
// //             CUI Internship Hub is an innovative web-based platform developed to
// //             bridge the gap between students and internship providers. Our
// //             mission is to streamline the internship application process by
// //             providing a user-friendly interface where students can easily
// //             register, browse available internships, and apply for opportunities
// //             that align with their skills and aspirations. For software houses,
// //             our platform offers a seamless experience to post internship
// //             openings, manage applications, and connect with potential
// //             candidates. With features like integrated chatbot communication and
// //             a recognition system for student achievements, we aim to enhance the
// //             overall internship experience for all stakeholders. At CUI
// //             Internship Hub, we are committed to fostering valuable connections
// //             that empower students to succeed in their careers while helping
// //             organizations discover and nurture emerging talent.
// //           </p>
// //         </div>
// //       </section>
// //       {/* Services Section */}
// //       <section
// //         ref={servicesRef}
// //         className="min-h-screen flex flex-col p-8 bg-gray-200"
// //       >
// //         <h2 className="text-4xl font-bold text-blue-900 text-center">
// //           Services
// //         </h2>
// //         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {/* Service 1: */}
// //           <div className="bg-blue-950 p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[350px]">
// //             <div className="rounded-full bg-blue-100 text-blue-600 p-3 mb-4">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-6 w-6"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.958 9.958 0 01-4.5-2.318m-.636-6.402a11.924 11.924 0 00-.524 7.6c.582 2.486 2.394 4.097 4.5 5.699a9.958 9.958 0 01 7.3-4.9"
// //                 />
// //               </svg>
// //             </div>
// //             <h3 className="text-2xl font-semibold text-white text-center">
// //               Student Registration
// //             </h3>
// //             <p className="mt-2 text-white text-center">
// //               A seamless registration process that allows students to create
// //               their profiles and showcase their skills, making it easier to find
// //               suitable internships.
// //             </p>
// //           </div>

// //           {/* Service 2: Mentorship & Guidance */}
// //           <div className="bg-blue-950  p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[300px]">
// //             <div className="rounded-full bg-green-100 text-green-600 p-3 mb-4">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-6 w-6"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
// //                 />
// //               </svg>
// //             </div>
// //             <h3 className="text-2xl font-semibold text-white text-center">
// //               Internship Management
// //             </h3>
// //             <p className="mt-2 text-white text-center">
// //               Software houses can easily post, manage, and track internship
// //               opportunities, simplifying the process of finding the right
// //               candidates.
// //             </p>
// //           </div>

// //           {/* Service 3: Community Events */}
// //           <div className="bg-blue-950  p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[300px]">
// //             <div className="rounded-full bg-yellow-100 text-yellow-600 p-3 mb-4">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-6 w-6"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2m0-5h5a2 2 0 012 2v3m-3 4h6m-6 0l-1 1h-2a1 1 0 01-1-1v-3a1 1 0 011-1H7v1a1 1 0 01-1 1m3 0h6m-3 0l1-1h2a1 1 0 011 1v2a1 1 0 01-1 1m-3 0h-6m-1 0l1 1h2a1 1 0 011 1v3m-4 0h4m-6 0l-1 1h-2a1 1 0 01-1-1v-3a1 1 0 011-1H7v1a1 1 0 01-1 1m3 0h12"
// //                 />
// //               </svg>
// //             </div>
// //             <h3 className="text-2xl font-semibold text-white text-center">
// //               Chatbot Communication
// //             </h3>
// //             <p className="mt-2  text-white text-center">
// //               Our integrated chatbot facilitates real-time communication between
// //               students and software houses, ensuring efficient query resolution.
// //             </p>
// //           </div>

// //           {/* Service 4: Task Assignment and Tracking */}
// //           <div className="bg-blue-950  p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[350px]">
// //             <div className="rounded-full bg-red-100 text-red-600 p-3 mb-4">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-6 w-6"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
// //                 />
// //               </svg>
// //             </div>
// //             <h3 className="text-2xl font-semibold  text-white text-center">
// //               Task Assignment & Tracking
// //             </h3>
// //             <p className="mt-2  text-white text-center">
// //               Assign tasks to team members and track their progress in
// //               real-time, ensuring efficient project management.
// //             </p>
// //           </div>

// //           {/* Service 5: Student Recognition */}
// //           <div className="bg-blue-950  p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[300px]">
// //             <div className="rounded-full bg-purple-100 text-purple-600 p-3 mb-4">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-6 w-6"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// //                 />
// //               </svg>
// //             </div>
// //             <h3 className="text-2xl font-semibold  text-white text-center">
// //               Student Recognition
// //             </h3>
// //             <p className="mt-2  text-white text-center ">
// //               Recognize and reward students for their achievements, motivating
// //               them to excel in their studies.
// //             </p>
// //           </div>

// //           {/* Service 6: Skill Development Programs */}
// //           <div className="bg-blue-950  p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col items-center min-h-[300px]">
// //             <div className="rounded-full bg-indigo-100 text-indigo-600 p-3 mb-4">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-6 w-6"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M16 12H8m0 0V8m0 4v4m3 0h2a2 2 0 002-2v-4m0 0h1a1 1 0 011 1v5a1 1 0 01-1 1h-3m0 0v-4m-3 0H7a2 2 0 00-2 2v4a2 2 0 002 2h8"
// //                 />
// //               </svg>
// //             </div>
// //             <h3 className="text-2xl font-semibold  text-white text-center">
// //               Skill Development
// //             </h3>
// //             <p className="mt-2  text-white text-center ">
// //               Our platform offers various skill development programs to help
// //               students enhance their competencies and increase employability.
// //             </p>
// //           </div>
// //         </div>
// //       </section>
// //       {/* Internships Section */}
// //       <section
// //       ref={internshipsRef}
// //       className="min-h-screen flex flex-col p-8 bg-gray-200"
// //     >
// //       <h2 className="text-4xl font-bold text-blue-900 text-center">
// //         Internships
// //       </h2>
// //       <p className="text-lg mt-4 text-gray-700 text-center">
// //         Explore exciting internship opportunities that match your skills and
// //         career goals.
// //       </p>
// //       {/* Search Bar */}
// //       <div className="flex justify-center mt-2 mb-1 relative w-auto">
// //         <input
// //           type="text"
// //           placeholder="Search certificates..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="border p-3 rounded-lg w-1/3 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 border-blue-900"
// //         />
// //         <FaSearch
// //           className="relative right-9 top-6 transform -translate-y-1/2 text-blue-900 cursor-pointer"
// //           onClick={handleIconClick}
// //         />
// //       </div>
// //       <div className="mt-8 overflow-x-hidden"> {/* Hide overflow for the parent */}
// //         <div ref={scrollRef} className="flex space-x-6 animate-scroll">
// //           {/* Internship 1 */}
// //           {internships.map((item) => (
// //           <div key={item._id} className="bg-blue-950 p-6 rounded-lg shadow-md transition transform hover:scale-105 flex flex-col max-h-[550px] min-w-[350px]">
// //             <img
// //               src={`src/assets/images/${item?.image??'p1.jpeg'}`}
// //               alt="Internship 1"
// //               className="h-[300px] w-full object-cover rounded-t-lg"
// //             />
// //             <h3 className="text-2xl font-semibold text-white mt-4">
// //               {item.title}
// //             </h3>
// //             <p className="mt-2 text-white">
// //               {item.description}
// //             </p>
// //             <a
// //               href="#"
// //               className="mt-auto bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
// //             >
// //               Apply Now
// //             </a>
// //           </div>
// //           ))}
  
          
          
// //         </div>
// //       </div>
// //       </section>
// // {/* Contact Us Section */}
// // <section ref={contactRef} className="min-h-screen p-6 bg-gray-200 flex flex-col items-center">
// //   <h2 className="text-4xl font-bold text-blue-900 text-center">Contact Us</h2>
// //   <p className="text-lg mt-2 text-blue-900 text-center">
// //     Get in touch with us for any queries or assistance.
// //   </p>

// //   <div className="mt-6 flex flex-wrap justify-center items-center gap-10 w-full max-w-5xl">
// //     {/* Contact Form */}
// //     <form className="p-6 rounded-lg shadow-md bg-blue-950 min-h-[500px] w-full max-w-[400px]">
// //       <div className="grid grid-cols-1 gap-4">
// //         <div>
// //           <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
// //           <input
// //             type="text"
// //             id="name"
// //             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
// //           <input
// //             type="email"
// //             id="email"
// //             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
// //             required
// //           />
// //         </div>
// //       </div>

// //       <div className="mt-4">
// //         <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
// //         <textarea
// //           id="message"
// //           rows="4"
// //           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
// //           required
// //         ></textarea>
// //       </div>

// //       <button
// //         type="submit"
// //         className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:bg-gray-200 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:translate-y-1 border-white border-solid hover:border-2 mt-6"
// //       >
// //         Send Message
// //       </button>
// //     </form>

// //     {/* Contact Info & Social Media */}
// //     <div className="flex flex-col items-center space-y-6 w-full max-w-[400px]">
// //       {/* Email & Phone */}
// //       <div className="flex flex-col items-center space-y-2">
// //         <div className="flex items-center space-x-2">
// //           <FaEnvelope className="h-6 w-6 text-blue-900" />
// //           <span className="text-lg text-blue-900">cui@internshiphub.com</span>
// //         </div>
// //         <div className="flex items-center space-x-2">
// //           <FaPhoneAlt className="h-6 w-6 text-blue-900" />
// //           <span className="text-lg text-blue-900">+92 0300 0000000</span>
// //         </div>
// //       </div>

// //       {/* Social Media Links */}
// //       <div className="flex space-x-4">
// //         <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
// //           <img src="src/assets/images/linkedin.png" alt="LinkedIn" className="h-10 w-10 rounded-full border-white border-2 hover:scale-110 hover:shadow-lg" />
// //         </a>
// //         <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
// //           <img src="src/assets/images/facebook.png" alt="Facebook" className="h-10 w-10 rounded-full border-white border-2 hover:scale-110 hover:shadow-lg" />
// //         </a>
// //         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
// //           <img src="src/assets/images/twitter.png" alt="Twitter" className="h-10 w-10 rounded-full border-white border-2 hover:scale-110 hover:shadow-lg" />
// //         </a>
// //         <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer">
// //           <img src="src/assets/images/whatsapp.png" alt="WhatsApp" className="h-10 w-10 rounded-full border-white border-2 hover:scale-110 hover:shadow-lg" />
// //         </a>
// //       </div>
// //     </div>
// //   </div>
// // </section>

// //       {/* Footer */}
// //       <footer className="bg-gradient-to-r from-blue-800 to-blue-950 text-white p-6 mt-8 shadow-lg animate-slide-in-up">
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //           {/* Quick Navigation */}
// //           <div>
// //             <h3 className="text-lg font-semibold mb-2 text-white shadow-xl hover:text-blue-500">
// //               Quick Navigation
// //             </h3>
// //             <ul className="space-y-2">
// //               {["Home", "About Us", "Services", "Internships", "FAQ"].map(
// //                 (item) => (
// //                   <li key={item} className="hover:text-gray-400 cursor-pointer">
// //                     <a href={`#${item.toLowerCase().replace(/\s+/g, "")}`} className="text-white" style={{ textDecoration:'none' }}>
// //                       {item}
// //                     </a>
// //                   </li>
// //                 )
// //               )}
// //             </ul>
// //           </div>

// //           {/* Information */}
// //           <div>
// //             <h3 className="text-lg font-semibold mb-2 text-white shadow-xl hover:text-blue-500">
// //               Information
// //             </h3>
// //             <ul className="space-y-2">
// //               {[
// //                 "support@internshiphub.com",
// //                 "Contact Us",
// //                 "Terms of Service",
// //                 "Privacy Policy",
// //               ].map((info) => (
// //                 <li key={info} className="hover:text-gray-400 cursor-pointer">
// //                   {info}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           {/* Social Links */}
// //           <div>
// //             <h3 className="text-lg font-semibold mb-2 text-white shadow-xl hover:text-blue-500">
// //               Stay Updated
// //             </h3>
// //             <div className="flex space-x-4 mt-5">
// //               {["linkedin", "facebook", "twitter", "whatsapp"].map(
// //                 (platform) => (
// //                   <a
// //                     key={platform}
// //                     href={`https://${platform}.com`}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="hover:opacity-80 transition"
// //                   >
// //                     <img
// //                       src={`/src/assets/images/${platform}.png`}
// //                       alt={platform}
// //                       className="footer-img"
// //                     />
// //                   </a>
// //                 )
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //         <div className="text-center mt-4">
//           // <p className="text-gray-300">
//           //     © {new Date().getFullYear()} CUI Internship Hub. All rights reserved.
//           //   </p>
// //         </div>
// //       </footer>
      
// //     </div>
// //   );
// // };

// // export default LandingPage;




// import React, { useEffect, useState, useRef } from "react";
// import { FaCaretDown, FaBars, FaPhoneAlt, FaSearch, FaEnvelope, FaComments, FaArrowRight } from "react-icons/fa";
// import "../assets/css/landing.css";
// import myImage from "../assets/images/fypbg.jpg";
// import { useNavigate } from "react-router-dom";
// import Chatbot from '../components/ChatBot';
// import axios from "axios";

// const LandingPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [internships, setInternships] = useState([]);
//   const [isChatbotOpen, setIsChatbotOpen] = useState(false);

//   const navigate = useNavigate();
//   const homeRef = useRef(null);
//   const aboutRef = useRef(null);
//   const servicesRef = useRef(null);
//   const internshipsRef = useRef(null);
//   const contactRef = useRef(null);
//   const scrollRef = useRef(null);

//   const fetchInternships = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/internships');
//       setInternships(response.data);
//     } catch (error) {
//       console.error('Failed to fetch internships:', error);
//     }
//   };

//   const scrollToSection = (sectionRef) => {
//     sectionRef.current.scrollIntoView({ behavior: "smooth" });
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleIconClick = () => {
//     if (searchTerm.trim() === "") {
//       fetchInternships();
//     } else {
//       const filtered = internships.filter(internship => 
//         internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         internship.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setInternships(filtered);
//     }
//   };

//   const handleLoginOptionClick = (role) => {
//     if (role === "Admin") navigate("/admin/login");
//     if (role === "Software House") navigate("/softwarehouse/registeration");
//     if (role === "Student") navigate("/student/login");
//     setDropdownOpen(false);
//   };

//   const toggleChatbot = () => {
//     setIsChatbotOpen(!isChatbotOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   useEffect(() => {
//     fetchInternships();
//   }, []);

//   return (
//     <div className="relative">
//       {/* Home Section with Background Image */}
//       <section
//         ref={homeRef}
//         className="min-h-screen relative overflow-hidden"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${myImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed"
//         }}
//       >
//         {/* Navbar */}
//         <nav className="bg-blue-950 p-2 shadow-lg rounded-xl mt-4 mx-4 relative z-10">
//           <div className="flex justify-between items-center">
//             <img src="src/assets/images/fyplogo1.png" alt="Logo" className="h-16 w-16 rounded-full object-cover" />
//             <button
//               className="md:hidden text-white"
//               onClick={toggleMobileMenu}
//             >
//               <FaBars size={24} />
//             </button>
//             <ul
//               className={`flex flex-col md:flex-row items-center justify-end space-y-4 md:space-y-0 md:space-x-8 text-white flex-grow transition-transform duration-300 ease-in-out ${
//                 isMobileMenuOpen ? "block" : "hidden md:flex"
//               }`}
//             >
//               <li
//                 className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
//                 onClick={() => scrollToSection(homeRef)}
//               >
//                 Home
//               </li>
//               <li
//                 className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
//                 onClick={() => scrollToSection(aboutRef)}
//               >
//                 About Us
//               </li>
//               <li
//                 className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
//                 onClick={() => scrollToSection(servicesRef)}
//               >
//                 Services
//               </li>
//               <li
//                 className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
//                 onClick={() => scrollToSection(internshipsRef)}
//               >
//                 Internships
//               </li>
//               <li
//                 className="font-semibold text-base md:text-lg hover:bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded-xl cursor-pointer w-full md:w-auto text-center"
//                 onClick={() => scrollToSection(contactRef)}
//               >
//                 Contact Us
//               </li>
//               <button
//                 className="flex items-center bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition transform hover:scale-105 duration-300 ease-in-out border-2 border-white hover:shadow-xl w-full md:w-auto justify-center"
//                 onClick={toggleDropdown}
//               >
//                 Login <FaCaretDown className="ml-2" />
//               </button>
//             </ul>
//           </div>

//           {dropdownOpen && (
//             <div className="absolute right-0 bg-gradient-to-r from-blue-950 to-blue-800 shadow-lg rounded-lg mt-1 w-48 z-10 text-white">
//               <ul className="py-2">
//                 <li
//                   className="px-4 py-2 hover:bg-gradient-to-r from-blue-700 to-blue-950 cursor-pointer"
//                   onClick={() => handleLoginOptionClick("Admin")}
//                 >
//                   Admin
//                 </li>
//                 <li
//                   className="px-4 py-2 hover:bg-gradient-to-r from-blue-700 to-blue-950 cursor-pointer"
//                   onClick={() => handleLoginOptionClick("Software House")}
//                 >
//                   Software House
//                 </li>
//                 <li
//                   className="px-4 py-2 hover:bg-gradient-to-r from-blue-700 to-blue-950 cursor-pointer"
//                   onClick={() => handleLoginOptionClick("Student")}
//                 >
//                   Student
//                 </li>
//               </ul>
//             </div>
//           )}
//         </nav>

//         {/* Hero Content */}
//         <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-0">
//           <div className="max-w-4xl mx-auto text-white">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
//               Welcome to CUI Internship Hub
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 animate-fadeIn">
//               Connecting talented students with top software houses for meaningful internship experiences
//             </p>
//             <button
//               onClick={() => scrollToSection(internshipsRef)}
//               className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center mx-auto"
//             >
//               Explore Internships <FaArrowRight className="ml-2" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section
//         ref={aboutRef}
//         className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 bg-gray-100"
//       >
//         <div className="md:w-1/2 flex justify-center items-center p-6">
//           <img
//             src="src/assets/images/intern2.webp"
//             alt="CUI Internship Hub"
//             className="rounded-xl shadow-2xl w-full max-w-lg h-auto transition-transform duration-500 hover:scale-105"
//           />
//         </div>
//         <div className="md:w-1/2 p-6 md:p-10 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-xl text-white">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
//             About Our Platform
//           </h2>
//           <p className="text-lg md:text-xl leading-relaxed mb-4">
//             CUI Internship Hub revolutionizes the way students and software houses connect for internship opportunities. Our platform serves as a bridge between academic learning and professional experience.
//           </p>
//           <p className="text-lg md:text-xl leading-relaxed mb-4">
//             For students, we provide a streamlined application process with personalized recommendations based on skills and career aspirations. For organizations, we offer powerful tools to discover and recruit top talent efficiently.
//           </p>
//           <p className="text-lg md:text-xl leading-relaxed">
//             With features like real-time communication, progress tracking, and achievement recognition, we're transforming internship experiences for all stakeholders in the tech ecosystem.
//           </p>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section
//         ref={servicesRef}
//         className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-gray-200"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
//               Our Comprehensive Services
//             </h2>
//             <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
//               We provide end-to-end solutions for students and software houses to create meaningful internship experiences
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {/* Service Card 1 */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
//               <div className="p-6">
//                 <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
//                   <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Student Registration</h3>
//                 <p className="text-gray-600 text-center">
//                   Create detailed profiles showcasing your skills, education, and career aspirations to attract the right opportunities.
//                 </p>
//               </div>
//             </div>

//             {/* Service Card 2 */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
//               <div className="p-6">
//                 <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
//                   <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Internship Management</h3>
//                 <p className="text-gray-600 text-center">
//                   Software houses can post opportunities, review applications, and manage their internship programs efficiently.
//                 </p>
//               </div>
//             </div>

//             {/* Service Card 3 */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
//               <div className="p-6">
//                 <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4 mx-auto">
//                   <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Real-time Communication</h3>
//                 <p className="text-gray-600 text-center">
//                   Our integrated messaging system allows seamless communication between students and organizations.
//                 </p>
//               </div>
//             </div>

//             {/* Service Card 4 */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
//               <div className="p-6">
//                 <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 mx-auto">
//                   <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Task Management</h3>
//                 <p className="text-gray-600 text-center">
//                   Assign, track, and evaluate intern tasks with our comprehensive project management tools.
//                 </p>
//               </div>
//             </div>

//             {/* Service Card 5 */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
//               <div className="p-6">
//                 <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
//                   <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Achievement Recognition</h3>
//                 <p className="text-gray-600 text-center">
//                   Earn badges and certificates for completed internships and demonstrated skills.
//                 </p>
//               </div>
//             </div>

//             {/* Service Card 6 */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
//               <div className="p-6">
//                 <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4 mx-auto">
//                   <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Skill Development</h3>
//                 <p className="text-gray-600 text-center">
//                   Access resources and training to enhance your technical and professional skills.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Internships Section */}
//       <section
//         ref={internshipsRef}
//         className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gray-200"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
//               Current Internship Opportunities
//             </h2>
//             <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
//               Browse through our curated list of internships from top software houses
//             </p>
//           </div>

//           {/* Search Bar */}
//           <div className="flex justify-center mb-12">
//             <div className="relative w-full max-w-2xl">
//               <input
//                 type="text"
//                 placeholder="Search internships by title, skills, or company..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
//               />
//               <button
//                 onClick={handleIconClick}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
//               >
//                 <FaSearch size={20} />
//               </button>
//             </div>
//           </div>

//           {/* Internships Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {internships.map((item) => (
//               <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
//                 <img
//                   src={`src/assets/images/${item?.image??'p1.jpeg'}`}
//                   alt={item.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 mb-4 line-clamp-3">
//                     {item.description}
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-blue-600 font-medium">
//                       {item.duration || "3-6 months"}
//                     </span>
//                     <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition duration-300">
//                       Apply Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {internships.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-xl text-gray-600">
//                 No internships found matching your search. Check back later!
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Contact Us Section */}
//       <section
//         ref={contactRef}
//         className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-200 to-gray-300"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
//               Get In Touch
//             </h2>
//             <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
//               Have questions or feedback? We'd love to hear from you!
//             </p>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-12">
//             {/* Contact Form */}
//             <div className="lg:w-1/2">
//               <form className="bg-white p-8 rounded-xl shadow-xl">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6">
//                   Send us a message
//                 </h3>
//                 <div className="mb-6">
//                   <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
//                     Your Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
//                     Your Message
//                   </label>
//                   <textarea
//                     id="message"
//                     rows="5"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
//                     required
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-300"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>

//             {/* Contact Information */}
//             <div className="lg:w-1/2">
//               <div className="bg-white p-8 rounded-xl shadow-xl h-full">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6">
//                   Contact Information
//                 </h3>
//                 <div className="space-y-6">
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
//                       <FaEnvelope className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div className="ml-4">
//                       <h4 className="text-lg font-medium text-gray-800">Email</h4>
//                       <p className="text-gray-600">contact@cuiinternshiphub.edu.pk</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
//                       <FaPhoneAlt className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div className="ml-4">
//                       <h4 className="text-lg font-medium text-gray-800">Phone</h4>
//                       <p className="text-gray-600">+92 51 111 001 007</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
//                       <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                       </svg>
//                     </div>
//                     <div className="ml-4">
//                       <h4 className="text-lg font-medium text-gray-800">Address</h4>
//                       <p className="text-gray-600">
//                         COMSATS University Vehari(Campus)<br />
//                          Mailsi Road, Off Multan Road,<br />
//                          Vehari, Punjab, Pakistan
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Social Media Links */}
//                 <div className="mt-10">
//                   <h4 className="text-lg font-medium text-gray-800 mb-4">Connect With Us</h4>
//                   <div className="flex space-x-4">
//                     {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((platform) => (
//                       <a
//                         key={platform}
//                         href={`https://${platform}.com`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition duration-300"
//                       >
//                         <img
//                           src={`src/assets/images/${platform}.png`}
//                           alt={platform}
//                           className="h-6 w-6"
//                         />
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//        {/* Footer */}
//        <footer className="bg-gradient-to-r from-blue-800 to-blue-950 text-white p-6 mt-8 shadow-lg animate-slide-in-up">
//          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//            {/* Quick Navigation */}
//            <div>
//              <h3 className="text-lg font-semibold mb-2 text-white shadow-xl hover:text-blue-500">
//                Quick Navigation
//              </h3>
//              <ul className="space-y-2">
//                {["Home", "About Us", "Services", "Internships", "FAQ"].map(
//                 (item) => (
//                   <li key={item} className="hover:text-gray-400 cursor-pointer">
//                     <a href={`#${item.toLowerCase().replace(/\s+/g, "")}`} className="text-white" style={{ textDecoration:'none' }}>
//                       {item}
//                     </a>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>

//           {/* Information */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2 text-white shadow-xl hover:text-blue-500">
//               Information
//             </h3>
//             <ul className="space-y-2">
//               {[
//                 "support@internshiphub.com",
//                 "Contact Us",
//                 "Terms of Service",
//                 "Privacy Policy",
//               ].map((info) => (
//                 <li key={info} className="hover:text-gray-400 cursor-pointer">
//                   {info}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Social Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2 text-white shadow-xl hover:text-blue-500">
//               Stay Updated
//             </h3>
//             <div className="flex space-x-4 mt-5">
//               {["linkedin", "facebook", "twitter", "whatsapp"].map(
//                 (platform) => (
//                   <a
//                     key={platform}
//                     href={`https://${platform}.com`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:opacity-80 transition"
//                   >
//                     <img
//                       src={`/src/assets/images/${platform}.png`}
//                       alt={platform}
//                       className="footer-img"
//                     />
//                   </a>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="text-center mt-4">
//           <p className="text-gray-300">
//               © {new Date().getFullYear()} CUI Internship Hub. All rights reserved.
//             </p>
//         </div>
//       </footer>

//       {/* Chatbot Button */}
//       <button
//         className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 p-4 rounded-full shadow-lg transition duration-300 z-50"
//         onClick={toggleChatbot}
//       >
//         <FaComments size={24} color="white" />
//       </button>
//       {isChatbotOpen && <Chatbot />}
//     </div>
//   );
// };

// export default LandingPage;


// import React, { useEffect, useState, useRef } from "react";
// import { FaCaretDown, FaBars, FaPhoneAlt, FaSearch, FaEnvelope, FaComments, FaArrowRight } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Chatbot from '../components/ChatBot';
// import myImage from "../assets/images/fypbg.jpg";

// // Animation variants
// const fadeIn = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.2, delayChildren: 0.1 }
//   }
// };

// const slideInFromLeft = {
//   hidden: { opacity: 0, x: -50 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
// };

// const slideInFromRight = {
//   hidden: { opacity: 0, x: 50 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
// };

// const scaleUp = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
// };

// const LandingPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [internships, setInternships] = useState([]);
//   const [isChatbotOpen, setIsChatbotOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("home");

//   const navigate = useNavigate();
//   const homeRef = useRef(null);
//   const aboutRef = useRef(null);
//   const servicesRef = useRef(null);
//   const internshipsRef = useRef(null);
//   const contactRef = useRef(null);

//   // Intersection observers for sections
//   const [homeRefInView, homeInView] = useInView({ threshold: 0.3 });
//   const [aboutRefInView, aboutInView] = useInView({ threshold: 0.3 });
//   const [servicesRefInView, servicesInView] = useInView({ threshold: 0.2 });
//   const [internshipsRefInView, internshipsInView] = useInView({ threshold: 0.2 });
//   const [contactRefInView, contactInView] = useInView({ threshold: 0.3 });

//   useEffect(() => {
//     if (homeInView) setActiveSection("home");
//     else if (aboutInView) setActiveSection("about");
//     else if (servicesInView) setActiveSection("services");
//     else if (internshipsInView) setActiveSection("internships");
//     else if (contactInView) setActiveSection("contact");
//   }, [homeInView, aboutInView, servicesInView, internshipsInView, contactInView]);

//   const fetchInternships = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/internships');
//       setInternships(response.data);
//     } catch (error) {
//       console.error('Failed to fetch internships:', error);
//     }
//   };

//   const scrollToSection = (sectionRef) => {
//     sectionRef.current.scrollIntoView({ behavior: "smooth" });
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleIconClick = () => {
//     if (searchTerm.trim() === "") {
//       fetchInternships();
//     } else {
//       const filtered = internships.filter(internship => 
//         internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         internship.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setInternships(filtered);
//     }
//   };

//   const handleLoginOptionClick = (role) => {
//     if (role === "Admin") navigate("/admin/login");
//     if (role === "Software House") navigate("/softwarehouse/registeration");
//     if (role === "Student") navigate("/student/login");
//     setDropdownOpen(false);
//   };

//   const toggleChatbot = () => {
//     setIsChatbotOpen(!isChatbotOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   useEffect(() => {
//     fetchInternships();
//     // Parallax effect for home section
//     const handleScroll = () => {
//       if (homeRef.current) {
//         const scrollPosition = window.scrollY;
//         homeRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="relative overflow-x-hidden bg-gray-50">
//       {/* Floating Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-blue-100 opacity-10 blur-lg"
//             style={{
//               width: Math.random() * 100 + 50,
//               height: Math.random() * 100 + 50,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, Math.random() * 100 - 50],
//               x: [0, Math.random() * 100 - 50],
//               opacity: [0.05, 0.15, 0.05],
//             }}
//             transition={{
//               duration: Math.random() * 20 + 10,
//               repeat: Infinity,
//               repeatType: "reverse",
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>

//       {/* Home Section */}
//       <section
//         ref={homeRef}
//         className="min-h-screen relative overflow-hidden"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0, 0, 50, 0.7), rgba(0, 0, 50, 0.7)), url(${myImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed"
//         }}
//       >
//         <div ref={homeRefInView} className="absolute top-20"></div>
//         {/* Animated Particles */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(30)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute rounded-full bg-blue-300"
//               style={{
//                 width: Math.random() * 4 + 2,
//                 height: Math.random() * 4 + 2,
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 opacity: Math.random() * 0.4 + 0.1,
//               }}
//               animate={{
//                 y: [0, window.innerHeight],
//                 x: [0, Math.random() * 50 - 25],
//               }}
//               transition={{
//                 duration: Math.random() * 10 + 5,
//                 repeat: Infinity,
//                 ease: "linear",
//                 delay: Math.random() * 5,
//               }}
//             />
//           ))}
//         </div>

//         {/* Navbar */}
//         <motion.nav
//           className="bg-blue-900/95 backdrop-blur-md p-4 shadow-lg rounded-xl mt-4 mx-4 sticky top-4 z-50"
//           initial={{ y: -100 }}
//           animate={{ y: 0 }}
//           transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
//         >
//           <div className="flex justify-between items-center max-w-7xl mx-auto">
//             <motion.img
//               src="src/assets/images/fyplogo1.png"
//               alt="Logo"
//               className="h-14 w-14 rounded-full object-cover"
//               whileHover={{ rotate: 360, scale: 1.1 }}
//               transition={{ duration: 0.5 }}
//             />
//             <button
//               className="md:hidden text-white"
//               onClick={toggleMobileMenu}
//               aria-label="Toggle mobile menu"
//             >
//               <FaBars size={24} />
//             </button>
//             <ul
//               className={`flex flex-col md:flex-row items-center justify-end space-y-4 md:space-y-0 md:space-x-6 text-white flex-grow transition-all duration-300 ease-in-out ${
//                 isMobileMenuOpen ? "block mt-4 md:mt-0" : "hidden md:flex"
//               }`}
//             >
//               {[
//                 { name: "Home", ref: homeRef, id: "home" },
//                 { name: "About Us", ref: aboutRef, id: "about" },
//                 { name: "Services", ref: servicesRef, id: "services" },
//                 { name: "Internships", ref: internshipsRef, id: "internships" },
//                 { name: "Contact Us", ref: contactRef, id: "contact" },
//               ].map((item) => (
//                 <motion.li
//                   key={item.name}
//                   className={`font-medium text-lg px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
//                     activeSection === item.id
//                       ? "bg-blue-600 shadow-lg"
//                       : "hover:bg-blue-700"
//                   }`}
//                   onClick={() => scrollToSection(item.ref)}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {item.name}
//                 </motion.li>
//               ))}
//               <motion.button
//                 className="flex items-center bg-blue-800 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 border border-blue-500"
//                 onClick={toggleDropdown}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Login <FaCaretDown className="ml-2" />
//               </motion.button>
//             </ul>
//           </div>
//           <AnimatePresence>
//             {dropdownOpen && (
//               <motion.div
//                 className="absolute right-4 bg-blue-900/95 backdrop-blur-md shadow-lg rounded-lg mt-2 w-48 z-50 text-white"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <ul className="py-2">
//                   {["Admin", "Software House", "Student"].map((role) => (
//                     <motion.li
//                       key={role}
//                       className="px-4 py-2 hover:bg-blue-700 cursor-pointer transition-colors duration-200"
//                       onClick={() => handleLoginOptionClick(role)}
//                       whileHover={{ x: 5 }}
//                     >
//                       {role}
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.nav>

//         {/* Hero Content */}
//         <motion.div
//           className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10"
//           initial="hidden"
//           animate={homeInView ? "visible" : "hidden"}
//           variants={staggerContainer}
//         >
//           <motion.h1
//             className="text-4xl md:text-6xl font-bold text-white mb-6"
//             variants={fadeIn}
//           >
//             Welcome to <span className="text-blue-300">CUI Internship Hub</span>
//           </motion.h1>
//           <motion.p
//             className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl"
//             variants={fadeIn}
//           >
//             Connecting talented students with top software houses for meaningful internship experiences
//           </motion.p>
//           <motion.button
//             onClick={() => scrollToSection(internshipsRef)}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center"
//             variants={fadeIn}
//             whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Explore Internships <FaArrowRight className="ml-2" />
//           </motion.button>
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.div
//           className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <div className="w-8 h-12 border-4 border-blue-300 rounded-full flex justify-center">
//             <motion.div
//               className="w-2 h-2 bg-blue-300 rounded-full mt-2"
//               animate={{ y: [0, 20] }}
//               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//             />
//           </div>
//         </motion.div>
//       </section>

//       {/* About Section */}
//       <section
//         ref={aboutRef}
//         className="min-h-screen flex flex-col md:flex-row items-center justify-center py-16 px-4 bg-white relative overflow-hidden"
//       >
//         <div ref={aboutRefInView} className="absolute top-20"></div>
//         {/* Background Shape */}
//         <motion.div
//           className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-2xl"
//           animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="md:w-1/2 p-6"
//           initial="hidden"
//           animate={aboutInView ? "visible" : "hidden"}
//           variants={slideInFromLeft}
//         >
//           <motion.img
//             src="src/assets/images/intern2.webp"
//             alt="CUI Internship Hub"
//             className="rounded-2xl shadow-2xl w-full max-w-lg h-auto"
//             whileHover={{ scale: 1.03 }}
//             transition={{ duration: 0.4 }}
//           />
//         </motion.div>
//         <motion.div
//           className="md:w-1/2 p-6 md:p-10 bg-blue-900 text-white rounded-2xl shadow-xl"
//           initial="hidden"
//           animate={aboutInView ? "visible" : "hidden"}
//           variants={slideInFromRight}
//         >
//           <motion.h2
//             className="text-3xl md:text-4xl font-bold mb-6 text-center"
//             variants={fadeIn}
//           >
//             About Our Platform
//           </motion.h2>
//           <motion.p
//             className="text-lg md:text-xl leading-relaxed mb-4"
//             variants={fadeIn}
//           >
//             CUI Internship Hub revolutionizes the way students and software houses connect for internship opportunities. Our platform serves as a bridge between academic learning and professional experience.
//           </motion.p>
//           <motion.p
//             className="text-lg md:text-xl leading-relaxed mb-4"
//             variants={fadeIn}
//           >
//             For students, we provide a streamlined application process with personalized recommendations based on skills and career aspirations. For organizations, we offer powerful tools to discover and recruit top talent efficiently.
//           </motion.p>
//           <motion.p
//             className="text-lg md:text-xl leading-relaxed"
//             variants={fadeIn}
//           >
//             With features like real-time communication, progress tracking, and achievement recognition, we're transforming internship experiences for all stakeholders in the tech ecosystem.
//           </motion.p>
//         </motion.div>
//       </section>

//       {/* Services Section */}
//       <section
//         ref={servicesRef}
//         className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-blue-50 relative overflow-hidden"
//       >
//         <div ref={servicesRefInView} className="absolute top-20"></div>
//         <div className="max-w-7xl mx-auto relative">
//           {/* Background Shapes */}
//           <motion.div
//             className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-200 opacity-20 blur-2xl"
//             animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
//             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//           />
//           <motion.div
//             className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-100 opacity-20 blur-2xl"
//             animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
//             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//           />
//           <motion.div
//             className="text-center mb-16"
//             initial="hidden"
//             animate={servicesInView ? "visible" : "hidden"}
//             variants={fadeIn}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
//               Our Comprehensive Services
//             </h2>
//             <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
//               We provide end-to-end solutions for students and software houses to create meaningful internship experiences
//             </p>
//           </motion.div>
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//             initial="hidden"
//             animate={servicesInView ? "visible" : "hidden"}
//             variants={staggerContainer}
//           >
//             {[
//               {
//                 title: "Student Registration",
//                 description: "Create detailed profiles showcasing your skills, education, and career aspirations.",
//                 icon: (
//                   <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 ),
//                 color: "blue"
//               },
//               {
//                 title: "Internship Management",
//                 description: "Software houses can post opportunities, review applications, and manage programs efficiently.",
//                 icon: (
//                   <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 ),
//                 color: "blue"
//               },
//               {
//                 title: "Real-time Communication",
//                 description: "Seamless messaging system for efficient communication between students and organizations.",
//                 icon: (
//                   <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                   </svg>
//                 ),
//                 color: "blue"
//               },
//               {
//                 title: "Task Management",
//                 description: "Assign, track, and evaluate intern tasks with comprehensive project management tools.",
//                 icon: (
//                   <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                   </svg>
//                 ),
//                 color: "blue"
//               },
//               {
//                 title: "Achievement Recognition",
//                 description: "Earn badges and certificates for completed internships and demonstrated skills.",
//                 icon: (
//                   <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
//                   </svg>
//                 ),
//                 color: "blue"
//               },
//               {
//                 title: "Skill Development",
//                 description: "Access resources and training to enhance technical and professional skills.",
//                 icon: (
//                   <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                   </svg>
//                 ),
//                 color: "blue"
//               }
//             ].map((service, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl relative group"
//                 variants={scaleUp}
//                 whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <div className="relative z-10 p-6">
//                   <div className={`flex items-center justify-center w-16 h-16 bg-${service.color}-100 rounded-full mb-4 mx-auto`}>
//                     {service.icon}
//                   </div>
//                   <h3 className="text-xl font-bold text-center text-blue-900 mb-2">{service.title}</h3>
//                   <p className="text-gray-600 text-center">{service.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Internships Section */}
//       <section
//         ref={internshipsRef}
//         className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 relative overflow-hidden"
//       >
//         <div ref={internshipsRefInView} className="absolute top-20"></div>
//         <div className="max-w-7xl mx-auto relative">
//           {/* Background Shape */}
//           <motion.div
//             className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-100 opacity-20 blur-2xl"
//             animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
//             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
//           />
//           <motion.div
//             className="text-center mb-16"
//             initial="hidden"
//             animate={internshipsInView ? "visible" : "hidden"}
//             variants={fadeIn}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
//               Current Internship Opportunities
//             </h2>
//             <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
//               Browse our curated list of internships from top software houses
//             </p>
//           </motion.div>

//           {/* Search Bar */}
//           <motion.div
//             className="flex justify-center mb-12"
//             initial="hidden"
//             animate={internshipsInView ? "visible" : "hidden"}
//             variants={fadeIn}
//           >
//             <div className="relative w-full max-w-2xl">
//               <motion.input
//                 type="text"
//                 placeholder="Search internships by title, skills, or company..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 transition duration-300"
//                 whileFocus={{ scale: 1.02 }}
//                 aria-label="Search internships"
//               />
//               <motion.button
//                 onClick={handleIconClick}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 aria-label="Search"
//               >
//                 <FaSearch size={20} />
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Internships Grid */}
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//             initial="hidden"
//             animate={internshipsInView ? "visible" : "hidden"}
//             variants={staggerContainer}
//           >
//             {internships.map((item) => (
//               <motion.div
//                 key={item._id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl relative group"
//                 variants={scaleUp}
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="overflow-hidden">
//                   <motion.img
//                     src={`src/assets/images/${item?.image ?? 'p1.jpeg'}`}
//                     alt={item.title}
//                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
//                   <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-blue-600 font-medium">
//                       {item.duration || "3-6 months"}
//                     </span>
//                     <motion.button
//                       className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition duration-300"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Apply Now
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {internships.length === 0 && (
//             <motion.div
//               className="text-center py-12"
//               initial="hidden"
//               animate={internshipsInView ? "visible" : "hidden"}
//               variants={fadeIn}
//             >
//               <p className="text-xl text-gray-600">
//                 No internships found matching your search. Check back later!
//               </p>
//             </motion.div>
//           )}
//         </div>
//       </section>

//       {/* Contact Us Section */}
//       <section
//         ref={contactRef}
//         className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
//       >
//         <div ref={contactRefInView} className="absolute top-20"></div>
//         <div className="max-w-7xl mx-auto relative">
//           {/* Background Shape */}
//           <motion.div
//             className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-100 opacity-20 blur-2xl"
//             animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
//             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//           />
//           <motion.div
//             className="text-center mb-16"
//             initial="hidden"
//             animate={contactInView ? "visible" : "hidden"}
//             variants={fadeIn}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
//               Get In Touch
//             </h2>
//             <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
//               Have questions or feedback? We'd love to hear from you!
//             </p>
//           </motion.div>

//           <motion.div
//             className="flex flex-col lg:flex-row gap-12"
//             initial="hidden"
//             animate={contactInView ? "visible" : "hidden"}
//             variants={staggerContainer}
//           >
//             {/* Contact Form */}
//             <motion.div className="lg:w-1/2" variants={slideInFromLeft}>
//               <div className="bg-white p-8 rounded-xl shadow-xl relative overflow-hidden">
//                 <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
//                 <div className="relative z-10">
//                   <h3 className="text-2xl font-bold text-blue-900 mb-6">Send us a message</h3>
//                   <div className="mb-6">
//                     <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
//                       Your Name
//                     </label>
//                     <motion.input
//                       type="text"
//                       id="name"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 transition duration-300"
//                       required
//                       whileFocus={{ scale: 1.02 }}
//                     />
//                   </div>
//                   <div className="mb-6">
//                     <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
//                       Email Address
//                     </label>
//                     <motion.input
//                       type="email"
//                       id="email"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 transition duration-300"
//                       required
//                       whileFocus={{ scale: 1.02 }}
//                     />
//                   </div>
//                   <div className="mb-6">
//                     <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
//                       Subject
//                     </label>
//                     <motion.input
//                       type="text"
//                       id="subject"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 transition duration-300"
//                       required
//                       whileFocus={{ scale: 1.02 }}
//                     />
//                   </div>
//                   <div className="mb-6">
//                     <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
//                       Your Message
//                     </label>
//                     <motion.textarea
//                       id="message"
//                       rows="5"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 transition duration-300"
//                       required
//                       whileFocus={{ scale: 1.02 }}
//                     ></motion.textarea>
//                   </div>
//                   <motion.button
//                     type="button"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-300"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Send Message
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Contact Information */}
//             <motion.div className="lg:w-1/2" variants={slideInFromRight}>
//               <div className="bg-white p-8 rounded-xl shadow-xl h-full relative overflow-hidden">
//                 <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-20 blur-xl"></div>
//                 <div className="relative z-10">
//                   <h3 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h3>
//                   <div className="space-y-6">
//                     <motion.div className="flex items-start" whileHover={{ x: 5 }}>
//                       <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
//                         <FaEnvelope className="h-6 w-6 text-blue-600" />
//                       </div>
//                       <div className="ml-4">
//                         <h4 className="text-lg font-medium text-blue-900">Email</h4>
//                         <p className="text-gray-600">contact@cuiinternshiphub.edu.pk</p>
//                       </div>
//                     </motion.div>
//                     <motion.div className="flex items-start" whileHover={{ x: 5 }}>
//                       <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
//                         <FaPhoneAlt className="h-6 w-6 text-blue-600" />
//                       </div>
//                       <div className="ml-4">
//                         <h4 className="text-lg font-medium text-blue-900">Phone</h4>
//                         <p className="text-gray-600">+92 51 111 001 007</p>
//                       </div>
//                     </motion.div>
//                     <motion.div className="flex items-start" whileHover={{ x: 5 }}>
//                       <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
//                         <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
//                         </svg>
//                       </div>
//                       <div className="ml-4">
//                         <h4 className="text-lg font-medium text-blue-900">Address</h4>
//                         <p className="text-gray-600">
//                           COMSATS University Vehari (Campus)<br />
//                           Mailsi Road, Off Multan Road,<br />
//                           Vehari, Punjab, Pakistan
//                         </p>
//                       </div>
//                     </motion.div>
//                   </div>
//                   <motion.div className="mt-10" variants={fadeIn}>
//                     <h4 className="text-lg font-medium text-blue-900 mb-4">Connect With Us</h4>
//                     <div className="flex space-x-4">
//                       {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((platform) => (
//                         <motion.a
//                           key={platform}
//                           href={`https://${platform}.com`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition duration-300"
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                         >
//                           <img
//                             src={`src/assets/images/${platform}.png`}
//                             alt={platform}
//                             className="h-6 w-6"
//                           />
//                         </motion.a>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <motion.footer
//         className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//       >
//         <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-200 opacity-20 blur-2xl"></div>
//         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
//           <motion.div variants={fadeIn}>
//             <h3 className="text-lg font-semibold mb-4 text-blue-200">Quick Navigation</h3>
//             <ul className="space-y-2">
//               {["Home", "About Us", "Services", "Internships", "Contact Us"].map((item) => (
//                 <motion.li
//                   key={item}
//                   className="text-gray-300 hover:text-blue-300 cursor-pointer transition-colors duration-200"
//                   whileHover={{ x: 5 }}
//                 >
//                   <a
//                     href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
//                     className="text-gray-300 hover:text-blue-300"
//                     style={{ textDecoration: 'none' }}
//                     onClick={() => scrollToSection(eval(`${item.toLowerCase().replace(/\s+/g, "")}Ref`))}
//                   >
//                     {item}
//                   </a>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//           <motion.div variants={fadeIn}>
//             <h3 className="text-lg font-semibold mb-4 text-blue-200">Information</h3>
//             <ul className="space-y-2">
//               {[
//                 "support@internshiphub.com",
//                 "Contact Us",
//                 "Terms of Service",
//                 "Privacy Policy",
//               ].map((info) => (
//                 <motion.li
//                   key={info}
//                   className="text-gray-300 hover:text-blue-300 cursor-pointer transition-colors duration-200"
//                   whileHover={{ x: 5 }}
//                 >
//                   {info.includes("@") ? (
//                     <a href={`mailto:${info}`} className="text-gray-300 hover:text-blue-300" style={{ textDecoration: 'none' }}>
//                       {info}
//                     </a>
//                   ) : (
//                     info
//                   )}
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//           <motion.div variants={fadeIn}>
//             <h3 className="text-lg font-semibold mb-4 text-blue-200">Stay Updated</h3>
//             <div className="flex space-x-4">
//               {["linkedin", "facebook", "twitter", "whatsapp"].map((platform) => (
//                 <motion.a
//                   key={platform}
//                   href={`https://${platform}.com`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition duration-300"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <img
//                     src={`src/assets/images/${platform}.png`}
//                     alt={platform}
//                     className="h-6 w-6"
//                   />
//                 </motion.a>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//         <motion.div
//           className="text-center mt-8 text-gray-300"
//           variants={fadeIn}
//         >
//           <p>© {new Date().getFullYear()} CUI Internship Hub. All rights reserved.</p>
//         </motion.div>
//       </motion.footer>

//       {/* Chatbot Button */}
//       <motion.div
//         className="fixed bottom-8 right-8 z-50"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         <button
//           onClick={toggleChatbot}
//           className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300"
//           aria-label="Toggle chatbot"
//         >
//           <FaComments size={24} />
//         </button>
//       </motion.div>

//       {/* Chatbot Component */}
//       <AnimatePresence>
//         {isChatbotOpen && (
//           <motion.div
//             className="fixed bottom-20 right-8 z-50"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Chatbot />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default LandingPage;

// import React, { useEffect, useState, useRef } from "react";
// import { FaCaretDown, FaBars, FaChevronLeft, FaChevronRight, FaPhoneAlt, FaSearch, FaEnvelope, FaComments, FaArrowRight } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Chatbot from '../components/ChatBot';
// import "../assets/css/landing.css";
// import myImage from "../assets/images/fypbg.jpg";

// const LandingPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [internships, setInternships] = useState([]);
//   const [isChatbotOpen, setIsChatbotOpen] = useState(false);
//   const [activeInternship, setActiveInternship] = useState(0);

//   const navigate = useNavigate();
//   const homeRef = useRef(null);
//   const aboutRef = useRef(null);
//   const servicesRef = useRef(null);
//   const internshipsRef = useRef(null);
//   const contactRef = useRef(null);

//   const fetchInternships = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/internships');
//       setInternships(response.data);
//     } catch (error) {
//       console.error('Failed to fetch internships:', error);
//     }
//   };

//   const scrollToSection = (sectionRef) => {
//     sectionRef.current.scrollIntoView({ behavior: "smooth" });
//     setIsMobileMenuOpen(false);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleLoginOptionClick = (role) => {
//     if (role === "Admin") navigate("/admin/login");
//     if (role === "Software House") navigate("/softwarehouse/registeration");
//     if (role === "Student") navigate("/student/login");
//     setDropdownOpen(false);
//   };

//   const toggleChatbot = () => {
//     setIsChatbotOpen(!isChatbotOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   useEffect(() => {
//     fetchInternships();
//   }, []);

//   // Auto-scroll internships
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveInternship((prev) => (prev + 1) % internships.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [internships.length]);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         when: "beforeChildren"
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   const fadeIn = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.8 } }
//   };

//   const slideInFromLeft = {
//     hidden: { x: -100, opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
//   };

//   const slideInFromRight = {
//     hidden: { x: 100, opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
//   };

//   const scaleUp = {
//     hidden: { scale: 0.9, opacity: 0 },
//     visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
//   };

//   return (
//         <div
//           className="relative min-h-screen w-full"
//           style={{
//             backgroundImage: `url(${myImage})`,
//             backgroundPosition: "center",
//             backgroundSize: "cover", // or "contain" if you want to see the entire image without cropping
//             backgroundRepeat: "no-repeat",
//             backgroundAttachment: "fixed", // optional: creates a parallax effect
//           }}
//         >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-blue-900 bg-opacity-20 backdrop-blur-sm z-1" />

//       {/* Content */}
//       <div className="relative z-10 text-white">
//         {/* Navbar */}
//         <motion.nav 
//           initial={{ y: -100 }}
//           animate={{ y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-blue-950 bg-opacity-90 p-4 shadow-lg sticky top-0 z-50"
//         >
//           <div className="container mx-auto flex justify-between items-center">
//             {/* Logo */}
//             <motion.div 
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center space-x-2"
//             >
//               <img
//                 src="src/assets/images/fyplogo1.png"
//                 alt="Logo"
//                 className="h-16 w-16 rounded-full object-cover border-2 border-white"
//               />
//               <span className="text-xl font-bold hidden md:block">CUI Internship Hub</span>
//             </motion.div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden text-white z-50"
//               onClick={toggleMobileMenu}
//             >
//               <FaBars size={24} />
//             </button>

//             {/* Desktop Menu */}
//             <ul className="hidden md:flex space-x-8 items-center">
//               {[
//                 { name: "Home", ref: homeRef },
//                 { name: "About Us", ref: aboutRef },
//                 { name: "Services", ref: servicesRef },
//                 { name: "Internships", ref: internshipsRef },
//                 { name: "Contact Us", ref: contactRef },
//               ].map((item) => (
//                 <motion.li
//                   key={item.name}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="font-semibold hover:text-blue-300 cursor-pointer transition-colors"
//                   onClick={() => scrollToSection(item.ref)}
//                 >
//                   {item.name}
//                 </motion.li>
//               ))}

//               {/* Login Button */}
//               <motion.div className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex items-center bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all border-2 border-white"
//                   onClick={toggleDropdown}
//                 >
//                   Login <FaCaretDown className="ml-2" />
//                 </motion.button>

//                 {/* Dropdown Menu */}
//                 <AnimatePresence>
//                   {dropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="absolute right-0 mt-2 bg-blue-900 shadow-lg rounded-lg w-48 z-50"
//                     >
//                       <ul className="py-2">
//                         {["Admin", "Software House", "Student"].map((role) => (
//                           <motion.li
//                             key={role}
//                             whileHover={{ scale: 1.02 }}
//                             className="px-4 py-2 hover:bg-blue-800 cursor-pointer"
//                             onClick={() => handleLoginOptionClick(role)}
//                           >
//                             {role}
//                           </motion.li>
//                         ))}
//                       </ul>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             </ul>
//           </div>

//           {/* Mobile Menu */}
//           <AnimatePresence>
//             {isMobileMenuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="md:hidden bg-blue-900 bg-opacity-95 absolute top-0 left-0 right-0 z-40 pt-20 pb-8 px-4"
//               >
//                 <ul className="flex flex-col space-y-4">
//                   {[
//                     { name: "Home", ref: homeRef },
//                     { name: "About Us", ref: aboutRef },
//                     { name: "Services", ref: servicesRef },
//                     { name: "Internships", ref: internshipsRef },
//                     { name: "Contact Us", ref: contactRef },
//                   ].map((item) => (
//                     <motion.li
//                       key={item.name}
//                       initial={{ x: -20, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ duration: 0.3 }}
//                       className="font-semibold text-lg border-b border-blue-700 pb-2 hover:text-blue-300 cursor-pointer"
//                       onClick={() => scrollToSection(item.ref)}
//                     >
//                       {item.name}
//                     </motion.li>
//                   ))}
//                 </ul>

//                 <div className="mt-6 flex flex-col space-y-4">
//                   {["Admin", "Software House", "Student"].map((role) => (
//                     <motion.button
//                       key={role}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="bg-blue-800 text-white px-4 py-2 rounded-lg"
//                       onClick={() => handleLoginOptionClick(role)}
//                     >
//                       Login as {role}
//                     </motion.button>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.nav>

//         {/* Hero Section */}
//         <section
//           ref={homeRef}
//           className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20"
//         >
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="max-w-4xl mx-auto"
//           >
//             <motion.h1 
//               variants={itemVariants}
//               className="text-4xl md:text-6xl font-bold mb-6"
//             >
//               Welcome to <span className="text-blue-300">CUI Internship Hub</span>
//             </motion.h1>
            
//             <motion.p 
//               variants={itemVariants}
//               className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
//             >
//               Bridging the gap between talented students and leading software houses
//             </motion.p>
            
//             <motion.div variants={itemVariants}>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all flex items-center mx-auto"
//                 onClick={() => scrollToSection(internshipsRef)}
//               >
//                 Explore Internships <FaArrowRight className="ml-2" />
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         </section>

//         {/* About Us Section */}
//         <section
//           ref={aboutRef}
//           className="min-h-screen py-20 bg-gray-100 text-gray-800"
//         >
//           <div className="container mx-auto px-4">
//             <motion.h2
//               initial="hidden"
//               whileInView="visible"
//               variants={fadeIn}
//               viewport={{ once: true }}
//               className="text-4xl font-bold text-center mb-16 text-blue-900"
//             >
//               About Us
//             </motion.h2>
            
//             <div className="flex flex-col md:flex-row items-center gap-12">
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 variants={slideInFromLeft}
//                 viewport={{ once: true }}
//                 className="md:w-1/2"
//               >
//                 <img
//                   src="src/assets/images/intern2.webp"
//                   alt="About CUI Internship Hub"
//                   className="rounded-xl shadow-2xl w-full h-auto"
//                 />
//               </motion.div>
              
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 variants={slideInFromRight}
//                 viewport={{ once: true }}
//                 className="md:w-1/2 bg-blue-950 text-white p-8 rounded-xl shadow-lg"
//               >
//                 <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
//                 <p className="mb-4">
//                   CUI Internship Hub is dedicated to creating meaningful connections between students and industry leaders. We believe in empowering the next generation of tech professionals with real-world experience.
//                 </p>
//                 <p className="mb-4">
//                   Our platform simplifies the internship process for both students and companies, ensuring a seamless match based on skills, interests, and organizational needs.
//                 </p>
//                 <p>
//                   With features like integrated communication tools and performance tracking, we're revolutionizing how internships are managed and experienced.
//                 </p>
                
//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {[
//                     { number: "500+", text: "Students Placed" },
//                     { number: "50+", text: "Partner Companies" },
//                     { number: "95%", text: "Satisfaction Rate" },
//                     { number: "24/7", text: "Support Available" }
//                   ].map((stat, index) => (
//                     <motion.div
//                       key={index}
//                       whileHover={{ y: -5 }}
//                       className="bg-blue-800 p-4 rounded-lg text-center"
//                     >
//                       <div className="text-2xl font-bold">{stat.number}</div>
//                       <div>{stat.text}</div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Services Section */}
//         <section
//           ref={servicesRef}
//           className="min-h-screen py-20 bg-gray-200"
//         >
//           <div className="container mx-auto px-4">
//             <motion.h2
//               initial="hidden"
//               whileInView="visible"
//               variants={fadeIn}
//               viewport={{ once: true }}
//               className="text-4xl font-bold text-center mb-16 text-blue-900"
//             >
//               Our Services
//             </motion.h2>
            
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               variants={containerVariants}
//               viewport={{ once: true }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//             >
//               {[
//                 {
//                   title: "Student Registration",
//                   icon: "👨‍🎓",
//                   description: "Seamless profile creation showcasing skills, education, and projects to attract the right opportunities."
//                 },
//                 {
//                   title: "Internship Management",
//                   icon: "💼",
//                   description: "Comprehensive tools for companies to post, manage, and track internship programs efficiently."
//                 },
//                 {
//                   title: "Chatbot Communication",
//                   icon: "🤖",
//                   description: "AI-powered assistant for instant queries, scheduling, and support throughout the internship journey."
//                 },
//                 {
//                   title: "Task Assignment",
//                   icon: "📋",
//                   description: "Structured task delegation with progress tracking for meaningful project contributions."
//                 },
//                 {
//                   title: "Performance Analytics",
//                   icon: "📊",
//                   description: "Detailed insights and feedback mechanisms for continuous improvement and recognition."
//                 },
//                 {
//                   title: "Career Development",
//                   icon: "🚀",
//                   description: "Workshops, resources, and networking opportunities to enhance professional growth."
//                 }
//               ].map((service, index) => (
//                 <motion.div
//                   key={index}
//                   variants={itemVariants}
//                   whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
//                   className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className="p-6">
//                     <div className="text-4xl mb-4">{service.icon}</div>
//                     <h3 className="text-xl font-bold mb-3 text-blue-900">{service.title}</h3>
//                     <p className="text-gray-600">{service.description}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* Internships Section */}
//         <section
//           ref={internshipsRef}
//           className="min-h-screen py-20 bg-gray-100"
//         >
//           <div className="container mx-auto px-4">
//             <motion.h2
//               initial="hidden"
//               whileInView="visible"
//               variants={fadeIn}
//               viewport={{ once: true }}
//               className="text-4xl font-bold text-center mb-16 text-blue-900"
//             >
//               Featured Internships
//             </motion.h2>
            
//             {/* Search Bar */}
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               variants={scaleUp}
//               viewport={{ once: true }}
//               className="max-w-md mx-auto mb-12 relative"
//             >
//               <input
//                 type="text"
//                 placeholder="Search internships..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full p-4 pr-12 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
//               />
//               <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
//             </motion.div>
            
//             {/* Internship Carousel */}
//             <div className="relative overflow-hidden rounded-xl shadow-2xl bg-white max-w-4xl mx-auto">
//               {internships.length > 0 && (
//                 <>
//                   <div className="relative h-96 overflow-hidden">
//                     {internships.map((internship, index) => (
//                       <motion.div
//                         key={internship._id}
//                         initial={{ opacity: 0 }}
//                         animate={{ 
//                           opacity: index === activeInternship ? 1 : 0,
//                           zIndex: index === activeInternship ? 1 : 0
//                         }}
//                         transition={{ duration: 0.5 }}
//                         className={`absolute inset-0 flex flex-col md:flex-row ${index === activeInternship ? 'block' : 'hidden'}`}
//                       >
//                         <div className="md:w-1/2 h-64 md:h-full">
//                           <img
//                             src={`src/assets/images/${internship?.image || 'p1.jpeg'}`}
//                             alt={internship.title}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div className="md:w-1/2 p-6 flex flex-col justify-center">
//                           <h3 className="text-2xl font-bold text-blue-900 mb-2">{internship.title}</h3>
//                           <p className="text-gray-600 mb-4">{internship.description}</p>
//                           <div className="mb-4">
//                             <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mr-2">
//                               {internship.duration || '3-6 months'}
//                             </span>
//                             <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
//                               {internship.type || 'Paid'}
//                             </span>
//                           </div>
//                           <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full self-start transition-colors">
//                             Apply Now
//                           </button>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
                  
//                   {/* Navigation Arrows */}
//                   <button 
//                     onClick={() => setActiveInternship((prev) => (prev - 1 + internships.length) % internships.length)}
//                     className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all z-10"
//                   >
//                     <FaChevronLeft className="text-blue-900" />
//                   </button>
//                   <button 
//                     onClick={() => setActiveInternship((prev) => (prev + 1) % internships.length)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all z-10"
//                   >
//                     <FaChevronRight className="text-blue-900" />
//                   </button>
                  
//                   {/* Indicators */}
//                   <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
//                     {internships.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setActiveInternship(index)}
//                         className={`w-3 h-3 rounded-full ${index === activeInternship ? 'bg-blue-600' : 'bg-gray-300'}`}
//                       />
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
            
//             {/* All Internships Grid */}
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               variants={containerVariants}
//               viewport={{ once: true }}
//               className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             >
//               {internships.slice(0, 6).map((internship, index) => (
//                 <motion.div
//                   key={internship._id}
//                   variants={itemVariants}
//                   whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
//                   className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className="h-48 overflow-hidden">
//                     <img
//                       src={`src/assets/images/${internship?.image || 'p1.jpeg'}`}
//                       alt={internship.title}
//                       className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-blue-900 mb-2">{internship.title}</h3>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">{internship.description}</p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm font-semibold text-blue-600">
//                         {internship.duration || '3-6 months'}
//                       </span>
//                       <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
//                         View Details <FaArrowRight className="ml-1" />
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//               className="text-center mt-12"
//             >
//               <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all">
//                 View All Internships
//               </button>
//             </motion.div>
//           </div>
//         </section>

//         {/* Contact Us Section */}
//         <section
//           ref={contactRef}
//           className="min-h-screen py-20 bg-gray-200"
//         >
//           <div className="container mx-auto px-4">
//             <motion.h2
//               initial="hidden"
//               whileInView="visible"
//               variants={fadeIn}
//               viewport={{ once: true }}
//               className="text-4xl font-bold text-center mb-16 text-blue-900"
//             >
//               Contact Us
//             </motion.h2>
            
//             <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
//               {/* Contact Form */}
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 variants={slideInFromLeft}
//                 viewport={{ once: true }}
//                 className="lg:w-1/2"
//               >
//                 <div className="bg-white rounded-xl shadow-xl p-8">
//                   <h3 className="text-2xl font-bold text-blue-900 mb-6">Send us a message</h3>
//                   <form>
//                     <div className="mb-6">
//                       <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
//                       <input
//                         type="text"
//                         id="name"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="John Doe"
//                       />
//                     </div>
//                     <div className="mb-6">
//                       <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
//                       <input
//                         type="email"
//                         id="email"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="john@example.com"
//                       />
//                     </div>
//                     <div className="mb-6">
//                       <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
//                       <textarea
//                         id="message"
//                         rows="5"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="How can we help you?"
//                       ></textarea>
//                     </div>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       type="submit"
//                       className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all"
//                     >
//                       Send Message
//                     </motion.button>
//                   </form>
//                 </div>
//               </motion.div>
              
//               {/* Contact Info */}
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 variants={slideInFromRight}
//                 viewport={{ once: true }}
//                 className="lg:w-1/2"
//               >
//                 <div className="bg-blue-950 text-white rounded-xl shadow-xl p-8 h-full">
//                   <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
                  
//                   <div className="space-y-6">
//                     <div className="flex items-start space-x-4">
//                       <div className="bg-blue-800 p-3 rounded-full">
//                         <FaEnvelope className="text-xl" />
//                       </div>
//                       <div>
//                         <h4 className="font-bold">Email</h4>
//                         <p className="text-blue-200">info@cuiinternshiphub.com</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start space-x-4">
//                       <div className="bg-blue-800 p-3 rounded-full">
//                         <FaPhoneAlt className="text-xl" />
//                       </div>
//                       <div>
//                         <h4 className="font-bold">Phone</h4>
//                         <p className="text-blue-200">+92 300 1234567</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start space-x-4">
//                       <div className="bg-blue-800 p-3 rounded-full">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <h4 className="font-bold">Address</h4>
//                         <p className="text-blue-200">COMSATS University Islamabad, Park Road, Tarlai Kalan, Islamabad</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="mt-12">
//                     <h4 className="font-bold mb-4">Follow Us</h4>
//                     <div className="flex space-x-4">
//                       {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
//                         <motion.a
//                           key={social}
//                           whileHover={{ y: -3 }}
//                           href="#"
//                           className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition-colors"
//                         >
//                           <img 
//                             src={`src/assets/images/${social}.png`} 
//                             alt={social} 
//                             className="w-6 h-6"
//                           />
//                         </motion.a>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-blue-950 text-white py-12">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               <div>
//                 <img src="src/assets/images/fyplogo1.png" alt="Logo" className="h-16 w-16 rounded-full mb-4" />
//                 <p className="text-blue-200">
//                   Connecting talented students with industry leaders for meaningful internship experiences.
//                 </p>
//               </div>
              
//               <div>
//                 <h4 className="text-lg font-bold mb-4">Quick Links</h4>
//                 <ul className="space-y-2">
//                   {['Home', 'About', 'Services', 'Internships', 'Contact'].map((link) => (
//                     <li key={link}>
//                       <a href="#" className="text-blue-200 hover:text-white transition-colors">{link}</a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div>
//                 <h4 className="text-lg font-bold mb-4">Support</h4>
//                 <ul className="space-y-2">
//                   {['FAQ', 'Privacy Policy', 'Terms of Service', 'Help Center'].map((item) => (
//                     <li key={item}>
//                       <a href="#" className="text-blue-200 hover:text-white transition-colors">{item}</a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div>
//                 <h4 className="text-lg font-bold mb-4">Newsletter</h4>
//                 <p className="text-blue-200 mb-4">
//                   Subscribe to our newsletter for the latest updates.
//                 </p>
//                 <div className="flex">
//                   <input
//                     type="email"
//                     placeholder="Your email"
//                     className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full"
//                   />
//                   <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
//                     Subscribe
//                   </button>
//                 </div>
//               </div>
//             </div>
            
//             <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
//               <p>© {new Date().getFullYear()} CUI Internship Hub. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>
        
//         {/* Chatbot Button */}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={toggleChatbot}
//           className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-xl z-50"
//         >
//           <FaComments size={24} />
//         </motion.button>
        
//         {/* Chatbot Component */}
//         <AnimatePresence>
//           {isChatbotOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               className="fixed bottom-24 right-8 z-50"
//             >
//               <Chatbot onClose={() => setIsChatbotOpen(false)} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;




import React, { useEffect, useState, useRef } from "react";
import { FaCaretDown, FaBars, FaChevronLeft, FaChevronRight, FaPhoneAlt, FaSearch, FaEnvelope, FaComments, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chatbot from '../components/ChatBot';
import "../assets/css/landing.css";
import myImage from "../assets/images/fypbg.jpg";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [internships, setInternships] = useState([]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [activeInternship, setActiveInternship] = useState(0);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const navigate = useNavigate();
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const internshipsRef = useRef(null);
  const contactRef = useRef(null);

  const fetchInternships = async () => {
    try {
      const response = await axios.get('https://internship-hub-backend.vercel.app/api/internships');
      setInternships(response.data);
    } catch (error) {
      console.error('Failed to fetch internships:', error);
    }
  };
  // Add this useEffect to handle search filtering
useEffect(() => {
  if (searchTerm.trim() === '') {
    setFilteredInternships(internships);
  } else {
    const filtered = internships.filter(internship => 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (internship.description && internship.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredInternships(filtered);
    setActiveInternship(0); // Reset carousel to first item when searching
  }
}, [searchTerm, internships]);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLoginOptionClick = (role) => {
    if (role === "Admin") navigate("/admin/login");
    if (role === "Software House") navigate("/softwarehouse/registeration");
    if (role === "Student") navigate("/student/login");
    setDropdownOpen(false);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleApplyNow = () => {
    navigate("/student/login");
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  // Auto-scroll internships
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInternship((prev) => (prev + 1) % internships.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [internships.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideInFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        backgroundImage: `url(${myImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-20 backdrop-blur-sm z-1" />

      {/* Content */}
      <div className="relative z-10 text-white">
        {/* Navbar */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-950 bg-opacity-90 p-4 shadow-lg sticky top-0 z-50"
        >
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollToSection(homeRef)}
            >
              <img
                src="src/assets/images/fyplogo1.png"
                alt="Logo"
                className="h-16 w-16 rounded-full object-cover border-2 border-white"
              />
              <span className="text-xl font-bold hidden md:block">CUI Internship Hub</span>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white z-50"
              onClick={toggleMobileMenu}
            >
              <FaBars size={24} />
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8 items-center">
              {[
                { name: "Home", ref: homeRef },
                { name: "About Us", ref: aboutRef },
                { name: "Services", ref: servicesRef },
                { name: "Internships", ref: internshipsRef },
                { name: "Contact Us", ref: contactRef },
              ].map((item) => (
                <motion.li
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-semibold hover:text-blue-300 cursor-pointer transition-colors"
                  onClick={() => scrollToSection(item.ref)}
                >
                  {item.name}
                </motion.li>
              ))}

              {/* Login Button */}
              <motion.div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all border-2 border-white"
                  onClick={toggleDropdown}
                >
                  Login <FaCaretDown className="ml-2" />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 bg-blue-900 shadow-lg rounded-lg w-48 z-50"
                    >
                      <ul className="py-2">
                        {["Admin", "Software House", "Student"].map((role) => (
                          <motion.li
                            key={role}
                            whileHover={{ scale: 1.02 }}
                            className="px-4 py-2 hover:bg-blue-800 cursor-pointer"
                            onClick={() => handleLoginOptionClick(role)}
                          >
                            {role}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ul>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-blue-900 bg-opacity-95 absolute top-0 left-0 right-0 z-40 pt-20 pb-8 px-4"
              >
                <ul className="flex flex-col space-y-4">
                  {[
                    { name: "Home", ref: homeRef },
                    { name: "About Us", ref: aboutRef },
                    { name: "Services", ref: servicesRef },
                    { name: "Internships", ref: internshipsRef },
                    { name: "Contact Us", ref: contactRef },
                  ].map((item) => (
                    <motion.li
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="font-semibold text-lg border-b border-blue-700 pb-2 hover:text-blue-300 cursor-pointer"
                      onClick={() => scrollToSection(item.ref)}
                    >
                      {item.name}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col space-y-4">
                  {["Admin", "Software House", "Student"].map((role) => (
                    <motion.button
                      key={role}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-blue-800 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleLoginOptionClick(role)}
                    >
                      Login as {role}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section */}
        <section
          ref={homeRef}
          className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Welcome to <span className="text-blue-300">CUI Internship Hub</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
            >
              Bridging the gap between talented students and leading software houses
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all flex items-center mx-auto"
                onClick={() => scrollToSection(internshipsRef)}
              >
                Explore Internships <FaArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section
          ref={aboutRef}
          className="min-h-screen py-20 bg-gray-100 text-gray-800"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16 text-blue-900"
            >
              About Us
            </motion.h2>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={slideInFromLeft}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <img
                  src="src/assets/images/aboutusimg.jpg"
                  alt="About CUI Internship Hub"
                  className="rounded-xl shadow-2xl w-full h-auto object-cover"
                />
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={slideInFromRight}
                viewport={{ once: true }}
                className="md:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                <p className="mb-4 text-blue-100">
                  At CUI Internship Hub, we envision a future where every student gains meaningful industry experience before graduation. Our platform connects COMSATS University's brightest minds with top-tier software companies, creating mutually beneficial partnerships.
                </p>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-3">Why Choose Us?</h4>
                  <ul className="space-y-2">
                    {[
                      "Direct access to vetted internship opportunities",
                      "Seamless application process",
                      "Performance tracking and feedback",
                      "Industry-aligned skill development",
                      "Dedicated support throughout your internship"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-300 mr-2">✓</span>
                        <span className="text-blue-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { number: "500+", text: "Students Placed", icon: "👨‍🎓" },
                    { number: "50+", text: "Partner Companies", icon: "🏢" },
                    { number: "95%", text: "Satisfaction Rate", icon: "⭐" },
                    { number: "24/7", text: "Support Available", icon: "🛟" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-blue-800 bg-opacity-70 p-4 rounded-lg text-center backdrop-blur-sm"
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-xl font-bold">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.text}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          ref={servicesRef}
          className="min-h-screen py-20 bg-gray-200"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16 text-blue-900"
            >
              Our Services
            </motion.h2>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Student Registration",
                  icon: "👨‍🎓",
                  description: "Seamless profile creation showcasing skills, education, and projects to attract the right opportunities."
                },
                {
                  title: "Internship Management",
                  icon: "💼",
                  description: "Comprehensive tools for companies to post, manage, and track internship programs efficiently."
                },
  
                {
                  title: "Task Assignment",
                  icon: "📋",
                  description: "Structured task delegation with progress tracking for meaningful project contributions."
                },
                {
                  title: "Performance Analytics",
                  icon: "📊",
                  description: "Detailed insights and feedback mechanisms for continuous improvement and recognition."
                },
                {
                  title: "Career Development",
                  icon: "🚀",
                  description: "Workshops, resources, and networking opportunities to enhance professional growth."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-800 to-blue-600 text-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-blue-100 flex-grow">{service.description}</p>
                    <button 
                      className="mt-4 text-white hover:text-blue-200 font-medium text-sm flex items-center self-start"
                      onClick={handleApplyNow}
                    >
                      Learn more <FaArrowRight className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Internships Section */}
        <section
          ref={internshipsRef}
          className="min-h-screen py-20 bg-gray-100"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16 text-blue-900"
            >
              Featured Internships
            </motion.h2>
            
            {/* Search Bar */}
            {/* <motion.div
              initial="hidden"
              whileInView="visible"
              variants={scaleUp}
              viewport={{ once: true }}
              className="max-w-md mx-auto mb-12 relative"
            >
              <input
                type="text"
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pr-12 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
            </motion.div> */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scaleUp}
                viewport={{ once: true }}
                className="max-w-md mx-auto mb-12 relative"
              >
                <input
                  type="text"
                  placeholder="Search internships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 pr-12 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                <FaSearch 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
                  onClick={() => {
                    // Trigger search when icon is clicked (optional)
                    const filtered = internships.filter(internship => 
                      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (internship.description && internship.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    );
                    setFilteredInternships(filtered);
                  }}
                />
              </motion.div>
                          
            {/* Internship Carousel */}
            <div className="relative overflow-hidden rounded-xl shadow-2xl bg-white max-w-4xl mx-auto">
              {internships.length > 0 && (
                <>
                  <div className="relative h-96 overflow-hidden">
                    {internships.map((internship, index) => (
                      <motion.div
                        key={internship._id}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: index === activeInternship ? 1 : 0,
                          zIndex: index === activeInternship ? 1 : 0
                        }}
                        transition={{ duration: 0.5 }}
                        className={`absolute inset-0 flex flex-col md:flex-row ${index === activeInternship ? 'block' : 'hidden'}`}
                      >
                        <div className="md:w-1/2 h-64 md:h-full">
                          <img
                            src={`src/assets/images/${internship?.image || 'p1.jpeg'}`}
                            alt={internship.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:w-1/2 p-6 flex flex-col justify-center">
                          <h3 className="text-2xl font-bold text-blue-900 mb-2">{internship.title}</h3>
                          <p className="text-gray-600 mb-4">{internship.description}</p>
                          <div className="mb-4">
                            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mr-2">
                              {internship.duration || '3-6 months'}
                            </span>
                            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                              {internship.type || 'Paid'}
                            </span>
                          </div>
                          <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full self-start transition-colors"
                            onClick={handleApplyNow}
                          >
                            Apply Now
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={() => setActiveInternship((prev) => (prev - 1 + internships.length) % internships.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all z-10"
                  >
                    <FaChevronLeft className="text-blue-900" />
                  </button>
                  <button 
                    onClick={() => setActiveInternship((prev) => (prev + 1) % internships.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all z-10"
                  >
                    <FaChevronRight className="text-blue-900" />
                  </button>
                  
                  {/* Indicators */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                    {internships.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveInternship(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === activeInternship ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* All Internships Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {internships.slice(0, 6).map((internship, index) => (
                <motion.div
                  key={internship._id}
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`src/assets/images/${internship?.image || 'p1.jpeg'}`}
                      alt={internship.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{internship.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{internship.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-blue-600">
                        {internship.duration || '3-6 months'}
                      </span>
                      <button 
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                        onClick={handleApplyNow}
                      >
                        View Details <FaArrowRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center mt-12"
            >
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
                onClick={handleApplyNow}
              >
                View All Internships
              </button>
            </motion.div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section
          ref={contactRef}
          className="min-h-screen py-20 bg-gray-200"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16 text-blue-900"
            >
              Contact Us
            </motion.h2>
            
            <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={slideInFromLeft}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="bg-white rounded-xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">Send us a message</h3>
                  <form>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Maryam Akbar"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="maryam@example.com"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                      <textarea
                        id="message"
                        rows="5"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all"
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </motion.div>
              
              {/* Contact Info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={slideInFromRight}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="bg-blue-950 text-white rounded-xl shadow-xl p-8 h-full">
                  <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-800 p-3 rounded-full flex-shrink-0">
                        <FaEnvelope className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold">Email</h4>
                        <a href="mailto:info@cuiinternshiphub.com" className="text-blue-200 hover:text-blue-300 transition-colors">
                          info@cuiinternshiphub.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-800 p-3 rounded-full flex-shrink-0">
                        <FaPhoneAlt className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold">Phone</h4>
                        <a href="tel:+923001234567" className="text-blue-200 hover:text-blue-300 transition-colors">
                          +92 300 1234567
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-800 p-3 rounded-full flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold">Address</h4>
                        <p className="text-blue-200">
                          COMSATS University Vehari(Campus),Ada pir murad, Malsi Road, Vehari, Pakistan
                        </p>
                      </div>
                    </div>
                  </div>
                  
                        <div className="mt-12">
                  <h4 className="text-lg font-bold text-blue-900 mb-4 animate-fade-in">Follow Us</h4>
                  <div className="flex space-x-4">
                    {[
                      { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
                      { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
                      { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' },
                      { name: 'Whatsapp', icon: 'whatsapp', url: 'https://whatsapp.com' },
                    ].map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${social.name}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } }}
                        whileHover={{ y: -5, scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-800 to-blue-950 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 p-2.5 rounded-full shadow-md hover:shadow-lg hover:ring-2 hover:ring-blue-500/50 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <img
                          src={`src/assets/images/${social.icon}.png`}
                          alt={social.name}
                          className="w-7 h-7 object-contain"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-950 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img 
                    src="src/assets/images/fyplogo1.png" 
                    alt="Logo" 
                    className="h-12 w-12 rounded-full border-2 border-white"
                  />
                  <span className="text-lg font-bold">CUI Internship Hub</span>
                </div>
                <p className="text-blue-200">
                  Connecting talented students with industry leaders for meaningful internship experiences.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {[
                    { name: "Home", ref: homeRef },
                    { name: "About Us", ref: aboutRef },
                    { name: "Services", ref: servicesRef },
                    { name: "Internships", ref: internshipsRef },
                    { name: "Contact Us", ref: contactRef }
                  ].map((item) => (
                    <li key={item.name}>
                      <button 
                        onClick={() => scrollToSection(item.ref)}
                        className="text-blue-200 hover:text-white transition-colors text-left"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-4">Support</h4>
                <ul className="space-y-2">
                  {[
                    { name: "FAQ", url: "/faq" },
                    { name: "Privacy Policy", url: "/privacy" },
                    { name: "Terms of Service", url: "/terms" },
                    { name: "Help Center", url: "/help" }
                  ].map((item) => (
                    <li key={item.name}>
                      <a 
                        href={item.url} 
                        className="text-blue-200 hover:text-white transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-4">Newsletter</h4>
                <p className="text-blue-200 mb-4">
                  Subscribe to our newsletter for the latest updates.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-800 w-full"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
              <p>© {new Date().getFullYear()} CUI Internship Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
        
        {/* Chatbot Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChatbot}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-xl z-50"
          aria-label="Open chatbot"
        >
          <FaComments size={24} />
        </motion.button>
        
        {/* Chatbot Component */}
        <AnimatePresence>
          {isChatbotOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-24 right-8 z-50"
            >
              <Chatbot onClose={() => setIsChatbotOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingPage;