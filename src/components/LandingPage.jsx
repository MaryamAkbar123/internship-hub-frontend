


// import React, { useEffect, useState, useRef } from "react";
// import { FaCaretDown, FaBars, FaChevronLeft, FaChevronRight, FaPhoneAlt, FaSearch, FaEnvelope, FaComments, FaArrowRight } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Chatbot from '../components/ChatBot';
// import "../assets/css/landing.css";
// import myImage from "../assets/images/fypbg.jpg";
// import fyplogo from "../assets/images/fyplogo1.png";
// import Aboutus from "../assets/images/aboutusimg.jpg";



// const LandingPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [internships, setInternships] = useState([]);
//   const [isChatbotOpen, setIsChatbotOpen] = useState(false);
//   const [activeInternship, setActiveInternship] = useState(0);
//   const [filteredInternships, setFilteredInternships] = useState([]);
//   const navigate = useNavigate();
//   const homeRef = useRef(null);
//   const aboutRef = useRef(null);
//   const servicesRef = useRef(null);
//   const internshipsRef = useRef(null);
//   const contactRef = useRef(null);

//   const fetchInternships = async () => {
//     try {
//       const response = await axios.get('https://internship-hub-backend.vercel.app/api/internships');
//       setInternships(response.data);
//     } catch (error) {
//       console.error('Failed to fetch internships:', error);
//     }
//   };
//   // Add this useEffect to handle search filtering
// useEffect(() => {
//   if (searchTerm.trim() === '') {
//     setFilteredInternships(internships);
//   } else {
//     const filtered = internships.filter(internship => 
//       internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (internship.description && internship.description.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//     setFilteredInternships(filtered);
//     setActiveInternship(0); // Reset carousel to first item when searching
//   }
// }, [searchTerm, internships]);

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

//   const handleApplyNow = () => {
//     navigate("/student/login");
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
//     <div
//       className="relative min-h-screen w-full"
//       style={{
//         backgroundImage: `url(${myImage})`,
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-blue-900 bg-opacity-20 backdrop-blur-sm z-1" />

//       {/* Content */}
//       <div className="relative z-10 text-white">
//         {/* Navbar */}
//        <motion.nav 
//             initial={{ y: -100 }}
//             animate={{ y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-blue-950 bg-opacity-90 p-4 shadow-lg sticky top-0 z-50"
//           >
//             <div className="container mx-auto flex justify-between items-center">
//               {/* Logo */}
//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center space-x-2 cursor-pointer"
//                 onClick={() => {
//                   scrollToSection(homeRef);
//                   if (isMobileMenuOpen) toggleMobileMenu(); // Close mobile menu on logo click
//                 }}
//               >
//                 <img
//                   src= {fyplogo}
//                   alt="Logo"
//                   className="h-16 w-16 rounded-full object-cover border-2 border-white"
//                 />
//                 <span className="text-xl font-bold hidden md:block">CUI Internship Hub</span>
//               </motion.div>

//               {/* Mobile Menu Button */}
//               <button
//                 className="md:hidden text-white z-50"
//                 onClick={toggleMobileMenu}
//               >
//                 <FaBars size={24} />
//               </button>

//               {/* Desktop Menu */}
//               <ul className="hidden md:flex space-x-8 items-center">
//                 {[
//                   { name: "Home", ref: homeRef },
//                   { name: "About Us", ref: aboutRef },
//                   { name: "Services", ref: servicesRef },
//                   { name: "Internships", ref: internshipsRef },
//                   { name: "Contact Us", ref: contactRef },
//                 ].map((item) => (
//                   <motion.li
//                     key={item.name}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="font-semibold hover:text-blue-300 cursor-pointer transition-colors"
//                     onClick={() => scrollToSection(item.ref)}
//                   >
//                     {item.name}
//                   </motion.li>
//                 ))}

//                 {/* Login Button */}
//                 <motion.div className="relative">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="flex items-center bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all border-2 border-white"
//                     onClick={toggleDropdown}
//                   >
//                     Login <FaCaretDown className="ml-2" />
//                   </motion.button>

