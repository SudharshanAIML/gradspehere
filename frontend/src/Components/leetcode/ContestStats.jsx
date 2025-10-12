import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function ContestStatsCard({ stats }) {
  const { 
    highestWeekly, 
    highestBiweekly, 
    topWeeklyContests, 
    topBiweeklyContests 
  } = useMemo(() => {
    const weekly = [];
    const biweekly = [];
    
    stats.contestParticipation.forEach(contest => {
      const number = parseInt(contest.contest.title.match(/\d+/)?.[0] || '0', 10);
      if (contest.contest.title.includes('Weekly')) {
        weekly.push({ ...contest, number });
      } else if (contest.contest.title.includes('Biweekly')) {
        biweekly.push({ ...contest, number });
      }
    });

    const sortedWeekly = weekly.sort((a, b) => b.number - a.number);
    const sortedBiweekly = biweekly.sort((a, b) => b.number - a.number);

    return {
      highestWeekly: sortedWeekly[0]?.number || 0,
      highestBiweekly: sortedBiweekly[0]?.number || 0,
      topWeeklyContests: sortedWeekly.slice(0, 2),
      topBiweeklyContests: sortedBiweekly.slice(0, 2)
    };
  }, [stats.contestParticipation]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Contest Performance</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{Math.round(stats.contestRating)}</div>
          <div className="text-sm text-purple-600">Contest Rating</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.contestAttend}</div>
          <div className="text-sm text-blue-600">Contests Attended</div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-indigo-600">
            Top {stats.contestTopPercentage.toFixed(1)}%
          </div>
          <div className="text-sm text-indigo-600">
            Rank {stats.contestGlobalRanking} / {stats.totalParticipants}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">#{highestWeekly}</div>
          <div className="text-sm text-orange-600">Last Weekly Contest Attended</div>
        </div>
        <div className="bg-teal-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-teal-600">#{highestBiweekly}</div>
          <div className="text-sm text-teal-600">Last Biweekly Contest Attended</div>
        </div>
      </div>

      {stats.contestParticipation && stats.contestParticipation.length > 0 && (
        <div className="mt-6 space-y-8">
          {topWeeklyContests.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Recent Weekly Contests</h4>
              <div className="space-y-4">
                {topWeeklyContests.map((contest, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-orange-50/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{contest.contest.title}</h5>
                        <p className="text-sm text-gray-600">
                          Solved: {contest.problemsSolved}/{contest.totalProblems}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-medium mr-2">{Math.round(contest.rating)}</span>
                        {contest.trendDirection === "UP" ? (
                          <TrendingUp className="text-green-500" size={20} />
                        ) : (
                          <TrendingDown className="text-red-500" size={20} />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Rank: {contest.ranking}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {topBiweeklyContests.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Recent Biweekly Contests</h4>
              <div className="space-y-4">
                {topBiweeklyContests.map((contest, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-teal-50/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{contest.contest.title}</h5>
                        <p className="text-sm text-gray-600">
                          Solved: {contest.problemsSolved}/{contest.totalProblems}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-medium mr-2">{Math.round(contest.rating)}</span>
                        {contest.trendDirection === "UP" ? (
                          <TrendingUp className="text-green-500" size={20} />
                        ) : (
                          <TrendingDown className="text-red-500" size={20} />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Rank: {contest.ranking}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}