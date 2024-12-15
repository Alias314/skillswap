import React, { useState } from "react";
import {
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline"; // Import Heroicons

const SidebarEditNote = ({
  chapters,
  selectedChapter,
  setSelectedChapter,
  addChapter,
  deleteChapter,
  updateChapterTitle, // New function to update chapter title
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSave = async (chapterId) => {
    if (newTitle.trim()) {
      // Update the chapter title locally
      updateChapterTitle(chapterId, newTitle);
      setEditingIndex(null);
      setNewTitle("");
    }
  };

  const handleTitleCancel = () => {
    setEditingIndex(null);
    setNewTitle("");
  };

  return (
    <div className="w-[15%] bg-gray-100 p-4 mr-72 border-r border-gray-300 shadow-md">
      <h2 className="text-xl font-bold mb-4">Chapters</h2>
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.chapter_id} // Use chapter_id to ensure uniqueness
            onClick={() => setSelectedChapter(index)}
            className={`block w-full text-left py-2 px-4 rounded-lg ${
              selectedChapter === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {editingIndex === index ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                  className="px-2 py-1 border rounded text-black max-w-full"
                />
                <button
                  onClick={() => handleTitleSave(chapter.chapter_id)}
                  className="p-0 bg-transparent text-green-500 hover:text-green-700"
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={handleTitleCancel}
                  className="p-0 bg-transparent text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="flex-1">{chapter.title}</span>
                <button
                  onClick={() => {
                    setEditingIndex(index);
                    setNewTitle(chapter.title); // Set current title to be edited
                  }}
                  className={`p-0 bg-transparent ${
                    selectedChapter === index
                      ? "text-white hover:text-white"
                      : "text-blue-500 hover:text-blue-700"
                  }`}
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteChapter(chapter.chapter_id)}
                  className={`p-0 bg-transparent ${
                    selectedChapter === index
                      ? "text-white hover:text-white"
                      : "text-red-500 hover:text-red-700"
                  }`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </button>
        ))}
      </div>
      <button
        onClick={addChapter}
        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Chapter
      </button>
    </div>
  );
};

export default SidebarEditNote;
