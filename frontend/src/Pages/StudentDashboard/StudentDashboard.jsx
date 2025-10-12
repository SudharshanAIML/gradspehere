import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import "./StudentDashboard.css";
import {
  Book,
  Medal,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  GraduationCap,
  Code2,
  FolderGit2,
  ClipboardList,
  UserCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  TrendingUp,
  Brain,
  ChevronRight as ChessKnight,
  Target,
  ShieldCheck,
} from "lucide-react";
import Profile from "../../Components/StudentDashboard/Profile/Profile";
import AcademicPerformance from "../../Components/StudentDashboard/AcademicPerformance";
import ProjectProfile from "../../Components/StudentDashboard/ProjectProfile";
import LeetCode from "../../Components/coding-platforms/LeetCode";
import CodeChef from "../../Components/coding-platforms/CodeChef";
import GitHub from "../../Components/coding-platforms/Github";
import Codeforces from "../../Components/coding-platforms/Codeforces";
import CodeSkills from "../../Components/StudentDashboard/CodeSkills";
import EditProfile from "../../Components/EditProfile/Editprofile";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import CertificationAndAchievements from "../../Components/StudentDashboard/CertificationsAndAchievements";
import Extras from "../../Components/StudentDashboard/Extras";
import ResumeGenerator from "../../Components/ResumeMaker/ResumeMaker";
import Chatbot from "../../Components/Chatbot/utils/Chatbot";
import { OnDuty } from "../../Components/OnDuty/OnDuty";
import AssignmentList from "../../Components/AssignmentList/AssignmentList";
import CreateAssignment from "../../Components/CreateAssignment/CreateAssignment";
import Assignments from "../../Components/Assignments/Assignments";

