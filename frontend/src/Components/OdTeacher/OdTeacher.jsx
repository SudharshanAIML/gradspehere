import React from 'react';
import { Check, X, Image as ImageIcon } from 'lucide-react';

export function RequestCard({ request, onStatusChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{request.studentName}</h3>
          <p className="text-sm text-gray-500">{request.requestDate}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onStatusChange(request.id, 'approved')}
            disabled={request.status !== 'pending'}
            className={`p-2 rounded-full ${
              request.status === 'approved'
                ? 'bg-green-100 text-green-600'
                : request.status === 'pending'
                ? 'hover:bg-green-100 text-gray-600 hover:text-green-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => onStatusChange(request.id, 'denied')}
            disabled={request.status !== 'pending'}
            className={`p-2 rounded-full ${
              request.status === 'denied'
                ? 'bg-red-100 text-red-600'
                : request.status === 'pending'
                ? 'hover:bg-red-100 text-gray-600 hover:text-red-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{request.reason}</p>
      
      {request.evidenceUrl && (
        <div className="relative">
          <img
            src={request.evidenceUrl}
            alt="Permission evidence"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href={request.evidenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
            >
              <ImageIcon size={24} />
            </a>
          </div>
        </div>
      )}
      
      <div className="mt-4">
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            request.status === 'approved'
              ? 'bg-green-100 text-green-700'
              : request.status === 'denied'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      </div>
    </div>
  );
}