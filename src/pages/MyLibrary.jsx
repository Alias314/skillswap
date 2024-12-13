// MyLibrary.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNoteModal from "../components/CreateNoteModal";
import DeleteNoteModal from "../components/DeleteNoteModal";
import { NavLink } from "react-router-dom";
import NotesGrid from "../components/NotesGrid"; // Importing NotesGrid Component

function MyLibrary() {
  const [activeTab, setActiveTab] = useState("bookmarks");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

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

  const fetchNotes = async (type) => {
    setLoading(true);
    setError(null);
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      setError("User is not logged in.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost/skillswap/backend/my_library.php?type=${type}&user_id=${userId}`
      );
      setNotes(response.data);
    } catch (err) {
      setError("Failed to fetch notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(activeTab);
  }, [activeTab]);

  const handleCreateNote = async (newNote) => {
    const formData = new FormData();
    formData.append("title", newNote.title);
    formData.append("description", newNote.description);
    formData.append("category", newNote.category);

    // Get the user_id from localStorage
    const userId = localStorage.getItem("user_id");

    if (userId) {
      formData.append("user_id", userId); // Add user_id to the formData
    } else {
      setError("User is not logged in."); // Handle the case where user_id is not in localStorage
      return;
    }

    if (newNote.coverImage) {
      formData.append("coverImage", newNote.coverImage);
    }

    try {
      const response = await axios.post(
        "http://localhost/skillswap/backend/create_note.php",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        fetchNotes(activeTab); // Refresh notes
        setIsModalOpen(false); // Close modal
      } else {
        setError(response.data.message || "Failed to create note.");
      }
    } catch (err) {
      setError("Failed to create note. Please try again later.");
    }
  };

  const handleDeleteNote = async () => {
    try {
      const response = await axios.delete(
        "http://localhost/skillswap/backend/delete_note.php?note_id=${noteToDelete}"
      );
      if (response.data.success) {
        fetchNotes(activeTab); // Refresh notes
        setIsDeleteModalOpen(false); // Close modal
      } else {
        setError("Failed to delete note. Please try again later.");
      }
    } catch (err) {
      setError("Failed to delete note. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[70%] min-h-screen relative top-5 p-10">
        {/* Update the parent container to use h-auto or min-h-screen */}
        <div className="bg-white p-4 rounded-lg shadow-lg min-h-full">
          {" "}
          {/* Changed from h-[52rem] */}
          <div className="flex justify-between mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("bookmarks")}
                className={`px-4 py-2 rounded ${
                  activeTab === "bookmarks"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Bookmarks
              </button>
              <button
                onClick={() => setActiveTab("userNotes")}
                className={`px-4 py-2 rounded ${
                  activeTab === "userNotes"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                My Notes
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Create Note
            </button>
          </div>
          {loading && <p className="text-gray-600 mt-4">Loading...</p>}
          {error && <p className="text-red-600 mt-4">{error}</p>}
          {!loading && !error && (
            <>
              {notes.length > 0 ? (
                <NotesGrid notes={notes} handleDeleteNote={handleDeleteNote} /> 
              ) : (
                <p className="text-gray-600 mt-4">No notes available.</p>
              )}
            </>
          )}
        </div>
      </div>

      <CreateNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateNote}
        categories={categories}
      />

      <DeleteNoteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}

export default MyLibrary;
