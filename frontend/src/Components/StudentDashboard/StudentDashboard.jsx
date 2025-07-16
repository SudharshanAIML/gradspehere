import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, GraduationCap, Code2, FolderGit2, ClipboardList, UserCircle, Settings, LogOut, Menu, X, Bell, TrendingUp, Brain, ChevronRight as ChessKnight, Target } from 'lucide-react';
import Chatbot from '../Chatbot/Chatbot';
import Profile from '../Profile/Profile';
const StudentDashboard = ({name}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showFeatureMenu, setShowFeatureMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New Assignment', message: 'Database Design project due next week' },
    { id: 2, title: 'Upcoming Contest', message: 'LeetCode Weekly Contest - Sunday 8:00 AM' },
    { id: 3, title: 'Technical News', message: 'New AI Framework Released - Check it out!' }
  ]);

  const features = [
    {
      title: 'Aptitude Tests',
      icon: Brain,
      link: 'https://www.hackerrank.com/domains/tutorials/10-days-of-statistics'
    },
    {
      title: 'Chess Challenges',
      icon: ChessKnight,
      link: 'https://lichess.org/training'
    },
    {
      title: 'Coding Challenges',
      icon: Code2,
      link: 'https://leetcode.com/problemset/all/'
    }
  ];

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'academic', icon: GraduationCap, label: 'Academic Performance' },
    { id: 'codeskills', icon: Code2, label: 'Code Skills' },
    { id: 'projects', icon: FolderGit2, label: 'Project Profile' },
    { id: 'assignments', icon: ClipboardList, label: 'Assignments & Work' },
    { id: 'profile', icon: UserCircle, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-pink-500 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Academic Progress</h3>
                  <TrendingUp className="text-white/80" />
                </div>
                <p className="text-3xl font-bold">85%</p>
                <p className="text-sm text-white/80">Overall Performance</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-pink-600 p-6 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Coding Stats</h3>
                  <Code2 className="text-white/80" />
                </div>
                <p className="text-3xl font-bold">120</p>
                <p className="text-sm text-white/80">Problems Solved</p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-pink-500 p-6 rounded-lg shadow-lg text-white">
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
        case 'profile': 
        return(
            <Profile/>
        )
      default:
        return (
          <div className="bg-gradient-to-br from-blue-600 to-pink-500 rounded-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-4 capitalize">{activeSection}</h2>
            <p className="text-white/80">Content for {activeSection} will be implemented soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-pink-900">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-pink-900 text-white p-4 z-20"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <GraduationCap size={32} />
            <span className="text-xl font-bold">Gradsphere</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-pink-500 text-white'
                  : 'text-gray-300 hover:bg-blue-800/50 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
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
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-blue-900 to-pink-900 shadow-lg">
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
                    className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 transition-all"
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
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white">
                    3
                  </span>
                </div>
                <span className="text-sm font-medium text-white">
                  Welcome, {name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Area */}
              <div className="lg:col-span-2">
                {renderDashboardContent()}
              </div>

              {/* Notifications Sidebar */}
              <div className="bg-gradient-to-br h-fit from-blue-800 to-pink-800 rounded-lg shadow-lg p-6">
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
                      <p className="text-sm text-white/80 mt-1">{notification.message}</p>
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