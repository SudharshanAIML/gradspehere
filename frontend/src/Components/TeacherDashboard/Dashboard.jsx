import React from 'react'
import { useAuth } from "../../context/AuthContext";
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
const Dashboard = () => {
    const { user, logout, isLogin } = useAuth();
  return (
    <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Total Students
          </h3>
          <Users className="text-purple-400" />
        </div>
        <p className="text-3xl font-bold text-white">42</p>
        <p className="text-sm text-gray-400">Under Mentorship</p>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Assignments
          </h3>
          <ClipboardList className="text-purple-400" />
        </div>
        <p className="text-3xl font-bold text-white">8</p>
        <p className="text-sm text-gray-400">Active Tasks</p>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Upcoming Events
          </h3>
          <Calendar className="text-purple-400" />
        </div>
        <p className="text-3xl font-bold text-white">3</p>
        <p className="text-sm text-gray-400">This Week</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Activities
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-gray-800 rounded-lg">
              <Edit3 className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="font-medium text-white">Updated Marks</p>
              <p className="text-sm text-gray-400">
                Database Management Systems
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-gray-800 rounded-lg">
              <PlusCircle className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="font-medium text-white">
                New Assignment Added
              </p>
              <p className="text-sm text-gray-400">
                Web Development Project
              </p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          Top Performers
        </h3>
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
  )
}

export default Dashboard
