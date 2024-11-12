import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from "../firebase";
import { collection, getDocs } from 'firebase/firestore';

const categories = [
    'All', 'Science', 'Math', 'Programming', 'Biology', 'Chemistry', 'Physics', 'Literature', 'History', 'Geography',
    'Economics', 'Psychology', 'Philosophy', 'Engineering', 'Data Science', 'Medicine', 'Law', 'Architecture',
    'Algorithms', 'Web Development', 'Mobile Development', 'Artificial Intelligence', 'Cybersecurity',
    'English', 'Spanish', 'French', 'Chinese', 'Art and Design', 'Music Theory', 'Cooking', 'Photography',
    'Writing', 'Business', 'Finance', 'Project Management', 'Public Speaking', 'Nutrition', 'Exercise Science',
    'Mental Health'
];

function Explore() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const notesCollection = collection(firestore, 'notes');
                const noteSnapshot = await getDocs(notesCollection);
                const notesList = noteSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().date ? doc.data().date.toDate() : new Date(),
                }));
                setNotes(notesList);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, []);

    // Group notes by category
    const groupedNotes = categories.reduce((acc, category) => {
        acc[category] = notes.filter(note => note.category === category);
        return acc;
    }, {});

    return (
        <div className='h-screen'>
            <div className='flex items-center justify-center h-[50%] w-full bg-blue-500 gap-20 shadow-md'>
                <div>
                    <h1 className='max-w-[32rem] text-6xl mb-5 font-semibold text-white'>All the notes you need in one place</h1>
                    <p className='max-w-[30rem] text-xl text-white'>From critical skills to technical topics, Skillswap supports your professional development.</p>
                </div>
                <img src='note-illustration-2.png' className='h-[27rem] w-auto'></img>
            </div>

            {/* <h1 className='text-center'>All the notes you need in one place</h1> */}
            <div className="p-6 flex justify-center">
                <div className="w-full max-w-7xl">
                    {/* Loop through categories and display notes for each category */}
                    {categories.map((category) => {
                        const categoryNotes = groupedNotes[category];
            
                        return categoryNotes.length > 0 && (
                            <div key={category} className="mb-8">
                                <h2 className="text-2xl font-semibold text-left mb-4">{category}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {categoryNotes.map(note => (
                                        <div key={note.id} className="w-full max-w-xs mx-auto border rounded-lg shadow-sm hover:shadow-xl transition transform hover:scale-105">
                                            <Link to={`/note/${note.id}`}>
                                                {/* Cover Image */}
                                                <div className="w-full h-40 bg-gray-200 mb-3 flex items-center justify-center relative">
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
                                                <div className='pl-3'>
                                                    {/* Title */}
                                                    <h2 className="text-md font-medium text-gray-800 mb-2">{note.title}</h2>
                                                    {/* Author Name */}
                                                    <p className="text-sm text-gray-600 mb-2">By {note.author || "Unknown"}</p>
                                                    {/* Rating */}
                                                    {note.rating && (
                                                        <p className="text-yellow-500 font-medium">
                                                            Rating: {note.rating}/5
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
    
    
}

export default Explore;
