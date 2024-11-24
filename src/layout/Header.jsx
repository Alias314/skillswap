import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";

const categories = [
  "Architecture",
  "Science",
  "Technology",
  "Mathematics",
  "Arts and Humanities",
  "Social Sciences",
  "Health and Medicine",
  "Business and Finance",
  "Education",
  "Engineering",
  "Languages",
  "Computer Science",
  "Law and Governance",
  "Psychology",
  "Philosophy",
  "Lifestyle and Wellness",
];

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const isAuthenticated = !!localStorage.getItem("authToken");

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    // Fetch search suggestions if query is not empty
    if (query.trim() !== "") {
      try {
        const response = await fetch(
          `http://localhost/skillswap/backend/search_notes.php?query=${query}`
        );
        const data = await response.json();

        if (data.success) {
          setSearchSuggestions(data.notes); // Set the notes as search suggestions
        } else {
          setSearchSuggestions([]); // No results
        }
      } catch (err) {
        console.error("Error fetching search suggestions:", err);
        setSearchSuggestions([]);
      }
    } else {
      setSearchSuggestions([]); // Clear suggestions when the query is empty
    }
  };

  const handleSearchSelect = (noteId) => {
    // Redirect to the SearchView page with the selected note
    navigate(`/search/${noteId}`);
    setSearchTerm(""); // Clear the search term after selection
    setSearchSuggestions([]); // Clear the suggestions after selection
  };

  const handleCategorySelect = (category) => {
    // Redirect to the CategoryView page with the selected category
    navigate(`/category/${category}`);
    setCategoriesVisible(false); // Hide categories dropdown after selection
  };

  return (
    <header className="h-14 w-full bg-white text-black flex items-center justify-between px-8 border-b-2 border-gray-300">
      <NavLink to="/homepage">
        <div className="flex items-center">
          <img
            src="/skillswap-logo-3-blue.png"
            alt="Skillswap Logo"
            className="w-12 h-12 mr-1 p-1"
          />
          <h1 className="text-3xl text-blue-500 font-semibold">Skillswap</h1>
        </div>
      </NavLink>

      <div className="relative w-[50%] flex">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray rounded-lg w-full p-2 pl-10 pr-4"
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />

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

        <div
          className="relative group ml-4"
          onMouseEnter={() => setCategoriesVisible(true)}
          onMouseLeave={() => setCategoriesVisible(false)}
        >
          <button className="px-4 py-2 text-black hover:text-blue-500">
            Categories
          </button>
          {categoriesVisible && (
            <div className="absolute left-0 bg-white border border-gray-300 shadow-lg rounded-md w-48 z-10">
              <ul className="py-2">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div>
        <nav className="flex space-x-4 items-center">
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
            <>
              <NavLink
                to="/login"
                className="px-5 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:text-white"
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className="px-5 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:text-white"
              >
                Sign up
              </NavLink>
            </>
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
