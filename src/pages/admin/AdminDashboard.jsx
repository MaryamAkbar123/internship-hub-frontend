// import React, { useState, useEffect } from "react";
// import { 
//   FaUsers, 
//   FaLaptopCode, 
//   FaTasks, 
//   FaBriefcase,
//   FaChartLine,
//   FaUniversity 
// } from 'react-icons/fa';
// import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
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


// const exportToPDF = () => {
//   const doc = new jsPDF();
  
//   // Title
//   doc.setFontSize(18);
//   doc.text('Dashboard Report', 14, 15);
  
//   // Summary section
//   doc.setFontSize(12);
//   doc.text('Summary Statistics', 14, 30);
  
//   // Summary table
//   doc.autoTable({
//     startY: 35,
//     head: [['Metric', 'Value']],
//     body: [
//       ['Total Students', stdCount],
//       ['Total Companies', softCount],
//       ['Total Applications', appCount],
//       ['Total Internships', internshipData.totalInternships],
//       ['Active Internships', internshipData.activeInternships],
//       ['Students in Internships', internshipData.studentsInInternships]
//     ],
//     styles: {
//       fontSize: 10,
//       cellPadding: 2,
//     },
//     headStyles: {
//       fillColor: [41, 128, 185],
//       textColor: 255,
//       fontStyle: 'bold'
//     }
//   });
  
//   // Status distribution section
//   doc.text('Internship Status Distribution', 14, doc.autoTable.previous.finalY + 15);
//   doc.autoTable({
//     startY: doc.autoTable.previous.finalY + 20,
//     head: [['Status', 'Count']],
//     body: internshipData.statusDistribution.map(item => [item.name, item.value]),
//     styles: {
//       fontSize: 10,
//       cellPadding: 2,
//     },
//     headStyles: {
//       fillColor: [41, 128, 185],
//       textColor: 255,
//       fontStyle: 'bold'
//     }
//   });
  
//   doc.save('Dashboard_Report.pdf');
// };

// const exportToExcel = () => {
//   // Create worksheets
//   const summaryWS = XLSX.utils.json_to_sheet([
//     { Metric: 'Total Students', Value: stdCount },
//     { Metric: 'Total Companies', Value: softCount },
//     { Metric: 'Total Applications', Value: appCount },
//     { Metric: 'Total Internships', Value: internshipData.totalInternships },
//     { Metric: 'Active Internships', Value: internshipData.activeInternships },
//     { Metric: 'Students in Internships', Value: internshipData.studentsInInternships }
//   ]);
  
//   const statusWS = XLSX.utils.json_to_sheet(
//     internshipData.statusDistribution.map(item => ({
//       Status: item.name,
//       Count: item.value
//     }))
//   );
  
//   // Create workbook
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, summaryWS, "Summary");
//   XLSX.utils.book_append_sheet(wb, statusWS, "Status Distribution");
  
//   // Export
//   XLSX.writeFile(wb, "Dashboard_Report.xlsx");
// };

// const Dashboard = () => {
//   const [stdCount, setStdCount] = useState(0);
//   const [softCount, setSoftCount] = useState(0);
//   const [appCount, setAppCount] = useState(0);
//   const [internshipData, setInternshipData] = useState({
//     totalInternships: 0,
//     activeInternships: 0,
//     studentsInInternships: 0,
//     statusDistribution: []
//   });
//   const [loading, setLoading] = useState(true);
//   const role = "student";
//   const status = 0;

//   const fetchData = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch basic counts
//       const [companiesRes, applicationsRes, studentsRes] = await Promise.all([
//         axios.get("https://internship-hub-backend.vercel.app/api/softwarehouses"),
//         axios.get(`https://internship-hub-backend.vercel.app/api/softwarehouses/byid/${status}`),
//         axios.get(`https://internship-hub-backend.vercel.app/api/users/${role}`)
//       ]);

