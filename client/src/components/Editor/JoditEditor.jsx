// JoditEditorComponent.js
import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const JoditEditorComponent = ({ value, onChange }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={value}
      onChange={onChange} // Call the provided onChange function
    />
  );
};

export default JoditEditorComponent;
