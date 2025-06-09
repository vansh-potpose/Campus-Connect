'use client';
import Image from "next/image";
import {useState} from "react";
import { users, complaints } from "./mockData";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(users[0]); // Default to first user
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - <span className="text-gray-600">{user.role}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Complaints</h2>
      <ul className="list-disc pl-5">
        {complaints.map((complaint) => (
          <li key={complaint.id}>
            {complaint.title} — <span className="text-gray-500">Status: {complaint.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
