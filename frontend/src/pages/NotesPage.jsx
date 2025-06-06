// src/pages/NotesPage.jsx
import { useEffect, useState } from "react";
import { useNotes } from "../context/notesContext";
import { ImFileEmpty } from "react-icons/im";
import FilterBar from "../components/FilterBar/FilterBar";
import {NoteCard} from "../components/notes/NoteCard";

export function NotesPage() {
  const { notes, getNotes } = useNotes();
  const [stateFilter, setStateFilter] = useState("all"); // "all", "active", "archived"
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Obtener todas las notas
  useEffect(() => {
    getNotes();
  }, []);

  // Extraer tags únicos de todas las notas
  const availableTags = Array.from(
    new Set(
      notes.flatMap((note) => note.tags.map((tag) => tag.name))
    )
  );

  // Aplicar filtros cuando cambian las notas, stateFilter o selectedTags
  useEffect(() => {
    let result = notes;
    
    // Filtro por estado
    if (stateFilter === "active") {
      result = result.filter(note => !note.archived);
    } else if (stateFilter === "archived") {
      result = result.filter(note => note.archived);
    }
    // Si es "all", no se filtra por estado
    
    // Filtro por etiquetas
    if (selectedTags.length > 0) {
      result = result.filter(note => 
        note.tags.some(tag => selectedTags.includes(tag.name))
      );
    }
    
    setFilteredNotes(result);
  }, [notes, stateFilter, selectedTags]);

  // Manejar cambio de estado
  const handleStateChange = (newState) => {
    setStateFilter(newState);
  };

  // Manejar selección/deselección de tags
  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <div>
      <FilterBar
        onStateChange={handleStateChange}
        onTagToggle={handleTagToggle}
        availableTags={availableTags}
        currentState={stateFilter}
        selectedTags={selectedTags}
      />

      {filteredNotes.length === 0 ? (
        <div className="flex justify-center items-center p-10">
          <div className="text-center">
            <ImFileEmpty className="text-6xl text-gray-400 mx-auto mb-4" />
            <h1 className="font-bold text-xl text-gray-600">
              No se encontraron notas con los filtros seleccionados
            </h1>
            <p className="text-gray-500 mt-2">
              Intenta cambiar los filtros o crear una nueva nota
            </p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </div>
      )}
    </div>
  );
}