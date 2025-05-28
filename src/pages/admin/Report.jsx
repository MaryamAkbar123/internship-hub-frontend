

// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import { Table, Button, Spinner, Alert, Card } from "react-bootstrap";
// import { FaFilePdf, FaFileExcel, FaTrophy, FaStar } from "react-icons/fa";
// import axios from "axios";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const Report = () => {
//     const { id } = useParams();
//     const [reportData, setReportData] = useState(null);
//     const [achievements, setAchievements] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchData = async () => {
//         try {
//             const [reportResponse, achievementsResponse] = await Promise.all([
//                 axios.get(`http://localhost:5000/api/applications/report/${id}`),
//                 axios.get(`http://localhost:5000/api/remarks/student/${id}`)
//             ]);
//             setReportData(reportResponse.data);
//             setAchievements(Array.isArray(achievementsResponse.data) ? achievementsResponse.data : []);
//         } catch (error) {
//             setError(error.response?.data?.error || "Failed to fetch report data.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [id]);

//     const handlePDFDownload = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(18);
//         doc.setTextColor(40, 53, 147);
//         doc.text("Application Report", 14, 20);

//         // Applications Table
//         autoTable(doc, {
//             startY: 30,
//             head: [["Total Applications", "Accepted", "Rejected"]],
//             body: [
//                 [
//                     reportData.totalApplications,
//                     reportData.acceptedApplications,
//                     reportData.rejectedApplications,
//                 ],
//             ],
//             styles: { fontSize: 10, cellPadding: 3 },
//             headStyles: {
//                 fillColor: [41, 128, 185],
//                 textColor: 255,
//                 fontStyle: "bold",
//             },
//             alternateRowStyles: { fillColor: [240, 240, 240] },
//         });

//         // Achievements Section
//         if (achievements.length > 0) {
//             doc.addPage();
//             doc.setFontSize(18);
//             doc.setTextColor(40, 53, 147);
//             doc.text("Achievements & Evaluations", 14, 20);

//             achievements.forEach((achievement, index) => {
//                 const startY = 30;

//                 // Evaluation Header
//                 doc.setFontSize(14);
//                 doc.text(`Evaluation #${index + 1}`, 14, startY);
//                 if (achievement.createdAt) {
//                     doc.setFontSize(10);
//                     doc.text(`Date: ${new Date(achievement.createdAt).toLocaleDateString()}`, 160, startY);
//                 }

//                 // Remarks
//                 doc.setFontSize(12);
//                 doc.text("Remarks:", 14, startY + 10);
//                 const remarks = achievement.remarks ? doc.splitTextToSize(achievement.remarks, 180) : ["No remarks provided"];
//                 doc.text(remarks, 20, startY + 20);

//                 // Evaluation Table
//                 autoTable(doc, {
//                     startY: startY + 30 + remarks.length * 5,
//                     head: [["Category", "Evaluation"]],
//                     body: [
//                         ["Technical Skills", achievement.evaluation?.technicalSkills || "N/A"],
//                         ["Task Completion", achievement.evaluation?.taskCompletion || "N/A"],
//                         ["Learning Ability", achievement.evaluation?.learningAbility || "N/A"],
//                         ["Communication Skills", achievement.evaluation?.communicationSkills || "N/A"],
//                         ["Team Collaboration", achievement.evaluation?.teamCollaboration || "N/A"],
//                         ["Punctuality & Attendance", achievement.evaluation?.punctualityAttendance || "N/A"],
//                         ["Professionalism", achievement.evaluation?.professionalism || "N/A"],
//                         ["Creativity/Initiative", achievement.evaluation?.creativityInitiative || "N/A"],
//                         ["Behavior & Attitude", achievement.evaluation?.behaviorAttitude || "N/A"],
//                     ],
//                     styles: { fontSize: 10, cellPadding: 3 },
//                     headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
//                     columnStyles: {
//                         0: { cellWidth: 80, fontStyle: "bold" },
//                         1: { cellWidth: "auto" },
//                     },
//                 });

//                 if (index < achievements.length - 1) {
//                     doc.addPage();
//                 }
//             });
//         }

