import React, { useState } from 'react';
import { complaints, users as initialUsers } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

export function AdminDashboard({ onViewComplaint }) {
  const [localComplaints, setLocalComplaints] = useState(complaints);
  const [localUsers, setLocalUsers] = useState(initialUsers);
  const [updateMessage, setUpdateMessage] = useState('');

  const staffUsers = localUsers.filter(u => u.role === 'staff');
  const adminUsers = localUsers.filter(u => u.role === 'admin');
  
  const stats = {
    total: localComplaints.length,
    pending: localComplaints.filter(c => c.status === 'pending').length,
    inProgress: localComplaints.filter(c => c.status === 'in_progress').length,
    resolved: localComplaints.filter(c => c.status === 'resolved').length,
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

  const handleAssignStaff = (complaintId, staffId) => {
    setLocalComplaints(prev => 
      prev.map(complaint => 
        complaint.id === complaintId 
          ? { ...complaint, assignedTo: parseInt(staffId), updatedAt: new Date().toISOString() }
          : complaint
      )
    );
    setUpdateMessage('Staff assigned successfully!');
    setTimeout(() => setUpdateMessage(''), 3000);
  };

  const handlePromoteToAdmin = (userId) => {
    setLocalUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, role: 'admin' }
          : user
      )
    );
    setUpdateMessage('User promoted to admin successfully!');
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Manage complaints, assign staff, promote users, and track resolution progress.
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
              <p className="text-gray-500">Total Complaints</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* User Management */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                User Management
              </h2>
              <p className="text-gray-600">Promote staff members to admin role</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Current Admins</h4>
                <div className="space-y-2">
                  {adminUsers.map((admin) => (
                    <div key={admin.id} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                        {admin.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{admin.name}</p>
                        <p className="text-sm text-gray-500">{admin.department}</p>
                      </div>
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Staff Members</h4>
                <div className="space-y-2">
                  {staffUsers.map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{staff.name}</p>
                          <p className="text-sm text-gray-500">{staff.department}</p>
                        </div>
                      </div>
                      <button
                        className="inline-flex items-center justify-center px-3 py-1 rounded-md font-medium text-sm border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 transition-colors gap-1"
                        onClick={() => handlePromoteToAdmin(staff.id)}
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Promote
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                System Overview
              </h2>
              <p className="text-gray-600">Key metrics and system health</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Users</span>
                  <span className="font-semibold">{localUsers.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Staff Members</span>
                  <span className="font-semibold">{staffUsers.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Administrators</span>
                  <span className="font-semibold">{adminUsers.length}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Resolution Rate</span>
                  <span className="font-semibold">
                    {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Cases</span>
                  <span className="font-semibold">{stats.pending + stats.inProgress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Unassigned</span>
                  <span className="font-semibold">
                    {localComplaints.filter(c => !c.assignedTo).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complaints Management */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Complaint Management
            </h2>
            <p className="text-gray-600">Review complaints, assign staff members, and update statuses</p>
          </div>

          <div className="space-y-6">
            {localComplaints.map((complaint) => {
              const student = localUsers.find(u => u.id === complaint.studentId);
              const assignedStaff = complaint.assignedTo ? localUsers.find(u => u.id === complaint.assignedTo) : null;

              return (
                <div key={complaint.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <button
                        onClick={() => onViewComplaint(complaint.id)}
                        className="text-lg font-semibold  mb-2 hover:text-blue-600 transition-colors cursor-pointer text-left"
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Assign to Staff</label>
                      <select 
                        value={complaint.assignedTo || ''} 
                        onChange={(e) => handleAssignStaff(complaint.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                      >
                        <option value="">Select staff member</option>
                        {staffUsers.map((staff) => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name} - {staff.department}
                          </option>
                        ))}
                      </select>
                      {assignedStaff && (
                        <p className="text-xs text-gray-500">
                          Currently assigned to {assignedStaff.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Update Status</label>
                      <div className="flex gap-2">
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
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Actions</label>
                      <button
                        className="w-full px-3 py-1 rounded-md text-sm font-medium border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => onViewComplaint(complaint.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}