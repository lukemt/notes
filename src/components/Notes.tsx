import { Note } from "../types";
import ContentEditable from "./ContentEditable";

interface NoteProps {
  notes: Note[];
  id: string;
  onUpdateNote: (id: string, value: string) => void;
  onAddNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onFocusTriggered: (id: string) => void;
  onIndentNote: (id: string) => void;
  onOutdentNote: (id: string) => void;
}

export default function Notes({
  notes,
  id,
  onUpdateNote,
  onAddNote,
  onDeleteNote,
  onFocusTriggered,
  onIndentNote,
  onOutdentNote,
}: NoteProps) {
  const note = getNote(notes, id);
  if (!note) {
    console.error("Note not found", id);
    return null;
  }

  return (
    <li>
      <ContentEditable
        className="px-5 py-3 m-5 rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg"
        defaultValue={note.text}
        needsFocus={note.needsFocus}
        onNewValue={(value) => onUpdateNote(note._id, value)}
        onEnter={() => onAddNote(note._id)}
        onDelete={() => onDeleteNote(note._id)}
        onFocusTriggered={() => onFocusTriggered(note._id)}
        onIndent={() => onIndentNote(note._id)}
        onOutdent={() => onOutdentNote(note._id)}
      />
      <ul className="pl-10">
        {note.childrenIds.map((childId) => (
          <Notes
            key={childId}
            notes={notes}
            id={childId}
            onUpdateNote={onUpdateNote}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            onFocusTriggered={onFocusTriggered}
            onIndentNote={onIndentNote}
            onOutdentNote={onOutdentNote}
          />
        ))}
      </ul>
    </li>
  );
}

function getNote(notes: Note[], id: string) {
  return notes.find((note) => note._id === id);
}
