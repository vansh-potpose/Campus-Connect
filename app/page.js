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
import { ExperienceDetail } from './Components/ExperienceDetail';

export default function Home() {
  const { currentUser } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState(null);

  if (!currentUser) {
    return <LoginForm />;
  }

  // Add experienceId param for experience-detail
  const handleViewChange = (view, id = null) => {
    setCurrentView(view);
    if (view === 'complaint-detail') {
      setSelectedComplaintId(id);
      setSelectedExperienceId(null);
    } else if (view === 'experience-detail') {
      setSelectedExperienceId(id);
      setSelectedComplaintId(null);
    } else {
      setSelectedComplaintId(null);
      setSelectedExperienceId(null);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        // Pass handler for viewing experience details
        return (
          <HomePage
            onViewComplaint={id => handleViewChange('complaint-detail', id)}
            onViewExperience={id => handleViewChange('experience-detail', id)}
          />
        );
      case 'submit-complaint':
        return <SubmitComplaintForm onBack={() => handleViewChange('home')} />;
      case 'submit-experience':
        return <SubmitExperienceForm onBack={() => handleViewChange('home')} />;
      case 'complaint-detail':
        return (
          <ComplaintDetail
            complaintId={selectedComplaintId}
            onBack={() => handleViewChange('home')}
          />
        );
      case 'experience-detail':
        return (
          <ExperienceDetail
            interviewExperienceId={selectedExperienceId}
            onBack={() => handleViewChange('home')}
          />
        );
      case 'staff':
        return <StaffDashboard onViewComplaint={id => handleViewChange('complaint-detail', id)} />;
      case 'admin':
        return <AdminDashboard onViewComplaint={id => handleViewChange('complaint-detail', id)} />;
      default:
        return (
          <HomePage
            onViewComplaint={id => handleViewChange('complaint-detail', id)}
            onViewExperience={id => handleViewChange('experience-detail', id)}
          />
        );
    }
  };

  return (
    <>
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
      <main className='bg-gradient-to-br from-blue-50 via-white to-purple-50'>
        {renderCurrentView()}
      </main>
    </>
  );
}
