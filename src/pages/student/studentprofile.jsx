
// import React, { useState, useEffect } from 'react';
// import {
//   FaPencilAlt, FaDownload, FaUniversity,
//   FaBriefcase, FaPhone, FaLinkedin, FaCheck,
//   FaBuilding, FaCalendarAlt, FaUserTie,FaClock,FaEnvelope 
// } from 'react-icons/fa';
// import "../../assets/css/studentprofile.css";
// import axios from 'axios';

// const StudentProfile = () => {
//   const fullName = localStorage.getItem('name');
//   const email = localStorage.getItem('email');
//   const studentId = localStorage.getItem('id');

//   const [profile, setProfile] = useState({
//     studentId: studentId,
//     fullName: fullName || '',
//     email: email || '',
//     phone: '',
//     program: '',
//     university: '',
//     skill: '',
//     linkedin: '',
//     profileImage: ''
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [currentInternships, setCurrentInternships] = useState([]);
//   const [loadingInternships, setLoadingInternships] = useState(true);

//   // Fetch student profile from backend
//   useEffect(() => {
//     const fetchStudentProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/profiles`);
//         const studentProfile = response.data.find(profile => profile.studentId === studentId);
        
//         if (studentProfile) {
//           setProfile(prev => ({
//             ...prev,
//             ...studentProfile,
//             profileImage: studentProfile.profileImage || ''
//           }));
//         }
//       } catch (error) {
//         console.error('Error fetching student profile:', error);
//       }
//     };

//     fetchStudentProfile();
//   }, [studentId]);

//   // Fetch current internships
//   useEffect(() => {
// const fetchCurrentInternships = async () => {
//   try {
//     setLoadingInternships(true);
    
//     // 1. Fetch profile data
//     const profileResponse = await axios.get(`http://localhost:5000/api/profiles`);
//     const studentProfile = profileResponse.data.find(profile => profile.studentId === studentId);
    
//     // 2. Fetch applications
//     const applicationsResponse = await axios.get(`http://localhost:5000/api/applications`);
    
//     // 3. Fetch all software houses/companies
//     const companiesResponse = await axios.get(`http://localhost:5000/api/softwarehouses`);
//     const companies = companiesResponse.data;
    
//     // 4. Filter approved applications for current student
//     const studentApplications = applicationsResponse.data.filter(app => 
//       app.studentId === studentId && app.status === 1
//     );

//     // 5. Map internships with company names
//     const internshipsWithCompanies = studentApplications.map(app => {
//       // Find the company that matches the internship's companyId
//       const company = companies.find(c => c._id === app.internship.companyId);
      
//       return {
//         ...app.internship,
//         companyName: company ? company.name : 'Unknown Company',
//         companyEmail: company ? company.email : '',
//         companyPhone: company ? company.phone : '',
//         applicationId: app._id,
//         applicationDate: app.createdAt
//       };
//     });

//     // 6. Update state
//     setProfile(prev => ({
//       ...prev,
//       ...studentProfile,
//       profileImage: studentProfile?.profileImage || ''
//     }));
    
//     setCurrentInternships(internshipsWithCompanies);
//     console.log('Internships with company data:', internshipsWithCompanies);
//   } catch (error) {
//     console.error('Error fetching student data:', error);
//   } finally {
//     setLoadingInternships(false);
//   }
// };

//     fetchCurrentInternships();
//   }, [studentId]);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     setProfile(prevData => ({
//       ...prevData,
//       [name]: files ? files[0] : value
//     }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       for (let key in profile) {
//         formData.append(key, profile[key]);
//       }

//       await axios.post('http://localhost:5000/api/profiles', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       alert('Profile saved successfully!');
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       alert('Failed to save profile. Please try again.');
//     }
//   };

//   const toggleEditMode = () => setIsEditing(!isEditing);

//   return (
//     <div className="student-profile-container bg-gray-100 min-h-screen p-4 md:p-10">
//       <div className="profile-header bg-blue-900 text-white p-6 rounded-t-lg flex flex-col md:flex-row items-center shadow-lg mb-6">
//         <img
//           src="/src/assets/images/fyplogo1.png"
//           alt="Logo"
//           className="w-20 h-20 mr-4 rounded-full border-2 border-white"
//         />
//         <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
//           CUI Internship Hub - {fullName} Profile
//         </h1>
//       </div>

