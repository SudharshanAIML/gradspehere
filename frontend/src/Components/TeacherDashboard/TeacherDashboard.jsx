import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
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
  AlertCircle
} from 'lucide-react';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [editingStudent, setEditingStudent] = useState(null);

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'students', icon: Users, label: 'Students' },
    { id: 'weaknesses', icon: AlertCircle, label: 'Student Weaknesses' },
    { id: 'academic', icon: GraduationCap, label: 'Academic Performance' },
    { id: 'codeskills', icon: Code2, label: 'Code Skills' },
    { id: 'projects', icon: FolderGit2, label: 'Project Profile' },
    { id: 'assignments', icon: ClipboardList, label: 'Assignments & Work' },
    { id: 'events', icon: Calendar, label: 'Event Assigned' },
    { id: 'profile', icon: UserCircle, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'weaknesses':
        return (
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Student Weaknesses Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((student) => (
                <div key={student} className="bg-gray-800 rounded-lg p-4 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Student {student}</h3>
                      <p className="text-gray-400 text-sm">Computer Science</p>
                    </div>
                    <Brain className="text-purple-400" size={20} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Areas for Improvement:</p>
                      <ul className="list-disc list-inside text-sm text-gray-400 mt-1">
                        <li>Algorithm Complexity Analysis</li>
                        <li>Database Optimization</li>
                        <li>System Design Concepts</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-300">Recommended Actions:</p>
                      <ul className="list-disc list-inside text-sm text-gray-400 mt-1">
                        <li>Additional practice problems</li>
                        <li>One-on-one mentoring sessions</li>
                        <li>Targeted workshop participation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Student Management</h2>
              <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <PlusCircle size={20} />
                Add Student
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-4 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">Student {i}</h3>
                      <p className="text-sm text-gray-400">Computer Science</p>
                      <p className="text-xs text-gray-500">Batch 2024</p>
                    </div>
                    <button 
                      onClick={() => setEditingStudent(i)}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                  </div>
                  {editingStudent === i ? (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="text-sm text-gray-400">DBMS Score</label>
                        <input 
                          type="number" 
                          className="w-full mt-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                          defaultValue="85"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">DSA Score</label>
                        <input 
                          type="number" 
                          className="w-full mt-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                          defaultValue="92"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingStudent(null)}
                          className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingStudent(null)}
                          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Code2 size={16} />
                        <span>85 Problems Solved</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <BarChart2 size={16} />
                        <span>92% Attendance</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'dashboard':
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Total Students</h3>
                  <Users className="text-purple-400" />
                </div>
                <p className="text-3xl font-bold text-white">42</p>
                <p className="text-sm text-gray-400">Under Mentorship</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Assignments</h3>
                  <ClipboardList className="text-purple-400" />
                </div>
                <p className="text-3xl font-bold text-white">8</p>
                <p className="text-sm text-gray-400">Active Tasks</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
                  <Calendar className="text-purple-400" />
                </div>
                <p className="text-3xl font-bold text-white">3</p>
                <p className="text-sm text-gray-400">This Week</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Edit3 className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-white">Updated Marks</p>
                      <p className="text-sm text-gray-400">Database Management Systems</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <PlusCircle className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-white">New Assignment Added</p>
                      <p className="text-sm text-gray-400">Web Development Project</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Top Performers</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-800 rounded-lg">
                        <Trophy className="text-purple-400" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-white">Keerthi S</p>
                        <p className="text-sm text-gray-400">95% Average</p>
                      </div>
                    </div>
                    <BarChart2 className="text-gray-400" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 z-20 border-r border-gray-800"
      >
        <div className="flex items-center justify-between mb-8">
          <motion.div
            className="flex items-center gap-2"
            animate={{ 
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
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
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
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
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
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
                  Welcome, {user?.name || 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {renderDashboardContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;