//       // Fetch internship data
//       const internshipsResponse = await axios.get("https://internship-hub-backend.vercel.app/api/internships");
//       const internships = internshipsResponse.data;
      
//       // Process internship data
//       let studentsInInternships = 0;
//       const statusCounts = {
//         Active: 0,
//         Pending: 0,
//       };

//       const enrichedInternships = await Promise.all(
//         internships.map(async (internship) => {
//           try {
//             // Count statuses
//             statusCounts[getStatusName(internship.status)]++;
            
//             // Get students for this internship
//             const studentsResponse = await axios.get(
//               `https://internship-hub-backend.vercel.app/api/internships/${internship._id}/students`
//             );
            
//             studentsInInternships += studentsResponse.data?.length || 0;
            
//             return {
//               ...internship,
//               students: studentsResponse.data || []
//             };
//           } catch (err) {
//             console.error(`Error fetching details for internship ${internship._id}:`, err);
//             return {
//               ...internship,
//               students: []
//             };
//           }
//         })
//       );

//       setInternshipData({
//         totalInternships: internships.length,
//         activeInternships: statusCounts.Active,
//         studentsInInternships,
//         statusDistribution: Object.entries(statusCounts).map(([name, value]) => ({
//           name,
//           value
//         }))
//       });

//       setSoftCount(companiesRes.data.length);
//       setStdCount(studentsRes.data.length);
//       setAppCount(applicationsRes.data.length);
      
//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to convert status number to name
//   const getStatusName = (statusNum) => {
//     switch(statusNum) {
//       case 0: return 'Pending';
//       case 1: return 'Active';
     
//       default: return 'Unknown';
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Chart data
//   const barChartData = [
//     { name: "Students", value: stdCount, fill: "#3B82F6" },
//     { name: "Companies", value: softCount, fill: "#10B981" },
//     { name: "Applications", value: appCount, fill: "#8B5CF6" },
//     { name: "Internships", value: internshipData.totalInternships, fill: "#F59E0B" }
//   ];

//   const statusColors = {
//     Active: "#10B981",
//     Pending: "#F59E0B",
//     Unknown: "#8884d8"
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//             {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
//             <p className="text-gray-600">Key metrics and analytics at a glance</p>
//           </div>
//           <Dropdown>
//             <Dropdown.Toggle variant="primary" id="dropdown-report">
//               Generate Report
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={exportToPDF}>PDF Report</Dropdown.Item>
//               <Dropdown.Item onClick={exportToExcel}>Excel Report</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <DashboardCard
//           title="Total Students"
//           value={stdCount}
//           icon={FaUsers}
//           trend={stdCount > 0 ? "up" : "down"}
//           trendValue="12%"
//           bgColor="bg-blue-100"
//           textColor="text-blue-600"
//         />
//         <DashboardCard
//           title="Companies"
//           value={softCount}
//           icon={FaLaptopCode}
//           trend="up"
//           trendValue="8%"
//           bgColor="bg-green-100"
//           textColor="text-green-600"
//         />
//         <DashboardCard
//           title="Applications"
//           value={appCount}
//           icon={FaTasks}
//           trend={appCount > 0 ? "up" : "down"}
//           trendValue="5%"
//           bgColor="bg-purple-100"
//           textColor="text-purple-600"
//         />
//         <DashboardCard
//           title="Active Internships"
//           value={internshipData.activeInternships}
//           icon={FaBriefcase}
//           trend="up"
//           trendValue="15%"
//           bgColor="bg-amber-100"
//           textColor="text-amber-600"
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

//         {/* Pie Chart - Internship Status */}
//         <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//             <FaBriefcase className="mr-2 text-amber-500" />
//             Internship Status Distribution
//           </h2>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={internshipData.statusDistribution}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {internshipData.statusDistribution.map((entry, index) => (
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

//       {/* Internship Quick Stats */}
//       <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//           <FaUniversity className="mr-2 text-purple-500" />
//           Internship Quick Stats
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-blue-600 font-medium">Total Internships</p>
//                 <p className="text-2xl font-bold text-blue-800">{internshipData.totalInternships}</p>
//               </div>
//               <div className="bg-blue-100 p-2 rounded-full">
//                 <FaBriefcase className="text-blue-600" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-green-50 p-4 rounded-lg">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-green-600 font-medium">Students in Internships</p>
//                 <p className="text-2xl font-bold text-green-800">{internshipData.studentsInInternships}</p>
//               </div>
//               <div className="bg-green-100 p-2 rounded-full">
//                 <FaUsers className="text-green-600" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-amber-50 p-4 rounded-lg">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-sm text-amber-600 font-medium">Active Internships</p>
//                 <p className="text-2xl font-bold text-amber-800">{internshipData.activeInternships}</p>
//               </div>
//               <div className="bg-amber-100 p-2 rounded-full">
//                 <FiTrendingUp className="text-amber-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { 
  FaUsers, 
  FaLaptopCode, 
  FaTasks, 
  FaBriefcase,
  FaChartLine,
  FaUniversity 
} from 'react-icons/fa';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
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

const Dashboard = () => {
  const [stdCount, setStdCount] = useState(0);
  const [softCount, setSoftCount] = useState(0);
  const [appCount, setAppCount] = useState(0);
  const [internshipData, setInternshipData] = useState({
    totalInternships: 0,
    activeInternships: 0,
    studentsInInternships: 0,
    statusDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const role = "student";
  const status = 0;

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch basic counts
      const [companiesRes, applicationsRes, studentsRes] = await Promise.all([
        axios.get("https://internship-hub-backend.vercel.app/api/softwarehouses"),
        axios.get(`https://internship-hub-backend.vercel.app/api/softwarehouses/byid/${status}`),
        axios.get(`https://internship-hub-backend.vercel.app/api/users/${role}`)
      ]);

      // Fetch internship data
      const internshipsResponse = await axios.get("https://internship-hub-backend.vercel.app/api/internships");
      const internships = internshipsResponse.data;
      
      // Process internship data
      let studentsInInternships = 0;
      const statusCounts = {
        Active: 0,
        Pending: 0,
      };

      const enrichedInternships = await Promise.all(
        internships.map(async (internship) => {
          try {
            // Count statuses
            statusCounts[getStatusName(internship.status)]++;
            
            // Get students for this internship
            const studentsResponse = await axios.get(
              `https://internship-hub-backend.vercel.app/api/internships/${internship._id}/students`
            );
            
            studentsInInternships += studentsResponse.data?.length || 0;
            
            return {
              ...internship,
              students: studentsResponse.data || []
            };
          } catch (err) {
            console.error(`Error fetching details for internship ${internship._id}:`, err);
            return {
              ...internship,
              students: []
            };
          }
        })
      );

      setInternshipData({
        totalInternships: internships.length,
        activeInternships: statusCounts.Active,
        studentsInInternships,
        statusDistribution: Object.entries(statusCounts).map(([name, value]) => ({
          name,
          value
        }))
      });

      setSoftCount(companiesRes.data.length);
      setStdCount(studentsRes.data.length);
      setAppCount(applicationsRes.data.length);
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert status number to name
  const getStatusName = (statusNum) => {
    switch(statusNum) {
      case 0: return 'Pending';
      case 1: return 'Active';
      default: return 'Unknown';
    }
  };

  // Generate PDF Report
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text('Dashboard Report', 14, 15);
    
    // Date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);
    
    // Summary section
    doc.setFontSize(12);
    doc.text('Summary Statistics', 14, 30);
    
    // Summary table
    doc.autoTable({
      startY: 35,
      head: [['Metric', 'Value']],
      body: [
        ['Total Students', stdCount],
        ['Total Companies', softCount],
        ['Total Applications', appCount],
        ['Total Internships', internshipData.totalInternships],
        ['Active Internships', internshipData.activeInternships],
        ['Students in Internships', internshipData.studentsInInternships]
      ],
      styles: {
        fontSize: 10,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });
    
    // Status distribution section
    doc.text('Internship Status Distribution', 14, doc.autoTable.previous.finalY + 15);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20,
      head: [['Status', 'Count']],
      body: internshipData.statusDistribution.map(item => [item.name, item.value]),
      styles: {
        fontSize: 10,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });
    
    doc.save('Dashboard_Report.pdf');
  };

  // Generate Excel Report
  const exportToExcel = () => {
    // Create worksheets
    const summaryWS = XLSX.utils.json_to_sheet([
      { Metric: 'Total Students', Value: stdCount },
      { Metric: 'Total Companies', Value: softCount },
      { Metric: 'Total Applications', Value: appCount },
      { Metric: 'Total Internships', Value: internshipData.totalInternships },
      { Metric: 'Active Internships', Value: internshipData.activeInternships },
      { Metric: 'Students in Internships', Value: internshipData.studentsInInternships }
    ]);
    
    const statusWS = XLSX.utils.json_to_sheet(
      internshipData.statusDistribution.map(item => ({
        Status: item.name,
        Count: item.value
      }))
    );
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, summaryWS, "Summary");
    XLSX.utils.book_append_sheet(wb, statusWS, "Status Distribution");
    
    // Add metadata
    wb.Props = {
      Title: "Dashboard Report",
      Subject: "Internship Hub Statistics",
      Author: "Internship Hub Admin",
      CreatedDate: new Date()
    };
    
    // Export
    XLSX.writeFile(wb, "Dashboard_Report.xlsx");
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Chart data
  const barChartData = [
    { name: "Students", value: stdCount, fill: "#3B82F6" },
    { name: "Companies", value: softCount, fill: "#10B981" },
    { name: "Applications", value: appCount, fill: "#8B5CF6" },
    { name: "Internships", value: internshipData.totalInternships, fill: "#F59E0B" }
  ];

  const statusColors = {
    Active: "#10B981",
    Pending: "#F59E0B",
    Unknown: "#8884d8"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800"> Admin Dashboard </h1>
          <p className="text-gray-600">Key metrics and analytics at a glance</p>
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
          title="Total Students"
          value={stdCount}
          icon={FaUsers}
          trend={stdCount > 0 ? "up" : "down"}
          trendValue="12%"
          bgColor="bg-blue-100"
          textColor="text-blue-600"
        />
        <DashboardCard
          title="Companies"
          value={softCount}
          icon={FaLaptopCode}
          trend="up"
          trendValue="8%"
          bgColor="bg-green-100"
          textColor="text-green-600"
        />
        <DashboardCard
          title="Applications"
          value={appCount}
          icon={FaTasks}
          trend={appCount > 0 ? "up" : "down"}
          trendValue="5%"
          bgColor="bg-purple-100"
          textColor="text-purple-600"
        />
        <DashboardCard
          title="Active Internships"
          value={internshipData.activeInternships}
          icon={FaBriefcase}
          trend="up"
          trendValue="15%"
          bgColor="bg-amber-100"
          textColor="text-amber-600"
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

        {/* Pie Chart - Internship Status */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaBriefcase className="mr-2 text-amber-500" />
            Internship Status Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={internshipData.statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {internshipData.statusDistribution.map((entry, index) => (
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

      {/* Internship Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FaUniversity className="mr-2 text-purple-500" />
          Internship Quick Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Internships</p>
                <p className="text-2xl font-bold text-blue-800">{internshipData.totalInternships}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <FaBriefcase className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-green-600 font-medium">Students in Internships</p>
                <p className="text-2xl font-bold text-green-800">{internshipData.studentsInInternships}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <FaUsers className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-amber-600 font-medium">Active Internships</p>
                <p className="text-2xl font-bold text-amber-800">{internshipData.activeInternships}</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <FiTrendingUp className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;