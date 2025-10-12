import React, { useState } from 'react';
import { Edit2, Save, X, Clock, UserPlus, Trash2 } from 'lucide-react';

// Initial demo data
const initialStudents = [
  { id: '1', name: 'John Smith', department: 'Computer Science' },
  { id: '2', name: 'Emma Wilson', department: 'Electrical Engineering' },
  { id: '3', name: 'Michael Brown', department: 'Mechanical Engineering' },
  { id: '4', name: 'Sarah Davis', department: 'Civil Engineering' },
];

export function AttendanceTable() {
  const [students, setStudents] = useState(initialStudents);
  const [attendance, setAttendance] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', department: '' });

  const updateAttendance = (studentId, status, onDutyReason, onDutyDuration) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        id: `${studentId}-${Date.now()}`,
        student_id: studentId,
        status,
        on_duty_reason: onDutyReason,
        on_duty_duration: onDutyDuration,
      },
    }));
    setEditingId(null);
  };

  const addStudent = () => {
    if (newStudent.name && newStudent.department) {
      const newId = `${Date.now()}`;
      setStudents((prev) => [...prev, { id: newId, ...newStudent }]);
      setNewStudent({ name: '', department: '' });
      setShowAddStudent(false);
    }
  };

  const removeStudent = (studentId) => {
    setStudents((prev) => prev.filter((student) => student.id !== studentId));
    setAttendance((prev) => {
      const newAttendance = { ...prev };
      delete newAttendance[studentId];
      return newAttendance;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Attendance Dashboard</h2>
        <button
          onClick={() => setShowAddStudent(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <UserPlus className="h-5 w-5" />
          Add Student
        </button>
      </div>

      {showAddStudent && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newStudent.name}
                onChange={(e) => setNewStudent((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                value={newStudent.department}
                onChange={(e) => setNewStudent((prev) => ({ ...prev, department: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={addStudent}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <Save className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowAddStudent(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === student.id ? (
                    <select
                      className="rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      value={attendance[student.id]?.status || 'absent'}
                      onChange={(e) => {
                        const status = e.target.value;
                        let reason, duration;

                        if (status === 'on_duty') {
                          reason = prompt('Enter on-duty reason:');
                          duration = prompt('Enter duration (e.g., "2 hours"):');
                        }

                        updateAttendance(student.id, status, reason, duration);
                      }}
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="on_duty">On Duty</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        attendance[student.id]?.status === 'present'
                          ? 'bg-green-100 text-green-800'
                          : attendance[student.id]?.status === 'on_duty'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {attendance[student.id]?.status || 'Not Marked'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {editingId === student.id ? (
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingId(student.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                    )}
                    {attendance[student.id]?.status === 'on_duty' && (
                      <button
                        onClick={() =>
                          alert(
                            `Reason: ${attendance[student.id].on_duty_reason}\nDuration: ${attendance[student.id].on_duty_duration}`
                          )
                        }
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Clock className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => removeStudent(student.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
