import { useState, useEffect } from 'react';
import {
  Code2,
  BarChart2,
  Edit3,
  UserCircle,
  Trophy,
  Brain,
  AlertCircle,
  X,
} from "lucide-react";
import { useParams } from 'react-router';

const Students = () => {
  const teacherUid=useParams().uid;
  const [students, setStudents] = useState([]); // State to store students' data
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student's details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch students data based on the teacher's UID
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${teacherUid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch teacher data");
        }
        const teacherData = await response.json();

        // Extract year, department, and section from the teacher's data
        const { year, department, section } = teacherData;

        // Fetch all students matching the teacher's year, department, and section
        const studentsResponse = await fetch(`http://localhost:5000/api/profile`);
        if (!studentsResponse.ok) {
          throw new Error("Failed to fetch students data");
        }
        const allStudents = await studentsResponse.json();

        // Filter students based on the teacher's year, department, and section
        const filteredStudents = allStudents.filter(
          (student) =>
            student.role === "student" &&
            student.year === year &&
            student.department === department &&
            student.section === section
        );

        setStudents(filteredStudents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [teacherUid]);
  console.log(students)
  // Handle click on a student card to display their details
  const handleStudentClick = async (uid) => {
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch student details");
      }
      const studentDetails = await response.json();
      setSelectedStudent(studentDetails);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Student Management</h2>
      </div>

      {/* Display students as cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.uid}
            className="bg-gray-800 rounded-lg p-4 text-white cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleStudentClick(student.uid)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-sm text-gray-400">{student.department}</p>
                <p className="text-xs text-gray-500">Batch {student.year}</p>
              </div>
              <UserCircle size={24} className="text-gray-400" />
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Code2 size={16} />
                <span>{student.codingProfiles?.leetcode || "N/A"} LeetCode</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                <BarChart2 size={16} />
                <span>{student.attendance || "N/A"}% Attendance</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Display selected student's details */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 text-white w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{selectedStudent.name}</h2>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Department</label>
                <p className="text-white">{selectedStudent.department}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Year</label>
                <p className="text-white">{selectedStudent.year}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Section</label>
                <p className="text-white">{selectedStudent.section}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Coding Profiles</label>
                <p className="text-white">
                  LeetCode: {selectedStudent.codingProfiles?.leetcode || "N/A"}
                </p>
                <p className="text-white">
                  CodeChef: {selectedStudent.codingProfiles?.codechef || "N/A"}
                </p>
                <p className="text-white">
                  Codeforces: {selectedStudent.codingProfiles?.codeforces || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Certificates</label>
                <ul className="text-white">
                  {selectedStudent.certificates?.map((cert, index) => (
                    <li key={index}>{cert.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;