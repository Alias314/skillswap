import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateNoteModal from "../components/CreateNoteModal";
import DeleteNoteModal from "../components/DeleteNoteModal"; // Import the DeleteNoteModal
import { NavLink } from "react-router-dom";

function MyLibrary() {
  const [activeTab, setActiveTab] = useState("bookmarks");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null); // Store note to delete

  // Categories for the dropdown
  const categories = [
    "Science", "Math", "Programming", "Biology", "Chemistry", "Physics", 
    "Literature", "History", "Geography", "Economics", "Psychology", 
    "Philosophy", "Engineering", "Data Science", "Medicine", "Law", 
    "Architecture", "Algorithms", "Web Development", "Mobile Development", 
    "Artificial Intelligence", "Cybersecurity", "English", "Spanish", 
    "French", "Chinese", "Art and Design", "Music Theory", "Cooking", 
    "Photography", "Writing", "Business", "Finance", "Project Management", 
    "Public Speaking", "Nutrition", "Exercise Science", "Mental Health",
  ];

  // Fetch notes from the server
  const fetchNotes = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost/skillswap/backend/my_library.php?type=${type}`
      );
      setNotes(response.data);
    } catch (err) {
      setError("Failed to fetch notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch notes when the active tab changes
  useEffect(() => {
    fetchNotes(activeTab);
  }, [activeTab]);

  const handleCreateNote = async (newNote) => {
    const formData = new FormData();
    formData.append("title", newNote.title);
    formData.append("description", newNote.description);
    formData.append("category", newNote.category);
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
        `http://localhost/skillswap/backend/delete_note.php?note_id=${noteToDelete}`
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

  const renderNotesGrid = (notes) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {notes.map((note) => (
        <div key={note.note_id} className="relative">
          <NavLink
            to={`/note/${note.note_id}`}
            className="bg-white w-full max-w-xs mx-auto shadow-sm hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
          >
            <div className="w-full h-40 bg-gray-200 mb-3 flex items-center justify-center relative">
              {note.cover_image ? (
                <img
                  src={'backend/' + note.cover_image}
                  alt={note.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
            <div className="pl-3">
              <h2 className="text-md font-medium text-gray-800 mb-2">
                {note.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                By {note.author || "Unknown"}
              </p>
            </div>
          </NavLink>
  
          <NavLink
            to={`/edit-note/${note.note_id}`} // Pass note_id to the edit route
            className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white rounded-lg"
          >
            Edit
          </NavLink>

          <button
            onClick={() => {
              setNoteToDelete(note.note_id); // Set the note_id to delete
              setIsDeleteModalOpen(true); // Open delete confirmation modal
            }}
            className="absolute top-2 right-16 px-3 py-1 bg-red-500 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-center">
      <div className="w-[70%] min-h-screen relative top-5 p-10">
        <div className="h-[52rem] bg-white p-4 rounded-lg shadow-lg">
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
                renderNotesGrid(notes)
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

      {/* Delete Confirmation Modal */}
      <DeleteNoteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}

export default MyLibrary;
