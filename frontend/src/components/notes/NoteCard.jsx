import { useNotes } from "../../context/notesContext";
import { Button, ButtonLink, Card } from "../ui";

export function NoteCard({ note }) {
  const { deleteNote } = useNotes();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteNote(note.id)}>Delete</Button>
          <ButtonLink to={`/notes/${note.id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{note.description}</p>
      {/* format date */}
      <p>
        {note.date &&
          new Date(note.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
