import { NotesModel } from "../noteModel/NotesModel";
import { Flipped } from "react-flip-toolkit";
import ContentEditable from "./ContentEditable";
import ExpandIcon from "./ExpandButton";
import PageLink from "./PageLink";
import NoteMenu from "./NoteMenu";

interface NoteProps {
  notesModel: NotesModel;
  id: string;
}

export default function NotesComponent({ notesModel, id }: NoteProps) {
  const note = notesModel.getOne(id);

  if (!note) {
    console.error("Note not found", id);
    return null;
  }
  return (
    <li>
      <Flipped
        flipId={note._id}
        onAppear={(element) => {
          element.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 500,
            fill: "forwards",
          });
        }}
      >
        <div
          className={
            "flex items-center relative group focus-within:ring-2 ring-blue-600 m-3 rounded-xl shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-blue-900 dark:to-green-800 " +
            (!note.isExpanded && note.childrenIds.length > 0
              ? "border-l-4 border-blue-700 dark:border-green-600"
              : "")
          }
        >
          <NoteMenu
            isPage={note.isPage ?? false}
            onToggleIsPage={() => notesModel.toggleIsPage(note._id)}
          />
          {note.isPage ? (
            <PageLink to={`/note/${note._id}`} />
          ) : (
            <div className="w-5" />
          )}
          <ContentEditable
            className="flex-1 py-3 outline-none tracking-wide"
            defaultValue={note.text}
            needsFocus={note.needsFocus}
            onNewValue={(value) => notesModel.updateNoteText(note._id, value)}
            onEnter={() => notesModel.addNoteBelow(note._id, false)}
            onDelete={() => notesModel.deleteNote(note._id)}
            onFocusTriggered={() => notesModel.removeNeedsFocus(note._id)}
            onIndent={() => notesModel.indentNote(note._id)}
            onOutdent={() => notesModel.outdentNote(note._id)}
            onSelectPrevious={() => notesModel.selectPrevious(note._id)}
            onSelectNext={() => notesModel.selectNext(note._id)}
            onExpand={() => notesModel.expandNote(note._id)}
            onCollapse={() => notesModel.collapseNote(note._id)}
          />
          {note.childrenIds.length > 0 && (
            <ExpandIcon
              isExpanded={note.isExpanded}
              onExpand={() => notesModel.expandNote(note._id)}
              onCollapse={() => notesModel.collapseNote(note._id)}
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
            />
          ))}
        </ul>
      )}
    </li>
  );
}
