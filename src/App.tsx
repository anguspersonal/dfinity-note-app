import './App.css';
import { useQueryCall, useMethod } from '@ic-reactor/react';
import React, { useState } from 'react';
import CreateArea from './components/CreateArea';
import { Note } from './.types';

const App: React.FC = () => {
  const [error, setError] = useState<string | null>(null); // Error can be string or null

  // Define function for getting notes
  const { data: notes, call: refetchNotes } = useQueryCall({
    functionName: 'getNotes',
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // Moved to CreateArea.tsx
  // // Define function for creating a note
  // const { call: createNoteCall, data, loading } = useMethod({
  //   functionName: 'createNote',
  //   args: ['noteTitle', 'noteContent'],
  //   onSuccess: (data) => {
  //     console.log(data);
  //     refetchNotes();
  //   },
  //   onError: (error) => {
  //     setError(error?.message || 'An unknown error occurred');
  //   },
  // });

// // Wrapper function to match the expected signature
// const createNote = (note: Omit<Note, 'id'>) => {
// // New way - matching the IC backend expectation
//   createNoteCall(note.title, note.content);
// };

  return (
    <div className="App">
      <CreateArea refetchNotes={refetchNotes} /> {/* Pass refetchNotes to CreateArea */}
      {notes?.map((note: Note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