//       <div className="profile-content bg-white p-4 md:p-8 rounded-b-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
//         {/* Personal Info */}
//         <div className="personal-info relative">
//           <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">Personal Information</h2>
//           <button
//             onClick={toggleEditMode}
//             className="absolute top-2 right-2 text-blue-700 hover:text-blue-500"
//             aria-label="Edit Profile"
//           >
//             <FaPencilAlt size={20} />
//           </button>

//           <div className="profile-picture mb-4">
//             <img
//               src={
//                 profile.profileImage
//                   ? `http://localhost:5000/${profile.profileImage}`
//                   : 'https://placehold.co/100x100'
//               }
//               alt="Profile"
//               className="w-24 h-24 rounded-full border-4 border-blue-600 mx-auto"
//             />
//           </div>

//           {isEditing ? (
//             <>
//               <input
//                 type="file"
//                 name="profileImage"
//                 accept="image/*"
//                 className="mb-3 w-full"
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="fullName"
//                 value={profile.fullName}
//                 className="text-lg text-gray-700 mb-2 p-2 border rounded w-full"
//                 disabled
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={profile.email}
//                 className="text-lg text-gray-700 mb-2 p-2 border rounded w-full"
//                 disabled
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 value={profile.phone}
//                 onChange={handleInputChange}
//                 placeholder="Phone No"
//                 className="text-lg text-gray-700 mb-2 p-2 border rounded w-full"
//               />
//               <input
//                 type="text"
//                 name="program"
//                 value={profile.program}
//                 onChange={handleInputChange}
//                 placeholder="Program"
//                 className="text-lg text-gray-700 mb-2 p-2 border rounded w-full"
//               />
//               <input
//                 type="text"
//                 name="university"
//                 value={profile.university}
//                 onChange={handleInputChange}
//                 placeholder="University"
//                 className="text-lg text-gray-700 mb-2 p-2 border rounded w-full"
//               />
//               <input
//                 type="text"
//                 name="skill"
//                 value={profile.skill}
//                 onChange={handleInputChange}
//                 placeholder="Skills (comma separated)"
//                 className="text-lg text-gray-700 mb-2 p-2 border rounded w-full"
//               />
//               <input
//                 type="text"
//                 name="linkedin"
//                 value={profile.linkedin}
//                 onChange={handleInputChange}
//                 placeholder="LinkedIn URL"
//                 className="text-lg text-gray-700 mb-2 p-2 border rounded w-full"
//               />
//               <button
//                 onClick={handleSave}
//                 className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
//               >
//                 <FaCheck className="mr-2" /> Save
//               </button>
//             </>
//           ) : (
//             <>
//               <p className="text-base md:text-lg text-gray-700 mb-2 flex items-center">
//                 <FaUniversity className="mr-2" /> <strong>University:</strong> {profile.university || 'Not specified'}
//               </p>
//               <p className="text-base md:text-lg text-gray-700 mb-2 flex items-center">
//                 <FaBriefcase className="mr-2" /> <strong>Program:</strong> {profile.program || 'Not specified'}
//               </p>
//               <p className="text-base md:text-lg text-gray-700 mb-2 flex items-center">
//                 <FaPhone className="mr-2" /> <strong>Phone:</strong> {profile.phone || 'Not specified'}
//               </p>
//               <p className="text-base md:text-lg text-gray-700 mb-2 flex items-center">
//                 <FaLinkedin className="mr-2" /> <strong>LinkedIn:</strong> 
//                 {profile.linkedin ? (
//                   <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
//                     {profile.linkedin}
//                   </a>
//                 ) : 'Not specified'}
//               </p>
//             </>
//           )}
//         </div>

//         {/* Skills & Interests */}
//         <div className="skills-info">
//           <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">Skills & Interests</h2>
//           {profile.skill ? (
//             <ul className="skills-list mb-4 grid grid-cols-2 gap-2">
//               {profile.skill.split(',').map((skill, idx) => (
//                 <li key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                   {skill.trim()}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No skills listed</p>
//           )}
          
//         </div>
       
//      {/* Current Internships */}
// <div className="current-internships col-span-1 md:col-span-2 mt-6">
//   <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">Current Internships</h2>
  
