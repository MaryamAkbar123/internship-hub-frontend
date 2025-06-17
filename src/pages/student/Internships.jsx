// // // import { useEffect, useState } from "react";
// // // import { Table, Button } from "react-bootstrap";
// // // import axios from "axios";

// // // const Internships = () => {
// // //   const [internships, setInternships] = useState([]);
// // //   const [applying, setApplying] = useState(false);
// // //   const [selectedInternship, setSelectedInternship] = useState(null);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [applicationStatus, setApplicationStatus] = useState(null); // State to track application status
// // //   const [formData, setFormData] = useState({
// // //     studentId: "",
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //     university: "",
// // //     degree: "",
// // //     skills: "",
// // //     coverLetter: "",
// // //     file: null,
// // //   });

// // //   const toggleModal = (id) => {
// // //      setSelectedInternship(id);
// // //     setIsModalOpen((prev) => !prev); // toggle between true/false

// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value, files } = e.target;
// // //     if (name === "file") {
// // //       setFormData((prev) => ({ ...prev, file: files[0] }));
// // //     } else {
// // //       setFormData((prev) => ({ ...prev, [name]: value }));
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchInternships();
// // //   }, []);

// // //   const fetchInternships = async () => {
// // //     try {
// // //       const response = await axios.get("https://internship-hub-backend.vercel.app/api/internships");
// // //       setInternships(response.data);
// // //     } catch (error) {
// // //       console.error("Failed to fetch internships:", error);
// // //     }
// // //   };

// // //   const handleSubmit = async (e, id) => {
// // //     e.preventDefault();
// // //     const data = new FormData();
// // //     data.append("studentId", localStorage.getItem("id"));
// // //     data.append("name", formData.name);
// // //     data.append("email", formData.email);
// // //     data.append("phone", formData.phone);
// // //     data.append("university", formData.university);
// // //     data.append("degree", formData.degree);
// // //     data.append("skills", formData.skills);
// // //     data.append("coverLetter", formData.coverLetter);
// // //     data.append("file", formData.file);
// // //     setApplying(true);
// // //     setSelectedInternship(id);
   
// // //     try {
// // //       const response = await axios.post(
// // //         `https://internship-hub-backend.vercel.app/api/internships/${selectedInternship}/apply`,
// // //         data
// // //       );
// // //       setIsModalOpen(false); // Close the modal
// // //       setApplicationStatus({ success: true, message: response.data.message }); // Set success status
// // //       setTimeout(() => setApplicationStatus(null), 5000); // Hide alert after 5 seconds
// // //     } catch (error) {
// // //       setApplicationStatus({
// // //         success: false,
// // //         message: error.response?.data?.message || "Failed to apply.",
// // //       }); // Set failure status
// // //       setTimeout(() => setApplicationStatus(null), 20000); // Hide alert after 5 seconds
// // //     } finally {
// // //       setApplying(false);
// // //       setSelectedInternship(null);
// // //     }
// // //   };

// // //   return (
// // //     <section className="p-4 bg-white rounded-lg">
// // //       <h2 className="text-lg font-bold mb-4">Available Internships</h2>

// // //       {/* Show success or error message after application submission */}
// // //       {applicationStatus && (
// // //         <div
// // //           className={`mb-4 p-2 rounded ${
// // //             applicationStatus.success ? "bg-green-500" : "bg-red-500"
// // //           } text-white`}
// // //         >
// // //           {applicationStatus.message}
// // //         </div>
// // //       )}

// // //       {/* Table for Larger Screens */}
// // //       <div className="overflow-x-auto md:block">
// // //         <Table striped bordered hover responsive>
// // //           <thead>
// // //             <tr>
// // //               <th>Company</th>
// // //               <th>Title</th>
// // //               <th>Location</th>
// // //               <th>Deadline</th>
// // //               <th>Action</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {internships
// // //               .filter(
// // //                 (internship) => new Date(internship.deadline) > new Date()
// // //               )
// // //               .map((internship) => (
// // //                 <tr key={internship._id}>
// // //                   <td>{internship.companyDetails.name}</td>
// // //                   <td>{internship.title}</td>
// // //                   <td>{internship.companyDetails.location}</td>
// // //                   <td>{new Date(internship.deadline).toLocaleString()}</td>

// // //                   <td>
// // //                     <Button
// // //                       onClick={() => {
                      
// // //                         toggleModal(internship._id);
// // //                       }}
// // //                       disabled={applying && selectedInternship === internship._id}
// // //                       className="bg-blue-600 text-white hover:bg-blue-700 rounded"
// // //                     >
// // //                       {applying && selectedInternship === internship._id
// // //                         ? "Applying..."
// // //                         : "Apply"}
// // //                     </Button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //           </tbody>
// // //         </Table>
// // //       </div>

// // //       {/* Modal for internship application */}
// // //       {isModalOpen && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// // //           <div className="bg-white p-6 rounded-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
// // //             <div className="flex items-center justify-between mb-4">
// // //               <h2 className="text-xl font-bold">Internship Application</h2>
// // //               <button
// // //                 onClick={toggleModal}
// // //                 className="text-gray-500 hover:text-black"
// // //               >
// // //                 &times;
// // //               </button>
// // //             </div>
// // //             <form
// // //               onSubmit={(e) => handleSubmit(e, selectedInternship)}
// // //               className="space-y-4"
// // //               encType="multipart/form-data"
// // //             >
// // //               <div className="flex gap-2">
// // //                 <label className="block w-32 font-medium">Name</label>
// // //                 <input
// // //                   name="name"
// // //                   onChange={handleChange}
// // //                   className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="flex gap-2">
// // //                 <label className="block w-32 font-medium">Email</label>
// // //                 <input
// // //                   type="email"
// // //                   name="email"
// // //                   onChange={handleChange}
// // //                   className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="flex gap-2">
// // //                 <label className="block w-32 font-medium">Phone</label>
// // //                 <input
// // //                   name="phone"
// // //                   onChange={handleChange}
// // //                   className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="flex gap-2">
// // //                 <label className="block w-32 font-medium">University</label>
// // //                 <input
// // //                   name="university"
// // //                   onChange={handleChange}
// // //                   className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="flex gap-2">
// // //                   <label className="block w-32 font-medium">Degree</label>
// // //                   <select
// // //                     name="degree"
// // //                     onChange={handleChange}
// // //                     value={formData.degree}
// // //                     className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
// // //                     required
// // //                   >
// // //                     <option value="" disabled>Select Degree</option>
// // //                     <option value="CS">Computer Science (CS)</option>
// // //                     <option value="SE">Software Engineering (SE)</option>
// // //                   </select>
// // //                 </div>
// // //               <div className="flex gap-2">
// // //                 <label className="block w-32 font-medium">Skills</label>
// // //                 <input
// // //                   name="skills"
// // //                   onChange={handleChange}
// // //                   className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
// // //                 />
// // //               </div>
// // //               <div className="flex gap-2">
// // //                 <label className="block w-32 font-medium">Cover Letter</label>
// // //                 <textarea
// // //                   name="coverLetter"
// // //                   onChange={handleChange}
// // //                   className="h-24 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
// // //                 />
// // //               </div>