//                   {/* Dropdown Menu */}
//                   <AnimatePresence>
//                     {dropdownOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="absolute right-0 mt-2 bg-blue-900 shadow-lg rounded-lg w-48 z-50"
//                       >
//                         <ul className="py-2">
//                           {["Admin", "Software House", "Student"].map((role) => (
//                             <motion.li
//                               key={role}
//                               whileHover={{ scale: 1.02 }}
//                               className="px-4 py-2 hover:bg-blue-800 cursor-pointer"
//                               onClick={() => handleLoginOptionClick(role)}
//                             >
//                               {role}
//                             </motion.li>
//                           ))}
//                         </ul>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               </ul>
//             </div>

//             {/* Mobile Menu */}
//             <AnimatePresence>
//               {isMobileMenuOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="md:hidden bg-blue-900 bg-opacity-95 absolute top-0 left-0 right-0 z-40 pt-20 pb-8 px-4"
//                 >
//                   <ul className="flex flex-col space-y-4">
//                     {[
//                       { name: "Home", ref: homeRef },
//                       { name: "About Us", ref: aboutRef },
//                       { name: "Services", ref: servicesRef },
//                       { name: "Internships", ref: internshipsRef },
//                       { name: "Contact Us", ref: contactRef },
//                     ].map((item) => (
//                       <motion.li
//                         key={item.name}
//                         initial={{ x: -20, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ duration: 0.3 }}
//                         className="font-semibold text-lg border-b border-blue-700 pb-2 hover:text-blue-300 cursor-pointer"
//                         onClick={() => {
//                           scrollToSection(item.ref); // Scroll to section
//                           toggleMobileMenu(); // Close mobile menu
//                         }}
//                       >
//                         {item.name}
//                       </motion.li>
//                     ))}
//                   </ul>

//                   <div className="mt-6 flex flex-col space-y-4">
//                     {["Admin", "Software House", "Student"].map((role) => (
//                       <motion.button
//                         key={role}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="bg-blue-800 text-white px-4 py-2 rounded-lg"
//                         onClick={() => {
//                           handleLoginOptionClick(role); // Handle login
//                           toggleMobileMenu(); // Close mobile menu
//                         }}
//                       >
//                         Login as {role}
//                       </motion.button>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.nav>

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
//                   src={Aboutus}
//                   alt="About CUI Internship Hub"
//                   className="rounded-xl shadow-2xl w-full h-auto object-cover"
//                 />
//               </motion.div>
              
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 variants={slideInFromRight}
//                 viewport={{ once: true }}
//                 className="md:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8 rounded-xl shadow-lg"
//               >
//                 <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
//                 <p className="mb-4 text-blue-100">
//                   At CUI Internship Hub, we envision a future where every student gains meaningful industry experience before graduation. Our platform connects COMSATS University's brightest minds with top-tier software companies, creating mutually beneficial partnerships.
//                 </p>
                
//                 <div className="mb-6">
//                   <h4 className="text-xl font-semibold mb-3">Why Choose Us?</h4>
//                   <ul className="space-y-2">
//                     {[
//                       "Direct access to vetted internship opportunities",
//                       "Seamless application process",
//                       "Performance tracking and feedback",
//                       "Industry-aligned skill development",
//                       "Dedicated support throughout your internship"
//                     ].map((item, index) => (
//                       <li key={index} className="flex items-start">
//                         <span className="text-blue-300 mr-2">✓</span>
//                         <span className="text-blue-100">{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {[
//                     { number: "500+", text: "Students Placed", icon: "👨‍🎓" },
//                     { number: "50+", text: "Partner Companies", icon: "🏢" },
//                     { number: "95%", text: "Satisfaction Rate", icon: "⭐" },
//                     { number: "24/7", text: "Support Available", icon: "🛟" }
//                   ].map((stat, index) => (
//                     <motion.div
//                       key={index}
//                       whileHover={{ y: -5, scale: 1.02 }}
//                       className="bg-blue-800 bg-opacity-70 p-4 rounded-lg text-center backdrop-blur-sm"
//                     >
//                       <div className="text-2xl mb-1">{stat.icon}</div>
//                       <div className="text-xl font-bold">{stat.number}</div>
//                       <div className="text-sm text-blue-200">{stat.text}</div>
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
//                   whileHover={{ y: -10, scale: 1.02 }}
//                   className="bg-gradient-to-br from-blue-800 to-blue-600 text-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className="p-6 h-full flex flex-col">
//                     <div className="text-4xl mb-4">{service.icon}</div>
//                     <h3 className="text-xl font-bold mb-3">{service.title}</h3>
//                     <p className="text-blue-100 flex-grow">{service.description}</p>
//                     <button 
//                       className="mt-4 text-white hover:text-blue-200 font-medium text-sm flex items-center self-start"
//                       onClick={handleApplyNow}
//                     >
//                       Learn more <FaArrowRight className="ml-1" />
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* Internships Section */}
//        <section
//           ref={internshipsRef}
//             className="min-h-screen py-20 bg-gray-100"
//           >
//             <div className="container mx-auto px-4">
//               <motion.h2
//                 initial="hidden"
//                 whileInView="visible"
//                 variants={fadeIn}
//                 viewport={{ once: true }}
//                 className="text-4xl font-bold text-center mb-16 text-blue-900"
//               >
//                 Featured Internships
//               </motion.h2>
              
