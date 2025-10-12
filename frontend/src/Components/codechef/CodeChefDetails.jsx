/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, TrendingUp, Trophy, Globe2, Flag } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import HeatMap from "./HeatMap";

const CodeChefDetails = ({ username, currentCodingPlatform }) => {
  // const { username } = useParams({ userName });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://codechef-api.vercel.app/handle/${username}`
        );
        // Transform rating data to ensure ratings are numbers
        const transformedData = {
          ...response.data,
          ratingData: response.data.ratingData.map((item) => ({
            ...item,
            rating: parseInt(item.rating, 10),
            rank: parseInt(item.rank, 10),
            end_date: new Date(item.end_date).toISOString(),
          })),
        };
        setData(transformedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-transparent">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <button
          onClick={() => {
            currentCodingPlatform(() => "codeskills");
          }}
          className="mt-4 ml-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all"
        >
          Back
        </button>
        <div className="w-full min-h-screen  flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  const getRatingColor = (rating) => {
    if (rating >= 2000) return "text-yellow-500";
    if (rating >= 1800) return "text-purple-500";
    if (rating >= 1600) return "text-blue-500";
    if (rating >= 1400) return "text-green-500";
    return "text-gray-500";
  };

  const getStarColor = (stars) => {
    const starCount = parseInt(stars);
    if (starCount >= 6) return "text-yellow-500";
    if (starCount >= 5) return "text-purple-500";
    if (starCount >= 4) return "text-blue-500";
    if (starCount >= 3) return "text-green-500";
    return "text-gray-500";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">{data.name}</p>
          <p className="text-sm text-gray-600">
            Date: {formatDate(data.end_date)}
          </p>
          <p className="text-sm text-gray-600">Rating: {data.rating}</p>
          <p className="text-sm text-gray-600">
            Rank: #{data.rank.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <button
          onClick={() => {
            currentCodingPlatform(() => "codeskills");
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all"
        >
          Back
        </button>
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center space-x-6">
            <img
              src={data.profile}
              alt={data.name}
              className="w-24 h-24 rounded-full shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {data.name}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center px-3 py-1 bg-gray-50 rounded-full">
                  <Star
                    className={`${getStarColor(data.stars)} mr-1`}
                    size={20}
                  />
                  <span className="font-semibold">{data.stars}</span>
                </div>
                <div className="flex items-center px-3 py-1 bg-gray-50 rounded-full">
                  <img
                    src={data.countryFlag}
                    alt={data.countryName}
                    className="w-6 h-4 mr-2"
                  />
                  <span className="font-medium">{data.countryName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Current Rating
              </h3>
              <TrendingUp
                className={`${getRatingColor(data.currentRating)}`}
                size={20}
              />
            </div>
            <p
              className={`text-3xl font-bold ${getRatingColor(
                data.currentRating
              )}`}
            >
              {data.currentRating}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Highest Rating
              </h3>
              <Trophy className="text-yellow-500" size={20} />
            </div>
            <p
              className={`text-3xl font-bold ${getRatingColor(
                data.highestRating
              )}`}
            >
              {data.highestRating}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Global Rank</h3>
              <Globe2 className="text-blue-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-blue-600">
              #{data.globalRank.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Country Rank
              </h3>
              <Flag className="text-green-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-green-600">
              #{data.countryRank.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Rating Graph */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Rating History
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.ratingData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="end_date"
                  tickFormatter={formatDate}
                  stroke="#6b7280"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  stroke="#6b7280"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  domain={["dataMin - 100", "dataMax + 100"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={data.highestRating}
                  stroke="#fbbf24"
                  strokeDasharray="3 3"
                  label={{
                    value: "Highest Rating",
                    position: "right",
                    fill: "#fbbf24",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    fill: "#4f46e5",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#4f46e5",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  connectNulls
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heat Map */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Activity Heat Map
          </h2>
          <HeatMap data={data.heatMap} />
        </div>
      </div>
    </div>
  );
};

export default CodeChefDetails;
