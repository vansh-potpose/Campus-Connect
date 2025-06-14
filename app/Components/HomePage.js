"use client";
import React, { useEffect, useState } from "react";
import { ComplaintCard } from "./ComplaintCard";
import { ExperienceCard } from "./ExperienceCard";
import {
  complaints as complaintArr,
  interviewExperiences as interviewExperienceArr,
} from "../data/mockData";
import complaints from "../(backend-services)/complaints.service";
import interviewExperiences from "../(backend-services)/interviewExperience.service";

export function HomePage({ onViewComplaint, onViewExperience }) {
  const [showComplaints, setShowComplaints] = useState(true);
  const [complaintsCount, setComplaintsCount] = useState(0);
  const [complaintsResolvedCount, setComplaintsResolvedCount] = useState(0);
  const [interviewExperiencesCount, setInterviewExperiencesCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const complaintsCount = (await complaints.getCount()) || 0;
        const complaintsResolvedCount =
          (await complaints.getResolvedCount()) || 0;
        const interviewExperiencesCount =
          (await interviewExperiences.getCount()) || 0;
        setComplaintsCount(complaintsCount);
        setComplaintsResolvedCount(complaintsResolvedCount);
        setInterviewExperiencesCount(interviewExperiencesCount);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCount();
  }, []);
  // Sort by creation date (newest first)
  const sortedComplaints = [...complaintArr].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const sortedExperiences = [...interviewExperienceArr].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Campus Connect
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your voice matters. Share complaints, discover interview experiences,
          and help build a better campus community.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg mr-4 bg-blue-100">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 mb-1">
                {complaintsCount}
              </p>
              <p className="text-gray-500">Total Complaints</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg mr-4 bg-green-100">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 mb-1">
                {interviewExperiencesCount}
              </p>
              <p className="text-gray-500">Experience Shared</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg mr-4 bg-purple-100">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 mb-1">
                {complaintsResolvedCount}
              </p>
              <p className="text-gray-500">Resolved Issues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full gap-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {showComplaints ? "Recent Complaints" : "Interview Experiences"}
            </h2>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium ${
                  showComplaints ? "text-blue-600" : "text-gray-400"
                }`}
              >
                Complaints
              </span>
              <label className="relative inline-block w-11 h-6 align-middle select-none">
                <input
                  type="checkbox"
                  checked={!showComplaints}
                  onChange={(e) => setShowComplaints(!e.target.checked)}
                  className="sr-only peer"
                />
                <span className="block w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
              </label>
              <span
                className={`text-sm font-medium ${
                  !showComplaints ? "text-purple-600" : "text-gray-400"
                }`}
              >
                Experiences
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showComplaints ? (
          sortedComplaints.length > 0 ? (
            sortedComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onViewComplaint={onViewComplaint}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-500">
                No complaints yet. Be the first to share your concerns!
              </p>
            </div>
          )
        ) : sortedExperiences.length > 0 ? (
          sortedExperiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onViewExperience={onViewExperience}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-gray-500">
              No experiences shared yet. Help others by sharing your interview
              experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
