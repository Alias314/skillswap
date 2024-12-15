import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarChapterView from "../layout/SidebarChapterView";
import "react-quill/dist/quill.snow.css"; // Quill's default theme
// import "./ChapterView.css"; // Custom styles for additional Quill support

const ChapterView = () => {
  const { noteId, chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [components, setComponents] = useState([]);
  const [chapters, setChapters] = useState([]);

  console.log("Rendered ChapterView");
  console.log("Params:", { noteId, chapterId });
  console.log("Selected Chapter ID (from URL):", parseInt(chapterId));

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const response = await fetch(
          `http://localhost/skillswap/backend/get_chapter_details.php?chapter_id=${chapterId}`
        );
        const data = await response.json();

        if (data.error) {
          console.error("Error fetching chapter data:", data.message);
        } else {
          setChapter(data.chapter);
          setComponents(data.components);
        }
      } catch (error) {
        console.error("Error fetching chapter data:", error);
      }
    };

    const fetchChaptersList = async () => {
      try {
        const response = await fetch(
          "http://localhost/skillswap/backend/get_chapters_list.php"
        );
        const data = await response.json();

        if (data.error) {
          console.error("Error fetching chapters list:", data.message);
        } else {
          setChapters(data.chapters);
        }
      } catch (error) {
        console.error("Error fetching chapters list:", error);
      }
    };

    fetchChapterData();
    fetchChaptersList();
  }, [noteId, chapterId]);

  if (!chapter) return <div>Loading...</div>;

  const handleChapterSelect = (chapterId) => {
    console.log("Selected Chapter ID:", chapterId);
    navigate(`/note/${noteId}/chapter/${chapterId}`);
  };

  return (
    <div className="h-screen w-screen flex bg-gray-100">
      {/* Sidebar */}
      <SidebarChapterView
        chapters={chapters}
        selectedChapter={parseInt(chapterId)}
        setSelectedChapter={handleChapterSelect}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-10">
        <div className="w-full max-w-4xl">
          <div className="">
            {components.map((component) => (
              <div
                key={component.component_id}
                className="bg-white shadow-md border border-gray-200"
              >
                <h2 className="w-full text-xl font-bol bg-blue-500 text-white mb-4 text-center py-4 m-0 shadow-lg border border-gray-500">
                  {component.title}
                </h2>
                <div className="p-6">
                  <div
                    className="ql-editor text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: component.content,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterView;
