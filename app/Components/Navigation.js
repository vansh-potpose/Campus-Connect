import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import auth from "../(backend-services)/auth.service";
import { login, logout as logoutUser } from "../store/features/authSlice";
import Link from "next/link";

export function Navigation({ currentView, onViewChange }) {
  const { user, status } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  async function getUserUsingRefreshAccessToken() {
    try {
      const user = await auth.refreshAccessToken();
      if (!user) {
        throw new Error("user not found");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  useEffect(() => {
    if (!status) {
      const fetchUser = async () => {
        try {
          const user = await getUserUsingRefreshAccessToken();
          if (!user) {
            throw new Error("user not found");
          }
          dispatch(login(user));
        } catch (error) {
          console.log(error);
          router.push("/login");
        }
      };

      fetchUser();
    }
  }, [status, user]); // No need to include `user` in dependency array

  if (!status || !user) {
    return null;
  }

  const logout = async () => {
    try {
      await auth.logout();
      dispatch(logoutUser());
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/login");
    }
  };

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: "home",
      roles: ["student", "staff", "admin"],
      to: "/",
    },
    {
      key: "submit-complaint",
      label: "Submit Complaint",
      icon: "file-text",
      roles: ["student"],
      to: "/submit-complaint",
    },
    {
      key: "submit-experience",
      label: "Share Experience",
      icon: "message-square",
      roles: ["student"],
      to: "/submit-experience",
    },
    { key: "staff", label: "Staff Dashboard", icon: "users", roles: ["staff"] },
    {
      key: "admin",
      label: "Admin Dashboard",
      icon: "settings",
      roles: ["admin"],
      to: "/admin",
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user.role.toLowerCase())
  );

  const getIcon = (iconName) => {
    const icons = {
      home: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      "file-text": (
        <svg
          className="w-4 h-4"
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
      ),
      "message-square": (
        <svg
          className="w-4 h-4"
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
      ),
      users: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      settings: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      "log-out": (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
    };
    return icons[iconName] || null;
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold text-gray-900">Campus Connect</div>
          <div className="hidden md:flex gap-4">
            {filteredNavItems.map((item) => (
              <Link
                key={item.key}
                href={item.to}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium gap-2 transition-colors ${
                  currentView === item.key
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {getIcon(item.icon)}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm text-gray-600">
            Welcome, {user.name} ({user.role})
          </span>
          <button
            onClick={logout}
            className="inline-flex items-center px-3 py-2 rounded-md font-medium text-sm border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 transition-colors gap-1"
          >
            {getIcon("log-out")}
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