//         doc.save(`report-${id}.pdf`);
//     };

//     const handleExcelDownload = () => {
//         const applicationData = [
//             {
//                 "Total Applications": reportData.totalApplications,
//                 Accepted: reportData.acceptedApplications,
//                 Rejected: reportData.rejectedApplications,
//             },
//         ];

//         const achievementsData = achievements.map((ach, index) => ({
//             "Evaluation #": index + 1,
//             Remarks: ach.remarks || "N/A",
//             "Technical Skills": ach.evaluation?.technicalSkills || "N/A",
//             "Task Completion": ach.evaluation?.taskCompletion || "N/A",
//             "Learning Ability": ach.evaluation?.learningAbility || "N/A",
//             "Communication Skills": ach.evaluation?.communicationSkills || "N/A",
//             "Team Collaboration": ach.evaluation?.teamCollaboration || "N/A",
//             "Punctuality & Attendance": ach.evaluation?.punctualityAttendance || "N/A",
//             Professionalism: ach.evaluation?.professionalism || "N/A",
//             "Creativity/Initiative": ach.evaluation?.creativityInitiative || "N/A",
//             "Behavior & Attitude": ach.evaluation?.behaviorAttitude || "N/A",
//             Date: ach.createdAt ? new Date(ach.createdAt).toLocaleDateString() : "N/A",
//         }));

//         const workbook = XLSX.utils.book_new();
//         const applicationWorksheet = XLSX.utils.json_to_sheet(applicationData);
//         XLSX.utils.book_append_sheet(workbook, applicationWorksheet, "Applications");

//         if (achievementsData.length > 0) {
//             const achievementsWorksheet = XLSX.utils.json_to_sheet(achievementsData);
//             XLSX.utils.book_append_sheet(workbook, achievementsWorksheet, "Achievements");
//         }

//         const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//         const file = new Blob([excelBuffer], { type: "application/octet-stream" });
//         saveAs(file, `report-${id}.xlsx`);
//     };

//     if (loading) {
//         return (
//             <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
//                 <Spinner animation="border" variant="primary" />
//                 <span className="ms-2">Loading report...</span>
//             </section>
//         );
//     }

//     if (error) {
//         return (
//             <section className="p-4">
//                 <Alert variant="danger">
//                     <h4>Error</h4>
//                     <p>{error}</p>
//                     <Button variant="primary" onClick={fetchData}>Retry</Button>
//                 </Alert>
//             </section>
//         );
//     }

//     return (
//         <section className="p-4">
//             <Card className="shadow-sm border-0">
//                 <Card.Body>
//                     <div className="d-flex justify-content-between align-items-center mb-4">
//                         <h2 className="fw-bold text-dark">Application Report</h2>
//                         <div>
//                             <Button
//                                 variant="outline-danger"
//                                 size="sm"
//                                 onClick={handlePDFDownload}
//                                 className="me-2"
//                                 disabled={!reportData}
//                                 aria-label="Download PDF Report"
//                             >
//                                 <FaFilePdf className="me-1" /> PDF
//                             </Button>
//                             <Button
//                                 variant="outline-success"
//                                 size="sm"
//                                 onClick={handleExcelDownload}
//                                 disabled={!reportData}
//                                 aria-label="Download Excel Report"
//                             >
//                                 <FaFileExcel className="me-1" /> Excel
//                             </Button>
//                         </div>
//                     </div>

//                     <div className="mb-8">
//                         <h3 className="text-xl font-semibold text-gray-800 mb-4">Application Summary</h3>
//                         <div className="overflow-x-auto">
//                             <Table striped bordered hover responsive className="table-sm">
//                                 <thead className="table-primary">
//                                     <tr>
//                                         <th>Total Applications</th>
//                                         <th>Accepted</th>
//                                         <th>Rejected</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {reportData ? (
//                                         <tr>
//                                             <td>{reportData.totalApplications}</td>
//                                             <td>{reportData.acceptedApplications}</td>
//                                             <td>{reportData.rejectedApplications}</td>
//                                         </tr>
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="3" className="text-center">
//                                                 No data available
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </Table>
//                         </div>
//                     </div>

