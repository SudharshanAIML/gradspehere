import React from "react";
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
const StudentWeaknesses = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Student Weaknesses Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["Keerthi Kumar C", "Harshiv Krishna M", "GokulV", "Abishek S"].map(
          (student) => (
            <div
              key={student}
              className="bg-gray-800 rounded-lg p-4 text-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Student {student}</h3>
                  <p className="text-gray-400 text-sm">Computer Science</p>
                </div>
                <Brain className="text-purple-400" size={20} />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Areas for Improvement:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-400 mt-1">
                    <li>Algorithm Complexity Analysis</li>
                    <li>Database Optimization</li>
                    <li>System Design Concepts</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Recommended Actions:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-400 mt-1">
                    <li>Additional practice problems</li>
                    <li>One-on-one mentoring sessions</li>
                    <li>Targeted workshop participation</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StudentWeaknesses;