//               {/* Search Bar */}
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 variants={scaleUp}
//                 viewport={{ once: true }}
//                 className="max-w-md mx-auto mb-12 relative"
//               >
//                 <input
//                   type="text"
//                   placeholder="Search internships..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full p-4 pr-12 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
//                 />
//                 <FaSearch 
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
//                   onClick={() => {
//                     const currentDate = new Date("2025-06-01T22:43:00+05:00"); // June 01, 2025, 10:43 PM PKT
//                     const filtered = internships
//                       .filter((internship) => {
//                         if (!internship.deadline) return false; // Skip if no deadline
//                         const deadline = new Date(internship.deadline);
//                         return !isNaN(deadline) && deadline >= currentDate; // Valid date and not past
//                       })
//                       .filter((internship) => 
//                         internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                         (internship.description && internship.description.toLowerCase().includes(searchTerm.toLowerCase()))
//                       );
//                     setFilteredInternships(filtered);
//                   }}
//                 />
//               </motion.div>
              
//               {/* Internship Carousel */}
//               <div className="relative overflow-hidden rounded-xl shadow-2xl bg-white max-w-4xl mx-auto">
//                 {internships.length > 0 ? (
//                   <>
//                     <div className="relative h-96 overflow-hidden">
//                       {internships
//                         .filter((internship) => {
//                           if (!internship.deadline) return false; // Skip if no deadline
//                           const deadline = new Date(internship.deadline);
//                           const currentDate = new Date("2025-06-01T22:43:00+05:00"); // June 01, 2025, 10:43 PM PKT
//                           return !isNaN(deadline) && deadline >= currentDate; // Valid date and not past
//                         })
//                         .map((internship, index) => (
//                           <motion.div
//                             key={internship._id}
//                             initial={{ opacity: 0 }}
//                             animate={{ 
//                               opacity: index === activeInternship ? 1 : 0,
//                               zIndex: index === activeInternship ? 1 : 0
//                             }}
//                             transition={{ duration: 0.5 }}
//                             className={`absolute inset-0 flex flex-col md:flex-row ${index === activeInternship ? 'block' : 'hidden'}`}
//                           >
//                             <div className="md:w-1/2 h-64 md:h-full">
//                               <img
//                                 src={`src/assets/images/${internship?.image || 'p1.jpeg'}`}
//                                 alt={internship.title}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>
//                             <div className="md:w-1/2 p-6 flex flex-col justify-center">
//                               <h3 className="text-2xl font-bold text-blue-900 mb-2">{internship.title}</h3>
//                               <p className="text-gray-600 mb-4">{internship.description}</p>
//                               <div className="mb-4">
//                                 <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mr-2">
//                                   {internship.duration || '3-6 months'}
//                                 </span>
//                                 <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
//                                   {internship.type || 'Paid'}
//                                 </span>
//                               </div>
//                               <button 
//                                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full self-start transition-colors"
//                                 onClick={handleApplyNow}
//                               >
//                                 Apply Now
//                               </button>
//                             </div>
//                           </motion.div>
//                         ))}
//                     </div>
                    
