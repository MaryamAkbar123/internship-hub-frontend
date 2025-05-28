

// import React, { useState, useEffect } from "react";
// import {
//   FaPencilAlt,
//   FaCheck,
//   FaChevronRight,
//   FaGlobe,
//   FaEnvelope,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import Logo from "../../assets/images/fyplogo1.png";
// import axios from "axios";

// const SoftHouseProfile = ({ email }) => {
//   const [showEdit, setShowEdit] = useState(false);
//   const [profile, setProfile] = useState({});
//   const [internships, setInternships] = useState([]);
//   const [companyData, setCompanyData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     location: "",
//     description: "",
//     status: 0,
//   });

//   const getInternships = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/internships/softhouse/${email}`
//       );
//       setInternships(response.data);
//     } catch (error) {
//       console.error("Failed to get internships:", error);
//     }
//   };

//   const getProfile = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/softwarehouses/profile/${email}`
//       );
//       setProfile(response.data);
//     } catch (error) {
//       console.error("Failed to get profile:", error);
//     }
//   };

//   useEffect(() => {
//     getProfile();
//     getInternships();
//   }, []);

//   useEffect(() => {
//     if (profile) {
//       setCompanyData({
//         name: profile.name || "",
//         email: profile.email || "",
//         phone: profile.phone || "",
//         location: profile.location || "",
//         description: profile.description || "",
//         status: profile.status,
//       });
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCompanyData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/softwarehouses/${profile._id}`,
//         companyData
//       );
//       alert("Profile updated successfully!");
//       setShowEdit(false);
//       getProfile(); // Refresh profile
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="flex items-center justify-between p-4 bg-blue-900">
//         <div className="flex items-center">
//           <img src={Logo} alt="Logo" className="w-14 h-14 mr-4" />
//           <h1 className="text-xl font-bold text-white">
//             CUI INTERNSHIP HUB | Software House Profile
//           </h1>
//         </div>
//       </header>

//       <main className="max-w-5xl mx-auto p-6">
//         {/* Profile Card */}
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <img
//                 src="https://placehold.co/120x120"
//                 alt="Company Logo"
//                 className="w-28 h-28 rounded-full object-cover border"
//               />
//               <div>
//                 <h2 className="text-2xl font-bold">{profile?.name}</h2>
//                 <p className="text-blue-500">{profile?.email}</p>
//                 <p className="mt-1 text-gray-600">{profile?.description}</p>
//               </div>
//             </div>
//             <button
//               className="text-blue-600 hover:text-blue-800"
//               onClick={() => setShowEdit(!showEdit)}
//             >
//               <FaPencilAlt className="text-xl" />
//             </button>
//           </div>

//           {showEdit && (
//             <div className="grid grid-cols-2 gap-4 mt-6">
//               {["name", "email", "phone", "location"].map((field) => (
//                 <div key={field}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <input
//                     name={field}
//                     type="text"
//                     value={companyData[field]}
//                     onChange={handleChange}
//                     className="mt-1 w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//               ))}
//               <div className="col-span-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={companyData.description}
//                   onChange={handleChange}
//                   className="mt-1 w-full border border-gray-300 rounded-md p-2"
//                   rows={3}
//                 />
//               </div>
//               <div className="col-span-2 flex justify-end gap-4">
//                 <button
//                   onClick={handleSubmit}
//                   className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   <FaCheck className="inline mr-2" /> Save
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sections */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Internship Posts */}
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold text-lg mb-3">Internship Postings</h3>
//             {internships.map((intern, index) => (
//               <div
//                 key={index}
//                 className="flex items-center p-2 mb-2 border rounded"
//               >
//                 <img
//                   src="https://placehold.co/40x40"
//                   alt="Intern Icon"
//                   className="rounded-full w-10 h-10 mr-3"
//                 />
//                 <div>
//                   <p className="font-bold text-sm">{intern.title}</p>
//                   <p className="text-gray-500 text-xs">{intern.type}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Location and Status */}
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold text-lg mb-3">Location</h3>
//             <div className="flex items-center gap-2 mb-3">
//               <FaMapMarkerAlt className="text-blue-600" />
//               <p>{profile?.location}</p>
//             </div>
//             <div>
//               <p className="text-sm font-medium">Company Status:</p>
//               <span
//                 className={`font-bold ${
//                   profile?.status === 1
//                     ? "text-green-600"
//                     : "text-red-500"
//                 }`}
//               >
//                 {profile?.status === 1 ? "Registered" : "Not Active"}
//               </span>
//             </div>
//           </div>

//           {/* Contact & Web Info */}
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold text-lg mb-3">Details</h3>
//             <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
//               <div>
//                 <p className="font-bold text-sm">Website</p>
//                 <p className="text-gray-500 text-xs">
//                   www.everestautomation.com
//                 </p>
//               </div>
//               <FaGlobe className="text-blue-500" />
//             </div>
//             <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
//               <div>
//                 <p className="font-bold text-sm">Email</p>
//                 <p className="text-gray-500 text-xs">{profile?.email}</p>
//               </div>
//               <FaEnvelope className="text-blue-500" />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SoftHouseProfile;


// import React, { useState, useEffect } from "react";
// import {
//   FaPencilAlt,
//   FaCheck,
//   FaTimes,
//   FaGlobe,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaLinkedin,
//   FaTwitter,
//   FaBuilding,
//   FaUsers,
//   FaCalendarAlt,
//   FaRegClock
// } from "react-icons/fa";
// import Logo from "../../assets/images/fyplogo1.png";
// import axios from "axios";

// const SoftHouseProfile = ({ email }) => {
//   const [showEdit, setShowEdit] = useState(false);
//   const [profile, setProfile] = useState({});
//   const [internships, setInternships] = useState([]);
//   const [companyData, setCompanyData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     location: "",
//     description: "",
//     website: "",
//     foundedYear: "",
//     companySize: "",
//     techStack: [],
//     status: 0,
//   });

//   const getInternships = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/internships/softhouse/${email}`
//       );
//       setInternships(response.data);
//     } catch (error) {
//       console.error("Failed to get internships:", error);
//     }
//   };

//   const getProfile = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/softwarehouses/profile/${email}`
//       );
//       setProfile(response.data);
//     } catch (error) {
//       console.error("Failed to get profile:", error);
//     }
//   };

//   useEffect(() => {
//     getProfile();
//     getInternships();
//   }, []);

//   useEffect(() => {
//     if (profile) {
//       setCompanyData({
//         name: profile.name || "",
//         email: profile.email || "",
//         phone: profile.phone || "",
//         location: profile.location || "",
//         description: profile.description || "",
//         website: profile.website || "",
//         foundedYear: profile.foundedYear || "",
//         companySize: profile.companySize || "",
//         techStack: profile.techStack || [],
//         status: profile.status || 0,
//       });
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCompanyData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTechStackChange = (e) => {
//     const techs = e.target.value.split(',').map(tech => tech.trim());
//     setCompanyData((prev) => ({ ...prev, techStack: techs }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/softwarehouses/${profile._id}`,
//         companyData
//       );
//       alert("Profile updated successfully!");
//       setShowEdit(false);
//       getProfile();
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <img src={Logo} alt="Logo" className="w-14 h-14" />
//               <h1 className="text-2xl font-bold text-white">
//                 CUI INTERNSHIP HUB | Software House Profile
//               </h1>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         {/* Profile Card */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//           <div className="p-6 md:p-8">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//               <div className="flex items-center gap-6">
//                 <div className="relative">
//                   <img
//                     src="https://placehold.co/150x150"
//                     alt="Company Logo"
//                     className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
//                   />
//                   <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2">
//                     <FaBuilding className="text-lg" />
//                   </span>
//                 </div>
//                 <div>
//                   <h2 className="text-3xl font-bold text-gray-800">{profile?.name}</h2>
//                   <p className="text-blue-600 flex items-center gap-2 mt-1">
//                     <FaEnvelope className="text-sm" /> {profile?.email}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-3">
//                     {profile?.techStack?.map((tech, index) => (
//                       <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowEdit(!showEdit)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg ${showEdit ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} hover:shadow transition-all`}
//               >
//                 {showEdit ? (
//                   <>
//                     <FaTimes /> Cancel
//                   </>
//                 ) : (
//                   <>
//                     <FaPencilAlt /> Edit Profile
//                   </>
//                 )}
//               </button>
//             </div>

//             {showEdit && (
//               <div className="mt-8 border-t pt-6">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-700">Edit Company Profile</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {["name", "email", "phone", "location", "website", "foundedYear", "companySize"].map((field) => (
//                     <div key={field} className="space-y-1">
//                       <label className="block text-sm font-medium text-gray-700 capitalize">
//                         {field.replace(/([A-Z])/g, ' $1').trim()}
//                       </label>
//                       <input
//                         name={field}
//                         type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
//                         value={companyData[field]}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   ))}
//                   <div className="md:col-span-2 space-y-1">
//                     <label className="block text-sm font-medium text-gray-700">Tech Stack (comma separated)</label>
//                     <input
//                       name="techStack"
//                       type="text"
//                       value={companyData.techStack.join(', ')}
//                       onChange={handleTechStackChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="React, Node.js, MongoDB, etc."
//                     />
//                   </div>
//                   <div className="md:col-span-2 space-y-1">
//                     <label className="block text-sm font-medium text-gray-700">Description</label>
//                     <textarea
//                       name="description"
//                       value={companyData.description}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       rows={4}
//                     />
//                   </div>
//                   <div className="md:col-span-2 flex justify-end gap-4">
//                     <button
//                       onClick={() => setShowEdit(false)}
//                       className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSubmit}
//                       className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//                     >
//                       <FaCheck /> Save Changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* About Section */}
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
//                   <FaBuilding className="text-blue-500" /> About Us
//                 </h3>
//                 <p className="text-gray-700 whitespace-pre-line">
//                   {profile?.description || "No description provided."}
//                 </p>
//               </div>
//             </div>

//             {/* Internship Opportunities */}
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
//                   <FaUsers className="text-blue-500" /> Internship Opportunities
//                 </h3>
//                 {internships.length > 0 ? (
//                   <div className="space-y-4">
//                     {internships.map((intern, index) => (
//                       <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <h4 className="font-bold text-lg text-gray-800">{intern.title}</h4>
//                             <div className="flex flex-wrap gap-2 mt-2">
//                               <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                                 {intern.type}
//                               </span>
//                               <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1">
//                                 <FaRegClock size={10} /> {intern.duration}
//                               </span>
//                             </div>
//                           </div>
//                           <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
//                             {intern.applications?.length || 0} applicants
//                           </span>
//                         </div>
//                         <p className="text-gray-600 mt-2 text-sm line-clamp-2">
//                           {intern.description}
//                         </p>
//                         <div className="flex justify-between items-center mt-4">
//                           <div className="flex items-center gap-2 text-sm text-gray-500">
//                             <FaCalendarAlt size={12} />
//                             <span>Posted: {new Date(intern.createdAt).toLocaleDateString()}</span>
//                           </div>
//                           <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
//                             View Details <FaChevronRight className="inline" size={10} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <p>No internship opportunities posted yet.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6">
//             {/* Company Details */}
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
//                   <FaBuilding className="text-blue-500" /> Company Details
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-4">
//                     <div className="text-blue-500 mt-1">
//                       <FaMapMarkerAlt />
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Location</h4>
//                       <p className="text-gray-600">{profile?.location || "Not specified"}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="text-blue-500 mt-1">
//                       <FaPhone />
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Contact</h4>
//                       <p className="text-gray-600">{profile?.phone || "Not specified"}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="text-blue-500 mt-1">
//                       <FaGlobe />
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Website</h4>
//                       <p className="text-gray-600">
//                         {profile?.website ? (
//                           <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                             {profile.website}
//                           </a>
//                         ) : "Not specified"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="text-blue-500 mt-1">
//                       <FaCalendarAlt />
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Founded</h4>
//                       <p className="text-gray-600">{profile?.foundedYear || "Not specified"}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="text-blue-500 mt-1">
//                       <FaUsers />
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Company Size</h4>
//                       <p className="text-gray-600">{profile?.companySize || "Not specified"}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="text-blue-500 mt-1">
//                       <FaBuilding />
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Status</h4>
//                       <p className={`font-medium ${profile?.status === 1 ? 'text-green-600' : 'text-red-500'}`}>
//                         {profile?.status === 1 ? "Verified Company" : "Not Verified"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Social Links */}
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
//                   <FaGlobe className="text-blue-500" /> Social Links
//                 </h3>
//                 <div className="space-y-3">
//                   <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
//                     <FaLinkedin className="text-blue-700 text-xl" />
//                     <span className="text-gray-700">LinkedIn Profile</span>
//                   </a>
//                   <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
//                     <FaTwitter className="text-blue-400 text-xl" />
//                     <span className="text-gray-700">Twitter Account</span>
//                   </a>
//                   <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
//                     <FaGlobe className="text-gray-700 text-xl" />
//                     <span className="text-gray-700">Company Website</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SoftHouseProfile;


import React, { useState, useEffect } from "react";
import {
  FaPencilAlt,
  FaCheck,
  FaTimes,
  FaGlobe,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaLinkedin,
  FaTwitter,
  FaBuilding,
  FaUsers,
  FaCalendarAlt,
  FaRegClock,
  FaExternalLinkAlt,
  FaBriefcase
} from "react-icons/fa";
import Logo from "../../assets/images/fyplogo1.png";
import axios from "axios";

const SoftHouseProfile = ({ email }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [profile, setProfile] = useState({});
  const [internships, setInternships] = useState([]);
  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    status: 0,
    profileImage: ""
  });
  const [loading, setLoading] = useState(true);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showInternshipModal, setShowInternshipModal] = useState(false);

  const getInternships = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/internships/softhouse/${email}`
      );
      setInternships(response.data);
    } catch (error) {
      console.error("Failed to get internships:", error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/softwarehouses/profile/${email}`
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to get profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
    getInternships();
  }, [email]);

  useEffect(() => {
    if (profile) {
      setCompanyData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        description: profile.description || "",
        status: profile.status || 0,
        profileImage: profile.profileImage || ""
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setCompanyData({ ...companyData, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in companyData) {
        if (companyData[key] !== null && companyData[key] !== undefined) {
          formData.append(key, companyData[key]);
        }
      }

      await axios.patch(
        `http://localhost:5000/api/softwarehouses/${profile._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      alert("Profile updated successfully!");
      setShowEdit(false);
      getProfile();
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
    setShowInternshipModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={Logo} alt="Logo" className="w-14 h-14" />
              <h1 className="text-2xl font-bold text-white">
                CUI INTERNSHIP HUB | Software House Profile
              </h1>
            </div>
            <div className="relative">
              <img
                src={companyData.profileImage ? 
                  `http://localhost:5000/${companyData.profileImage}` : 
                  'https://placehold.co/150x150'}
                alt="Company Logo"
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {showEdit && (
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600">
                  <FaPencilAlt className="text-sm" />
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={companyData.profileImage ? 
                      `http://localhost:5000/${companyData.profileImage}` : 
                      'https://placehold.co/150x150'}
                    alt="Company Logo"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2">
                    <FaBuilding className="text-lg" />
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{profile?.name}</h2>
                  <p className="text-blue-600 flex items-center gap-2 mt-1">
                    <FaEnvelope className="text-sm" /> {profile?.email}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      profile?.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {profile?.status === 1 ? "Verified" : "Not Verified"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowEdit(!showEdit)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${showEdit ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} hover:shadow transition-all`}
              >
                {showEdit ? (
                  <>
                    <FaTimes /> Cancel
                  </>
                ) : (
                  <>
                    <FaPencilAlt /> Edit Profile
                  </>
                )}
              </button>
            </div>

            {showEdit && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Edit Company Profile</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["name", "email", "phone", "location"].map((field) => (
                      <div key={field} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {field.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                          name={field}
                          type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                          value={companyData[field]}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required={field !== 'phone'}
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2 space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={companyData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={4}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Company Logo</label>
                      <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setShowEdit(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <FaCheck /> Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <FaBuilding className="text-blue-500" /> About Us
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {profile?.description || "No description provided."}
                </p>
              </div>
            </div>

            {/* Internship Opportunities */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <FaBriefcase className="text-blue-500" /> Internship Opportunities
                </h3>
                {internships.length > 0 ? (
                  <div className="space-y-4">
                    {internships.map((intern, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-lg text-gray-800">{intern.title}</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {intern.type}
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                                <FaRegClock size={10} /> {intern.duration}
                              </span>
                            </div>
                          </div>
                          <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                            {intern.applications?.length || 0} applicants
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                          {intern.description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FaCalendarAlt size={12} />
                            <span>Posted: {new Date(intern.createdAt).toLocaleDateString()}</span>
                          </div>
                          <button 
                            onClick={() => handleViewDetails(intern)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                          >
                            View Details <FaExternalLinkAlt size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No internship opportunities posted yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Company Details */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <FaBuilding className="text-blue-500" /> Company Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-blue-500 mt-1">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Location</h4>
                      <p className="text-gray-600">{profile?.location || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-blue-500 mt-1">
                      <FaPhone />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Contact</h4>
                      <p className="text-gray-600">{profile?.phone || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-blue-500 mt-1">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Email</h4>
                      <p className="text-gray-600">{profile?.email || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-blue-500 mt-1">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Member Since</h4>
                      <p className="text-gray-600">
                        {profile?.dateCreated ? new Date(profile.dateCreated).toLocaleDateString() : "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-blue-500 mt-1">
                      <FaBuilding />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Status</h4>
                      <p className={`font-medium ${profile?.status === 1 ? 'text-green-600' : 'text-red-500'}`}>
                        {profile?.status === 1 ? "Verified Company" : "Not Verified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <FaGlobe className="text-blue-500" /> Social Links
                </h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                    <FaLinkedin className="text-blue-700 text-xl" />
                    <span className="text-gray-700">LinkedIn Profile</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                    <FaTwitter className="text-blue-400 text-xl" />
                    <span className="text-gray-700">Twitter Account</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Internship Details Modal */}
      {showInternshipModal && selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedInternship.title || 'Internship Details'}
                </h3>
                <button 
                  onClick={() => setShowInternshipModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Internship Information</h4>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <FaBriefcase className="text-blue-500 mr-2" />
                        <span>Type: {selectedInternship.type || 'Not specified'}</span>
                      </p>
                      <p className="flex items-center">
                        <FaRegClock className="text-blue-500 mr-2" />
                        <span>Duration: {selectedInternship.duration || 'Not specified'}</span>
                      </p>
                      <p className="flex items-center">
                        <FaCalendarAlt className="text-blue-500 mr-2" />
                        <span>Posted: {new Date(selectedInternship.createdAt).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Applications</h4>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <FaUsers className="text-blue-500 mr-2" />
                        <span>Total Applicants: {selectedInternship.applications?.length || 0}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Description</h4>
                  <p className="text-gray-700">
                    {selectedInternship.description || 'No description provided'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements</h4>
                  <p className="text-gray-700">
                    {selectedInternship.requirements || 'No specific requirements'}
                  </p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setShowInternshipModal(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftHouseProfile;