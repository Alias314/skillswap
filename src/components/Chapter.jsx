// src/components/Chapter.jsx

import React from "react";
import { Link } from "react-router-dom";

function Chapter({ chapter }) {
    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            {/* Make Chapter Title Clickable */}
            <Link to={`/note/${noteId}/chapter/${chapter.id}`} className="text-xl font-semibold text-gray-700 hover:text-blue-500">
                {chapter.title}
            </Link>

            {/* Chapter Description */}
            <p className="text-sm text-gray-600 mt-2">{chapter.description}</p>

            {/* Chapter Video */}
            {chapter.videoLink && (
                <div className="mt-4">
                    <iframe
                        src={chapter.videoLink}
                        title={`Video for ${chapter.title}`}
                        className="w-full h-64"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}

            {/* Chapter Images */}
            {chapter.images && chapter.images.length > 0 && (
                <div className="flex gap-4 mt-4">
                    {chapter.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Chapter Image ${index}`}
                            className="w-32 h-32 object-cover rounded-lg"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Chapter;
