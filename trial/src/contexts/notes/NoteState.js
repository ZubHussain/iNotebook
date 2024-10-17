import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://i-notebook-backend-one.vercel.app";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //==========================================Get all Notes ==============================================================
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken')
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //==========================================Add a note ==============================================================
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));

  };

  //==========================================Delete a note ==============================================================
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken')
      },
    });
    const json = await response.json();
    setNotes(json);

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //==========================================Edit a note ==============================================================
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
