import { useEffect, useState } from "react";
import api from "../api";
import AddNoteForm from "./AddNoteForm";

const NotesList = () => {
  const [ notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data.notes);

    } catch(error) {
      console.log("Error fetching the notes", error);
    }
  }

  const addNote = async (note) => {
    try {
      const response = await api.post('/notes', {content: note});
      setNotes((currentNotes) => [...currentNotes, response.data]);
      

    } catch(error) {
      console.log("Error adding note", error);
    }
  };
  
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Notes List</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.content}</li>
        ))}
      </ul>
      <AddNoteForm addNote={addNote} />
    </div>
  );

};

export default NotesList;