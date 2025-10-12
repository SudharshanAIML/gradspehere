import React from "react";
import { useState } from "react";
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
const CodeSkills = () => {
  const [editingStudent, setEditingStudent] = useState(null);
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
};

export default CodeSkills;
