import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Frontend pages
import LandingPage from "./components/LandingPage";
import InternshipPage from "./components/InternshipPage";

import AdminLogin from "./components/AdminLogin";
import StudentLogin from "./components/StudentLogin";
import StudentRegistration from "./components/StudentRegistration";
import SoftHouseRegistration from "./components/SoftHouseRegistration";
import SoftHouseLogin from "./components/SoftHouseLogin";

// Admin pages
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RegisteredUsers from "./pages/admin/RegisteredUser";
import Approved from "./pages/admin/Approved";
import SoftwareHouses from "./pages/admin/SoftwareHouses";
import Applications from "./pages/admin/Applications";
import Registrations from "./pages/admin/Registrations";
import Report from "./pages/admin/Report";
import InternshipLists from "./pages/admin/internship-lists";
// Softwarehouse pages
import SofthouseLayout from "./layouts/SofthouseLayout";
import SoftDashboard from "./pages/softhouse/SoftDashboard";
import SofthInternships from "./pages/softhouse/Internships";
import SofthApplications from "./pages/softhouse/Applications";
import AssignTask from "./pages/softhouse/AssignTask";
import SoftHouseProfile from "./pages/softhouse/SoftHouseProfile";
import ApprovedStudents from "./pages/softhouse/ApprovedStudents";
import TrackTasks from "./pages/softhouse/TrackTasks";

// Student pages
import StudentLayout from "./layouts/StudentLayout";
import StdDashboard from "./pages/student/StdDashboard";
import Internships from "./pages/student/Internships";
import StdAssignTask from "./pages/student/AssignTask";
// import StudentProfile from "./pages/student/StudentProfile";
import StudentProfile from "./pages/student/StdProfile";
import EnrolledInternships from "./pages/student/enrolled-internships";
import AppliedInternships from "./pages/student/applied-internships";
import Logout from "./pages/Logout";


// Achievements Page for Student
import Achievements from "./pages/student/achievement";

import { useAuth } from "./layouts/AuthContext";
import Reset_Password from "./components/Reset_Password";

import TestPDF from "./pages/admin/exports/Pdf";

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  if (user && (!role || user.role === role)) {
    return children;
  }
  return user ? (
    children
  ) : role === "admin" ? (
    <AdminLogin />
  ) : role === "student" ? (
    <StudentLogin />
  ) : (
    <SoftHouseLogin />
  );
}

const email = localStorage.getItem("email");

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
        <Route path="/test" element={<TestPDF />} /> {/* Landing Page */}
        <Route path="/admin/login" element={<AdminLogin />} />{" "}
        {/* Admin Login Page */}
        <Route path="/internships" element={<InternshipPage />} />{" "}
        {/* Internship page route */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/reset-password/:token" element={<Reset_Password />} />
        <Route path="/student/registration" element={<StudentRegistration />} />
        <Route
          path="/softwarehouse/registeration"
          element={<SoftHouseRegistration />}
        />
        <Route path="/softwarehouse/login" element={<SoftHouseLogin />} />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              {" "}
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/registered-users"
          element={
            <PrivateRoute role="admin">
              {" "}
              <AdminLayout>
                <RegisteredUsers />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/approved"
          element={
            <PrivateRoute role="admin">
              {" "}
              <AdminLayout>
                <Approved />
              </AdminLayout>{" "}
            </PrivateRoute>
          }
        />
          <Route
          path="/admin/internship-lists"
          element={
            <PrivateRoute role="admin">
              {" "}
              <AdminLayout>
                <InternshipLists />
              </AdminLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/software-houses"
          element={
            <PrivateRoute role="admin">
              {" "}
              <AdminLayout>
                <SoftwareHouses />{" "}
              </AdminLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/registrations"
          element={
            <PrivateRoute role="admin">
              {" "}
              <AdminLayout>
                <Registrations />{" "}
              </AdminLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <PrivateRoute role="admin">
              {" "}
              <AdminLayout>
                <Applications />
              </AdminLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/report/:id"
          element={
            <PrivateRoute role="admin">
              {" "}
              <AdminLayout>
                <Report />
              </AdminLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/logout"
          element={
            <PrivateRoute role="admin">
              {" "}
              <AdminLayout>
                <Logout />
              </AdminLayout>{" "}
            </PrivateRoute>
          }
        />
        {/* Software house Routes */}
        <Route
          path="/softwarehouse/dashboard"
          element={
            <PrivateRoute role="softwarehouse">
              {" "}
              <SofthouseLayout>
                <SoftDashboard />
              </SofthouseLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/softwarehouse/internships"
          element={
            <PrivateRoute role="softwarehouse">
              {" "}
              <SofthouseLayout>
                <SofthInternships />
              </SofthouseLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/softwarehouse/applications"
          element={
            <PrivateRoute role="softwarehouse">
              {" "}
              <SofthouseLayout>
                <SofthApplications />
              </SofthouseLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/softwarehouse/assign-task"
          element={
            <PrivateRoute role="softwarehouse">
              {" "}
              <SofthouseLayout>
                <AssignTask />
              </SofthouseLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/softwarehouse/approvedstudents"
          element={
            <PrivateRoute role="softwarehouse">
              {" "}
              <SofthouseLayout>
                <ApprovedStudents />
              </SofthouseLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/softwarehouse/tracktasks"
          element={
            <PrivateRoute role="softwarehouse">
              {" "}
              <SofthouseLayout>
                <TrackTasks />
              </SofthouseLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/softwarehouse/profile"
          element={
            <PrivateRoute role="softwarehouse">
              {" "}
              <SofthouseLayout>
                <SoftHouseProfile email={email} />
              </SofthouseLayout>{" "}
            </PrivateRoute>
          }
        />
        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute role="student">
              {" "}
              <StudentLayout>
                <StdDashboard />
              </StudentLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/student/enrolled-internships"
          element={
            <PrivateRoute role="student">
              {" "}
              <StudentLayout>
                <EnrolledInternships />
              </StudentLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/student/applied-internships"
          element={
            <PrivateRoute role="student">
              {" "}
              <StudentLayout>
                <AppliedInternships />
              </StudentLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/student/internships"
          element={
            <PrivateRoute role="student">
              {" "}
              <StudentLayout>
                <Internships />
              </StudentLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/student/assigned-task"
          element={
            <PrivateRoute role="student">
              {" "}
              <StudentLayout>
                <StdAssignTask />
              </StudentLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <PrivateRoute role="student">
              {" "}
              <StudentLayout>
                <StudentProfile />
              </StudentLayout>{" "}
            </PrivateRoute>
          }
        />
        <Route path="/student/profile/:userId" element={<StudentProfile />} />
        {/* Achievements Page for Students */}
        <Route
          path="/student/achievements"
          element={
            <PrivateRoute role="student">
              <StudentLayout>
                <Achievements />
              </StudentLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
