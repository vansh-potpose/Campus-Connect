'use client';
import Image from "next/image";
import {useState} from "react";
import { users, complaints } from "./mockData";
import Navbar from "./components/Navbar";
import HomePage from "./components/Hompage compts/HomePage";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [user, setUser] = useState(users[0]); // Default to first user
  return (
    <div className="">
      <Navbar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            user={user}
        />

          <div className="">
            {currentPage === "Home" && <HomePage />}
          </div>
     
    </div>
  );
}
