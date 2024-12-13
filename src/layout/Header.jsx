import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bars3Icon, UserIcon, CogIcon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component
import CategoriesDropdown from "../components/CategoriesDropdown"; // Import the CategoriesDropdown component

function Header() {
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const isAuthenticated = !!localStorage.getItem("authToken");

  const handleSearchSelect = (noteId) => {
    // Redirect to the SearchView page with the selected note
    navigate(`/search/${noteId}`);
    setSearchSuggestions([]); // Clear the suggestions after selection
  };

  return (
    <header className="h-14 w-full bg-white text-black flex items-center justify-between px-8 border-b-2 border-gray-300">
      <NavLink to="/homepage" className="flex items-center">
        <img
          src="/skillswap-logo-3-blue.png"
          alt="Skillswap Logo"
          className="w-12 h-12 mr-1 p-1"
        />
        <h1 className="text-3xl text-blue-500 font-semibold">Skillswap</h1>
      </NavLink>

      {/* Use SearchBar component here */}
      <div className="flex items-center space-x-4 w-full max-w-full ml-96">
        <SearchBar setSearchSuggestions={setSearchSuggestions} />
        <CategoriesDropdown />
      </div>

      {/* Display search suggestions */}
      {searchSuggestions.length > 0 && (
        <div className="absolute bg-white border border-gray-200 shadow-lg rounded-md w-full mt-1 z-10">
          <ul className="py-2">
            {searchSuggestions.map((note) => (
              <li
                key={note.note_id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSearchSelect(note.note_id)}
              >
                {note.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <nav className="flex space-x-4 items-center">
          {/* Use the CategoriesDropdown component */}

          {isAuthenticated ? (
            <div className="relative group">
              <UserIcon className="w-6 h-6 text-black hover:text-blue-500 cursor-pointer" />
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-md">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <NavLink
                      to="/profile"
                      className="flex items-center space-x-2"
                    >
                      <UserIcon className="w-5 h-5" />
                      <span>Profile</span>
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <NavLink
                      to="/settings"
                      className="flex items-center space-x-2"
                    >
                      <CogIcon className="w-5 h-5" />
                      <span>Settings</span>
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 w-full"
                    >
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )}

          <button onClick={toggleSidebar} className="p-1">
            <Bars3Icon className="w-6 h-6 text-black hover:text-blue-500" />
          </button>
        </nav>
      </div>

      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
}

export default Header;
