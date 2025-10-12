import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import ProfileTeacher from "../../Components/TeacherDashboard/ProfileTeacher";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Code2,
  FolderGit2,
  ClipboardList,
  Calendar,
  UserCircle,
  Settings,
  LogOut,
  Menu,
  X,
  PlusCircle,
  Edit3,
  BarChart2,
  Trophy,
  Brain,
  AlertCircle,
} from "lucide-react";
import StudentWeaknesses from "../../Components/TeacherDashboard/StudentWeaknesses";
import Students from "../../Components/TeacherDashboard/Students";
import Dashboard from "../../Components/TeacherDashboard/Dashboard";
import CodeSkills from "../../Components/TeacherDashboard/CodeSkills";
// import Profile from "../../Components/TeacherDashboard/Profile";
import Editprofile from "../../Components/TeacherDashboard/Editprofile";
import { AttendanceTable } from "../../Components/Attendance/Attendance";
import AcademicPerformance from "../../Components/TeacherDashboard/SWOT Analysis/AcademicPerformance";
import AssignmentList from "../../Components/AssignmentList/AssignmentList";
import CreateAssignment from "../../Components/CreateAssignment/CreateAssignment";

const TeacherDashboard = () => {
  const userCtx = useContext(UserContext);
  const { uid } = useParams();
  const navigate = useNavigate();
  const { user, logout, isLogin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate("/login");
  //   }
  // }, [isLogin, navigate]);

  useEffect(() => {
    if (!uid) return;
    axios
      .get(`http://localhost:5000/api/profile/${uid}`)
      .then((response) => {
        userCtx.setUser((prevUser) => ({ ...prevUser, ...response.data }));
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);
  const handleSignOut = async () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    await logout();
    navigate("/login");
    setIsLogoutModalOpen(false);
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const LogoutConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-lg p-6 w-96">
          <h2 className="text-xl font-semibold text-white mb-4">
            Confirm Logout
          </h2>
          <p className="text-gray-400 mb-6">
            Are you sure you want to sign out?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  };

  const sidebarItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "students", icon: Users, label: "Students" },
    { id: "weaknesses", icon: AlertCircle, label: "SWOT Analysis" },
    { id: "academic", icon: GraduationCap, label: "Academic Performance" },
    { id: "codeskills", icon: Code2, label: "Code Skills" },
    { id: "assignments", icon: ClipboardList, label: "Assignments & Work" },
    { id: "attendance", icon: Calendar, label: "Attendance" },
    { id: "profile", icon: UserCircle, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const renderDashboardContent = () => {
    switch (activeSection) {
      case "weaknesses":
        return (
          <StudentWeaknesses/>
        );
      case "assignments" :
        return <CreateAssignment/>;
      case "students":
        return <Students />;

      case "profile":
        return <ProfileTeacher uid={uid} currentSection={setActiveSection} />;

      case "edit-profile":
        return <Editprofile uid={uid} setActiveSection={setActiveSection} />;

      case "dashboard":
        return <Dashboard />;
      case "codeskills":
        return <CodeSkills />;

      case "academic":
        return <AcademicPerformance />;

      case "attendance":
        return <AttendanceTable />;

      default:
        return (
          <>
            <p></p>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-700">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 z-20 border-r border-gray-800"
      >
        <div className="flex items-center justify-between mb-8">
          <motion.div className="flex items-center gap-2">
            <GraduationCap size={32} className="text-purple-400" />
            <span className="text-xl font-bold">Gradsphere</span>
          </motion.div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors mt-8"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Top Bar */}
        <div className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                >
                  <Menu size={24} />
                </button>
                <h1 className="ml-4 text-xl font-semibold text-white capitalize">
                  {activeSection}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  Welcome, {user?.name || "User"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">{renderDashboardContent()}</div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <LogoutConfirmationModal
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
