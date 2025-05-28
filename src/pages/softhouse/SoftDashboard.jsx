

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FaClipboardList, 
//   FaFileAlt, 
//   FaUserCheck, 
//   FaTasks,
//   FaChartLine,
//   FaBuilding
// } from 'react-icons/fa';
// import { FiTrendingUp } from 'react-icons/fi';
// import DashboardCard from '../../components/DashboardCard';
// import axios from 'axios';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   Cell,
//   PieChart,
//   Pie
// } from 'recharts';
// import { Dropdown } from 'react-bootstrap';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// const SoftwareHouseDashboard = () => {
//   const [internshipPosts, setInternshipPosts] = useState(0);
//   const [applicationsReceived, setApplicationsReceived] = useState(0);
//   const [selectedStudents, setSelectedStudents] = useState(0);
//   const [tasksAssigned, setTasksAssigned] = useState(0);
//   const [statusDistribution, setStatusDistribution] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const companyId = localStorage.getItem('companyId');

//   const fetchData = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch all statistics in parallel
//       const [postsRes, appsRes, tasksRes] = await Promise.all([
//         axios.get(`http://localhost:5000/api/internships/${companyId}`),
//         axios.get(`http://localhost:5000/api/applications/${companyId}`),
//         axios.get(`http://localhost:5000/api/tasks/${companyId}`)
//       ]);

//       // Fetch approved students count and status distribution separately
//       const approvedCount = await fetchApprovedStudents(companyId);
//       const statusDist = await fetchStatusDistribution(companyId);

//       setInternshipPosts(postsRes.data.length);
//       setApplicationsReceived(appsRes.data.length);
//       setSelectedStudents(approvedCount);
//       setTasksAssigned(tasksRes.data.length);
      
//       // Process status distribution
//       setStatusDistribution(
//         Object.entries(statusDist).map(([name, value]) => ({
//           name,
//           value
//         })
//       ));
      
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchApprovedStudents = async (companyId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/applications/approved/${companyId}`
//       );
//       return response.data.length || 0;
//     } catch (error) {
//       console.error('Error fetching approved students:', error);
//       return 0;
//     }
//   };

//   const fetchStatusDistribution = async (companyId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/internships/status-distribution/${companyId}`
//       );
//       return response.data.distribution || {
//         Pending: 0,
//         Approved: 0,
//         Rejected: 0
//       };
//     } catch (error) {
//       console.error('Error fetching status distribution:', error);
//       return {
//         Pending: 0,
//         Approved: 0,
//         Rejected: 0
//       };
//     }
//   };

//   // Generate PDF Report
//   const exportToPDF = () => {
//     const doc = new jsPDF();
    
//     // Title
//     doc.setFontSize(18);
//     doc.text('Software House Dashboard Report', 14, 15);
//     doc.setFontSize(10);
//     doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);
    
//     // Summary section
//     doc.setFontSize(12);
//     doc.text('Summary Statistics', 14, 30);
    
//     // Summary table
//     doc.autoTable({
//       startY: 35,
//       head: [['Metric', 'Value']],
//       body: [
//         ['Internship Posts', internshipPosts],
//         ['Applications Received', applicationsReceived],
//         ['Selected Students', selectedStudents],
//         ['Tasks Assigned', tasksAssigned]
//       ],
//       styles: {
//         fontSize: 10,
//         cellPadding: 2,
//       },
//       headStyles: {
//         fillColor: [41, 128, 185],
//         textColor: 255,
//         fontStyle: 'bold'
//       }
//     });
    
//     // Status distribution section
//     doc.text('Internship Status Distribution', 14, doc.autoTable.previous.finalY + 15);
//     doc.autoTable({
//       startY: doc.autoTable.previous.finalY + 20,
//       head: [['Status', 'Count']],
//       body: statusDistribution.map(item => [item.name, item.value]),
//       styles: {
//         fontSize: 10,
//         cellPadding: 2,
//       },
//       headStyles: {
//         fillColor: [41, 128, 185],
//         textColor: 255,
//         fontStyle: 'bold'
//       }
//     });
    
//     doc.save('SoftwareHouse_Report.pdf');
//   };

//   // Generate Excel Report
//   const exportToExcel = () => {
//     // Create worksheets
//     const summaryWS = XLSX.utils.json_to_sheet([
//       { Metric: 'Internship Posts', Value: internshipPosts },
//       { Metric: 'Applications Received', Value: applicationsReceived },
//       { Metric: 'Selected Students', Value: selectedStudents },
//       { Metric: 'Tasks Assigned', Value: tasksAssigned }
//     ]);
    
//     const statusWS = XLSX.utils.json_to_sheet(
//       statusDistribution.map(item => ({
//         Status: item.name,
//         Count: item.value
//       }))
//     );
    
//     // Create workbook
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, summaryWS, "Summary");
//     XLSX.utils.book_append_sheet(wb, statusWS, "Status Distribution");
    
