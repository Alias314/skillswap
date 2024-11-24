import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SidebarEditNote from "../layout/SidebarEditNote"; // Import the SidebarEditNote component

const InfoComponent = ({ title, content, onTitleChange, onChange, quillRef, imageHandler }) => (
  <div className="min-h-auto bg-white shadow-md p-4 border border-gray-300 flex flex-col">
    <input
      type="text"
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
      placeholder="Enter section title"
      className="text-xl font-semibold mb-2 w-full p-1 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
    />
    <div className="flex-grow">
      <ReactQuill
        value={content}
        onChange={onChange}
        modules={{
          toolbar: [
            // Text formatting options
            [{ header: [1, 2, 3, false] }], // Headers
            ["bold", "italic", "underline", "strike"], // Basic text formatting
            [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            [{ indent: "-1" }, { indent: "+1" }], // Indent options
            [{ align: [] }], // Alignment (left, center, right, justify)
            [{ direction: "rtl" }], // Right-to-left text
            // Color and background
            [{ color: [] }, { background: [] }], 
            // Media
            ["link", "image", "video"], // Insert links, images, and videos
            ["blockquote", "code-block"], // Blockquote and code block
            ["clean"], // Remove formatting
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "script",
          "list",
          "bullet",
          "indent",
          "align",
          "direction",
          "color",
          "background",
          "link",
          "image",
          "video",
          "blockquote",
          "code-block",
        ]}
        className="h-auto min-h-32"
        placeholder="Write content..."
        theme="snow"
        ref={quillRef}
      />
    </div>
  </div>
);

const EditNote = () => {
  const { noteId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const quillRef = useRef(); // Create a ref for ReactQuill

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
      const response = await fetch(
        "http://localhost/skillswap/backend/save_chapter.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noteId, chapter: newChapter }),
        }
      );

      const rawText = await response.text();
      console.log("Raw response:", rawText);

      if (!rawText) {
        throw new Error("Empty response from the server");
      }

      const result = JSON.parse(rawText);

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
      title: "Info Section",
      content: "",
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

  const saveData = async () => {
    try {
      const response = await fetch(
        "http://localhost/skillswap/backend/save_note.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noteId, chapters }),
        }
      );

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

  // Image handler
  const imageHandler = () => {
    console.log("Image handler triggered");

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("http://localhost/skillswap/backend/upload_image.php", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          const imageUrl = data.imageUrl;
          console.log("Image URL:", imageUrl);

          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          if (range) {
            quill.insertEmbed(range.index, "image", imageUrl);
          }
        } else {
          alert("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("An error occurred while uploading the image.");
      }
    };
  };

  return (
    <div className="h-screen w-screen flex">
      {/* Sidebar: Chapter Navigation */}
      <SidebarEditNote
        chapters={chapters}
        selectedChapter={selectedChapter}
        setSelectedChapter={setSelectedChapter}
        addChapter={addChapter}
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
              imageHandler={imageHandler} // Pass imageHandler to InfoComponent
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
