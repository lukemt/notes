import { doc, onSnapshot, collection } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../contexts/FirebaseContext";
import { parseNote } from "../noteModel/parseNote";
import { Note } from "../noteModel/types";
import ContentEditable from "./ContentEditable";

interface NoteProps {
  id: string;
  onUpdateNote: (id: string, value: string) => void;
  onAddNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onFocusTriggered: (id: string) => void;
  onIndentNote: (id: string) => void;
  onOutdentNote: (id: string) => void;
  onSelectPreviousNote: (id: string) => void;
  onSelectNextNote: (id: string) => void;
  onExpandNote: (id: string) => void;
  onCollapseNote: (id: string) => void;
}

export default function Notes({
  id,
  onUpdateNote,
  onAddNote,
  onDeleteNote,
  onFocusTriggered,
  onIndentNote,
  onOutdentNote,
  onSelectPreviousNote,
  onSelectNextNote,
  onExpandNote,
  onCollapseNote,
}: NoteProps) {
  const [error, setError] = useState<Error | null>(null);
  const [note, setNote] = useState<Note | null>(null);

  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    const noteRef = doc(firebase.db, "notes", id);
    return onSnapshot(noteRef, (noteDoc) => {
      const docData = noteDoc.data();
      if (!docData) {
        console.error("No data for note", id);
        setError(new Error("No data for note"));
        return;
      }
      console.log("found note", docData);
      setNote(parseNote(noteDoc.id, docData));
    });
  }, [firebase, id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!note) {
    // loading
    return null;
  }

  return (
    <li>
      <ContentEditable
        className={
          "px-5 py-3 m-3 rounded-xl shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-blue-900 dark:to-green-800 " +
          (!note.isExpanded && note.childrenIds.length > 0
            ? "border-l-4 border-gray-500 dark:border-green-600"
            : "")
        }
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
        onExpand={() => onExpandNote(note._id)}
        onCollapse={() => onCollapseNote(note._id)}
      />
      {note.isExpanded && note.childrenIds.length > 0 && (
        <ul className="pl-10">
          {note.childrenIds.map((childId) => (
            <Notes
              key={childId}
              id={childId}
              onUpdateNote={onUpdateNote}
              onAddNote={onAddNote}
              onDeleteNote={onDeleteNote}
              onFocusTriggered={onFocusTriggered}
              onIndentNote={onIndentNote}
              onOutdentNote={onOutdentNote}
              onSelectPreviousNote={onSelectPreviousNote}
              onSelectNextNote={onSelectNextNote}
              onExpandNote={onExpandNote}
              onCollapseNote={onCollapseNote}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
