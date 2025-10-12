import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssignmentList from '../AssignmentList/AssignmentList';

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/assignments');
      setAssignments(response.data);
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleAssignmentClick = (assignment) => {
    console.log('Selected Assignment:', assignment);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4"> All Assignments</h2>
      <AssignmentList assignments={assignments} onAssignmentClick={handleAssignmentClick} />
    </div>
  );
}
