// api/noteAPI.js
export const saveNoteData = async (noteId, chapters) => {
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
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while saving note data.");
  }
};

export const addChapterAPI = async (noteId, newChapter) => {
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

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving chapter:", error);
    throw new Error("An error occurred while saving chapter.");
  }
};

// api/noteAPI.js

export const deleteComponentAPI = async (componentId) => {
  try {
    const response = await fetch(
      "http://localhost/skillswap/backend/delete_component.php",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ component_id: componentId }),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting component:", error);
    throw new Error("An error occurred while deleting the component.");
  }
};
