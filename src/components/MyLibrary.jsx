import React, { useEffect, useState } from "react";
import { firestore } from "../firebase"; // Ensure this points to your Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore";

function MyLibrary({ userId }) {
    const [bookmarkedNotes, setBookmarkedNotes] = useState([]);
    const [userNotes, setUserNotes] = useState([]);
    const [draftNotes, setDraftNotes] = useState([]);
    const [activeTab, setActiveTab] = useState("bookmarks");

    useEffect(() => {
        // Fetch notes that the user has bookmarked
        const fetchBookmarkedNotes = async () => {
            try {
                const bookmarksQuery = query(
                    collection(firestore, "notes"),
                    where("bookmarkedBy", "array-contains", userId) // Fetch notes where `bookmarkedBy` contains `userId`
                );
                const querySnapshot = await getDocs(bookmarksQuery);
                const bookmarks = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBookmarkedNotes(bookmarks);
            } catch (error) {
                console.error("Error fetching bookmarked notes: ", error);
            }
        };

        // Fetch notes created by the user (non-drafts)
        const fetchUserNotes = async () => {
            try {
                const userNotesQuery = query(
                    collection(firestore, "notes"),
                    where("userId", "==", userId),
                    where("isDraft", "==", false)
                );
                const querySnapshot = await getDocs(userNotesQuery);
                const notes = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUserNotes(notes);
            } catch (error) {
                console.error("Error fetching user notes: ", error);
            }
        };

        // Fetch draft notes created by the user
        const fetchDraftNotes = async () => {
            try {
                const draftNotesQuery = query(
                    collection(firestore, "notes"),
                    where("userId", "==", userId),
                    where("isDraft", "==", true)
                );
                const querySnapshot = await getDocs(draftNotesQuery);
                const drafts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDraftNotes(drafts);
            } catch (error) {
                console.error("Error fetching draft notes: ", error);
            }
        };

        fetchBookmarkedNotes();
        fetchUserNotes();
        fetchDraftNotes();
    }, [userId]);

    const renderNotesList = (notes) => (
        <ul>
            {notes.map(note => (
                <li key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content.slice(0, 100)}...</p>
                    {/* Add links or buttons to view/edit the note */}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="h-full relative top-5">
            <h1 className="font-semibold">My Library</h1>
            <div className="bg-white h-[90%] relative top-3">
                <button onClick={() => setActiveTab("bookmarks")}>Bookmarks</button>
                <button onClick={() => setActiveTab("userNotes")}>My Notes</button>
                <button onClick={() => setActiveTab("drafts")}>Drafts</button>
                
                {activeTab === "bookmarks" && (
                    <div>
                        <h2>Bookmarked Notes</h2>
                        {bookmarkedNotes.length > 0 ? renderNotesList(bookmarkedNotes) : <p>No bookmarks yet.</p>}
                    </div>
                )}
                {activeTab === "userNotes" && (
                    <div>
                        <h2>My Notes</h2>
                        {userNotes.length > 0 ? renderNotesList(userNotes) : <p>No notes created yet.</p>}
                    </div>
                )}
                {activeTab === "drafts" && (
                    <div>
                        <h2>Drafts</h2>
                        {draftNotes.length > 0 ? renderNotesList(draftNotes) : <p>No drafts available.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyLibrary;