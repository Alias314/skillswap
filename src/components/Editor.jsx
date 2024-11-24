import React from 'react';

const Editor = ({ note, setNote, noteId }) => {
  return (
    <div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Edit your note"
      />
      {/* Add any additional logic or styling for the editor */}
    </div>
  );
};

export default Editor;
