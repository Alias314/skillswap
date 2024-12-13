import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]); // State to hold search suggestions
  const navigate = useNavigate(); // Initialize useNavigate

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
          // Limit the results to the first 10
          setSearchSuggestions(data.notes.slice(0, 10));
        } else {
          setSearchSuggestions([]); // No results
        }
      } catch (err) {
        console.error("Error fetching search suggestions:", err);
        setSearchSuggestions([]); // Clear suggestions on error
      }
    } else {
      setSearchSuggestions([]); // Clear suggestions when the query is empty
    }
  };

  // Function to handle the click on a suggestion
  const handleSearchSelect = (noteId) => {
    // Navigate to the detail page for the selected note
    navigate(`/note/${noteId}`); // Assuming the route is "/note/:noteId"

    // Clear search suggestions when a result is selected
    setSearchSuggestions([]); // Hide the search suggestions
  };

  return (
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
        <div className="absolute bg-white border border-gray-200 shadow-lg rounded-md w-full mt-10 z-10">
          {" "}
          {/* mt-12 pushes results down */}
          <ul className="py-2">
            {searchSuggestions.map((note) => (
              <li
                key={note.note_id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSearchSelect(note.note_id)} // On click, navigate to the note
              >
                {note.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;