// // //               <div className="flex gap-2">
// // //                 <label className="block w-32 font-medium">Upload Resume</label>
// // //                 <input
// // //                   type="file"
// // //                   name="file"
// // //                   accept=".pdf,.doc,.docx"
// // //                   onChange={handleChange}
// // //                   className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="flex justify-end">
// // //                 <button
// // //                   type="submit"
// // //                   className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
// // //                 >
// // //                   Submit Application
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </section>
// // //   );
// // // };

// // // export default Internships;

// // import { useEffect, useState } from "react";
// // import { Table, Button } from "react-bootstrap";
// // import axios from "axios";

// // const Internships = () => {
// //   const [internships, setInternships] = useState([]);
// //   const [applying, setApplying] = useState(false);
// //   const [selectedInternship, setSelectedInternship] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [applicationStatus, setApplicationStatus] = useState(null);
// //   const [formData, setFormData] = useState({
// //     studentId: "",
// //     name: "",
// //     email: "",
// //     countryCode: "+1", // Default to USA
// //     phone: "",
// //     university: "",
// //     degree: "",
// //     skills: "",
// //     coverLetter: "",
// //     file: null,
// //   });
// //   const [errors, setErrors] = useState({});

// //   // List of country codes (sample, can be expanded)
// //   const countryCodes = [
// //     { code: "+92", country: "Pakistan" },
// //   ];
// //   const cuiCampuses = [
// //     "Islamabad",
// //     "Wah",
// //     "Abbottabad",
// //     "Lahore",
// //     "Attock",
// //     "Sahiwal",
// //     "Vehari",
// //   ];
// //   const toggleModal = (id) => {
// //     setSelectedInternship(id);
// //     setIsModalOpen((prev) => !prev);
// //     if (!id) {
// //       // Reset form and errors when closing modal
// //       setFormData({
// //         studentId: "",
// //         name: "",
// //         email: "",
// //         countryCode: "+1",
// //         phone: "",
// //         university: "",
// //         degree: "",
// //         skills: "",
// //         coverLetter: "",
// //         file: null,
// //       });
// //       setErrors({});
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     // Name validation: required, letters and spaces only, min 2 characters
// //     if (!formData.name) {
// //       newErrors.name = "Name is required";
// //     } else if (!/^[A-Za-z\s]{2,}$/.test(formData.name)) {
// //       newErrors.name = "Name must be at least 2 characters and contain only letters and spaces";
// //     }

// //     // Email validation: required, valid email format
// //     if (!formData.email) {
// //       newErrors.email = "Email is required";
// //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //       newErrors.email = "Invalid email format";
// //     }

// //     // Country Code validation: must be a valid code from the list
// //     if (!countryCodes.some((c) => c.code === formData.countryCode)) {
// //       newErrors.countryCode = "Please select a valid country code";
// //     }

// //     // Phone validation: required, must match country-specific pattern
// //     if (!formData.phone) {
// //       newErrors.phone = "Phone number is required";
// //     } else {
// //       // Basic validation for 10-digit numbers for simplicity (can be customized per country)
// //       const phonePattern = /^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/;
// //       if (!phonePattern.test(formData.phone)) {
// //         newErrors.phone = `Phone number must be 10 digits (e.g., 123-456-7890) for ${formData.countryCode}`;
// //       }
// //     }

// //     // University validation: required, must be a valid CUI campus
// //     if (!formData.university) {
// //       newErrors.university = "Campus is required";
// //     } else if (!cuiCampuses.includes(formData.university)) {
// //       newErrors.university = "Please select a valid CUI campus";
// //     }


// //     // Degree validation: required, must be CS or SE
// //     if (!formData.degree) {
// //       newErrors.degree = "Degree is required";
// //     } else if (!["CS", "SE"].includes(formData.degree)) {
// //       newErrors.degree = "Please select a valid degree (CS or SE)";
// //     }

// //     // Skills validation: optional, comma-separated, each skill >= 2 characters
// //     if (formData.skills) {
// //       const skillsArray = formData.skills.split(",").map((skill) => skill.trim());
// //       if (skillsArray.some((skill) => skill.length < 2 || !/^[A-Za-z0-9\s]+$/.test(skill))) {
// //         newErrors.skills = "Each skill must be at least 2 characters and contain only letters, numbers, and spaces";
// //       } else if (skillsArray.includes("")) {
// //         newErrors.skills = "Skills cannot contain empty entries (e.g., 'Java,,Python')";
// //       }
// //     }

// //     // Cover Letter validation: optional, but if provided, min 10 characters
// //     if (formData.coverLetter && formData.coverLetter.length < 10) {
// //       newErrors.coverLetter = "Cover letter must be at least 10 characters if provided";
// //     }

