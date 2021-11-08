import { useSubscribeOneNote } from "../hooks/useSubscribeOneNote";
import { NotesModel } from "../noteModel/NotesModel";
import { Flipped } from "react-flip-toolkit";
import ContentEditable from "./ContentEditable";
import ExpandIcon from "./ExpandButton";

interface NoteProps {
  notesModel: NotesModel;
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

export default function NotesComponent({
  notesModel,
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
  const note = useSubscribeOneNote(notesModel, id);

  if (!note) {
    console.error("Note not found", id);
    return null;
  }

  return (
    <li>
      <Flipped flipId={note._id}>
        <div
          className={
            "flex items-center group focus-within:ring-2 ring-blue-600 m-3 rounded-xl shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-blue-900 dark:to-green-800 " +
            (!note.isExpanded && note.childrenIds.length > 0
              ? "border-l-4 border-blue-700 dark:border-green-600"
              : "")
          }
        >
          <ContentEditable
            className="flex-1 px-5 py-3 outline-none"
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
          {note.childrenIds.length > 0 && (
            <ExpandIcon
              isExpanded={note.isExpanded}
              onExpand={() => onExpandNote(note._id)}
              onCollapse={() => onCollapseNote(note._id)}
            />
          )}
        </div>
      </Flipped>
      {note.isExpanded && note.childrenIds.length > 0 && (
        <ul className="pl-10">
          {note.childrenIds.map((childId) => (
            <NotesComponent
              key={childId}
              notesModel={notesModel}
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
