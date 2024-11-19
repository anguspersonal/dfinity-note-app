import React, { useState, FormEvent } from 'react';
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useQueryCall, useMethod, useUpdateCall } from '@ic-reactor/react';
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import { Note } from '../.types';

type CreateAreaProps = {
    refetchNotes: () => void; // Callback to refresh notes in App.tsx
  };

const CreateArea: React.FC<CreateAreaProps> = ({ refetchNotes }) => {
  const [isExpanded, setExpanded] = useState(false);
    const [error, setError] = useState<string | null>(null); // Error can be string or null
  const [note, setNote] = useState({ title: '', content: '' });

  const { call, data, loading } = useUpdateCall({
    functionName: "createNote", // Backend function name
    onLoading: (loading) => console.log("Loading:", loading),
    onError: (error) => {
      console.error("Error creating note:", error);
      setError(error?.message || "An unknown error occurred.");
    },
    onSuccess: (result) => {
      console.log("Note created successfully:", result);
      setNote({ title: "", content: "" }); // Clear the form
      setError(null); // Clear errors
    },
  });


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // if (!note.title.trim() || !note.content.trim()) {
    //   setError("Title and content are required.");
    //   console.error("Title and content are required.");
    //   return;
    // }

    console.log("Calling backend with:", note.title, note.content);

    // Pass arguments dynamically to `call`
    call({ args: [note.title] });
  };


  function expand() {
    setExpanded(true);
  }

  


  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            name="title"
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab type="submit">
            <AddBoxIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

export default CreateArea;