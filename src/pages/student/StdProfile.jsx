
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
        const response = await axios.get(`https://internship-hub-backend.vercel.app/api/profiles`);
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
        
        const profileResponse = await axios.get(`https://internship-hub-backend.vercel.app/api/profiles`);
        const studentProfile = profileResponse.data.find(profile => profile.studentId === studentId);
        
        const applicationsResponse = await axios.get(`https://internship-hub-backend.vercel.app/api/applications`);
        const companiesResponse = await axios.get(`https://internship-hub-backend.vercel.app/api/softwarehouses`);
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

      await axios.post('https://internship-hub-backend.vercel.app/api/profiles', formData, {
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
                    src={profile.profileImage ? `https://internship-hub-backend.vercel.app/${profile.profileImage}` : 'https://placehold.co/150x150'}
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