//     // Add metadata
//     wb.Props = {
//       Title: "Software House Report",
//       Subject: "Software House Statistics",
//       Author: "Internship Hub",
//       CreatedDate: new Date()
//     };
    
//     // Export
//     XLSX.writeFile(wb, "SoftwareHouse_Report.xlsx");
//   };

//   useEffect(() => {
//     fetchData();
//   }, [companyId]);

//   // Chart data
//   const barChartData = [
//     { name: "Internships", value: internshipPosts, fill: "#10B981" },
//     { name: "Applications", value: applicationsReceived, fill: "#3B82F6" },
//     { name: "Selected", value: selectedStudents, fill: "#8B5CF6" },
//     { name: "Tasks", value: tasksAssigned, fill: "#F59E0B" }
//   ];

//   const statusColors = {
//     Pending: "#F59E0B",
//     Approved: "#10B981",
//     Rejected: "#EF4444",
//     Active: "#10B981",
//     Closed: "#EF4444",
//     Draft: "#6B7280"
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-green-800">Software House Dashboard</h1>
//           <p className="text-gray-600">Key metrics and analytics for your company</p>
//         </div>
//         <Dropdown>
//           <Dropdown.Toggle variant="primary" id="dropdown-report">
//             Generate Report
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             <Dropdown.Item onClick={exportToPDF}>
//               <i className="fas fa-file-pdf mr-2"></i> PDF Report
//             </Dropdown.Item>
//             <Dropdown.Item onClick={exportToExcel}>
//               <i className="fas fa-file-excel mr-2"></i> Excel Report
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <DashboardCard
//           title="Internship Posts"
//           value={internshipPosts}
//           icon={FaClipboardList}
//           trend="up"
//           trendValue="5%"
//           bgColor="bg-green-100"
//           textColor="text-green-600"
//           onClick={() => navigate('/softwarehouse/internships')}
//         />
//         <DashboardCard
//           title="Applications"
//           value={applicationsReceived}
//           icon={FaFileAlt}
//           trend="up"
//           trendValue="12%"
//           bgColor="bg-blue-100"
//           textColor="text-blue-600"
//           onClick={() => navigate('/softwarehouse/applications')}
//         />
//         <DashboardCard
//           title="Selected Students"
//           value={selectedStudents}
//           icon={FaUserCheck}
//           trend="up"
//           trendValue="8%"
//           bgColor="bg-purple-100"
//           textColor="text-purple-600"
//           onClick={() => navigate('/softwarehouse/approvedstudents')}
//         />
//         <DashboardCard
//           title="Tasks Assigned"
//           value={tasksAssigned}
//           icon={FaTasks}
//           trend="up"
//           trendValue="15%"
//           bgColor="bg-amber-100"
//           textColor="text-amber-600"
//           onClick={() => navigate('/softwarehouse/assign-task')}
//         />
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Bar Chart */}
//         <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-800 flex items-center">
//               <FaChartLine className="mr-2 text-blue-500" />
//               Platform Statistics
//             </h2>
//           </div>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={barChartData}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="name" />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip 
//                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
//                 />
//                 <Bar dataKey="value" radius={[4, 4, 0, 0]}>
//                   {barChartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.fill} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Pie Chart - Status Distribution */}
//         <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//             <FaBuilding className="mr-2 text-amber-500" />
//             Internship Status Distribution
//           </h2>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={statusDistribution}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {statusDistribution.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={statusColors[entry.name] || "#8884d8"} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   formatter={(value) => [`${value} Internships`, 'Count']}
//                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
//                 />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//           <FiTrendingUp className="mr-2 text-green-500" />
//           Company Quick Stats
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-green-50 p-4 rounded-lg">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-green-600 font-medium">Internship Posts</p>
//                 <p className="text-2xl font-bold text-green-800">{internshipPosts}</p>
//               </div>
//               <div className="bg-green-100 p-2 rounded-full">
//                 <FaClipboardList className="text-green-600" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-blue-600 font-medium">Applications Received</p>
//                 <p className="text-2xl font-bold text-blue-800">{applicationsReceived}</p>
//               </div>
//               <div className="bg-blue-100 p-2 rounded-full">
//                 <FaFileAlt className="text-blue-600" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-purple-50 p-4 rounded-lg">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-purple-600 font-medium">Selected Students</p>
//                 <p className="text-2xl font-bold text-purple-800">{selectedStudents}</p>
//               </div>
//               <div className="bg-purple-100 p-2 rounded-full">
//                 <FaUserCheck className="text-purple-600" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-amber-50 p-4 rounded-lg">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-amber-600 font-medium">Tasks Assigned</p>
//                 <p className="text-2xl font-bold text-amber-800">{tasksAssigned}</p>
//               </div>
//               <div className="bg-amber-100 p-2 rounded-full">
//                 <FaTasks className="text-amber-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SoftwareHouseDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaClipboardList, 
  FaFileAlt, 
  FaUserCheck, 
  FaTasks,
  FaChartLine,
  FaBuilding
} from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import DashboardCard from '../../components/DashboardCard';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Dropdown } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const SoftwareHouseDashboard = () => {
  const [internshipPosts, setInternshipPosts] = useState(0);
  const [applicationsReceived, setApplicationsReceived] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState(0);
  const [tasksAssigned, setTasksAssigned] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const companyId = localStorage.getItem('companyId');

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all basic data in parallel
      const [internshipsRes, applicationsRes, tasksRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/internships/${companyId}`),
        axios.get(`http://localhost:5000/api/applications/${companyId}`),
        axios.get(`http://localhost:5000/api/tasks/${companyId}`)
      ]);

      // Process approved applications count
      const approvedApplications = applicationsRes.data.filter(app => app.status === 1);
      
      // Process internship status distribution
      const statusCounts = {
        Active: 0,
        Pending: 0,
        Completed: 0
      };

      internshipsRes.data.forEach(internship => {
        if (internship.status === 0) statusCounts.Pending++;
        else if (internship.status === 1) statusCounts.Active++;
        else if (internship.status === 2) statusCounts.Completed++;
      });

      setInternshipPosts(internshipsRes.data.length);
      setApplicationsReceived(applicationsRes.data.length);
      setSelectedStudents(approvedApplications.length);
      setTasksAssigned(tasksRes.data.length);
      
      setStatusDistribution(
        Object.entries(statusCounts).map(([name, value]) => ({
          name,
          value
        }))
      );
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate PDF Report
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Software House Dashboard Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);
    
    doc.setFontSize(12);
    doc.text('Summary Statistics', 14, 30);
    
    doc.autoTable({
      startY: 35,
      head: [['Metric', 'Value']],
      body: [
        ['Internship Posts', internshipPosts],
        ['Applications Received', applicationsReceived],
        ['Selected Students', selectedStudents],
        ['Tasks Assigned', tasksAssigned]
      ],
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });
    
    doc.text('Internship Status Distribution', 14, doc.autoTable.previous.finalY + 15);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20,
      head: [['Status', 'Count']],
      body: statusDistribution.map(item => [item.name, item.value]),
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });
    
    doc.save('SoftwareHouse_Report.pdf');
  };

  // Generate Excel Report
  const exportToExcel = () => {
    const summaryWS = XLSX.utils.json_to_sheet([
      { Metric: 'Internship Posts', Value: internshipPosts },
      { Metric: 'Applications Received', Value: applicationsReceived },
      { Metric: 'Selected Students', Value: selectedStudents },
      { Metric: 'Tasks Assigned', Value: tasksAssigned }
    ]);
    
    const statusWS = XLSX.utils.json_to_sheet(
      statusDistribution.map(item => ({
        Status: item.name,
        Count: item.value
      }))
    );
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, summaryWS, "Summary");
    XLSX.utils.book_append_sheet(wb, statusWS, "Status Distribution");
    
    wb.Props = {
      Title: "Software House Report",
      Subject: "Software House Statistics",
      Author: "Internship Hub",
      CreatedDate: new Date()
    };
    
    XLSX.writeFile(wb, "SoftwareHouse_Report.xlsx");
  };

  useEffect(() => {
    fetchData();
  }, [companyId]);

  // Chart data
  const barChartData = [
    { name: "Internships", value: internshipPosts, fill: "#10B981" },
    { name: "Applications", value: applicationsReceived, fill: "#3B82F6" },
    { name: "Selected", value: selectedStudents, fill: "#8B5CF6" },
    { name: "Tasks", value: tasksAssigned, fill: "#F59E0B" }
  ];

  const statusColors = {
    Active: "#10B981",
    Pending: "#F59E0B",
    Completed: "#EF4444"
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">Software House Dashboard</h1>
          <p className="text-gray-600">Key metrics and analytics for your company</p>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-report">
            Generate Report
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={exportToPDF}>
              <i className="fas fa-file-pdf mr-2"></i> PDF Report
            </Dropdown.Item>
            <Dropdown.Item onClick={exportToExcel}>
              <i className="fas fa-file-excel mr-2"></i> Excel Report
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Internship Posts"
          value={internshipPosts}
          icon={FaClipboardList}
          trend="up"
          trendValue="5%"
          bgColor="bg-green-100"
          textColor="text-green-600"
          onClick={() => navigate('/softwarehouse/internships')}
        />
        <DashboardCard
          title="Applications"
          value={applicationsReceived}
          icon={FaFileAlt}
          trend="up"
          trendValue="12%"
          bgColor="bg-blue-100"
          textColor="text-blue-600"
          onClick={() => navigate('/softwarehouse/applications')}
        />
        <DashboardCard
          title="Selected Students"
          value={selectedStudents}
          icon={FaUserCheck}
          trend="up"
          trendValue="8%"
          bgColor="bg-purple-100"
          textColor="text-purple-600"
          onClick={() => navigate('/softwarehouse/approvedstudents')}
        />
        <DashboardCard
          title="Tasks Assigned"
          value={tasksAssigned}
          icon={FaTasks}
          trend="up"
          trendValue="15%"
          bgColor="bg-amber-100"
          textColor="text-amber-600"
          onClick={() => navigate('/softwarehouse/assign-task')}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaChartLine className="mr-2 text-blue-500" />
              Platform Statistics
            </h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaBuilding className="mr-2 text-amber-500" />
            Internship Status Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={statusColors[entry.name] || "#8884d8"} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} Internships`, 'Count']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiTrendingUp className="mr-2 text-green-500" />
          Company Quick Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-green-600 font-medium">Internship Posts</p>
                <p className="text-2xl font-bold text-green-800">{internshipPosts}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <FaClipboardList className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-600 font-medium">Applications Received</p>
                <p className="text-2xl font-bold text-blue-800">{applicationsReceived}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <FaFileAlt className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-purple-600 font-medium">Selected Students</p>
                <p className="text-2xl font-bold text-purple-800">{selectedStudents}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <FaUserCheck className="text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-amber-600 font-medium">Tasks Assigned</p>
                <p className="text-2xl font-bold text-amber-800">{tasksAssigned}</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <FaTasks className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareHouseDashboard;