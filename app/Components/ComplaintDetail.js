import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { complaints, users, feedbacks } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

export function ComplaintDetail({ complaintId, onBack }) {
  const { currentUser } = useAuth();
  const [newFeedback, setNewFeedback] = useState('');
  const [localFeedbacks, setLocalFeedbacks] = useState(feedbacks);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const complaint = complaints.find(c => c.id === complaintId);
  const student = complaint ? users.find(u => u.id === complaint.studentId) : null;
  const assignedStaff = complaint?.assignedTo ? users.find(u => u.id === complaint.assignedTo) : null;
  const complaintFeedbacks = localFeedbacks.filter(f => f.complaintId === complaintId);

  if (!complaint) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Complaint Not Found</h2>
          <p className="text-gray-600 mb-4">The complaint you're looking for doesn't exist or has been removed.</p>
          <button onClick={onBack} className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

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

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newFeedbackObj = {
        id: localFeedbacks.length + 1,
        complaintId: complaintId,
        staffId: currentUser.id,
        message: newFeedback,
        createdAt: new Date().toISOString()
      };
      setLocalFeedbacks(prev => [...prev, newFeedbackObj]);
      setNewFeedback('');
      setSubmitting(false);
      setSuccessMessage('Feedback added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Back Button */}
      <div className="mb-6">
        <button onClick={onBack} className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
      </div>

      {successMessage && (
        <div className="flex items-center gap-3 p-4 rounded-lg mb-6 bg-green-50 text-green-700 border border-green-200">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {successMessage}
        </div>
      )}

      {/* Complaint Details */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-8">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {complaint.title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span className={getStatusBadgeClass(complaint.status)}>
                  {getStatusText(complaint.status)}
                </span>
                {complaint.anonymous && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold gap-1 bg-transparent text-black border border-gray-300">Anonymous</span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Created {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              {!complaint.anonymous && student ? (
                <>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.department}</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 italic">Anonymous Student</p>
                    <p className="text-sm text-gray-500">Identity protected</p>
                  </div>
                </div>
              )}
            </div>
            
            {assignedStaff && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Assigned to</p>
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                    {assignedStaff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{assignedStaff.name}</p>
                    <p className="text-xs text-gray-500">{assignedStaff.department}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Feedback & Updates
            </h2>
            <p className="text-gray-600">Communication between staff and administration regarding this complaint</p>
          </div>

          {/* Existing Feedbacks */}
          <div className="space-y-4 mb-6">
            {complaintFeedbacks.length > 0 ? (
              complaintFeedbacks
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                .map((feedback) => {
                  const staff = users.find(u => u.id === feedback.staffId);
                  return (
                    <div key={feedback.id} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                          {staff?.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-gray-900">{staff?.name}</p>
                            <span className="text-sm text-gray-500">•</span>
                            <p className="text-sm text-gray-500">{staff?.department}</p>
                            <span className="text-sm text-gray-500">•</span>
                            <p className="text-sm text-gray-500">
                              {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
                            </p>
                          </div>
                          <p className="text-gray-700">{feedback.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-gray-500">No feedback yet. Staff members can add updates here.</p>
              </div>
            )}
          </div>

          {/* Add New Feedback (Staff and Admin only) */}
          
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-3">Add Feedback</h4>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <textarea
                  placeholder="Provide an update on this complaint..."
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:ring-black focus:border-blue-400 min-h-[100px]"
                  required
                />
                <button type="submit" className="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm bg-[#171717] hover:bg-[#171717e6] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={submitting || !newFeedback.trim()}>
                  {submitting ? (
                    'Adding Feedback...'
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Add Feedback
                    </>
                  )}
                </button>
              </form>
            </div>
          
        </div>
      </div>
    </div>
  );
}