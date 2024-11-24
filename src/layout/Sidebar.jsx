import React from "react";
import { NavLink } from "react-router-dom";
import { XMarkIcon, HomeIcon, PlusIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";

function Sidebar({ isOpen, toggleSidebar }) {
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
                <BuildingLibraryIcon className="w-7 h-7 mr-2" />
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  );
}

export default Sidebar;