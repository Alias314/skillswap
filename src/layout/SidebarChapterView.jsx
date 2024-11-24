import React from "react";

const SidebarChapterView = ({ chapters, selectedChapter, setSelectedChapter }) => {
  return (
    <div className="w-[15%] bg-gray-100 mr-72 p-4 border-r border-gray-300 shadow-md">
      <h2 className="text-xl font-bold mb-4">Chapters</h2>
      <div className="space-y-2">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => setSelectedChapter(chapter.id)}
            className={`block w-full text-left py-2 px-4 rounded-lg ${
              parseInt(selectedChapter) === parseInt(chapter.id)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {chapter.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarChapterView;