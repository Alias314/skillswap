// src/components/ReadNote.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import ChaptersList from "./ChaptersList";
import { BookmarkIcon } from "@heroicons/react/24/outline";

function ViewNote() {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const docRef = doc(firestore, "notes", noteId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setNote(docSnap.data());
                } else {
                    setError("Note not found");
                }
            } catch (err) {
                setError("Failed to load note");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [noteId]);

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="mt-8 p-8 max-w-3xl mx-auto bg-white rounded-md shadow-md">

                {/* Note Content */}
                <div className="mb-4">
                    {/* Cover Image */}
                    <div className="w-full h-96 bg-gray-100 rounded-lg mb-6 flex items-center justify-center relative">
                        {note.coverImageUrl ? (
                            <img
                                src={note.coverImageUrl}
                                alt={note.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <span className="text-gray-500">No Image</span>
                        )}
                    </div>

                    {/* Title and Author */}
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-2">{note.title}</h1>
                        <p className="text-gray-600 text-lg font-semibold">4/5</p>
                    </div>
                    <p className="text-gray-600 text-md mb-4">By {note.author || "Unknown Author"}</p>

                    {/* Bookmark Button */}
                    <div className="flex items-center mb-4">
                        <button className="hover:text-blue-500">
                            <BookmarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Description */}
                    <p className="text-md text-gray-700 leading-relaxed">
                        {note.description}
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo aut nam eligendi dignissimos corporis suscipit sed repellat dolorem reprehenderit, alias dolores id, tempora at ipsa distinctio esse quisquam quam natus!    
                    </p>
                </div>

                {/* Chapters */}

                {/* Embedded Video */}
                {note.videoLink && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Video</h2>
                        <iframe
                            src={note.videoLink}
                            title="Embedded Video"
                            className="w-full h-64 rounded-lg shadow-md"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
            <div className="mt-3 p-8 max-w-3xl mx-auto mb-5 bg-white rounded-md shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Chapters</h2>
                <ChaptersList chapters={note.chapters} />
            </div>
        </div>
    );
}

export default ViewNote;