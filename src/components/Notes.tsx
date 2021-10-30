import { getNote } from "../noteModel/getters";
import { Note } from "../noteModel/types";
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
  onSelectPreviousNote: (id: string) => void;
  onSelectNextNote: (id: string) => void;
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
  onSelectPreviousNote,
  onSelectNextNote,
}: NoteProps) {
  const note = getNote(notes, id);
  if (!note) {
    console.error("Note not found", id);
    return null;
  }

  if (!note.expanded) {
    return null;
  }

  return (
    <li>
      <ContentEditable
        className="px-5 py-3 m-3 rounded-xl shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-blue-900 dark:to-green-800"
        defaultValue={note.text}
        needsFocus={note.needsFocus}
        onNewValue={(value) => onUpdateNote(note._id, value)}
        onEnter={() => onAddNote(note._id)}
        onDelete={() => onDeleteNote(note._id)}
        onFocusTriggered={() => onFocusTriggered(note._id)}
        onIndent={() => onIndentNote(note._id)}
        onOutdent={() => onOutdentNote(note._id)}
        onSelectPrevious={() => onSelectPreviousNote(note._id)}
        onSelectNext={() => onSelectNextNote(note._id)}
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
            onSelectPreviousNote={onSelectPreviousNote}
            onSelectNextNote={onSelectNextNote}
          />
        ))}
      </ul>
    </li>
  );
}
