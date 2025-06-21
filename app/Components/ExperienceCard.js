import React from "react";
import { users } from "../data/mockData";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export function ExperienceCard({ experience, onViewExperience }) {
  const student = users.find((u) => u.id === experience.studentId);

  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_BASE_URL}/experiences/${experience.id}`}
      className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                {experience.companyName}
              </h3>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-transparent text-gray-500 border border-gray-300 mb-2">
              {experience.roleApplied}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(experience.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Experience</h4>
            <p className="text-gray-600 text-sm line-clamp-3">
              {experience.experience}
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-4 h-4 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h4 className="font-medium text-yellow-800">Tips</h4>
            </div>
            <p className="text-yellow-700 text-sm">{experience.tips}</p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
              {student?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="text-sm text-gray-600">{student?.name}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">{student?.department}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
