import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Explore() {
  const [notes, setNotes] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          "http://localhost/skillswap/backend/fetch_notes.php"
        );
        const data = await response.json();

        if (data.success) {
          setNotes(data.data); // data.data is grouped by category
        } else {
          setError(data.message || "Failed to fetch notes.");
        }
      } catch (err) {
        setError("An error occurred while fetching notes.");
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center h-[30rem] w-full bg-blue-500 gap-20 shadow-md">
        <div>
          <h1 className="max-w-[32rem] text-6xl mb-5 font-semibold text-white">
            All the notes you need in one place
          </h1>
          <p className="max-w-[30rem] text-xl text-white">
            From critical skills to technical topics, Skillswap supports your
            professional development.
          </p>
        </div>
        <img
          src="note-illustration-2.png"
          className="h-[27rem] w-auto"
          alt="Illustration"
        />
      </div>

      <div className="p-6 flex justify-center">
        <div className="w-full max-w-7xl">
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Loop through categories and display the notes within each category */}
          {Object.keys(notes).map((category) => {
  const categoryNotes = notes[category];

  return (
    categoryNotes.length > 0 && (
      <div key={category} className="mb-8">
        <h2 className="text-2xl font-semibold text-left mb-4">
          {category}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categoryNotes.slice(0, 5).map((note) => ( // Limit to 5 notes
            <div
              key={note.note_id}
              className="w-full max-w-xs mx-auto border rounded-lg shadow-sm hover:shadow-xl transition transform hover:scale-105"
            >
              <Link to={`/note/${note.note_id}`}>
                {/* Note Cover Image */}
                <div className="w-full h-40 bg-gray-200 mb-3 flex items-center justify-center relative">
                  {note.cover_image ? (
                    <img
                      src={"backend/" + note.cover_image}
                      alt={note.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>

                {/* Note Title and Description */}
                <div className="pl-3">
                  <h2 className="text-lg font-medium text-gray-800 mb-2">
                    {note.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {note.description || "No description"}
                  </p>
                </div>
              </Link>

              {/* User Info: Username and Profile Image */}
              <div className="flex items-center pl-3 mb-3">
                <img
                  src={
                    "backend/" + note.profile_image ||
                    "/default-profile.png"
                  }
                  alt={note.username}
                  className="w-8 h-8 object-cover rounded-full mr-2"
                />
                <span className="text-sm text-gray-700">
                  {note.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
})}

        </div>
      </div>
    </div>
  );
}

export default Explore;