const StudentDashboard = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { uid } = useParams();
  const { user, logout, isLogin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedItems, setExpandedItems] = useState({});
  const [showFeatureMenu, setShowFeatureMenu] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      title: "New Assignment",
      message: "Database Design project due next week",
    },
    {
      id: 2,
      title: "Upcoming Contest",
      message: "LeetCode Weekly Contest - Sunday 8:00 AM",
    },
    {
      id: 3,
      title: "Technical News",
      message: "New AI Framework Released - Check it out!",
    },
  ]);

  const features = [
    {
      title: "Aptitude Tests",
      icon: Brain,
      link: "https://www.hackerrank.com/domains/tutorials/10-days-of-statistics",
    },
    {
      title: "Chess Challenges",
      icon: ChessKnight,
      link: "https://lichess.org/training",
    },
    {
      title: "Coding Challenges",
      icon: Code2,
      link: "https://leetcode.com/problemset/all/",
    },
  ];

  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  const sidebarItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "academic", icon: GraduationCap, label: "Academic Performance" },
    {
      id: "codeskills",
      icon: Code2,
      label: "Code Skills",
      subItems: [
        { id: "leetcode", icon: Code2, label: "LeetCode" },
        { id: "codechef", icon: Code2, label: "CodeChef" },
        { id: "hands-on", icon: FolderGit2, label: "Hands-On" },
        { id: "codeforces", icon: Code2, label: "Codeforces" },
      ],
    },
    { id: "projects", icon: FolderGit2, label: "Project Profile" },
    { id: "assignments", icon: ClipboardList, label: "Assignments & Work" },
    { id: "achievements", icon: Medal, label: "Certifications & Achievements" },
    { id: "profile", icon: UserCircle, label: "Profile" },
    { id: "extras", icon: ShieldCheck, label: "Extras" },
    { id: "resume", icon: Book, label: "Resume Maker" },
    { id: "od", icon: Settings, label: "On Duty" },
  ];

  const toggleSubItems = (itemId) => {
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case "academic":
        return <AcademicPerformance />;
      case "codeskills":
        return <CodeSkills currentCodingPlatform={setActiveSection} />;
      case "leetcode":
        return <LeetCode currentCodingPlatform={setActiveSection} />;
      case "codechef":
        return <CodeChef currentCodingPlatform={setActiveSection} />;
      case "od" :
        return <OnDuty/>
      case "hands-on":
        return <GitHub currentCodingPlatform={setActiveSection} />;
      case "codeforces":
        return <Codeforces currentCodingPlatform={setActiveSection} />;
      case "projects":
        return <ProjectProfile />;
      case "profile":
        return <Profile currentSection={setActiveSection} uid={uid} />;
      case "edit-profile":
        return <EditProfile uid={uid} setActiveSection={setActiveSection} />;
      case "achievements":
        return <CertificationAndAchievements uid={uid} />;
      case "extras":
        return <Extras uid={uid} />;
      case "resume":
        return <ResumeGenerator />;
      case "assignments" :
        return <Assignments/>;

      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-950 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Academic Progress</h3>
                  <TrendingUp className="text-white/80" />
                </div>
                <p className="text-3xl font-bold">85%</p>
                <p className="text-sm text-white/80">Overall Performance</p>
              </div>

              <div className="bg-blue-950 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Coding Stats</h3>
                  <Code2 className="text-white/80" />
                </div>
                <p className="text-3xl font-bold">120</p>
                <p className="text-sm text-white/80">Problems Solved</p>
              </div>

              <div className="bg-blue-950 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Active Projects</h3>
                  <FolderGit2 className="text-white/80" />
                </div>
                <p className="text-3xl font-bold">3</p>
                <p className="text-sm text-white/80">Ongoing Projects</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gradient-to-br rounded-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {activeSection}
            </h2>
            <p className="text-white/80">
              Content for {activeSection} will be implemented soon.
            </p>
          </div>
        );
    }
  };

  useEffect(() => {
    if (!uid) return;
    axios
      .get(`http://localhost:5000/api/profile/${uid}`)
      .then((response) => {
        userCtx.setUser((prevUser) => ({ ...prevUser, ...response.data }));
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-blue-200">
      {/* HOME PAGE COLOR */}
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        className="fixed left-0 top-0 h-full w-64 bg-blue-900 text-white p-4 z-20 sidebar-container overflow-y-scroll"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <GraduationCap size={38} color="#3B82F6" />
            <span className="text-2xl font-bold">Gradsphere</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveSection(item.id);
                  if (item.subItems) {
                    toggleSubItems(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition-all ${
                  activeSection === item.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-blue-800/50 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </div>
                {item.subItems &&
                  (expandedItems[item.id] ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  ))}
              </button>
              {item.subItems && expandedItems[item.id] && (
                <div className="ml-6 mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => setActiveSection(subItem.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                        activeSection === subItem.id
                          ? "bg-blue-500 text-white"
                          : "text-gray-300 hover:bg-blue-700/50 hover:text-white"
                      }`}
                    >
                      <subItem.icon size={18} />
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-blue-800/50 hover:text-white transition-colors mt-8"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Top Bar */}
        <div className="bg-blue-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10"
                >
                  <Menu size={24} />
                </button>
                <h1 className="ml-4 text-xl font-semibold text-white capitalize">
                  {activeSection}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setShowFeatureMenu(!showFeatureMenu)}
                    className="p-2 rounded-full bg-blue-500 text-white hover:from-blue-600 hover:to-pink-600 transition-all"
                  >
                    <Target size={24} />
                  </button>

                  {showFeatureMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      {features.map((feature) => (
                        <a
                          key={feature.title}
                          href={feature.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <feature.icon size={18} />
                          <span>{feature.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Bell className="h-6 w-6 text-white/80 cursor-pointer hover:text-white" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                    3
                  </span>
                </div>
                <span className="text-sm font-medium text-white">
                  Welcome, {user?.name || "Student"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div>
              {/* Main Content Area */}
              <div className="lg:col-span-2">{renderDashboardContent()}</div>
              {/* Notifications Sidebar */}
              <div className="bg-blue-950 rounded-lg shadow-lg p-6 mt-7">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Notifications
                  </h3>
                  <Bell className="text-white/80" size={20} />
                </div>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 bg-white/10 rounded-lg text-white"
                    >
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-white/80 mt-1">
                        {notification.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Chatbot />
    </div>
  );
};

export default StudentDashboard;
