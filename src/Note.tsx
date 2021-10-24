import { Note } from "./types";
import ContentEditable from "./ContentEditable";
interface NoteProps {
  notes: Note[];
  id: string;
  onUpdate: (id: string, value: string) => void;
}

export default function Notes({ notes, id, onUpdate }: NoteProps) {
  const note = getNote(notes, id);
  if (!note) {
    console.error("Note not found", id);
    return null;
  }
  // const children = getNotes(notes, note.children);

  return (
    <ul className="pl-10">
      <li>
        <ContentEditable
          defaultValue={note.text}
          onNewValue={(value) => onUpdate(note._id, value)}
          className="px-5 py-3 m-5 rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg"
        />
        {note.children.map((childId) => (
          <Notes key={childId} notes={notes} id={childId} onUpdate={onUpdate} />
        ))}
      </li>
    </ul>
  );
}

function getNote(notes: Note[], id: string) {
  return notes.find((note) => note._id === id);
}

function getNotes(notes: Note[], ids: string[]) {
  return notes.filter((note) => ids.includes(note._id));
}
