import React, { useState } from 'react';
export default function SubmissionForm({ assignment, onSubmit }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      content,
      assignment_id: assignment.id,
    });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">Submit Assignment</h2>

      {/* Assignment Details */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium text-gray-900">{assignment.title}</h3>
        <p className="mt-1 text-sm text-gray-600">{assignment.description}</p>
      </div>

      {/* Submission Textarea */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Your Submission
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Assignment
      </button>
    </form>
  );
}
