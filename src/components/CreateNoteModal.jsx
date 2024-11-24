// CreateNoteModal.js
import React, { useState } from 'react';

function CreateNoteModal({ isOpen, onClose, onSubmit, categories }) {
    const [newNote, setNewNote] = useState({
        title: "",
        description: "",
        category: "",
        coverImage: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote({ ...newNote, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewNote({ ...newNote, coverImage: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newNote);
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-medium mb-4">Create Note</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={newNote.title}
                                onChange={handleInputChange}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Description</label>
                            <textarea
                                name="description"
                                value={newNote.description}
                                onChange={handleInputChange}
                                className="w-full border px-3 py-2 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Category</label>
                            <select
                                name="category"
                                value={newNote.category}
                                onChange={handleInputChange}
                                className="w-full border px-3 py-2 rounded"
                                required
                            >
                                <option value="" disabled>Select category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Cover Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default CreateNoteModal;