// //     // File validation: required, must be PDF/DOC/DOCX, max 5MB
// //     if (!formData.file) {
// //       newErrors.file = "Resume file is required";
// //     } else {
// //       const allowedTypes = [
// //         "application/pdf",
// //         "application/msword",
// //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// //       ];
// //       if (!allowedTypes.includes(formData.file.type)) {
// //         newErrors.file = "Resume must be a PDF, DOC, or DOCX file";
// //       } else if (formData.file.size > 5 * 1024 * 1024) {
// //         newErrors.file = "Resume file size must not exceed 5MB";
// //       }
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0; // Return true if no errors
// //   };

// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (name === "file") {
// //       setFormData((prev) => ({ ...prev, file: files[0] }));
// //     } else {
// //       setFormData((prev) => ({ ...prev, [name]: value }));
// //     }
// //     // Clear error for the field being edited
// //     setErrors((prev) => ({ ...prev, [name]: "" }));
// //   };

// //   useEffect(() => {
// //     fetchInternships();
// //   }, []);

// //   const fetchInternships = async () => {
// //     try {
// //       const response = await axios.get("https://internship-hub-backend.vercel.app/api/internships");
// //       setInternships(response.data);
// //       console.log(response.data)
// //     } catch (error) {
// //       console.error("Failed to fetch internships:", error);
// //     }
// //   };

// //   const handleSubmit = async (e, id) => {
// //     e.preventDefault();
// //     if (!validateForm()) {
// //       return; // Stop submission if validation fails
// //     }

// //     const data = new FormData();
// //     data.append("studentId", localStorage.getItem("id"));
// //     data.append("name", formData.name);
// //     data.append("email", formData.email);
// //     data.append("phone", `${formData.countryCode}${formData.phone}`); // Combine country code and phone
// //     data.append("university", formData.university);
// //     data.append("degree", formData.degree);
// //     data.append("skills", formData.skills);
// //     data.append("coverLetter", formData.coverLetter);
// //     data.append("file", formData.file);
// //     setApplying(true);
// //     setSelectedInternship(id);

// //     try {
// //       const response = await axios.post(`https://internship-hub-backend.vercel.app/api/internships/${id}/apply`);
// //       setIsModalOpen(false);
// //       setApplicationStatus({ success: true, message: response.data.message });
// //       setTimeout(() => setApplicationStatus(null), 5000);
// //     } catch (error) {
// //       setApplicationStatus({
// //         success: false,
// //         message: error.response?.data?.message || "Failed to apply.",
// //       });
// //       setTimeout(() => setApplicationStatus(null), 20000);
// //     } finally {
// //       setApplying(false);
// //       setSelectedInternship(null);
// //     }
// //   };

// //   return (
// //     <section className="p-4 bg-white rounded-lg">
// //       <h2 className="text-lg font-bold mb-4">Available Internships</h2>

// //       {applicationStatus && (
// //         <div
// //           className={`mb-4 p-2 rounded ${
// //             applicationStatus.success ? "bg-green-500" : "bg-red-500"
// //           } text-white`}
// //         >
// //           {applicationStatus.message}
// //         </div>
// //       )}

// //       <div className="overflow-x-auto md:block">
// //         <Table striped bordered hover responsive>
// //           <thead>
// //             <tr>
// //               <th>Company</th>
// //               <th>Title</th>
// //               <th>Location</th>
// //               <th>Description</th>
// //               <th>Deadline</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>
// //         <tbody>
// //             {internships.length > 0 ? (
// //               internships.map((internship) => (
// //                 <tr key={internship._id} className="border-t">
// //                   <td className="p-3">{internship.companyDetails?.name || 'N/A'}</td>
// //                   <td className="p-3">{internship.title}</td>
// //                      <td className="p-3">{internship.description}</td>
// //                   <td className="p-3">{internship.companyDetails?.location || 'N/A'}</td>
// //                   <td className="p-3">{new Date(internship.deadline).toLocaleDateString()}</td>
// //                   <td className="p-3">
// //                     <Button
// //                       onClick={() => {
                      
// //                         toggleModal(internship._id);
// //                       }}
// //                       disabled={applying && selectedInternship === internship._id}
// //                       className="bg-blue-600 text-white hover:bg-blue-700 rounded"
// //                     >
// //                       {applying && selectedInternship === internship._id
// //                         ? "Applying..."
// //                         : "Apply"}
// //                     </Button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="5" className="text-center p-4 text-gray-500">
// //                   No internships available.
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>


// //         </Table>
// //       </div>

