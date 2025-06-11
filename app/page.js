'use client';
import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { LoginForm } from './Components/LoginForm';
import { Navigation } from './Components/Navigation';
import { HomePage } from './Components/HomePage';
import { SubmitComplaintForm } from './Components/SubmitComplaintForm';
import { SubmitExperienceForm } from './Components/SubmitExperienceForm';
import { ComplaintDetail } from './Components/ComplaintDetail';
import { StaffDashboard } from './Components/StaffDashboard';
import { AdminDashboard } from './Components/AdminDashboard';

export default function Home() {
  const { currentUser } = useAuth(); // now safe
  const [currentView, setCurrentView] = useState('home');
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  if (!currentUser) {
    return <LoginForm />;
  }

  const handleViewChange = (view, complaintId = null) => {
    setCurrentView(view);
    setSelectedComplaintId(complaintId);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onViewComplaint={(id) => handleViewChange('complaint-detail', id)} />;
      case 'submit-complaint':
        return <SubmitComplaintForm onBack={() => handleViewChange('home')} />;
      case 'submit-experience':
        return <SubmitExperienceForm onBack={() => handleViewChange('home')} />;
      case 'complaint-detail':
        return <ComplaintDetail complaintId={selectedComplaintId} onBack={() => handleViewChange('home')} />;
      case 'staff':
        return <StaffDashboard onViewComplaint={(id) => handleViewChange('complaint-detail', id)} />;
      case 'admin':
        return <AdminDashboard onViewComplaint={(id) => handleViewChange('complaint-detail', id)} />;
      default:
        return <HomePage onViewComplaint={(id) => handleViewChange('complaint-detail', id)} />;
    }
  };

  return (
    <>
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
      <main>
        {renderCurrentView()}
      </main>
    </>
  );
}
