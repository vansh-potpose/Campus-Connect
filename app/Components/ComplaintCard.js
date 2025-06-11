import React from 'react';
import { users } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

export function ComplaintCard({ complaint, onViewComplaint }) {
  const student = users.find(u => u.id === complaint.studentId);
  const assignedStaff = complaint.assignedTo ? users.find(u => u.id === complaint.assignedTo) : null;

  // Tailwind badge classes based on App.css
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'resolved': return 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-green-50 text-green-600';
      case 'in_progress': return 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-yellow-50 text-yellow-600';
      case 'pending': return 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-red-50 text-red-600';
      default: return 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'resolved': return 'Resolved';
      case 'in_progress': return 'In Progress';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer" onClick={() => onViewComplaint(complaint.id)}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {complaint.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={getStatusBadgeClass(complaint.status)}>
                {getStatusText(complaint.status)}
              </span>
              {complaint.anonymous && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-transparent text-gray-500 border border-gray-300">Anonymous</span>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{complaint.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {!complaint.anonymous && student ? (
              <>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-gray-600">{student.name}</span>
              </>
            ) : (
              <span className="text-gray-500 italic">Anonymous Student</span>
            )}
          </div>
          {assignedStaff && (
            <div className="text-right">
              <p className="text-gray-500">Assigned to</p>
              <p className="font-medium">{assignedStaff.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}