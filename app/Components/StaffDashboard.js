import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { complaints, users } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

export function StaffDashboard({ onViewComplaint }) {
  const { currentUser } = useAuth();
  const [localComplaints, setLocalComplaints] = useState(complaints);
  const [updateMessage, setUpdateMessage] = useState('');

  // Filter complaints assigned to current staff member
  const assignedComplaints = localComplaints.filter(c => c.assignedTo === currentUser?.id);
  
  const stats = {
    total: assignedComplaints.length,
    pending: assignedComplaints.filter(c => c.status === 'pending').length,
    inProgress: assignedComplaints.filter(c => c.status === 'in_progress').length,
    resolved: assignedComplaints.filter(c => c.status === 'resolved').length,
  };

  const handleStatusUpdate = (complaintId, newStatus) => {
    setLocalComplaints(prev => 
      prev.map(complaint => 
        complaint.id === complaintId 
          ? { ...complaint, status: newStatus, updatedAt: new Date().toISOString() }
          : complaint
      )
    );
    setUpdateMessage('Status updated successfully!');
    setTimeout(() => setUpdateMessage(''), 3000);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'resolved': return 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-green-500 text-white font-semibold';
      case 'in_progress': return 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-yellow-500 text-white font-semibold';
      case 'pending': return 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-red-500 text-white font-semibold';
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
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Staff Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Manage your assigned complaints and track resolution progress.
        </p>
      </div>

      {updateMessage && (
        <div className="flex items-center gap-3 p-4 rounded-lg mb-6 bg-green-50 text-green-700 border border-green-200">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {updateMessage}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid lg:grid-cols-1 md:grid-cols-2 grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg mr-4 bg-blue-100">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 mb-1">{stats.total}</p>
              <p className="text-gray-500">Assigned to You</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg mr-4 bg-red-100">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 mb-1">{stats.pending}</p>
              <p className="text-gray-500">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg mr-4 bg-yellow-100">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 mb-1">{stats.inProgress}</p>
              <p className="text-gray-500">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg mr-4 bg-green-100">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 mb-1">{stats.resolved}</p>
              <p className="text-gray-500">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Complaints */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Your Assigned Complaints
            </h2>
            <p className="text-gray-600">Complaints assigned to you for resolution</p>
          </div>

          {assignedComplaints.length > 0 ? (
            <div className="space-y-6">
              {assignedComplaints
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((complaint) => {
                  const student = users.find(u => u.id === complaint.studentId);

                  return (
                    <div key={complaint.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <button
                            onClick={() => onViewComplaint(complaint.id)}
                            className="text-lg font-semibold mb-2 hover:text-blue-600  transition-colors cursor-pointer text-left"
                          >
                            {complaint.title}
                          </button>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {complaint.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              {!complaint.anonymous && student ? (
                                <>
                                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <span>{student.name}</span>
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  <span className="italic">Anonymous</span>
                                </>
                              )}
                            </div>
                            <span>•</span>
                            <span>{formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}</span>
                          </div>
                        </div>
                        <div className="ml-6 flex items-center gap-2">
                          <span className={getStatusBadgeClass(complaint.status)}>
                            {getStatusText(complaint.status)}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Update Status</label>
                          <div className="flex items-start justify-between">
                          <div className="flex gap-2 flex-wrap">
                            <button
                              className={`px-3 py-1 rounded-md text-sm font-medium ${complaint.status === 'pending' ? 'bg-[#171717] text-white' : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100'} transition-colors`}
                              onClick={() => handleStatusUpdate(complaint.id, 'pending')}
                            >
                              Pending
                            </button>
                            <button
                              className={`px-3 py-1 rounded-md text-sm font-medium ${complaint.status === 'in_progress' ? 'bg-[#171717] text-white' : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100'} transition-colors`}
                              onClick={() => handleStatusUpdate(complaint.id, 'in_progress')}
                            >
                              In Progress 
                            </button> 
                            <button 
                              className={`px-3 py-1 rounded-md text-sm font-medium ${complaint.status === 'resolved' ? 'bg-[#171717] text-white' : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100'} transition-colors`}
                              onClick={() => handleStatusUpdate(complaint.id, 'resolved')}
                            >
                              Resolved
                            </button>
                          </div>
                            <button
                              className="px-3 py-1 rounded-md text-sm font-medium border border-gray-300 bg-transparent  text-gray-700 hover:bg-gray-100 transition-colors"
                              onClick={() => onViewComplaint(complaint.id)}
                            >
                              View Details
                            </button>
                        </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Assigned Complaints</h3>
              <p className="text-gray-500">
                You don't have any complaints assigned to you yet. Check back later or contact an administrator.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}