// NotesGrid.js
import React from "react";
import { NavLink } from "react-router-dom";

const NotesGrid = ({ notes, handleDeleteNote }) => {
  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {notes.map((note) => (
            <div
              key={note.note_id}
              className="w-full max-w-xs mx-auto border rounded-lg shadow-sm hover:shadow-xl transition transform hover:scale-105 flex flex-col"
            >
              <NavLink to={`/note/${note.note_id}`} className="flex-grow">
                <div className="w-full h-40 bg-gray-200 mb-3 flex items-center justify-center relative">
                  {note.cover_image ? (
                    <img
                      src={"backend/" + note.cover_image}
                      alt={note.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>

                <div className="pl-3">
                  <h2 className="text-lg font-medium text-gray-800 mb-2">
                    {note.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {note.description || "No description"}
                  </p>
                </div>
                <div className="flex items-center pl-3 mb-3">
                  <img
                    src={
                      "backend/" + note.profile_image || "/default-profile.png"
                    }
                    alt={note.username}
                    className="w-8 h-8 object-cover rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-700">{note.author}</span>
                </div>
              </NavLink>

              {/* User Info: Username and Profile Image */}

              {/* Action buttons: Edit and Delete */}
              <div className="flex justify-between items-center mt-auto">
                <NavLink to={`/edit-note/${note.note_id}`} className="w-1/2">
                  <button className="w-full text-sm text-white bg-blue-500 hover:bg-blue-700 py-2 rounded-none rounded-bl-lg">
                    Edit
                  </button>
                </NavLink>
                <button
                  onClick={() => handleDeleteNote(note.note_id)} // Pass note_id to handleDeleteNote
                  className="w-1/2 text-sm text-white bg-red-500 hover:bg-red-700 py-2 rounded-none rounded-br-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesGrid;