// //       {isModalOpen && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// //           <div className="bg-white p-6 rounded-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
// //             <div className="flex items-center justify-between mb-4">
// //               <h2 className="text-xl font-bold">Internship Application</h2>
// //               <button
// //                 onClick={() => toggleModal(null)}
// //                 className="text-gray-500 hover:text-black"
// //               >
// //                 ×
// //               </button>
// //             </div>
// //             <form
// //               onSubmit={(e) => handleSubmit(e, selectedInternship)}
// //               className="space-y-4"
// //               encType="multipart/form-data"
// //               noValidate
// //             >
// //               <div className="flex flex-col gap-1">
// //                 <div className="flex gap-2 items-center">
// //                   <label className="block w-32 font-medium">Name</label>
// //                   <input
// //                     name="name"
// //                     value={formData.name}
// //                     onChange={handleChange}
// //                     className={`border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 ${
// //                       errors.name ? "border-red-500" : ""
// //                     }`}
// //                     required
// //                     pattern="[A-Za-z\s]{2,}"
// //                     title="Name must be at least 2 characters and contain only letters and spaces"
// //                   />
// //                 </div>
// //                 {errors.name && <p className="text-red-500 text-sm ml-32">{errors.name}</p>}
// //               </div>
// //               <div className="flex flex-col gap-1">
// //                 <div className="flex gap-2 items-center">
// //                   <label className="block w-32 font-medium">Email</label>
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     className={`border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 ${
// //                       errors.email ? "border-red-500" : ""
// //                     }`}
// //                     required
// //                   />
// //                 </div>
// //                 {errors.email && <p className="text-red-500 text-sm ml-32">{errors.email}</p>}
// //               </div>
// //               <div className="flex flex-col gap-1">
// //                 <div className="flex gap-2 items-center">
// //                   <label className="block w-32 font-medium">Phone</label>
// //                   <div className="flex w-full">
// //                     <select
// //                       name="countryCode"
// //                       value={formData.countryCode}
// //                       onChange={handleChange}
// //                       className={`border border-gray-300 p-3 rounded-l-lg focus:ring-2 focus:ring-blue-400 ${
// //                         errors.countryCode ? "border-red-500" : ""
// //                       }`}
// //                       required
// //                     >
// //                       {countryCodes.map((c) => (
// //                         <option key={c.code} value={c.code}>
// //                           {c.code} ({c.country})
// //                         </option>
// //                       ))}
// //                     </select>
// //                     <input
// //                       name="phone"
// //                       value={formData.phone}
// //                       onChange={handleChange}
// //                       className={`border border-gray-300 p-3 rounded-r-lg w-full focus:ring-2 focus:ring-blue-400 ${
// //                         errors.phone ? "border-red-500" : ""
// //                       }`}
// //                       placeholder="000-000-0000"
// //                       required
// //                       pattern="\d{3}[-.\s]?\d{3}[-.\s]?\d{4}"
// //                       title="Phone number must be 10 digits (e.g., 123-456-7890)"
// //                     />
// //                   </div>
// //                 </div>
// //                 {(errors.countryCode || errors.phone) && (
// //                   <p className="text-red-500 text-sm ml-32">
// //                     {errors.countryCode || errors.phone}
// //                   </p>
// //                 )}
// //               </div>
// //                <div className="flex flex-col gap-1">
// //                 <div className="flex gap-2 items-center">
// //                   <label className="block w-32 font-medium">CUI Campus</label>
// //                   <select
// //                     name="university"
// //                     value={formData.university}
// //                     onChange={handleChange}
// //                     className={`border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 ${
// //                       errors.university ? "border-red-500" : ""
// //                     }`}
// //                     required
// //                   >
// //                     <option value="" disabled>Select Campus</option>
// //                     {cuiCampuses.map((campus) => (
// //                       <option key={campus} value={campus}>
// //                         {campus}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //                 {errors.university && <p className="text-red-500 text-sm ml-32">{errors.university}</p>}
// //               </div>
// //               <div className="flex flex-col gap-1">
// //                 <div className="flex gap-2 items-center">
// //                   <label className="block w-32 font-medium">Degree</label>
// //                   <select
// //                     name="degree"
// //                     value={formData.degree}
// //                     onChange={handleChange}
// //                     className={`border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 ${
// //                       errors.degree ? "border-red-500" : ""
// //                     }`}
// //                     required
// //                   >
// //                     <option value="" disabled>Select Degree</option>
// //                     <option value="CS">Computer Science (CS)</option>
// //                     <option value="SE">Software Engineering (SE)</option>
// //                   </select>
// //                 </div>
// //                 {errors.degree && <p className="text-red-500 text-sm ml-32">{errors.degree}</p>}
// //               </div>
// //               <div className="flex flex-col gap-1">
// //                 <div className="flex gap-2 items-center">
// //                   <label className="block w-32 font-medium">Skills</label>
// //                   <input
// //                     name="skills"
// //                     value={formData.skills}
// //                     onChange={handleChange}
// //                     className={`border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 ${
// //                       errors.skills ? "border-red-500" : ""
// //                     }`}
// //                     placeholder="e.g., JavaScript, Python, React"
// //                   />
// //                 </div>
// //                 {errors.skills && <p className="text-red-500 text-sm ml-32">{errors.skills}</p>}
// //               </div>
// //               <div className="flex flex-col gap-1">
// //                 <div className="flex gap-2 items-center">
// //                   <label className="block w-32 font-medium">Cover Letter</label>
// //                   <textarea
// //                     name="coverLetter"
// //                     value={formData.coverLetter}
// //                     onChange={handleChange}
// //                     className={`h-24 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 ${
// //                       errors.coverLetter ? "border-red-500" : ""
// //                     }`}
// //                   />
// //                 </div>
// //                 {errors.coverLetter && <p className="text-red-500 text-sm ml-32">{errors.coverLetter}</p>}
// //               </div>
// //               <div className="flex flex-col gap-1">
// //                 <div className="flex gap-2 items-center">
// //                   <label className="block w-32 font-medium">Upload Resume</label>
// //                   <input
// //                     type="file"
// //                     name="file"
// //                     accept=".pdf,.doc,.docx"
// //                     onChange={handleChange}
// //                     className={`border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 ${
// //                       errors.file ? "border-red-500" : ""
// //                     }`}
// //                     required
// //                   />
// //                 </div>
// //                 {errors.file && <p className="text-red-500 text-sm ml-32">{errors.file}</p>}
// //               </div>
// //               <div className="flex justify-end">
// //                 <button
// //                   type="submit"
// //                   disabled={applying}
// //                   className={`px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 ${
// //                     applying ? "opacity-50 cursor-not-allowed" : ""
// //                   }`}
// //                 >
// //                   {applying ? "Submitting..." : "Submit Application"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // };

// // export default Internships;

// import { useEffect, useState } from "react";
// import { Table, Button, Spinner, Alert } from "react-bootstrap";
// import axios from "axios";

// const Internships = () => {
//   const [internships, setInternships] = useState([]);
//   const [applying, setApplying] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [activeInternshipsCount, setActiveInternshipsCount] = useState(0);
//   const [selectedInternship, setSelectedInternship] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [applicationStatus, setApplicationStatus] = useState(null);
//   const [formData, setFormData] = useState({
//     studentId: "",
//     name: "",
//     email: "",
//     countryCode: "+92", // Default to Pakistan
//     phone: "",
//     university: "",
//     degree: "",
//     skills: "",
//     coverLetter: "",
//     file: null,
//   });
//   const [errors, setErrors] = useState({});

//   // Expanded country codes
//   const countryCodes = [
//     { code: "+92", country: "Pakistan" },
//     { code: "+1", country: "USA" },
//     { code: "+91", country: "India" },
//   ];
//   const cuiCampuses = [
//     "Islamabad",
//     "Wah",
//     "Abbottabad",
//     "Lahore",
//     "Attock",
//     "Sahiwal",
//     "Vehari",
//   ];

