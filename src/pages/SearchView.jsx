// SearchView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchView = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(
          `http://localhost/skillswap/backend/get_note_by_id.php?note_id=${noteId}`
        );
        const data = await response.json();

        if (data.success) {
          setNote(data.note);
        } else {
          setError(data.message || "Note not found.");
        }
      } catch (err) {
        setError("An error occurred while fetching the note.");
        console.error("Error fetching note:", err);
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  if (error) return <p className="text-red-500">{error}</p>;

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p>{note.description}</p>
      {/* Add more note details here */}
    </div>
  );
};

export default SearchView;
