import axios from "./axios";


export const getNotesRequest = async () => axios.get("/notes");

export const createNoteRequest = async (note) => axios.post("/notes", note);

export const updateNoteRequest = async (note) => {
  console.log("note.id:", note.id); // Verificamos que el ID exista
  return axios.put(`/notes/${note.id}`, note); // Enviamos los datos editados al backend
};


export const deleteNoteRequest = async (id) => axios.delete(`/notes/${id}`);

export const getNoteRequest = async (id) => axios.get(`/notes/${id}`);