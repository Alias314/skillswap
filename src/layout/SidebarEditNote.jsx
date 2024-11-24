import React from "react";

const SidebarEditNote = ({ chapters, selectedChapter, setSelectedChapter, addChapter }) => {
  return (
    <div className="w-[15%] bg-gray-100 p-4 mr-72 border-r border-gray-300 shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-4">Chapters</h2>
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <button
            key={index}
            onClick={() => setSelectedChapter(index)}
            className={`block w-full text-left py-2 px-4 rounded-lg ${
              selectedChapter === index ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {chapter.title}
          </button>
        ))}
      </div>
      <button
        onClick={addChapter}
        className="mt-4 w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Add Chapter
      </button>
    </div>
  );
};

export default SidebarEditNote;