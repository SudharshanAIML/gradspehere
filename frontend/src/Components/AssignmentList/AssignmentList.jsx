import React from 'react';
import { format } from 'date-fns';
// import { CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const sampleAssignments = [
  {
    id: "1",
    title: "React Basics Project",
    description:
      "Create a simple React application demonstrating components, props, and state management.",
    due_date: "2025-03-05T17:00:00Z",
    subject: "Web Development",
  },
  {
    id: "2",
    title: "Database Design Assignment",
    description:
      "Design an ER diagram and create a normalized database schema for a library management system.",
    due_date: "2025-03-10T14:30:00Z",
    subject: "Database Management Systems",
  },
  {
    id: "3",
    title: "Data Structures Problem Set",
    description:
      "Solve problems related to linked lists, stacks, and queues using JavaScript.",
    due_date: "2025-03-08T23:59:00Z",
    subject: "Data Structures",
  },
  {
    id: "4",
    title: "Machine Learning Model",
    description:
      "Implement a linear regression model using Python and scikit-learn. Analyze the results and submit your observations.",
    due_date: "2025-03-15T12:00:00Z",
    subject: "Machine Learning",
  },
  {
    id: "5",
    title: "Android App UI Design",
    description:
      "Design the user interface for a note-taking app using Jetpack Compose in Android Studio.",
    due_date: "2025-03-12T18:00:00Z",
    subject: "Android Development",
  },
];

export default function AssignmentList({ onAssignmentClick }) {
  return (
    <div className="space-y-4">
      {sampleAssignments.map((assignment) => (
        <div
          key={assignment.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onAssignmentClick(assignment)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {assignment.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {assignment.description}
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  {/* <CalendarIcon className="h-4 w-4 mr-1" /> */}
                  <span>Due {format(new Date(assignment.due_date), 'PPP')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  {/* <BookOpenIcon className="h-4 w-4 mr-1" /> */}
                  <span>{assignment.subject}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}