import React, { useState } from 'react';
import axios from 'axios';

export default function CreateAssignment({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    subject: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/assignments', formData);
      console.log('✅ Assignment created:', response.data);
      setFormData({ title: '', description: '', due_date: '', subject: '' });
      if (onSubmit) onSubmit(response.data); // 🔄 Refresh list after creation
    } catch (error) {
      console.error('❌ Failed to create assignment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-400 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold ">Create New Assignment</h2>

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium ">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block bg-gray-100 outline-0 w-full py-2 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium ">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block bg-gray-100 outline-0 px-2 py-2 resize-none w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Subject Input */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium ">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="mt-1 block w-full px-2 py-2 outline-0 bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Due Date Input */}
      <div>
        <label htmlFor="due_date" className="block text-sm font-medium ">
          Due Date
        </label>
        <input
          type="datetime-local"
          id="due_date"
          value={formData.due_date}
          onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          className="mt-1 block w-full py-2 px-4 outline-0 bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
      >
        Create Assignment
      </button>
    </form>
  );
}
