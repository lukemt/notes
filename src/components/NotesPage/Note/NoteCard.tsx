import tw from "tailwind-styled-components";
import { Flipped } from "react-flip-toolkit";
import ContentEditable from "./ContentEditable";
import ExpandButton from "./ExpandButton";
import PageLink from "./PageLink";
import NoteMenu from "./NoteMenu";
import { Note } from "../../../noteModel/types";
import { NotesModel } from "../../../noteModel/NotesModel";

interface NoteCardProps {
  note: Note;
  notesModel: NotesModel;
}

export default function NoteCard({ note, notesModel }: NoteCardProps) {
  return (
    <Flipped
      flipId={note._id}
      onAppear={(element) => {
        element.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 500,
          fill: "forwards",
        });
      }}
    >
      <TwNoteCardDiv
        hasHiddenChildren={!note.isExpanded && note.childrenIds.length > 0}
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
        <TwContentEditable
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
          <ExpandButton
            isExpanded={note.isExpanded}
            onExpand={() => notesModel.expandNote(note._id)}
            onCollapse={() => notesModel.collapseNote(note._id)}
          />
        )}
      </TwNoteCardDiv>
    </Flipped>
  );
}

const TwNoteCardDiv = tw.div<{ hasHiddenChildren: boolean }>`
          flex
          items-center
          relative
          m-3
      
          group
          focus-within:ring-2
          ring-blue-600
          
          rounded-xl
          shadow-lg
          bg-gradient-to-br
          from-white
          to-blue-50
          dark:from-blue-900
          dark:to-green-800

          ${({ hasHiddenChildren }) =>
            hasHiddenChildren
              ? "border-l-4 border-blue-700 dark:border-green-600"
              : ""}
`;

const TwContentEditable = tw(ContentEditable)`
  flex-1
  py-3
  outline-none
  tracking-wide
`;
