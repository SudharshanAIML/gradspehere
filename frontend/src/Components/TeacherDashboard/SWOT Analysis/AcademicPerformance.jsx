import React from "react";
import studentsData from "./output.json";

const AcademicPerformance = () => {
  // Sort students based on rank
  const sortedStudents = studentsData.students.sort((a, b) => a.rank - b.rank);

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#101828" }}>
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Academic Performance
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedStudents.map((student) => (
          <div
            key={student.rank}
            className="rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            style={{ backgroundColor: "#1E2938", border: "1px solid #334155" }}
          >
            <h2 className="text-xl font-semibold mb-2 text-white">
              {student.name}
            </h2>
            <p className="text-gray-300 mb-1">
              <span className="font-medium">Class:</span> {student.class}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-medium">CGPA:</span> {student.cgpa}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-medium">LeetCode:</span> {student.leetcode}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-medium">CodeChef:</span> {student.codechef}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-medium">CodeForces:</span>{" "}
              {student.codeforces}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-medium">Final Score:</span>{" "}
              {student.finalScore}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-medium">Rank:</span> {student.rank}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicPerformance;