//                     <div>
//                         <div className="flex justify-between items-center mb-6">
//                             <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//                                 <FaTrophy className="text-yellow-500 mr-2" />
//                                 Achievements & Evaluations
//                             </h3>
//                             <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
//                                 {achievements.length} Evaluation{achievements.length !== 1 ? 's' : ''}
//                             </span>
//                         </div>
//                         {achievements.length > 0 ? (
//                             achievements.map((achievement, index) => (
//                                 <div key={index} className="mb-8 last:mb-0 border-b border-gray-200 pb-6 last:border-b-0">
//                                     <div className="flex justify-between items-start mb-2">
//                                         <h4 className="text-lg font-semibold text-gray-800">
//                                             Evaluation #{index + 1}
//                                         </h4>
//                                         {achievement.createdAt && (
//                                             <span className="text-sm text-gray-500">
//                                                 {new Date(achievement.createdAt).toLocaleDateString()}
//                                             </span>
//                                         )}
//                                     </div>
//                                     <div className="bg-blue-50 p-4 rounded-lg mb-4">
//                                         <h5 className="text-md font-semibold text-blue-800 mb-2">Remarks</h5>
//                                         <p className="text-gray-700">
//                                             {achievement.remarks || 'No remarks provided'}
//                                         </p>
//                                     </div>
//                                     <h5 className="text-md font-semibold text-gray-800 mb-3">Evaluation Details</h5>
//                                     <div className="overflow-x-auto">
//                                         <Table striped bordered hover responsive className="table-sm">
//                                             <thead className="table-primary">
//                                                 <tr>
//                                                     <th>Category</th>
//                                                     <th>Evaluation</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 <tr>
//                                                     <td className="font-semibold">Technical Skills</td>
//                                                     <td>{achievement.evaluation?.technicalSkills || 'N/A'}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="font-semibold">Task Completion</td>
//                                                     <td>{achievement.evaluation?.taskCompletion || 'N/A'}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="font-semibold">Learning Ability</td>
//                                                     <td>{achievement.evaluation?.learningAbility || 'N/A'}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="font-semibold">Communication Skills</td>
//                                                     <td>{achievement.evaluation?.communicationSkills || 'N/A'}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="font-semibold">Team Collaboration</td>
//                                                     <td>{achievement.evaluation?.teamCollaboration || 'N/A'}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="font-semibold">Punctuality & Attendance</td>
//                                                     <td>{achievement.evaluation?.punctualityAttendance || 'N/A'}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="font-semibold">Professionalism</td>
//                                                     <td>{achievement.evaluation?.professionalism || 'N/A'}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="font-semibold">Creativity/Initiative</td>
//                                                     <td>{achievement.evaluation?.creativityInitiative || 'N/A'}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="font-semibold">Behavior & Attitude</td>
//                                                     <td>{achievement.evaluation?.behaviorAttitude || 'N/A'}</td>
//                                                 </tr>
//                                             </tbody>
//                                         </Table>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
//                                 <FaStar className="text-gray-300 text-4xl mx-auto mb-3" />
//                                 <h4 className="text-lg font-semibold text-gray-700">No Achievements Recorded</h4>
//                                 <p className="text-gray-500">This student hasn't received any evaluations yet.</p>
//                             </div>
//                         )}
//                     </div>
//                 </Card.Body>
//             </Card>
//         </section>
//     );
// };

