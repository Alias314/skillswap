import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SidebarEditNote from "../components/SidebarEditNote";
import InfoComponent from "../components/InfoComponent";
import {
  saveNoteData,
  addChapterAPI,
  deleteComponentAPI,
} from "../components/noteAPI";

const EditNote = () => {
  const { noteId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const quillRef = useRef();

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const response = await fetch(
          `http://localhost/skillswap/backend/get_note.php?noteId=${noteId}`
        );
        const data = await response.json();

        if (data.success) {
          setChapters(data.chapters);
        } else {
          alert(data.message || "Failed to fetch note data.");
        }
      } catch (error) {
        console.error("Error fetching note data:", error);
        alert("An error occurred while fetching the note data.");
      }
    };

    fetchNoteData();
  }, [noteId]);

  const addChapter = async () => {
    const newChapter = {
      title: `Chapter ${chapters.length + 1}`,
      components: [],
      chapter_id: null,
    };

    try {
      const result = await addChapterAPI(noteId, newChapter);
      if (result.success && result.chapter_id) {
        newChapter.chapter_id = result.chapter_id;
        setChapters((prevChapters) => {
          const updatedChapters = [...prevChapters, newChapter];
          setSelectedChapter(updatedChapters.length - 1);
          return updatedChapters;
        });
      } else {
        alert("Failed to save chapter.");
      }
    } catch (error) {
      console.error("Error saving chapter:", error);
      alert("An error occurred while saving the chapter.");
    }
  };

  const addInfoComponent = () => {
    const updatedChapters = [...chapters];
    updatedChapters[selectedChapter].components.push({
      id: `component-${Date.now()}`, // Unique ID
      title: "Info Section",
      content: "",
      ref: React.createRef(), // Unique ref for each Quill instance
    });
    setChapters(updatedChapters);
  };
  

  const updateInfoTitle = (index, title) => {
    const updatedChapters = [...chapters];
    updatedChapters[selectedChapter].components[index].title = title;
    setChapters(updatedChapters);
  };

  const updateInfoContent = (index, content) => {
    const updatedChapters = [...chapters];
    updatedChapters[selectedChapter].components[index].content = content;
    setChapters(updatedChapters);
  };

  const deleteInfoComponent = async (componentIndex) => {
    const componentId =
      chapters[selectedChapter].components[componentIndex].component_id;

    try {
      const result = await deleteComponentAPI(componentId);
      if (result.success) {
        const updatedChapters = [...chapters];
        updatedChapters[selectedChapter].components.splice(componentIndex, 1);
        setChapters(updatedChapters);
      } else {
        alert("Failed to delete the component.");
      }
    } catch (error) {
      console.error("Error deleting component:", error);
      alert("An error occurred while deleting the component.");
    }
  };

  const saveData = async () => {
    try {
      const response = await saveNoteData(noteId, chapters);
      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving data.");
    }
  };

  const updateChapterTitle = (chapterId, newTitle) => {
    // Update the chapter title locally
    const updatedChapters = chapters.map((chapter) => {
      if (chapter.chapter_id === chapterId) {
        return { ...chapter, title: newTitle }; // Update the title
      }
      return chapter;
    });
    setChapters(updatedChapters);

    // Optionally, update the title in the backend
    const updateTitleInBackend = async () => {
      try {
        const response = await fetch(
          "http://localhost/skillswap/backend/update_chapter_title.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chapter_id: chapterId, title: newTitle }),
          }
        );
        const data = await response.json();
        if (!data.success) {
          alert("Failed to update title in the database.");
        }
      } catch (error) {
        console.error("Error updating chapter title:", error);
        alert("An error occurred while updating the chapter title.");
      }
    };

    updateTitleInBackend();
  };

  // Chapter deletion function
  const deleteChapter = async (chapterId) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      try {
        const response = await fetch(
          "http://localhost/skillswap/backend/delete_chapter.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ chapter_id: chapterId }),
          }
        );

        const data = await response.json();
        if (data.success) {
          setChapters((prevChapters) =>
            prevChapters.filter((chapter) => chapter.chapter_id !== chapterId)
          );
          alert("Chapter deleted successfully.");
        } else {
          alert(data.message || "Failed to delete chapter.");
        }
      } catch (error) {
        console.error("Error deleting chapter:", error);
        alert("An error occurred while deleting the chapter.");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex">
      {/* Sidebar: Chapter Navigation */}
      <SidebarEditNote
        chapters={chapters}
        selectedChapter={selectedChapter}
        setSelectedChapter={setSelectedChapter}
        addChapter={addChapter}
        deleteChapter={deleteChapter} // Pass deleteChapter to Sidebar
        updateChapterTitle={updateChapterTitle}
      />

      {/* Main Content Area */}
      <div className="w-2/4 mt-10">
        <button
          onClick={addInfoComponent}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-6"
        >
          Add Info Component
        </button>

        <div>
          {chapters[selectedChapter]?.components.map((component, index) => (
            <InfoComponent
              key={index}
              title={component.title}
              content={component.content}
              onTitleChange={(title) => updateInfoTitle(index, title)}
              onChange={(content) => updateInfoContent(index, content)}
              quillRef={quillRef}
              onDelete={() => deleteInfoComponent(index)} // Pass the delete function
            />
          ))}
        </div>

        <button
          onClick={saveData}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-6"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditNote;
