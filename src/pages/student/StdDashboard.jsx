import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  FaClipboardList, 
  FaCheckCircle, 
  FaTasks,
  FaChartLine,
  FaUserTie
} from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import DashboardCard from '../../components/DashboardCard';
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

const StudentDashboard = () => {
  const [applications, setApplications] = useState(0);
  const [selected, setSelected] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem('id');

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [applicationsRes, approvedRes, tasksRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/internships/applied-internships/${studentId}`),
        axios.get(`http://localhost:5000/api/internships/approved/${studentId}`),
        axios.get(`http://localhost:5000/api/tasks/student/${studentId}`)
      ]);

      // Process application status distribution
            const statusCounts = {
              Pending: 0,
              Approved: 0,
              Rejected: 0
            };

            applicationsRes.data.applications.forEach(app => {
              if (app.status === 0) statusCounts.Pending++;
              else if (app.status === 1) statusCounts.Approved++;
              else if (app.status === 2) statusCounts.Rejected++;
            });
    
      setApplications(applicationsRes.data.count); 

      setSelected(approvedRes.data.length || approvedRes.data.count);
      setTasks(tasksRes.data.length);
      console.log(tasksRes.data.length)
      setStatusDistribution(
        Object.entries(statusCounts)
          .filter(([_, value]) => value > 0) // Only include statuses with counts > 0
          .map(([name, value]) => ({
            name,
            value
          }))
      );

    } catch (error) {
      console.error("Error fetching student dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generate PDF Report
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Student Dashboard Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);
    
    doc.setFontSize(12);
    doc.text('Summary Statistics', 14, 30);
    
    doc.autoTable({
      startY: 35,
      head: [['Metric', 'Value']],
      body: [
        ['Applications Submitted', applications],
        ['Approved Internships', selected],
        ['Tasks Assigned', tasks]
      ],
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });
    
    doc.text('Application Status Distribution', 14, doc.autoTable.previous.finalY + 15);
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
    
    doc.save('Student_Report.pdf');
  };

  // Generate Excel Report
  const exportToExcel = () => {
    const summaryWS = XLSX.utils.json_to_sheet([
      { Metric: 'Applications Submitted', Value: applications },
      { Metric: 'Approved Internships', Value: selected },
      { Metric: 'Tasks Assigned', Value: tasks }
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
      Title: "Student Report",
      Subject: "Student Statistics",
      Author: "Internship Hub",
      CreatedDate: new Date()
    };
    
    XLSX.writeFile(wb, "Student_Report.xlsx");
  };

  useEffect(() => {
    fetchData();
  }, [studentId]);

  // Chart data
  const barChartData = [
    { name: "Applications", value: applications, fill: "#3B82F6" },
    { name: "Approved", value: selected, fill: "#10B981" },
    { name: "Tasks", value: tasks, fill: "#F59E0B" }
  ];

  const statusColors = {
    Pending: "#F59E0B",
    Approved: "#10B981",
    Rejected: "#EF4444"
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
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Student Dashboard</h1>
          <p className="text-gray-600">Your internship journey at a glance</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <DashboardCard
          title="Applications"
          value={applications}
          icon={FaClipboardList}
          trend="up"
          trendValue="5%"
          bgColor="bg-blue-100"
          textColor="text-blue-600"
        />
        <DashboardCard
          title="Approved Internships"
          value={selected}
          icon={FaCheckCircle}
          trend="up"
          trendValue="8%"
          bgColor="bg-green-100"
          textColor="text-green-600"
        />
        <DashboardCard
          title="Tasks Assigned"
          value={tasks}
          icon={FaTasks}
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
              Internship Statistics
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
            <FaUserTie className="mr-2 text-amber-500" />
            Application Status Distribution
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
                  formatter={(value) => [`${value} Applications`, 'Count']}
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
          Internship Quick Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-600 font-medium">Applications Submitted</p>
                <p className="text-2xl font-bold text-blue-800">{applications}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <FaClipboardList className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-green-600 font-medium">Approved Internships</p>
                <p className="text-2xl font-bold text-green-800">{selected}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <FaCheckCircle className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-amber-600 font-medium">Tasks Assigned</p>
                <p className="text-2xl font-bold text-amber-800">{tasks}</p>
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

export default StudentDashboard;