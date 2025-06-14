import React from "react";
import { users } from "../data/mockData";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export function ComplaintCard({ complaint, onViewComplaint }) {
  const student = users.find((u) => u.id === complaint.studentId);
  const assignedStaff = complaint.assignedTo
    ? users.find((u) => u.id === complaint.assignedTo)
    : null;

  // Tailwind badge classes based on App.css
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "RESOLVED":
        return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-green-500 text-white font-semibold";
      case "INPROGRESS":
        return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-yellow-500 text-white font-semibold";
      case "PENDING":
        return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-red-500 text-white font-semibold";
      default:
        return "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium gap-1 bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "RESOLVED":
        return "Resolved";
      case "INPROGRESS":
        return "In Progress";
      case "PENDING":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  return (
    <Link
      className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
      href={`${process.env.NEXT_PUBLIC_BASE_URL}/complaints/${complaint.id}`}
    >
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs gap-1 bg-transparent text-black font-semibold border border-gray-300">
                  Anonymous
                </span>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(complaint.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {complaint.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {!complaint.anonymous && student ? (
              <>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
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
    </Link>
  );
}