//   useEffect(() => {
//     fetchInternships();
//     fetchActiveInternships();
//   }, []);

//   const fetchInternships = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("https://internship-hub-backend.vercel.app/api/internships");
//       setInternships(response.data);
//     } catch (error) {
//       console.error("Failed to fetch internships:", error);
//       setApplicationStatus({
//         success: false,
//         message: "Failed to load internships.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchActiveInternships = async () => {
//     const studentId = localStorage.getItem("id");
//     if (!studentId) {
//       console.error("No student ID found in localStorage");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `https://internship-hub-backend.vercel.app/api/internships/approved/${studentId}`
//       );
//       console.log(response.data)
//       // Assume response.data.applications is an array of applications
//       // Filter for active/accepted internships
//       const activeCount = response.data.applications?.filter(
//         (app) => app.status === "accepted"
//       ).length || 0;
//       setActiveInternshipsCount(activeCount);
//     } catch (error) {
//       console.error("Failed to fetch active internships:", error);
//       setApplicationStatus({
//         success: false,
//         message: "Failed to verify active internships.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleModal = (id) => {
//     setSelectedInternship(id);
//     setIsModalOpen((prev) => !prev);
//     if (!id) {
//       setFormData({
//         studentId: "",
//         name: "",
//         email: "",
//         countryCode: "+92",
//         phone: "",
//         university: "",
//         degree: "",
//         skills: "",
//         coverLetter: "",
//         file: null,
//       });
//       setErrors({});
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name) {
//       newErrors.name = "Name is required";
//     } else if (!/^[A-Za-z\s]{2,}$/.test(formData.name)) {
//       newErrors.name = "Name must be at least 2 characters and contain only letters and spaces";
//     }

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!countryCodes.some((c) => c.code === formData.countryCode)) {
//       newErrors.countryCode = "Please select a valid country code";
//     }

//     if (!formData.phone) {
//       newErrors.phone = "Phone number is required";
//     } else {
//       const phonePattern = /^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/;
//       if (!phonePattern.test(formData.phone)) {
//         newErrors.phone = `Phone number must be 10 digits (e.g., 123-456-7890) for ${formData.countryCode}`;
//       }
//     }

//     if (!formData.university) {
//       newErrors.university = "Campus is required";
//     } else if (!cuiCampuses.includes(formData.university)) {
//       newErrors.university = "Please select a valid CUI campus";
//     }

//     if (!formData.degree) {
//       newErrors.degree = "Degree is required";
//     } else if (!["CS", "SE"].includes(formData.degree)) {
//       newErrors.degree = "Please select a valid degree (CS or SE)";
//     }

//     if (formData.skills) {
//       const skillsArray = formData.skills.split(",").map((skill) => skill.trim());
//       if (skillsArray.some((skill) => skill.length < 2 || !/^[A-Za-z0-9\s]+$/.test(skill))) {
//         newErrors.skills = "Each skill must be at least 2 characters and contain only letters, numbers, and spaces";
//       } else if (skillsArray.includes("")) {
//         newErrors.skills = "Skills cannot contain empty entries (e.g., 'Java,,Python')";
//       }
//     }

//     if (formData.coverLetter && formData.coverLetter.length < 10) {
//       newErrors.coverLetter = "Cover letter must be at least 10 characters if provided";
//     }

//     if (!formData.file) {
//       newErrors.file = "Resume file is required";
//     } else {
//       const allowedTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];
//       if (!allowedTypes.includes(formData.file.type)) {
//         newErrors.file = "Resume must be a PDF, DOC, or DOCX file";
//       } else if (formData.file.size > 5 * 1024 * 1024) {
//         newErrors.file = "Resume file size must not exceed 5MB";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "file") {
//       setFormData((prev) => ({ ...prev, file: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleSubmit = async (e, id) => {
//     e.preventDefault();

//     // Check internship limit before proceeding
//     if (activeInternshipsCount >= 2) {
//       setApplicationStatus({
//         success: false,
//         message: "You cannot apply for more than two internships at a time.",
//       });
//       setTimeout(() => setApplicationStatus(null), 5000);
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     const data = new FormData();
//     data.append("studentId", localStorage.getItem("id"));
//     data.append("name", formData.name);
//     data.append("email", formData.email);
//     data.append("phone", `${formData.countryCode}${formData.phone}`);
//     data.append("university", formData.university);
//     data.append("degree", formData.degree);
//     data.append("skills", formData.skills);
//     data.append("coverLetter", formData.coverLetter);
//     data.append("file", formData.file);
//     setApplying(true);
//     setSelectedInternship(id);

//     try {
//       const response = await axios.post(
//         `https://internship-hub-backend.vercel.app/api/internships/${id}/apply`,
//         data
//       );
//       setIsModalOpen(false);
//       setApplicationStatus({ success: true, message: response.data.message });
//       setTimeout(() => setApplicationStatus(null), 5000);
//       // Refresh active internships count after successful application
//       fetchActiveInternships();
//     } catch (error) {
//       setApplicationStatus({
//         success: false,
//         message: error.response?.data?.message || "Failed to apply.",
//       });
//       setTimeout(() => setApplicationStatus(null), 5000);
//     } finally {
//       setApplying(false);
//       setSelectedInternship(null);
//     }
//   };

//   return (
//     <section className="p-3 p-sm-4 bg-white rounded-lg shadow-sm">
//       <h2 className="text-lg font-bold mb-4">Available Internships</h2>

//       {loading && (
//         <div className="d-flex justify-content-center mb-4">
//           <Spinner animation="border" variant="primary" />
//         </div>
//       )}

//       {applicationStatus && (
//         <Alert
//           variant={applicationStatus.success ? "success" : "danger"}
//           className="mb-4"
//           dismissible
//           onClose={() => setApplicationStatus(null)}
//         >
//           {applicationStatus.message}
//         </Alert>
//       )}

//       <div className="table-responsive">
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th className="text-nowrap">Company</th>
//               <th className="text-nowrap">Title</th>
//               <th className="text-nowrap">Location</th>
//               <th className="text-nowrap">Description</th>
//               <th className="text-nowrap">Deadline</th>
//               <th className="text-nowrap">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//                 {internships.length > 0 ? (
//                   internships
//                     .filter((internship) => {
//                       const deadline = new Date(internship.deadline);
//                       const currentDate = new Date("2025-06-01T22:20:00+05:00"); // June 01, 2025, 10:20 PM PKT
//                       return deadline >= currentDate; // Only show internships where deadline is today or in the future
//                     })
//                     .map((internship) => (
//                       <tr key={internship._id} className="border-t">
//                         <td className="p-3">{internship.companyDetails?.name || "N/A"}</td>
//                         <td className="p-3">{internship.title || "N/A"}</td>
//                         <td className="p-3">{internship.companyDetails?.location || "N/A"}</td>
//                         <td className="p-3 text-truncate" style={{ maxWidth: "200px" }}>
//                           {internship.description || "N/A"}
//                         </td>
//                         <td className="p-3">
//                           {internship.deadline
//                             ? new Date(internship.deadline).toLocaleDateString()
//                             : "N/A"}
//                         </td>
//                         <td className="p-3">
//                           <Button
//                             onClick={() => toggleModal(internship._id)}
//                             disabled={
//                               (applying && selectedInternship === internship._id) ||
//                               activeInternshipsCount >= 2
//                             }
//                             variant="primary"
//                             size="sm"
//                             title={
//                               activeInternshipsCount >= 2
//                                 ? "You cannot apply for more than two internships."
//                                 : ""
//                             }
//                           >
//                             {applying && selectedInternship === internship._id
//                               ? "Applying..."
//                               : "Apply"}
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="text-center p-4 text-gray-500">
//                       No internships available.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//         </Table>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg w-full max-w-lg overflow-y-auto max-h-[90vh]">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h2 className="text-lg font-bold">Internship Application</h2>
//               <button
//                 onClick={() => toggleModal(null)}
//                 className="btn-close"
//                 aria-label="Close"
//               />
//             </div>
//             {activeInternshipsCount >= 2 && (
//               <Alert variant="warning" className="mb-3">
//                 You cannot apply for more than two internships at a time.
//               </Alert>
//             )}
//             <form
//               onSubmit={(e) => handleSubmit(e, selectedInternship)}
//               className="space-y-3"
//               encType="multipart/form-data"
//               noValidate
//             >
//               <div className="row g-2 align-items-center">
//                 <label className="col-12 col-sm-4 font-medium">Name *</label>
//                 <div className="col-12 col-sm-8">
//                   <input
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`form-control ${errors.name ? "is-invalid" : ""}`}
//                     required
//                     placeholder="Enter your name"
//                   />
//                   {errors.name && (
//                     <div className="invalid-feedback">{errors.name}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="row g-2 align-items-center">
//                 <label className="col-12 col-sm-4 font-medium">Email *</label>
//                 <div className="col-12 col-sm-8">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                     required
//                     placeholder="Enter your email"
//                   />
//                   {errors.email && (
//                     <div className="invalid-feedback">{errors.email}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="row g-2 align-items-center">
//                 <label className="col-12 col-sm-4 font-medium">Phone *</label>
//                 <div className="col-12 col-sm-8 d-flex gap-2">
//                   <select
//                     name="countryCode"
//                     value={formData.countryCode}
//                     onChange={handleChange}
//                     className={`form-select w-auto ${
//                       errors.countryCode ? "is-invalid" : ""
//                     }`}
//                     required
//                   >
//                     {countryCodes.map((c) => (
//                       <option key={c.code} value={c.code}>
//                         {c.code} ({c.country})
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className={`form-control ${errors.phone ? "is-invalid" : ""}`}
//                     placeholder="000-000-0000"
//                     required
//                   />
//                   {(errors.countryCode || errors.phone) && (
//                     <div className="invalid-feedback">
//                       {errors.countryCode || errors.phone}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="row g-2 align-items-center">
//                 <label className="col-12 col-sm-4 font-medium">CUI Campus *</label>
//                 <div className="col-12 col-sm-8">
//                   <select
//                     name="university"
//                     value={formData.university}
//                     onChange={handleChange}
//                     className={`form-select ${errors.university ? "is-invalid" : ""}`}
//                     required
//                   >
//                     <option value="" disabled>
//                       Select Campus
//                     </option>
//                     {cuiCampuses.map((campus) => (
//                       <option key={campus} value={campus}>
//                         {campus}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.university && (
//                     <div className="invalid-feedback">{errors.university}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="row g-2 align-items-center">
//                 <label className="col-12 col-sm-4 font-medium">Degree *</label>
//                 <div className="col-12 col-sm-8">
//                   <select
//                     name="degree"
//                     value={formData.degree}
//                     onChange={handleChange}
//                     className={`form-select ${errors.degree ? "is-invalid" : ""}`}
//                     required
//                   >
//                     <option value="" disabled>
//                       Select Degree
//                     </option>
//                     <option value="CS">Computer Science (CS)</option>
//                     <option value="SE">Software Engineering (SE)</option>
//                   </select>
//                   {errors.degree && (
//                     <div className="invalid-feedback">{errors.degree}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="row g-2 align-items-center">
//                 <label className="col-12 col-sm-4 font-medium">Skills</label>
//                 <div className="col-12 col-sm-8">
//                   <input
//                     name="skills"
//                     value={formData.skills}
//                     onChange={handleChange}
//                     className={`form-control ${errors.skills ? "is-invalid" : ""}`}
//                     placeholder="e.g., JavaScript, Python, React"
//                   />
//                   {errors.skills && (
//                     <div className="invalid-feedback">{errors.skills}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="row g-2">
//                 <label className="col-12 col-sm-4 font-medium">Cover Letter</label>
//                 <div className="col-12 col-sm-8">
//                   <textarea
//                     name="coverLetter"
//                     value={formData.coverLetter}
//                     onChange={handleChange}
//                     className={`form-control ${errors.coverLetter ? "is-invalid" : ""}`}
//                     rows={4}
//                   />
//                   {errors.coverLetter && (
//                     <div className="invalid-feedback">{errors.coverLetter}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="row g-2 align-items-center">
//                 <label className="col-12 col-sm-4 font-medium">Upload Resume *</label>
//                 <div className="col-12 col-sm-8">
//                   <input
//                     type="file"
//                     name="file"
//                     accept=".pdf,.doc,.docx"
//                     onChange={handleChange}
//                     className={`form-control ${errors.file ? "is-invalid" : ""}`}
//                     required
//                   />
//                   {errors.file && (
//                     <div className="invalid-feedback">{errors.file}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="d-flex justify-content-end gap-2">
//                 <Button
//                   variant="secondary"
//                   onClick={() => toggleModal(null)}
//                   disabled={applying}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="primary"
//                   disabled={applying || activeInternshipsCount >= 2}
//                   className="d-flex align-items-center gap-2"
//                 >
//                   {applying ? <Spinner size="sm" /> : null}
//                   {applying ? "Submitting..." : "Submit Application"}
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Internships;




import { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [applying, setApplying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeInternshipsCount, setActiveInternshipsCount] = useState(0);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    countryCode: "+92", // Default to Pakistan
    phone: "",
    university: "",
    degree: "",
    skills: "",
    coverLetter: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  // Country codes
  const countryCodes = [
    { code: "+92", country: "Pakistan" },
    { code: "+1", country: "USA" },
    { code: "+91", country: "India" },
  ];
  const cuiCampuses = [
    "Islamabad",
    "Wah",
    "Abbottabad",
    "Lahore",
    "Attock",
    "Sahiwal",
    "Vehari",
  ];

  useEffect(() => {
    fetchInternships();
    fetchActiveInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://internship-hub-backend.vercel.app/api/internships");
      setInternships(response.data);
    } catch (error) {
      console.error("Failed to fetch internships:", error);
      setApplicationStatus({
        success: false,
        message: "Failed to load internships.",
      });
      setTimeout(() => setApplicationStatus(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveInternships = async () => {
    const studentId = localStorage.getItem("id");
    if (!studentId) {
      console.error("No student ID found in localStorage");
      setApplicationStatus({
        success: false,
        message: "Please log in to apply for internships.",
      });
      setTimeout(() => setApplicationStatus(null), 5000);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://internship-hub-backend.vercel.app/api/internships/approved/${studentId}`
      );
      const activeCount = response.data.count;
      setActiveInternshipsCount(activeCount);;
    } catch (error) {
      console.error("Failed to fetch active internships:", error);
      setApplicationStatus({
        success: false,
        message: "Failed to verify active internships.",
      });
      setTimeout(() => setApplicationStatus(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = (id) => {
    setSelectedInternship(id);
    setIsModalOpen((prev) => !prev);
    if (!id) {
      setFormData({
        studentId: "",
        name: "",
        email: "",
        countryCode: "+92",
        phone: "",
        university: "",
        degree: "",
        skills: "",
        coverLetter: "",
        file: null,
      });
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]{2,}$/.test(formData.name)) {
      newErrors.name = "Name must be at least 2 characters and contain only letters and spaces";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!countryCodes.some((c) => c.code === formData.countryCode)) {
      newErrors.countryCode = "Please select a valid country code";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else {
      const phonePattern = /^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/;
      if (!phonePattern.test(formData.phone)) {
        newErrors.phone = `Phone number must be 10 digits (e.g., 123-456-7890) for ${formData.countryCode}`;
      }
    }

    if (!formData.university) {
      newErrors.university = "Campus is required";
    } else if (!cuiCampuses.includes(formData.university)) {
      newErrors.university = "Please select a valid CUI campus";
    }

    if (!formData.degree) {
      newErrors.degree = "Degree is required";
    } else if (!["CS", "SE"].includes(formData.degree)) {
      newErrors.degree = "Please select a valid degree (CS or SE)";
    }

    if (formData.skills) {
      const skillsArray = formData.skills.split(",").map((skill) => skill.trim());
      if (skillsArray.some((skill) => skill.length < 2 || !/^[A-Za-z0-9\s]+$/.test(skill))) {
        newErrors.skills = "Each skill must be at least 2 characters and contain only letters, numbers, and spaces";
      } else if (skillsArray.includes("")) {
        newErrors.skills = "Skills cannot contain empty entries (e.g., 'Java,,Python')";
      }
    }

    if (formData.coverLetter && formData.coverLetter.length < 10) {
      newErrors.coverLetter = "Cover letter must be at least 10 characters if provided";
    }

    if (!formData.file) {
      newErrors.file = "Resume file is required";
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(formData.file.type)) {
        newErrors.file = "Resume must be a PDF, DOC, or DOCX file";
      } else if (formData.file.size > 5 * 1024 * 1024) {
        newErrors.file = "Resume file size must not exceed 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    if (activeInternshipsCount >= 2) {
      setApplicationStatus({
        success: false,
        message: "You cannot apply for more than two internships at a time.",
      });
      setTimeout(() => setApplicationStatus(null), 5000);
      return;
    }

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append("studentId", localStorage.getItem("id"));
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", `${formData.countryCode}${formData.phone}`);
    data.append("university", formData.university);
    data.append("degree", formData.degree);
    data.append("skills", formData.skills);
    data.append("coverLetter", formData.coverLetter);
    data.append("file", formData.file);
    setApplying(true);
    setSelectedInternship(id);

    try {
      const response = await axios.post(
        `https://internship-hub-backend.vercel.app/api/internships/${id}/apply`,
        data
      );
      console.log(id)
      setIsModalOpen(false);
      setApplicationStatus({ success: true, message: response.data.message });
      setTimeout(() => setApplicationStatus(null), 5000);
      fetchActiveInternships();
    } catch (error) {
      setApplicationStatus({
        success: false,
        message: error.response?.data?.message || "Failed to apply.",
      });
      setTimeout(() => setApplicationStatus(null), 5000);
    } finally {
      setApplying(false);
      setSelectedInternship(null);
    }
  };

  return (
    <section className="p-3 p-sm-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-bold mb-4">Available Internships</h2>
      <p className="mb-3 text-muted">
        You are currently enrolled in {activeInternshipsCount} active internship(s). You can apply for up to 2 internships at a time.
      </p>

      {loading && (
        <div className="d-flex justify-content-center mb-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {applicationStatus && (
        <Alert
          variant={applicationStatus.success ? "success" : "danger"}
          className="mb-4"
          dismissible
          onClose={() => setApplicationStatus(null)}
        >
          {applicationStatus.message}
        </Alert>
      )}

      <div className="table-responsive">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-nowrap">Company</th>
              <th className="text-nowrap">Title</th>
              <th className="text-nowrap">Location</th>
              <th className="text-nowrap">Description</th>
              <th className="text-nowrap">Deadline</th>
              <th className="text-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {internships.length > 0 ? (
              internships
                .filter((internship) => new Date(internship.deadline) >= new Date())
                .map((internship) => (
                  <tr key={internship._id} className="border-t">
                    <td className="p-3">{internship.companyDetails?.name || "N/A"}</td>
                    <td className="p-3">{internship.title || "N/A"}</td>
                    <td className="p-3">{internship.companyDetails?.location || "N/A"}</td>
                    <td className="p-3 text-truncate" style={{ maxWidth: "200px" }}>
                      {internship.description || "N/A"}
                    </td>
                    <td className="p-3">
                      {internship.deadline
                        ? new Date(internship.deadline).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-3">
                      <Button
                        onClick={() => toggleModal(internship._id)}
                        disabled={
                          (applying && selectedInternship === internship._id) ||
                          activeInternshipsCount >= 2
                        }
                        variant="primary"
                        size="sm"
                        title={
                          activeInternshipsCount >= 2
                            ? "You cannot apply for more than two internships."
                            : ""
                        }
                      >
                        {applying && selectedInternship === internship._id
                          ? "Applying..."
                          : "Apply"}
                      </Button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No internships available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="text-lg font-bold">Internship Application</h2>
              <button
                onClick={() => toggleModal(null)}
                className="btn-close"
                aria-label="Close"
              />
            </div>
            {activeInternshipsCount >= 2 && (
              <Alert variant="warning" className="mb-3">
                You cannot apply for more than two internships at a time.
              </Alert>
            )}
            <form
              onSubmit={(e) => handleSubmit(e, selectedInternship)}
              className="space-y-3"
              encType="multipart/form-data"
              noValidate
            >
              <div className="row g-2 align-items-center">
                <label className="col-12 col-sm-4 font-medium">Name *</label>
                <div className="col-12 col-sm-8">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    required
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
              </div>
              <div className="row g-2 align-items-center">
                <label className="col-12 col-sm-4 font-medium">Email *</label>
                <div className="col-12 col-sm-8">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    required
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="row g-2 align-items-center">
                <label className="col-12 col-sm-4 font-medium">Phone *</label>
                <div className="col-12 col-sm-8 d-flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className={`form-select w-auto ${errors.countryCode ? "is-invalid" : ""}`}
                    required
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.country})
                      </option>
                    ))}
                  </select>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="000-000-0000"
                    required
                  />
                  {(errors.countryCode || errors.phone) && (
                    <div className="invalid-feedback">
                      {errors.countryCode || errors.phone}
                    </div>
                  )}
                </div>
              </div>
              <div className="row g-2 align-items-center">
                <label className="col-12 col-sm-4 font-medium">CUI Campus *</label>
                <div className="col-12 col-sm-8">
                  <select
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className={`form-select ${errors.university ? "is-invalid" : ""}`}
                    required
                  >
                    <option value="" disabled>
                      Select Campus
                    </option>
                    {cuiCampuses.map((campus) => (
                      <option key={campus} value={campus}>
                        {campus}
                      </option>
                    ))}
                  </select>
                  {errors.university && (
                    <div className="invalid-feedback">{errors.university}</div>
                  )}
                </div>
              </div>
              <div className="row g-2 align-items-center">
                <label className="col-12 col-sm-4 font-medium">Degree *</label>
                <div className="col-12 col-sm-8">
                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className={`form-select ${errors.degree ? "is-invalid" : ""}`}
                    required
                  >
                    <option value="" disabled>
                      Select Degree
                    </option>
                    <option value="CS">Computer Science (CS)</option>
                    <option value="SE">Software Engineering (SE)</option>
                  </select>
                  {errors.degree && (
                    <div className="invalid-feedback">{errors.degree}</div>
                  )}
                </div>
              </div>
              <div className="row g-2 align-items-center">
                <label className="col-12 col-sm-4 font-medium">Skills</label>
                <div className="col-12 col-sm-8">
                  <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className={`form-control ${errors.skills ? "is-invalid" : ""}`}
                    placeholder="e.g., JavaScript, Python, React"
                  />
                  {errors.skills && (
                    <div className="invalid-feedback">{errors.skills}</div>
                  )}
                </div>
              </div>
              <div className="row g-2">
                <label className="col-12 col-sm-4 font-medium">Cover Letter</label>
                <div className="col-12 col-sm-8">
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    className={`form-control ${errors.coverLetter ? "is-invalid" : ""}`}
                    rows={4}
                  />
                  {errors.coverLetter && (
                    <div className="invalid-feedback">{errors.coverLetter}</div>
                  )}
                </div>
              </div>
              <div className="row g-2 align-items-center">
                <label className="col-12 col-sm-4 font-medium">Upload Resume *</label>
                <div className="col-12 col-sm-8">
                  <input
                    type="file"
                    name="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className={`form-control ${errors.file ? "is-invalid" : ""}`}
                    required
                  />
                  {errors.file && (
                    <div className="invalid-feedback">{errors.file}</div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => toggleModal(null)}
                  disabled={applying}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={applying || activeInternshipsCount >= 2}
                  className="d-flex align-items-center gap-2"
                >
                  {applying ? <Spinner size="sm" /> : null}
                  {applying ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Internships;