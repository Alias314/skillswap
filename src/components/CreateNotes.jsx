import React, { useState } from "react";
import { firestore, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill"; // Import rich text editor library
import "react-quill/dist/quill.snow.css";

function CreateNote() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Science");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner");
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [videoLink, setVideoLink] = useState("");
    const [chapters, setChapters] = useState([{ title: "Chapter 1", content: "" }]); // Initial empty content for Chapter 1
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0); // Keep track of the selected chapter index
    const [coverImage, setCoverImage] = useState(null); // State for storing the cover image URL

    const categories = [
        "Science", "Math", "Programming", "Biology", "Chemistry", "Physics", "Literature", "History", 
        "Geography", "Economics", "Psychology", "Philosophy", "Engineering", "Data Science", "Medicine",
        "Law", "Architecture", "Algorithms", "Web Development", "Mobile Development", "Artificial Intelligence",
        "Cybersecurity", "English", "Spanish", "French", "Chinese", "Art and Design", 
        "Music Theory", "Cooking", "Photography", "Writing", "Business", "Finance", "Project Management", 
        "Public Speaking", "Nutrition", "Exercise Science", "Mental Health"
    ];

    const difficulties = ["Beginner", "Intermediate", "Advanced"];

    const handleTagAdd = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `notes/images/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setImages([...images, downloadURL]);
        }
    };

    const handleCoverImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `notes/coverImages/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setCoverImage(downloadURL); // Store the cover image URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Clean the content (remove <p> tags and any other HTML tags)
        const cleanedContent = chapters.map(chapter => ({
            ...chapter,
            content: chapter.content.replace(/<[^>]+>/g, '') // Clean content for each chapter
        }));

        try {
            await addDoc(collection(firestore, "notes"), {
                title,
                category,
                content: cleanedContent.map(chapter => chapter.content).join("\n"),  // Store the plain text content
                tags,
                difficulty,
                images,
                videoLink,
                chapters: cleanedContent,  // Save the chapters array
                coverImage,  // Store the cover image URL
                createdAt: serverTimestamp()
            });

            // Clear form
            setTitle("");
            setCategory("Science");
            setTags([]);
            setDifficulty("Beginner");
            setImages([]);
            setVideoLink("");
            setCoverImage(null); // Reset cover image
            setChapters([{ title: "Chapter 1", content: "" }]);  // Reset chapters to default
            setSelectedChapterIndex(0); // Reset to the default chapter
            alert("Note created successfully!");

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error creating note. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Chapter Input
    const handleChapterChange = (index, value) => {
        setChapters((prevChapters) => {
            const updatedChapters = [...prevChapters];
            updatedChapters[index] = { ...updatedChapters[index], content: value };
            return updatedChapters;
        });
    };

    const handleAddChapter = () => {
        setChapters([...chapters, { title: `Chapter ${chapters.length + 1}`, content: "" }]);
    };

    const handleRemoveChapter = (index) => {
        const newChapters = chapters.filter((_, i) => i !== index);
        setChapters(newChapters);
        if (selectedChapterIndex >= newChapters.length) {
            setSelectedChapterIndex(newChapters.length - 1); // Update selected index if necessary
        }
    };

    const handleChapterClick = (index) => {
        // Set the new selected chapter index directly
        setSelectedChapterIndex(index);
    };

    return (
        <div className="m-6">
            {/* <h1 className="mb-4">Create Notes</h1> */}
            <h1>buggy for now</h1>
            <div className="flex justify-between gap-8 max-w-7xl mx-auto h-screen">
                {/* Left Section: Text Editor */}
                <div className="w-2/3 bg-white rounded-lg shadow-lg p-6 h-[100%]">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Note Content</h2>
                    <ReactQuill
                        value={chapters[selectedChapterIndex].content}  // Use the content of the selected chapter
                        onChange={(value) => handleChapterChange(selectedChapterIndex, value)} // Update the selected chapter's content
                        className="h-[85%]"
                        placeholder="Enter detailed content here..."
                        modules={{
                            toolbar: [
                                [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['bold', 'italic', 'underline'],
                                ['link'],
                                ['image'], // Add image option in toolbar
                            ]
                        }}
                        formats={['header', 'font', 'list', 'bold', 'italic', 'underline', 'link', 'image']}
                    />
                </div>

                {/* Right Section: Meta Info and Chapters */}
                <div className="w-1/3 p-6">
                    <div className="mb-8 bg-white rounded-md p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Note Info</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Title Input */}
                            <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter note title"
                            />

                            {/* Category Dropdown */}
                            <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            {/* Difficulty Level Dropdown */}
                            <label className="block mb-2 text-sm font-medium text-gray-700">Difficulty Level</label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {difficulties.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>

                            {/* Cover Image Upload */}
                            <label className="block mb-2 text-sm font-medium text-gray-700">Cover Image</label>
                            <input
                                type="file"
                                onChange={handleCoverImageUpload}
                                accept="image/*"
                                className="w-full mb-4"
                            />
                            {coverImage && (
                                <div className="mb-4">
                                    <img src={coverImage} alt="Cover" className="max-w-full h-auto rounded-md" />
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {isLoading ? "Creating..." : "Create Note"}
                            </button>
                        </form>
                    </div>

                    {/* Chapters */}
                    <div className="mb-8 bg-white rounded-md p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Chapters</h2>
                        <div>
                            {chapters.map((chapter, index) => (
                                <div key={index}>
                                    <button
                                        className={`w-full p-3 text-left ${selectedChapterIndex === index ? 'bg-blue-200' : 'bg-gray-100'} text-sm rounded mb-2`}
                                        onClick={() => handleChapterClick(index)}
                                    >
                                        {chapter.title}
                                    </button>
                                    {selectedChapterIndex === index && (
                                        <div className="ml-4">
                                            <textarea
                                                value={chapter.content}
                                                onChange={(e) => handleChapterChange(index, e.target.value)}
                                                rows={6}
                                                className="w-full p-3 border border-gray-300 rounded mb-4"
                                                placeholder="Enter chapter content"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleAddChapter}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Add Chapter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateNote;