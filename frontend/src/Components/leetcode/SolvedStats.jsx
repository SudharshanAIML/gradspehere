import React from 'react';

export function SolvedStatsCard({ stats }) {
  const totalProblems = stats.solvedProblem;
  const calculatePercentage = (solved) => ((solved / totalProblems) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Problem Solving Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">{totalProblems}</div>
          <div className="text-sm text-gray-600">Total Solved</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.easySolved}</div>
          <div className="text-sm text-green-600">Easy ({calculatePercentage(stats.easySolved)}%)</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{stats.mediumSolved}</div>
          <div className="text-sm text-yellow-600">Medium ({calculatePercentage(stats.mediumSolved)}%)</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{stats.hardSolved}</div>
          <div className="text-sm text-red-600">Hard ({calculatePercentage(stats.hardSolved)}%)</div>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-3">Submission Details</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Difficulty</th>
                <th className="px-4 py-2 text-left">Solved</th>
                <th className="px-4 py-2 text-left">Total Submissions</th>
                <th className="px-4 py-2 text-left">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {stats.acSubmissionNum.map((stat, index) => {
                const totalSub = stats.totalSubmissionNum[index].submissions;
                const successRate = ((stat.submissions / totalSub) * 100).toFixed(1);
                return (
                  <tr key={stat.difficulty} className="border-t">
                    <td className="px-4 py-2">{stat.difficulty}</td>
                    <td className="px-4 py-2">{stat.count}</td>
                    <td className="px-4 py-2">{totalSub}</td>
                    <td className="px-4 py-2">{successRate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}