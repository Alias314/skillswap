import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  XMarkIcon,
  HomeIcon,
  BuildingLibraryIcon,
  UserIcon,
  Cog6ToothIcon,
  PowerIcon, // Add Power icon for logout
} from "@heroicons/react/24/outline";

function Sidebar({ isOpen, toggleSidebar }) {
  const [userRole, setUserRole] = useState(null); // State to store the role
  const navigate = useNavigate(); // For navigation after logout

  useEffect(() => {
    const userId = localStorage.getItem("user_id"); // Get user_id from local storage

    if (userId) {
      // Fetch the user's role from the backend
      const fetchUserRole = async () => {
        try {
          const response = await fetch(
            `http://localhost/skillswap/backend/get_user_role.php?user_id=${userId}`
          );
          const data = await response.json();

          if (!data.error) {
            setUserRole(data.role); // Set the role
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      };

      fetchUserRole();
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user_id"); // Remove user_id from localStorage
    navigate("/login"); // Redirect to login page (or homepage)
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white w-[250px] h-full p-4 shadow-lg fixed right-0 top-0">
          <button
            onClick={toggleSidebar}
            className="p-2 text-blue-500 absolute top-4 right-4"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <ul className="mt-12">
            <li className="mb-4">
              <NavLink
                to="/homepage"
                className="flex items-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out px-1 py-2 rounded-md"
              >
                <HomeIcon className="w-7 h-7 mr-2" />
                Home
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/my-library"
                className="flex items-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out px-1 py-2 rounded-md"
              >
                <BuildingLibraryIcon className="w-7 h-7 mr-2" />
                My Library
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/profile"
                className="flex items-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out px-1 py-2 rounded-md"
              >
                <UserIcon className="w-7 h-7 mr-2" />
                Profile
              </NavLink>
            </li>

            {/* Show Admin button only if the user's role is 'admin' */}
            {userRole === "admin" && (
              <li className="mb-4">
                <NavLink
                  to="/admin"
                  className="flex items-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out px-1 py-2 rounded-md"
                >
                  <Cog6ToothIcon className="w-7 h-7 mr-2" />
                  Admin
                </NavLink>
              </li>
            )}
          </ul>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-800 hover:bg-blue-600 bg-white hover:text-white transition-colors duration-300 ease-in-out px-1 py-2 rounded-md mt-4 w-full"
          >
            <PowerIcon className="w-7 h-7 mr-2" />
            Logout
          </button>
        </div>
      </div>
    )
  );
}

export default Sidebar;
