import React from 'react';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

export function ProfileCard({ profile }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start space-x-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-24 h-24 rounded-full"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">@{profile.username}</p>
          {profile.about && (
            <p className="mt-2 text-gray-700">{profile.about}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-4">
            {profile.country && (
              <span className="text-sm text-gray-600">📍 {profile.country}</span>
            )}
            {profile.school && (
              <span className="text-sm text-gray-600">🎓 {profile.school}</span>
            )}
            {profile.company && (
              <span className="text-sm text-gray-600">💼 {profile.company}</span>
            )}
          </div>
          <div className="mt-4 flex space-x-4">
            {profile.gitHub && (
              <a
                href={profile.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Github size={20} />
              </a>
            )}
            {profile.linkedIN && (
              <a
                href={profile.linkedIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Linkedin size={20} />
              </a>
            )}
            {profile.twitter && (
              <a
                href={profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Twitter size={20} />
              </a>
            )}
            {profile.website && profile.website.length > 0 && (
              <a
                href={profile.website[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Globe size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}