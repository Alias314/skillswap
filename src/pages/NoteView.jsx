// src/pages/NoteView.jsx
import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

const NoteView = () => {
  const { noteId } = useParams(); // Retrieve the noteId from the URL
  const [note, setNote] = useState(null);
  const [chapters, setChapters] = useState([]);

  // Fetch the note data and chapters when the component mounts
  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const response = await fetch(
          `http://localhost/skillswap/backend/get_note_details.php?note_id=${noteId}`
        );
        const data = await response.json();

        if (data.error) {
          console.error("Error fetching note data:", data.error);
        } else {
          setNote(data.note);
          setChapters(data.chapters);
        }
      } catch (error) {
        console.error("Error fetching note data:", error);
      }
    };

    fetchNoteData();
  }, [noteId]);

  // If the note is not yet loaded
  if (!note) return <div>Loading...</div>;

  return (
    <div>
      <div className="mt-8 p-8 max-w-3xl mx-auto bg-white rounded-md shadow-md">
        <div className="mb-4">
          <div className="w-full h-96 bg-gray-100 rounded-lg mb-6 flex items-center justify-center relative">
            <img
              src={"backend/" + note.cover_image} // Path to cover image
              alt={note.title}
              className="w-full h-64 object-cover mb-4"
            />
          </div>
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              {note.title}
            </h1>
          </div>
          <p className="text-gray-600 text-md mb-4">
            Author: {note.author || "Unknown"}
          </p>
          <p className="text-gray-500">{note.description}</p>
        </div>
      </div>

      <div className="mt-3 p-8 max-w-3xl mx-auto mb-5 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Chapters</h2>
        <div>
          {chapters.length === 0 ? (
            <div className="text-gray-600">
              No chapters available for this note.
            </div>
          ) : (
            chapters.map((chapter) => (
              <NavLink
                to={`/note/${noteId}/chapter/${chapter.chapter_id}`}
                key={chapter.chapter_id}
                className="block mb-2 p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out group"
              >
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white">
                  {chapter.title}
                </h3>
              </NavLink>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteView;