import { createContext, useContext, useState } from "react";
import {
  createNoteRequest,
  deleteNoteRequest,
  getNoteRequest,
  getNotesRequest,
  updateNoteRequest,
} from "../api/notes.js";

const NoteContext = createContext();

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) throw new Error("useNotes must be used within a NoteProvider");
  return context;
};

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const res = await getNotesRequest();
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteNoteRequest(id);
      setNotes((notes) => notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  const createNote = async (noteData) => {
    try {
      // Enviar tal cual el objeto recibido; backend hará la conexión con tags
      const res = await createNoteRequest(noteData);
      return res.data;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  };

  const getNote = async (id) => {
    try {
      const res = await getNoteRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching note:", error);
      throw error;
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      // Enviar el id y los datos; backend actualizará la nota y las relaciones tags
      const noteToUpdate = { id, ...noteData };
      const res = await updateNoteRequest(noteToUpdate);
      return res.data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        getNotes,
        deleteNote,
        createNote,
        getNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