//   {loadingInternships ? (
//     <div className="text-center py-4">
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto"></div>
//       <p className="mt-2">Loading internships...</p>
//     </div>
//   ) : currentInternships.length > 0 ? (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {currentInternships.map((internship) => (
//   <div key={internship.applicationId} className="internship-card bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//     <div className="flex items-center mb-3">
//       <FaBriefcase className="text-blue-600 mr-2" />
//       <h3 className="font-bold text-lg">{internship.title || 'Internship Position'}</h3>
//     </div>
    
//     <p className="text-gray-700 mb-2 flex items-center">
//       <FaBuilding className="mr-2 text-blue-600" />
//       <strong>Company:</strong> {internship.companyName}
//       {internship.companyEmail && (
//         <a href={`mailto:${internship.companyEmail}`} className="ml-2 text-blue-600 hover:underline">
//           <FaEnvelope className="inline" />
//         </a>
//       )}
//     </p>
    
//     {internship.companyPhone && (
//       <p className="text-gray-700 mb-2 flex items-center">
//         <FaPhone className="mr-2 text-blue-600" />
//         <strong>Phone:</strong> {internship.companyPhone}
//       </p>
//     )}
    
//     <p className="text-gray-700 mb-2 flex items-center">
//       <FaClock className="mr-2 text-blue-600" />
//       <strong>Type:</strong> {internship.type || 'Not specified'}
//     </p>
    
//     {internship.duration && (
//       <p className="text-gray-700 mb-2 flex items-center">
//         <FaCalendarDay className="mr-2 text-blue-600" />
//         <strong>Duration:</strong> {internship.duration}
//       </p>
//     )}
    
//     {internship.applicationDate && (
//       <p className="text-gray-700 mb-2 flex items-center">
//         <FaCalendarAlt className="mr-2 text-blue-600" />
//         <strong>Applied:</strong> {new Date(internship.applicationDate).toLocaleDateString()}
//       </p>
//     )}
    
//     <div className="mt-4 flex justify-between">
//       <button 
//         onClick={() => handleViewDetails(internship)}
//         className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
//       >
//         View Details
//       </button>
//       <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded flex items-center">
//         <FaCheck className="inline mr-1" /> Approved
//       </div>
//     </div>
//   </div>
// ))}
//     </div>
//   ) : (
//     <div className="bg-gray-50 p-4 rounded-lg text-center">
//       <p className="text-gray-500">You don't have any current internships</p>
      
//     </div>
//   )}
// </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;


// import React, { useState, useEffect } from 'react';
// import {
//   FaPencilAlt, FaDownload, FaUniversity, FaBriefcase, 
//   FaPhone, FaLinkedin, FaCheck, FaBuilding, FaCalendarAlt, 
//   FaUserTie, FaClock, FaEnvelope, FaGlobe, FaGraduationCap,
//   FaIdCard, FaTools
// } from 'react-icons/fa';
// import axios from 'axios';

// const StudentProfile = () => {
//   const fullName = localStorage.getItem('name');
//   const email = localStorage.getItem('email');
//   const studentId = localStorage.getItem('id');

//   const [profile, setProfile] = useState({
//     studentId: studentId,
//     fullName: fullName || '',
//     email: email || '',
//     phone: '',
//     program: '',
//     university: '',
//     skill: '',
//     linkedin: '',
//     profileImage: ''
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [currentInternships, setCurrentInternships] = useState([]);
//   const [loadingInternships, setLoadingInternships] = useState(true);

//   // Fetch student profile from backend
//   useEffect(() => {
//     const fetchStudentProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/profiles`);
//         const studentProfile = response.data.find(profile => profile.studentId === studentId);
        
//         if (studentProfile) {
//           setProfile(prev => ({
//             ...prev,
//             ...studentProfile,
//             profileImage: studentProfile.profileImage || ''
//           }));
//         }
//       } catch (error) {
//         console.error('Error fetching student profile:', error);
//       }
//     };

//     fetchStudentProfile();
//   }, [studentId]);

//   // Fetch current internships
//   useEffect(() => {
//     const fetchCurrentInternships = async () => {
//       try {
//         setLoadingInternships(true);
        
//         const profileResponse = await axios.get(`http://localhost:5000/api/profiles`);
//         const studentProfile = profileResponse.data.find(profile => profile.studentId === studentId);
        