// export default Report;

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Table, Button, Spinner, Alert, Card } from "react-bootstrap";
import { FaFilePdf, FaFileExcel, FaTrophy, FaStar, FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Report = () => {
    const { id } = useParams();
    const [reportData, setReportData] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const [reportResponse, achievementsResponse, userResponse, profileResponse, studentProfileResponse] = await Promise.all([
                axios.get(`http://localhost:5000/api/applications/report/${id}`),
                axios.get(`http://localhost:5000/api/remarks/student/${id}`),
                axios.get(`http://localhost:5000/api/users/${id}`),
                axios.get(`http://localhost:5000/api/profiles/${id}`),
                axios.get(`http://localhost:5000/api/profiles/student/${id}`)
            ]);
            setReportData(reportResponse.data);
            setAchievements(Array.isArray(achievementsResponse.data) ? achievementsResponse.data : []);
            setProfileData({
                ...userResponse.data,
                ...profileResponse.data,
                ...studentProfileResponse.data
            });
        } catch (error) {
            setError(error.response?.data?.error || "Failed to fetch report or profile data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handlePDFDownload = () => {
        const doc = new jsPDF();
        doc.setProperties({
            title: `${profileData?.name || profileData?.fullName || 'Student'}'s Report`,
            subject: 'Student Internship and Evaluation Report',
            author: 'CUI Internship Hub',
            keywords: 'student, report, internship, evaluation',
            creator: 'CUI Internship Hub System'
        });

        // Title Page
        doc.setFontSize(22);
        doc.setTextColor(40, 53, 147);
        doc.text('Student Internship Report', 105, 30, { align: 'center' });
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(`Name: ${profileData?.name || profileData?.fullName || 'N/A'}`, 105, 50, { align: 'center' });
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 60, { align: 'center' });

        // Profile Image
        if (profileData?.profileImage) {
            try {
                const img = new Image();
                img.src = `http://localhost:5000/${profileData.profileImage}`;
                doc.addImage(img, 'JPEG', 80, 70, 50, 50);
            } catch (e) {
                console.log('Error adding profile image to PDF:', e);
            }
        }

        // Student Profile
        doc.addPage();
        doc.setFontSize(18);
        doc.setTextColor(40, 53, 147);
        doc.text('Student Profile', 14, 20);
        autoTable(doc, {
            startY: 30,
            head: [['Field', 'Value']],
            body: [
                ['Name', profileData?.name || profileData?.fullName || 'N/A'],
                ['Email', profileData?.email || 'N/A'],
                ['Phone', profileData?.phone || 'N/A'],
                ['LinkedIn', profileData?.linkedin || 'N/A'],
                ['Program', profileData?.program || 'N/A'],
                ['University', profileData?.university || 'N/A'],
                ['Skills', profileData?.skill || 'N/A'],
                ['Status', profileData?.status === 1 ? 'Active' : 'Inactive']
            ],
            styles: { fontSize: 10, cellPadding: 3, valign: 'middle' },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            columnStyles: { 0: { fontStyle: 'bold' } }
        });

        // Applications Summary
        doc.addPage();
        doc.setFontSize(18);
        doc.setTextColor(40, 53, 147);
        doc.text('Application Summary', 14, 20);
        autoTable(doc, {
            startY: 30,
            head: [['Total Applications', 'Accepted', 'Rejected']],
            body: [[
                reportData?.totalApplications || 0,
                reportData?.acceptedApplications || 0,
                reportData?.rejectedApplications || 0
            ]],
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [240, 240, 240] }
        });

        // Internships
        if (profileData?.internships?.length > 0) {
            doc.addPage();
            doc.setFontSize(18);
            doc.setTextColor(40, 53, 147);
            doc.text('Approved Internships', 14, 20);
            profileData.internships.forEach((internship, index) => {
                const startY = index === 0 ? 30 : doc.lastAutoTable.finalY + 20;
                doc.setFontSize(14);
                doc.text(`Internship #${index + 1}: ${internship.title || 'N/A'}`, 14, startY);
                autoTable(doc, {
                    startY: startY + 10,
                    head: [['Detail', 'Information']],
                    body: [
                        ['Company', internship.company?.name || 'N/A'],
                        ['Description', internship.description || 'N/A'],
                        ['Duration', internship.duration || 'N/A'],
                        ['Type', internship.type || 'N/A'],
                        ['Deadline', internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'N/A'],
                        ['Application Date', internship.applicationDate ? new Date(internship.applicationDate).toLocaleDateString() : 'N/A'],
                        ['Status', 'Approved']
                    ],
                    styles: { fontSize: 10, cellPadding: 3 },
                    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
                    columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 'auto' } },
                    didDrawCell: (data) => {
                        if (data.section === 'body' && data.column.index === 1 && data.column.raw === 'Description') {
                            const text = doc.splitTextToSize(data.cell.raw, 140);
                            data.cell.text = text;
                            data.row.height = text.length * 5;
                        }
                    }
                });
            });
        }

        // Achievements
        if (achievements.length > 0) {
            doc.addPage();
            doc.setFontSize(18);
            doc.setTextColor(40, 53, 147);
            doc.text('Achievements & Evaluations', 14, 20);
            achievements.forEach((achievement, index) => {
                const startY = index === 0 ? 30 : doc.lastAutoTable.finalY + 20;
                doc.setFontSize(14);
                doc.text(`Evaluation #${index + 1}`, 14, startY);
                if (achievement.createdAt) {
                    doc.setFontSize(10);
                    doc.text(`Date: ${new Date(achievement.createdAt).toLocaleDateString()}`, 160, startY);
                }
                doc.setFontSize(12);
                doc.text('Remarks:', 14, startY + 10);
                const remarks = achievement.remarks ? doc.splitTextToSize(achievement.remarks, 180) : ['No remarks provided'];
                doc.text(remarks, 20, startY + 20);
                autoTable(doc, {
                    startY: startY + 30 + remarks.length * 5,
                    head: [['Category', 'Evaluation']],
                    body: [
                        ['Technical Skills', achievement.evaluation?.technicalSkills || 'N/A'],
                        ['Task Completion', achievement.evaluation?.taskCompletion || 'N/A'],
                        ['Learning Ability', achievement.evaluation?.learningAbility || 'N/A'],
                        ['Communication Skills', achievement.evaluation?.communicationSkills || 'N/A'],
                        ['Team Collaboration', achievement.evaluation?.teamCollaboration || 'N/A'],
                        ['Punctuality & Attendance', achievement.evaluation?.punctualityAttendance || 'N/A'],
                        ['Professionalism', achievement.evaluation?.professionalism || 'N/A'],
                        ['Creativity/Initiative', achievement.evaluation?.creativityInitiative || 'N/A'],
                        ['Behavior & Attitude', achievement.evaluation?.behaviorAttitude || 'N/A']
                    ],
                    styles: { fontSize: 10, cellPadding: 3 },
                    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
                    columnStyles: { 0: { cellWidth: 80, fontStyle: 'bold' }, 1: { cellWidth: 'auto' } }
                });
            });
        }

        doc.save(`report-${profileData?.name || profileData?.fullName || id}.pdf`);
    };

    const handleExcelDownload = () => {
        const workbook = XLSX.utils.book_new();

        // Student Profile
        const profileDataSheet = [{
            'Name': profileData?.name || profileData?.fullName || 'N/A',
            'Email': profileData?.email || 'N/A',
            'Phone': profileData?.phone || 'N/A',
            'LinkedIn': profileData?.linkedin || 'N/A',
            'Program': profileData?.program || 'N/A',
            'University': profileData?.university || 'N/A',
            'Skills': profileData?.skill || 'N/A',
            'Status': profileData?.status === 1 ? 'Active' : 'Inactive'
        }];
        const profileWorksheet = XLSX.utils.json_to_sheet(profileDataSheet);
        XLSX.utils.book_append_sheet(workbook, profileWorksheet, 'Student Profile');

        // Application Summary
        const applicationData = [{
            'Total Applications': reportData?.totalApplications || 0,
            'Accepted': reportData?.acceptedApplications || 0,
            'Rejected': reportData?.rejectedApplications || 0
        }];
        const applicationWorksheet = XLSX.utils.json_to_sheet(applicationData);
        XLSX.utils.book_append_sheet(workbook, applicationWorksheet, 'Applications');

        // Internships
        if (profileData?.internships?.length > 0) {
            const internshipData = profileData.internships.map((internship, index) => ({
                'Internship #': index + 1,
                'Title': internship.title || 'N/A',
                'Company': internship.company?.name || 'N/A',
                'Description': internship.description || 'N/A',
                'Duration': internship.duration || 'N/A',
                'Type': internship.type || 'N/A',
                'Deadline': internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'N/A',
                'Application Date': internship.applicationDate ? new Date(internship.applicationDate).toLocaleDateString() : 'N/A',
                'Status': 'Approved'
            }));
            const internshipWorksheet = XLSX.utils.json_to_sheet(internshipData);
            XLSX.utils.book_append_sheet(workbook, internshipWorksheet, 'Internships');
        }

        // Achievements
        if (achievements.length > 0) {
            const achievementsData = achievements.map((ach, index) => ({
                'Evaluation #': index + 1,
                'Remarks': ach.remarks || 'N/A',
                'Technical Skills': ach.evaluation?.technicalSkills || 'N/A',
                'Task Completion': ach.evaluation?.taskCompletion || 'N/A',
                'Learning Ability': ach.evaluation?.learningAbility || 'N/A',
                'Communication Skills': ach.evaluation?.communicationSkills || 'N/A',
                'Team Collaboration': ach.evaluation?.teamCollaboration || 'N/A',
                'Punctuality & Attendance': ach.evaluation?.punctualityAttendance || 'N/A',
                'Professionalism': ach.evaluation?.professionalism || 'N/A',
                'Creativity/Initiative': ach.evaluation?.creativityInitiative || 'N/A',
                'Behavior & Attitude': ach.evaluation?.behaviorAttitude || 'N/A',
                'Date': ach.createdAt ? new Date(ach.createdAt).toLocaleDateString() : 'N/A'
            }));
            const achievementsWorksheet = XLSX.utils.json_to_sheet(achievementsData);
            XLSX.utils.book_append_sheet(workbook, achievementsWorksheet, 'Achievements');
        }

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, `report-${profileData?.name || profileData?.fullName || id}.xlsx`);
    };

    if (loading) {
        return (
            <section className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading report...</span>
            </section>
        );
    }

    if (error) {
        return (
            <section className="p-4">
                <Alert variant="danger">
                    <h4>Error</h4>
                    <p>{error}</p>
                    <Button variant="primary" onClick={fetchData}>Retry</Button>
                </Alert>
            </section>
        );
    }

    return (
        <section className="p-4">
            <Card className="shadow-md border-0">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold text-dark">Student Internship Report</h2>
                        <div>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handlePDFDownload}
                                className="me-2"
                                disabled={!reportData || !profileData}
                                aria-label="Download PDF Report"
                            >
                                <FaFilePdf className="me-1" /> PDF
                            </Button>
                            <Button
                                variant="outline-success"
                                size="sm"
                                onClick={handleExcelDownload}
                                disabled={!reportData || !profileData}
                                aria-label="Download Excel Report"
                            >
                                <FaFileExcel className="me-1" /> Excel
                            </Button>
                        </div>
                    </div>

                    {/* Student Profile Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <FaStar className="text-yellow-500 mr-2" />
                            Student Profile
                        </h3>
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <img
                                        src={profileData?.profileImage ? 
                                            `http://localhost:5000/${profileData.profileImage}` : 
                                            'https://placehold.co/150x150'}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full border-2 border-blue-200 object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-lg font-bold text-gray-800 mb-3">
                                        {profileData?.name || profileData?.fullName || 'N/A'}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">Email</p>
                                            <p className="text-gray-800 flex items-center">
                                                <FaEnvelope className="text-blue-500 mr-2" />
                                                {profileData?.email || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">Phone</p>
                                            <p className="text-gray-800 flex items-center">
                                                <FaPhone className="text-blue-500 mr-2" />
                                                {profileData?.phone || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">LinkedIn</p>
                                            <p className="text-gray-800 flex items-center">
                                                <FaLinkedin className="text-blue-500 mr-2" />
                                                {profileData?.linkedin ? (
                                                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                        LinkedIn Profile
                                                    </a>
                                                ) : 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">Program</p>
                                            <p className="text-gray-800">{profileData?.program || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">University</p>
                                            <p className="text-gray-800">{profileData?.university || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">Skills</p>
                                            {profileData?.skill ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {profileData.skill.split(',').map((skill, idx) => (
                                                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                            {skill.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-800">No skills listed</p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">Status</p>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${profileData?.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {profileData?.status === 1 ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Application Summary Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Application Summary</h3>
                        <div className="overflow-x-auto">
                            <Table striped bordered hover responsive className="table-sm">
                                <thead className="table-primary">
                                    <tr>
                                        <th>Total Applications</th>
                                        <th>Accepted</th>
                                        <th>Rejected</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData ? (
                                        <tr>
                                            <td>{reportData.totalApplications}</td>
                                            <td>{reportData.acceptedApplications}</td>
                                            <td>{reportData.rejectedApplications}</td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    {/* Internships Section */}
                    {profileData?.internships?.length > 0 && (
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                    <FaBriefcase className="text-blue-500 mr-2" />
                                    Approved Internships
                                </h3>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {profileData.internships.length} {profileData.internships.length === 1 ? 'Internship' : 'Internships'}
                                </span>
                            </div>
                            <div className="space-y-4">
                                {profileData.internships.map((internship, index) => (
                                    <div key={internship._id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div className="mb-4 md:mb-0">
                                                <h4 className="text-lg font-bold text-gray-800 flex items-center">
                                                    <FaBriefcase className="text-blue-500 mr-2" />
                                                    {internship.title || 'Internship Position'}
                                                </h4>
                                                <p className="text-gray-600 mt-1 flex items-center">
                                                    <FaBuilding className="text-gray-400 mr-2" />
                                                    {internship.company?.name || 'Unknown Company'}
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
                                        <div className="mt-4">
                                            <p className="text-gray-700 mb-3">
                                                {internship.description || 'No description available'}
                                            </p>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <div className="text-sm text-gray-500">
                                                {internship.applicationDate && (
                                                    <>Applied on: {new Date(internship.applicationDate).toLocaleDateString()}</>
                                                )}
                                            </div>
                                            <span className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <FaCheck className="mr-1" /> Approved
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Achievements Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                <FaTrophy className="text-yellow-500 mr-2" />
                                Achievements & Evaluations
                            </h3>
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                {achievements.length} Evaluation{achievements.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                        {achievements.length > 0 ? (
                            achievements.map((achievement, index) => (
                                <div key={index} className="mb-8 last:mb-0 border-b border-gray-200 pb-6 last:border-b-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            Evaluation #{index + 1}
                                        </h4>
                                        {achievement.createdAt && (
                                            <span className="text-sm text-gray-500">
                                                {new Date(achievement.createdAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                        <h5 className="text-md font-semibold text-blue-800 mb-2">Remarks</h5>
                                        <p className="text-gray-700">
                                            {achievement.remarks || 'No remarks provided'}
                                        </p>
                                    </div>
                                    <h5 className="text-md font-semibold text-gray-800 mb-3">Evaluation Details</h5>
                                    <div className="overflow-x-auto">
                                        <Table striped bordered hover responsive className="table-sm">
                                            <thead className="table-primary">
                                                <tr>
                                                    <th>Category</th>
                                                    <th>Evaluation</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="font-semibold">Technical Skills</td>
                                                    <td>{achievement.evaluation?.technicalSkills || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Task Completion</td>
                                                    <td>{achievement.evaluation?.taskCompletion || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Learning Ability</td>
                                                    <td>{achievement.evaluation?.learningAbility || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Communication Skills</td>
                                                    <td>{achievement.evaluation?.communicationSkills || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Team Collaboration</td>
                                                    <td>{achievement.evaluation?.teamCollaboration || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Punctuality & Attendance</td>
                                                    <td>{achievement.evaluation?.punctualityAttendance || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Professionalism</td>
                                                    <td>{achievement.evaluation?.professionalism || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Creativity/Initiative</td>
                                                    <td>{achievement.evaluation?.creativityInitiative || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-semibold">Behavior & Attitude</td>
                                                    <td>{achievement.evaluation?.behaviorAttitude || 'N/A'}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
                                <FaStar className="text-gray-300 text-4xl mx-auto mb-3" />
                                <h4 className="text-lg font-semibold text-gray-700">No Achievements Recorded</h4>
                                <p className="text-gray-500">This student hasn't received any evaluations yet.</p>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </section>
    );
};

export default Report;