//                     {/* Navigation Arrows */}
//                     <button 
//                       onClick={() => setActiveInternship((prev) => (prev - 1 + internships.length) % internships.length)}
//                       className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all z-10"
//                     >
//                       <FaChevronLeft className="text-blue-900" />
//                     </button>
//                     <button 
//                       onClick={() => setActiveInternship((prev) => (prev + 1) % internships.length)}
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all z-10"
//                     >
//                       <FaChevronRight className="text-blue-900" />
//                     </button>
                    
//                     {/* Indicators */}
//                     <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
//                       {internships
//                         .filter((internship) => {
//                           if (!internship.deadline) return false; // Skip if no deadline
//                           const deadline = new Date(internship.deadline);
//                           const currentDate = new Date("2025-06-01T22:43:00+05:00"); // June 01, 2025, 10:43 PM PKT
//                           return !isNaN(deadline) && deadline >= currentDate; // Valid date and not past
//                         })
//                         .map((_, index) => (
//                           <button
//                             key={index}
//                             onClick={() => setActiveInternship(index)}
//                             className={`w-3 h-3 rounded-full transition-all ${index === activeInternship ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
//                           />
//                         ))}
//                     </div>
//                   </>
//                 ) : (
//                   <div className="p-6 text-center text-gray-500">
//                     No active internships available.
//                   </div>
//                 )}
//               </div>
              
//               {/* All Internships Grid */}
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 variants={containerVariants}
//                 viewport={{ once: true }}
//                 className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 {internships
//                   .filter((internship) => {
//                     if (!internship.deadline) return false; // Skip if no deadline
//                     const deadline = new Date(internship.deadline);
//                     const currentDate = new Date("2025-06-01T22:43:00+05:00"); // June 01, 2025, 10:43 PM PKT
//                     return !isNaN(deadline) && deadline >= currentDate; // Valid date and not past
//                   })
//                   .slice(0, 6)
//                   .map((internship, index) => (
//                     <motion.div
//                       key={internship._id}
//                       variants={itemVariants}
//                       whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
//                       className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//                     >
//                       <div className="h-48 overflow-hidden">
//                         <img
//                           src={`src/assets/images/${internship?.image || 'p1.jpeg'}`}
//                           alt={internship.title}
//                           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                         />
//                       </div>
//                       <div className="p-6">
//                         <h3 className="text-xl font-bold text-blue-900 mb-2">{internship.title}</h3>
//                         <p className="text-gray-600 text-sm mb-4 line-clamp-2">{internship.description}</p>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm font-semibold text-blue-600">
//                             {internship.duration || '3-6 months'}
//                           </span>
//                           <button 
//                             className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
//                             onClick={handleApplyNow}
//                           >
//                             View Details <FaArrowRight className="ml-1" />
//                           </button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//               </motion.div>
              
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2 }}
//                 className="text-center mt-12"
//               >
//                 <button 
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
//                   onClick={handleApplyNow}
//                 >
//                   View All Internships
//                 </button>
//               </motion.div>
//             </div>
//           </section>

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
//                         placeholder="Maryam Akbar"
//                       />
//                     </div>
//                     <div className="mb-6">
//                       <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
//                       <input
//                         type="email"
//                         id="email"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="maryam@example.com"
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
//                       <div className="bg-blue-800 p-3 rounded-full flex-shrink-0">
//                         <FaEnvelope className="text-xl" />
//                       </div>
//                       <div>
//                         <h4 className="font-bold">Email</h4>
//                         <a href="mailto:info@cuiinternshiphub.com" className="text-blue-200 hover:text-blue-300 transition-colors">
//                           info@cuiinternshiphub.com
//                         </a>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start space-x-4">
//                       <div className="bg-blue-800 p-3 rounded-full flex-shrink-0">
//                         <FaPhoneAlt className="text-xl" />
//                       </div>
//                       <div>
//                         <h4 className="font-bold">Phone</h4>
//                         <a href="tel:+923001234567" className="text-blue-200 hover:text-blue-300 transition-colors">
//                           +92 300 1234567
//                         </a>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-start space-x-4">
//                       <div className="bg-blue-800 p-3 rounded-full flex-shrink-0">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                       </div>
//                       <div>
//                         <h4 className="font-bold">Address</h4>
//                         <p className="text-blue-200">
//                           COMSATS University Vehari(Campus),Ada pir murad, Malsi Road, Vehari, Pakistan
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                  
//                         <div className="mt-12">
//                   <h4 className="text-lg font-bold text-blue-900 mb-4 animate-fade-in">Follow Us</h4>
//                   <div className="flex space-x-4">
//                     {[
//                       { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
//                       { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
//                       { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' },
//                       { name: 'Whatsapp', icon: 'whatsapp', url: 'https://whatsapp.com' },
//                     ].map((social, index) => (
//                       <motion.a
//                         key={social.name}
//                         href={social.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label={`Follow us on ${social.name}`}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } }}
//                         whileHover={{ y: -5, scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
//                         whileTap={{ scale: 0.95 }}
//                         className="bg-gradient-to-r from-blue-800 to-blue-950 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 p-2.5 rounded-full shadow-md hover:shadow-lg hover:ring-2 hover:ring-blue-500/50 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <img
//                           src={`src/assets/images/${social.icon}.png`}
//                           alt={social.name}
//                           className="w-7 h-7 object-contain"
//                         />
//                       </motion.a>
//                     ))}
//                   </div>
//                 </div>
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
//                 <div className="flex items-center space-x-2 mb-4">
//                   <img 
//                     src="src/assets/images/fyplogo1.png" 
//                     alt="Logo" 
//                     className="h-12 w-12 rounded-full border-2 border-white"
//                   />
//                   <span className="text-lg font-bold">CUI Internship Hub</span>
//                 </div>
//                 <p className="text-blue-200">
//                   Connecting talented students with industry leaders for meaningful internship experiences.
//                 </p>
//               </div>
              
