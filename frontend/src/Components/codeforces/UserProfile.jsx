import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Activity } from "lucide-react";
import {
  getUserInfo,
  getUserRating,
  getUserStatus,
} from "../../utils/codeforces/api";

const UserProfile = ({ userName, currentCodingPlatform }) => {
  const [handle, setHandle] = useState(userName);
  const [userInfo, setUserInfo] = useState(null);
  const [ratingHistory, setRatingHistory] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (!handle) return;
      setLoading(true);
      setError("");

      try {
        const [userInfoData, ratingData, submissionsData] = await Promise.all([
          getUserInfo(handle),
          getUserRating(handle),
          getUserStatus(handle),
        ]);

        if (!userInfoData.result || userInfoData.result.length === 0) {
          throw new Error("User not found");
        }

        setUserInfo(userInfoData.result[0]);
        setRatingHistory(ratingData.result || []);
        setRecentSubmissions(submissionsData.result?.slice(0, 10) || []);
      } catch (err) {
        setError(err.message || "Failed to fetch user data");
        setUserInfo(null);
        setRatingHistory([]);
        setRecentSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [handle]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !userInfo) {
    return (
      <div className=" w-full min-h-screen bg-gray-50">
        <button
          onClick={() => {
            currentCodingPlatform(() => "codeskills");
          }}
          className="ml-3 mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all"
        >
          Back
        </button>
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
            <p className="text-gray-600">{error || "User not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  const getRankColor = (rank) => {
    const colors = {
      newbie: "text-gray-500",
      pupil: "text-green-500",
      specialist: "text-cyan-500",
      expert: "text-blue-500",
      "candidate master": "text-purple-500",
      master: "text-orange-500",
      "international master": "text-orange-600",
      grandmaster: "text-red-500",
      "international grandmaster": "text-red-600",
      "legendary grandmaster": "text-red-700",
    };
    return colors[rank.toLowerCase()] || "text-gray-500";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => {
            currentCodingPlatform(() => "codeskills");
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all"
        >
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <img
                src={userInfo.titlePhoto}
                alt={userInfo.handle}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {userInfo.handle}
              </h1>
              <p
                className={`text-lg font-semibold ${getRankColor(
                  userInfo.rank
                )} mb-2`}
              >
                {userInfo.rank}
              </p>
              {userInfo.organization && (
                <p className="text-gray-600 mb-4">{userInfo.organization}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Current Rating</p>
                <p className="text-xl font-bold text-gray-800">
                  {userInfo.rating}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Max Rating</p>
                <p className="text-xl font-bold text-gray-800">
                  {userInfo.maxRating}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Contests */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Recent Contests
            </h2>
            <div className="space-y-4">
              {ratingHistory
                .slice(-5)
                .reverse()
                .map((contest) => (
                  <div key={contest.contestId} className="border-b pb-3">
                    <p className="text-sm font-medium text-gray-800">
                      {contest.contestName}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-600">
                        Rank: {contest.rank}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          contest.newRating > contest.oldRating
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {contest.newRating - contest.oldRating > 0 ? "+" : ""}
                        {contest.newRating - contest.oldRating}
                      </span>
                    </div>
                  </div>
                ))}
              {ratingHistory.length === 0 && (
                <p className="text-gray-500 text-center">
                  No contest history available
                </p>
              )}
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Recent Submissions
            </h2>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="border-b pb-3">
                  <p className="text-sm font-medium text-gray-800">
                    {submission.problem.index}. {submission.problem.name}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-600">
                      {submission.programmingLanguage}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        submission.verdict === "OK"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {submission.verdict}
                    </span>
                  </div>
                </div>
              ))}
              {recentSubmissions.length === 0 && (
                <p className="text-gray-500 text-center">
                  No recent submissions
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
