// InfoComponent.jsx
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const InfoComponent = ({
  title,
  content,
  onTitleChange,
  onChange,
  quillRef,
  onDelete, // Add the delete function as a prop
}) => (
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
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            [{ direction: "rtl" }],
            [{ color: [] }, { background: [] }],
            ["link", "image", "video"],
            ["blockquote", "code-block"],
            ["clean"],
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
    <button
      onClick={onDelete}
      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
    >
      Delete Component
    </button>
  </div>
);

export default InfoComponent;