//               <div>
//                 <h4 className="text-lg font-bold mb-4">Quick Links</h4>
//                 <ul className="space-y-2">
//                   {[
//                     { name: "Home", ref: homeRef },
//                     { name: "About Us", ref: aboutRef },
//                     { name: "Services", ref: servicesRef },
//                     { name: "Internships", ref: internshipsRef },
//                     { name: "Contact Us", ref: contactRef }
//                   ].map((item) => (
//                     <li key={item.name}>
//                       <button 
//                         onClick={() => scrollToSection(item.ref)}
//                         className="text-blue-200 hover:text-white transition-colors text-left"
//                       >
//                         {item.name}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div>
//                 <h4 className="text-lg font-bold mb-4">Support</h4>
//                 <ul className="space-y-2">
//                   {[
//                     { name: "FAQ", url: "/faq" },
//                     { name: "Privacy Policy", url: "/privacy" },
//                     { name: "Terms of Service", url: "/terms" },
//                     { name: "Help Center", url: "/help" }
//                   ].map((item) => (
//                     <li key={item.name}>
//                       <a 
//                         href={item.url} 
//                         className="text-blue-200 hover:text-white transition-colors"
//                       >
//                         {item.name}
//                       </a>
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
import fypbg from "../assets/images/fypbg.jpg";
import fyplogo from "../assets/images/fyplogo1.png";
import aboutus from "../assets/images/aboutusimg.jpg";
import defaultInternshipImage from "../assets/images/p1.jpeg"; // Fallback image for internships
import facebookIcon from "../assets/images/facebook.png";
import twitterIcon from "../assets/images/twitter.png";
import linkedinIcon from "../assets/images/linkedin.png";
import whatsappIcon from "../assets/images/whatsapp.png";

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

  // Map of image filenames to imported images (if API returns filenames)
  const internshipImageMap = {
    "p1.jpeg": defaultInternshipImage,
    // Add more mappings if you have other specific images
  };

  const fetchInternships = async () => {
    try {
      const response = await axios.get('https://internship-hub-backend.vercel.app/api/internships');
      setInternships(response.data);
    } catch (error) {
      console.error('Failed to fetch internships:', error);
    }
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInternship((prev) => (prev + 1) % internships.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [internships.length]);

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
        backgroundImage: `url(${fypbg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-blue-900 bg-opacity-20 backdrop-blur-sm z-1" />

      <div className="relative z-10 text-white">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-950 bg-opacity-90 p-4 shadow-lg sticky top-0 z-50"
        >
          <div className="container mx-auto flex justify-between items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => {
                scrollToSection(homeRef);
                if (isMobileMenuOpen) toggleMobileMenu();
              }}
            >
              <img
                src={fyplogo}
                alt="Logo"
                className="h-16 w-16 rounded-full object-cover border-2 border-white"
              />
              <span className="text-xl font-bold hidden md:block">CUI Internship Hub</span>
            </motion.div>

            <button
              className="md:hidden text-white z-50"
              onClick={toggleMobileMenu}
            >
              <FaBars size={24} />
            </button>

            <ul className="hidden md:flex space-x-8 items-center">
              {[
                Godot
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

              <motion.div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all border-2 border-white"
                  onClick={toggleDropdown}
                >
                  Login <FaCaretDown className="ml-2" />
                </motion.button>

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
                      onClick={() => {
                        scrollToSection(item.ref);
                        toggleMobileMenu();
                      }}
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
                      onClick={() => {
                        handleLoginOptionClick(role);
                        toggleMobileMenu();
                      }}
                    >
                      Login as {role}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

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
                  src={aboutus}
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
                  const currentDate = new Date("2025-06-01T22:43:00+05:00");
                  const filtered = internships
                    .filter((internship) => {
                      if (!internship.deadline) return false;
                      const deadline = new Date(internship.deadline);
                      return !isNaN(deadline) && deadline >= currentDate;
                    })
                    .filter((internship) => 
                      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (internship.description && internship.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    );
                  setFilteredInternships(filtered);
                }}
              />
            </motion.div>
            
            <div className="relative overflow-hidden rounded-xl shadow-2xl bg-white max-w-4xl mx-auto">
              {filteredInternships.length > 0 ? (
                <>
                  <div className="relative h-96 overflow-hidden">
                    {filteredInternships
                      .filter((internship) => {
                        if (!internship.deadline) return false;
                        const deadline = new Date(internship.deadline);
                        const currentDate = new Date("2025-06-01T22:43:00+05:00");
                        return !isNaN(deadline) && deadline >= currentDate;
                      })
                      .map((internship, index) => (
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
                              src={internship.image ? internshipImageMap[internship.image] || defaultInternshipImage : defaultInternshipImage}
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
                  
                  <button 
                    onClick={() => setActiveInternship((prev) => (prev - 1 + filteredInternships.length) % filteredInternships.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all z-10"
                  >
                    <FaChevronLeft className="text-blue-900" />
                  </button>
                  <button 
                    onClick={() => setActiveInternship((prev) => (prev + 1) % filteredInternships.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all z-10"
                  >
                    <FaChevronRight className="text-blue-900" />
                  </button>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                    {filteredInternships
                      .filter((internship) => {
                        if (!internship.deadline) return false;
                        const deadline = new Date(internship.deadline);
                        const currentDate = new Date("2025-06-01T22:43:00+05:00");
                        return !isNaN(deadline) && deadline >= currentDate;
                      })
                      .map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveInternship(index)}
                          className={`w-3 h-3 rounded-full transition-all ${index === activeInternship ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No active internships available.
                </div>
              )}
            </div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredInternships
                .filter((internship) => {
                  if (!internship.deadline) return false;
                  const deadline = new Date(internship.deadline);
                  const currentDate = new Date("2025-06-01T22:43:00+05:00");
                  return !isNaN(deadline) && deadline >= currentDate;
                })
                .slice(0, 6)
                .map((internship, index) => (
                  <motion.div
                    key={internship._id}
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={internship.image ? internshipImageMap[internship.image] || defaultInternshipImage : defaultInternshipImage}
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
                        { name: 'Facebook', icon: facebookIcon, url: 'https://facebook.com' },
                        { name: 'Twitter', icon: twitterIcon, url: 'https://twitter.com' },
                        { name: 'LinkedIn', icon: linkedinIcon, url: 'https://linkedin.com' },
                        { name: 'Whatsapp', icon: whatsappIcon, url: 'https://whatsapp.com' },
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
                            src={social.icon}
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

        <footer className="bg-blue-950 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img 
                    src={fyplogo} 
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
      </div>
    </div>
  );
};

export default LandingPage;