import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CategoryView = () => {
  const { categoryName } = useParams();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotesByCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost/skillswap/backend/get_notes_by_category.php?category=${categoryName}`
        );
        const data = await response.json();

        if (data.success) {
          setNotes(data.notes);
        } else {
          setError(data.message || "Failed to fetch notes for this category.");
        }
      } catch (err) {
        setError("An error occurred while fetching notes.");
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotesByCategory();
  }, [categoryName]);

  return (
    <div className="px-8 py-4">
      <h1 className="text-3xl font-semibold text-blue-500 mb-6">
        {categoryName}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {notes.map((note) => (
          <div
            key={note.note_id}
            className="w-full max-w-xs mx-auto border rounded-lg shadow-sm hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <Link to={`/note/${note.note_id}`}>
              <div className="w-full h-40 bg-gray-200 mb-3 flex items-center justify-center relative">
                {note.cover_image ? (
                  <img
                    src={`http://localhost/skillswap/backend/${note.cover_image}`}
                    alt={note.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">Why no image</span>
                )}
              </div>
              <div className="px-3 py-2">
                <h2 className="text-md font-medium text-gray-800 mb-2">
                  {note.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {note.description || "No description"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryView;
