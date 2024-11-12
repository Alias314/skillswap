import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function ChapterView() {
    const { noteId, chapterId } = useParams();
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const noteRef = doc(firestore, "notes", noteId);
                const noteSnap = await getDoc(noteRef);

                if (noteSnap.exists()) {
                    const noteData = noteSnap.data();

                    // Check if chapters array exists
                    if (!noteData.chapters || !Array.isArray(noteData.chapters)) {
                        setError("No chapters found in this note");
                        return;
                    }

                    // Ensure chapterId is within bounds of chapters array
                    const chapterIndex = parseInt(chapterId, 10);
                    if (chapterIndex >= 0 && chapterIndex < noteData.chapters.length) {
                        setChapter(noteData.chapters[chapterIndex]);
                    } else {
                        setError("Chapter not found (invalid index)");
                    }
                } else {
                    setError("Note not found");
                }
            } catch (err) {
                setError("Failed to load chapter");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchChapter();
    }, [noteId, chapterId]);

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
            <p className="text-lg text-gray-700">{chapter.content}</p>
        </div>
    );
}

export default ChapterView;
