import { useState } from "react";

const AddNoteForm = ({ addNote }) => {
  const [ note, setNote ] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(note) {
      addNote(note);
      setNote("");

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write your note.."/>
      <button type="submit">Add Note</button>
    </form>
  );

};

export default AddNoteForm