//         const applicationsResponse = await axios.get(`http://localhost:5000/api/applications`);
//         const companiesResponse = await axios.get(`http://localhost:5000/api/softwarehouses`);
//         const companies = companiesResponse.data;
        
//         const studentApplications = applicationsResponse.data.filter(app => 
//           app.studentId === studentId && app.status === 1
//         );

//         const internshipsWithCompanies = studentApplications.map(app => {
//           const company = companies.find(c => c._id === app.internship.companyId);
          
//           return {
//             ...app.internship,
//             companyName: company ? company.name : 'Unknown Company',
//             companyEmail: company ? company.email : '',
//             companyPhone: company ? company.phone : '',
//             applicationId: app._id,
//             applicationDate: app.createdAt
//           };
//         });

//         setProfile(prev => ({
//           ...prev,
//           ...studentProfile,
//           profileImage: studentProfile?.profileImage || ''
//         }));
        
//         setCurrentInternships(internshipsWithCompanies);
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//       } finally {
//         setLoadingInternships(false);
//       }
//     };

//     fetchCurrentInternships();
//   }, [studentId]);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     setProfile(prevData => ({
//       ...prevData,
//       [name]: files ? files[0] : value
//     }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       for (let key in profile) {
//         formData.append(key, profile[key]);
//       }

//       await axios.post('http://localhost:5000/api/profiles', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       alert('Profile saved successfully!');
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       alert('Failed to save profile. Please try again.');
//     }
//   };

//   const toggleEditMode = () => setIsEditing(!isEditing);

//   const handleViewDetails = (internship) => {
//     // Implement view details functionality
//     console.log('Viewing details for:', internship);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
//         <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center">
//           <div className="flex items-center mb-4 md:mb-0">
//             <img
//               src="/src/assets/images/fyplogo1.png"
//               alt="Logo"
//               className="w-16 h-16 rounded-full border-2 border-white mr-4"
//             />
//             <h1 className="text-2xl font-bold">CUI Internship Hub</h1>
//           </div>
//           <div className="ml-auto text-right">
//             <h2 className="text-xl font-semibold">{fullName}'s Profile</h2>
//             <p className="text-blue-100">{email}</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Profile Section */}
//           <div className="p-6 md:p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
//               <button
//                 onClick={toggleEditMode}
//                 className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//               >
//                 <FaPencilAlt className="mr-2" />
//                 {isEditing ? 'Cancel Editing' : 'Edit Profile'}
//               </button>
//             </div>

//             <div className="flex flex-col md:flex-row gap-8">
//               {/* Left Column - Profile Info */}
//               <div className="w-full md:w-1/3">
//                 <div className="flex flex-col items-center mb-6">
//                   <img
//                     src={profile.profileImage ? `http://localhost:5000/${profile.profileImage}` : 'https://placehold.co/150x150'}
//                     alt="Profile"
//                     className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover mb-4"
//                   />
//                   {isEditing && (
//                     <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
//                       Change Photo
//                       <input
//                         type="file"
//                         name="profileImage"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handleInputChange}
//                       />
//                     </label>
//                   )}
//                 </div>

