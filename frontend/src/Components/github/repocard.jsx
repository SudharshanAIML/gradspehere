/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Github, Calendar, Book } from "lucide-react";
import axios from "axios";
import { format, parseISO } from "date-fns";

function RepoCard({ username, currentCodingPlatform }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    const fetchRepositories = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const sortedRepos = response.data.sort(
          (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)
        );
        setRepos(sortedRepos);
      } catch (err) {
        setError("User not found or error fetching repositories");
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

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
      <div className="pl-4 my-4 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-2">
            <Github className="w-8 h-8 text-gray-700" />
            <h1 className="text-2xl font-bold text-gray-800">
              GitHub Project Explorer
            </h1>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center mt-6 text-gray-700">
          Loading repositories...
        </div>
      )}
      {error && (
        <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-blue-600 hover:underline"
                  >
                    {repo.name}
                  </a>
                  {repo.description && (
                    <p className="mt-2 text-gray-600">{repo.description}</p>
                  )}
                </div>
                {repo.language && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {repo.language}
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Last updated:{" "}
                  {format(parseISO(repo.pushed_at), "MMM d, yyyy")}
                </div>
                <div className="flex items-center">
                  <Book className="w-4 h-4 mr-1" />
                  Stars: {repo.stargazers_count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RepoCard;
