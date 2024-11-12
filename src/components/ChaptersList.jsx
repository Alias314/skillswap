import React from "react";

function ChaptersList() {
    // Sample hardcoded chapters
    const sampleChapters = [
        { id: 1, title: "Introduction", description: "Overview of the main concepts." },
        { id: 2, title: "Chapter 1: Basics", description: "Understanding the fundamental ideas." },
        { id: 3, title: "Chapter 2: Advanced Topics", description: "Diving deeper into complex areas." },
    ];

    return (
        <div>
            {sampleChapters.map((chapter) => (
                <div 
                    key={chapter.id} 
                    className="mb-2 p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-blue-500 transition-colors duration-300 ease-in-out group" 
                >
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white">{chapter.title}</h3>
                    <p className="text-gray-600 group-hover:text-white">{chapter.description}</p>
                </div>
            ))}
        </div>
    );
}

export default ChaptersList;