//                 {!isEditing && (
//                   <div className="space-y-4">
//                     <div className="flex items-start">
//                       <FaIdCard className="text-blue-500 mt-1 mr-3" />
//                       <div>
//                         <h3 className="text-sm text-gray-500">Full Name</h3>
//                         <p className="font-medium">{profile.fullName}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <FaEnvelope className="text-blue-500 mt-1 mr-3" />
//                       <div>
//                         <h3 className="text-sm text-gray-500">Email</h3>
//                         <p className="font-medium">{profile.email}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Right Column - Editable Fields */}
//               <div className="w-full md:w-2/3">
//                 {isEditing ? (
//                   <form onSubmit={handleSave} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                         <input
//                           type="text"
//                           name="phone"
//                           value={profile.phone}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
//                         <input
//                           type="text"
//                           name="program"
//                           value={profile.program}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
//                         <input
//                           type="text"
//                           name="university"
//                           value={profile.university}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
//                         <input
//                           type="text"
//                           name="linkedin"
//                           value={profile.linkedin}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
//                       <textarea
//                         name="skill"
//                         value={profile.skill}
//                         onChange={handleInputChange}
//                         rows={3}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
//                     >
//                       <FaCheck className="mr-2" /> Save Changes
//                     </button>
//                   </form>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="flex items-start">
//                         <FaPhone className="text-blue-500 mt-1 mr-3" />
//                         <div>
//                           <h3 className="text-sm text-gray-500">Phone</h3>
//                           <p className="font-medium">{profile.phone || 'Not specified'}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start">
//                         <FaGraduationCap className="text-blue-500 mt-1 mr-3" />
//                         <div>
//                           <h3 className="text-sm text-gray-500">Program</h3>
//                           <p className="font-medium">{profile.program || 'Not specified'}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start">
//                         <FaUniversity className="text-blue-500 mt-1 mr-3" />
//                         <div>
//                           <h3 className="text-sm text-gray-500">University</h3>
//                           <p className="font-medium">{profile.university || 'Not specified'}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start">
//                         <FaLinkedin className="text-blue-500 mt-1 mr-3" />
//                         <div>
//                           <h3 className="text-sm text-gray-500">LinkedIn</h3>
//                           {profile.linkedin ? (
//                             <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                               View Profile
//                             </a>
//                           ) : (
//                             <p className="font-medium">Not specified</p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <FaTools className="text-blue-500 mt-1 mr-3" />
//                       <div>
//                         <h3 className="text-sm text-gray-500">Skills</h3>
//                         {profile.skill ? (
//                           <div className="flex flex-wrap gap-2 mt-1">
//                             {profile.skill.split(',').map((skill, idx) => (
//                               <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                                 {skill.trim()}
//                               </span>
//                             ))}
//                           </div>
//                         ) : (
//                           <p className="font-medium">No skills listed</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Internships Section */}
//           <div className="border-t border-gray-200 p-6 md:p-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Internships</h2>
            
//             {loadingInternships ? (
//               <div className="flex justify-center items-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//               </div>
//             ) : currentInternships.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {currentInternships.map((internship) => (
//                   <div key={internship.applicationId} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//                     <div className="p-5">
//                       <div className="flex items-center mb-4">
//                         <div className="bg-blue-100 p-2 rounded-lg mr-3">
//                           <FaBriefcase className="text-blue-600 text-xl" />
//                         </div>
//                         <h3 className="text-lg font-bold text-gray-800">{internship.title || 'Internship Position'}</h3>
//                       </div>
                      
//                       <div className="space-y-3">
//                         <div className="flex items-start">
//                           <FaBuilding className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//                           <div>
//                             <p className="text-sm text-gray-500">Company</p>
//                             <p className="font-medium">{internship.companyName}</p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-start">
//                           <FaClock className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//                           <div>
//                             <p className="text-sm text-gray-500">Type</p>
//                             <p className="font-medium">{internship.type || 'Not specified'}</p>
//                           </div>
//                         </div>
                        
//                         {internship.duration && (
//                           <div className="flex items-start">
//                             <FaCalendarAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//                             <div>
//                               <p className="text-sm text-gray-500">Duration</p>
//                               <p className="font-medium">{internship.duration}</p>
//                             </div>
//                           </div>
//                         )}
                        
//                         {internship.applicationDate && (
//                           <div className="flex items-start">
//                             <FaCalendarDay className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//                             <div>
//                               <p className="text-sm text-gray-500">Applied On</p>
//                               <p className="font-medium">{new Date(internship.applicationDate).toLocaleDateString()}</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
                      
//                       <div className="mt-6 flex justify-between items-center">
//                         <button 
//                           onClick={() => handleViewDetails(internship)}
//                           className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
//                         >
//                           View Details
//                         </button>
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                           <FaCheck className="mr-1" /> Approved
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="bg-gray-50 rounded-lg p-8 text-center">
//                 <FaBriefcase className="mx-auto text-gray-400 text-4xl mb-4" />
//                 <h3 className="text-lg font-medium text-gray-700 mb-2">No Current Internships</h3>
//                 <p className="text-gray-500 mb-4">You don't have any approved internships at the moment</p>
//                 <button className="text-blue-600 hover:text-blue-800 font-medium">
//                   Browse Available Internships
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;




import React, { useState, useEffect } from 'react';
import {
  FaPencilAlt, FaDownload, FaUniversity, FaBriefcase, 
  FaPhone, FaLinkedin, FaCheck, FaBuilding, FaCalendarAlt, 
  FaUserTie, FaClock, FaEnvelope, FaGlobe, FaGraduationCap,
  FaIdCard, FaTools, FaCalendarDay, FaExternalLinkAlt
} from 'react-icons/fa';
import axios from 'axios';

const StudentProfile = () => {
  const fullName = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const studentId = localStorage.getItem('id');

  const [profile, setProfile] = useState({
    studentId: studentId,
    fullName: fullName || '',
    email: email || '',
    phone: '',
    program: '',
    university: '',
    skill: '',
    linkedin: '',
    profileImage: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentInternships, setCurrentInternships] = useState([]);
  const [loadingInternships, setLoadingInternships] = useState(true);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showInternshipModal, setShowInternshipModal] = useState(false);

  // Fetch student profile from backend
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profiles`);
        const studentProfile = response.data.find(profile => profile.studentId === studentId);
        
        if (studentProfile) {
          setProfile(prev => ({
            ...prev,
            ...studentProfile,
            profileImage: studentProfile.profileImage || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };

    fetchStudentProfile();
  }, [studentId]);

  // Fetch current internships
  useEffect(() => {
    const fetchCurrentInternships = async () => {
      try {
        setLoadingInternships(true);
        
        const profileResponse = await axios.get(`http://localhost:5000/api/profiles`);
        const studentProfile = profileResponse.data.find(profile => profile.studentId === studentId);
        
        const applicationsResponse = await axios.get(`http://localhost:5000/api/applications`);
        const companiesResponse = await axios.get(`http://localhost:5000/api/softwarehouses`);
        const companies = companiesResponse.data;
        
        const studentApplications = applicationsResponse.data.filter(app => 
          app.studentId === studentId && app.status === 1
        );

        const internshipsWithCompanies = studentApplications.map(app => {
          const company = companies.find(c => c._id === app.internship.companyId);
          
          return {
            ...app.internship,
            companyName: company ? company.name : 'Unknown Company',
            companyEmail: company ? company.email : '',
            companyPhone: company ? company.phone : '',
            applicationId: app._id,
            applicationDate: app.createdAt,
            description: app.internship.description || 'No description provided',
            requirements: app.internship.requirements || 'No specific requirements'
          };
        });

        setProfile(prev => ({
          ...prev,
          ...studentProfile,
          profileImage: studentProfile?.profileImage || ''
        }));
        
        setCurrentInternships(internshipsWithCompanies);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoadingInternships(false);
      }
    };

    fetchCurrentInternships();
  }, [studentId]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setProfile(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in profile) {
        formData.append(key, profile[key]);
      }

      await axios.post('http://localhost:5000/api/profiles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Profile saved successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const toggleEditMode = () => setIsEditing(!isEditing);

  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
    setShowInternshipModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="/src/assets/images/fyplogo1.png"
              alt="Logo"
              className="w-16 h-16 rounded-full border-2 border-white mr-4"
            />
            <h1 className="text-2xl font-bold">CUI Internship Hub</h1>
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-xl font-semibold">{fullName}'s Dashboard</h2>
            <p className="text-blue-100 text-sm">{email}</p>
          </div>
            <div className="relative mb-4">
                  <img
                    src={profile.profileImage ? `http://localhost:5000/${profile.profileImage}` : 'https://placehold.co/150x150'}
                    alt="Profile"
                    className="w-28 h-28 rounded-full border-4 border-blue-100 object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                      <FaPencilAlt className="text-sm" />
                      <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleInputChange}
                      />
                    </label>
                  )}
                </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
              <button
                onClick={toggleEditMode}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaPencilAlt className="mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture Section */}
              <div className="w-full md:w-1/4 flex flex-col items-center">
              
                
                {!isEditing && (
                  <div className="bg-blue-950 p-4 rounded-lg">
                    <div className="bg-blue-200 p-9 rounded-lg">
                      <h3 className="text-lg font-bold   text-blue-800 mb-2 mt-0">Contact Information</h3>
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <FaEnvelope className="text-blue-500 mr-2" />
                          <span className="text-sm">{profile.email}</span>
                        </div>
                        {profile.phone && (
                          <div className="flex items-center">
                            <FaPhone className="text-blue-500 mr-2" />
                            <span className="text-sm">{profile.phone}</span>
                          </div>
                        )}
                        {profile.linkedin && (
                          <div className="flex items-center">
                            <FaLinkedin className="text-blue-500 mr-2" />
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                              LinkedIn Profile
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Details Section */}
              <div className="w-full md:w-3/4">
                {isEditing ? (
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={profile.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={profile.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                        <input
                          type="text"
                          name="program"
                          value={profile.program}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                        <input
                          type="text"
                          name="university"
                          value={profile.university}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                        <input
                          type="url"
                          name="linkedin"
                          value={profile.linkedin}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                      <textarea
                        name="skill"
                        value={profile.skill}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., JavaScript, React, Python, etc."
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                      >
                        <FaCheck className="mr-2" /> Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-950 p-4 rounded-lg">
                      <div className="bg-blue-200 p-2 rounded-lg">
                        <h3 className="text-lg font-bold  text-blue-800 mb-2">Academic Information</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-medium font-bold text-gray-800">Program</p>
                            <p className="font-sm">{profile.program || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-medium font-bold text-gray-800">University</p>
                            <p className="font-sm">{profile.university || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                      </div>
                      <div className="bg-blue-950 p-4 rounded-lg">
                      <div className="bg-blue-200 p-12 rounded-lg">
                        <h3 className="text-lg font-bold  text-blue-800 mb-2">Professional Information</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-medium font-bold text-gray-800">Skills</p>
                            {profile.skill ? (
                              <div className="flex flex-wrap gap-2 mt-1">
                                {profile.skill.split(',').map((skill, idx) => (
                                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                                    {skill.trim()}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="font-medium text-sm">No skills listed</p>
                            )}
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                    
                   
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Internships Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Current Internships</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {currentInternships.length} Active
              </span>
            </div>
            
            {loadingInternships ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : currentInternships.length > 0 ? (
              <div className="space-y-4">
                {currentInternships.map((internship) => (
                  <div key={internship.applicationId} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center">
                          <FaBriefcase className="text-blue-500 mr-2" />
                          {internship.title || 'Internship Position'}
                        </h3>
                        <p className="text-gray-600 mt-1 flex items-center">
                          <FaBuilding className="text-gray-400 mr-2" />
                          {internship.companyName}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <FaCalendarAlt className="mr-2" />
                          {internship.duration || 'Duration not specified'}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaClock className="mr-2" />
                          {internship.type || 'Type not specified'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Applied on: {new Date(internship.applicationDate).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewDetails(internship)}
                          className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                        >
                          <FaExternalLinkAlt className="mr-2" /> View Details
                        </button>
                        <span className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCheck className="mr-1" /> Approved
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <FaBriefcase className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Current Internships</h3>
                <p className="text-gray-500 mb-4">You don't have any approved internships at the moment</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Browse Available Internships
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Company Information</h4>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <FaBuilding className="text-blue-500 mr-2" />
                        <span className="font-medium">{selectedInternship.companyName}</span>
                      </p>
                      {selectedInternship.companyEmail && (
                        <p className="flex items-center">
                          <FaEnvelope className="text-blue-500 mr-2" />
                          <span>{selectedInternship.companyEmail}</span>
                        </p>
                      )}
                      {selectedInternship.companyPhone && (
                        <p className="flex items-center">
                          <FaPhone className="text-blue-500 mr-2" />
                          <span>{selectedInternship.companyPhone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Internship Details</h4>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <FaUserTie className="text-blue-500 mr-2" />
                        <span>Type: {selectedInternship.type || 'Not specified'}</span>
                      </p>
                      <p className="flex items-center">
                        <FaClock className="text-blue-500 mr-2" />
                        <span>Duration: {selectedInternship.duration || 'Not specified'}</span>
                      </p>
                      <p className="flex items-center">
                        <FaCalendarDay className="text-blue-500 mr-2" />
                        <span>Applied: {new Date(selectedInternship.applicationDate).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Description</h4>
                  <p className="text-gray-700">
                    {selectedInternship.description}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements</h4>
                  <p className="text-gray-700">
                    {selectedInternship.requirements}
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

export default StudentProfile;