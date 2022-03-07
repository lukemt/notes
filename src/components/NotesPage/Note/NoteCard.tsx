import tw from "tailwind-styled-components";
import ContentEditable from "./ContentEditable";
import ExpandButton from "./ExpandButton";
import PageLink from "./PageLink";
import NoteHoverMenu from "./NoteHoverMenu";
import NoteMenu from "./NoteMenu/NoteMenu";
import { Note } from "../../../noteModel/types";
import { NotesModel } from "../../../noteModel/NotesModel";
import { twBaseColor, TwColor } from "../../../utils/twIncludeAllColors";

type Design = "card" | "boxes" | null;

interface NoteCardProps {
  note: Note;
  notesModel: NotesModel;
  baseColor: TwColor;
  design: Design; // TODO: move to notesModel
}

export default function NoteCard({
  note,
  notesModel,
  baseColor,
  design,
}: NoteCardProps) {
  return (
    <>
      <TwNoteCardDiv
        $hasHiddenChildren={!note.isExpanded && note.childrenIds.length > 0}
        $baseColor={baseColor}
        $design={design}
      >
        <NoteHoverMenu
          isPage={note.isPage ?? false}
          onToggleIsPage={() => notesModel.toggleIsPage(note._id)}
        />
        {note.isPage ? (
          <PageLink to={`/note/${note._id}`} baseColor={baseColor} />
        ) : (
          <div className="w-5" />
        )}
        <TwContentEditable
          $baseColor={baseColor}
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
          onNoteMenuTrigger={() => notesModel.openNoteMenu(note._id)}
        />
        {note.childrenIds.length > 0 && (
          <ExpandButton
            isExpanded={note.isExpanded}
            baseColor={baseColor}
            onExpand={() => notesModel.expandNote(note._id)}
            onCollapse={() => notesModel.collapseNote(note._id)}
          />
        )}
      </TwNoteCardDiv>
      {note.isMenuOpen && (
        <NoteMenu note={note} notesModel={notesModel} baseColor={baseColor} />
      )}
    </>
  );
}

const TwNoteCardDiv = tw.div`
  flex
  items-center
  relative

  group
  focus-within:ring-2
  ${twBaseColor("ring-$baseColor-600")}
  ${twBaseColor("dark:ring-$baseColor-600")}
  
  rounded-xl

  ${({
    $hasHiddenChildren,
    $design,
    $baseColor,
  }: {
    $hasHiddenChildren: boolean;
    $design: Design;
    $baseColor: TwColor;
  }) =>
    $design === "boxes"
      ? `
  m-3
        shadow-lg
        bg-gradient-to-br
        from-white
        ${twBaseColor("to-$baseColor-50")({ $baseColor })}
        ${twBaseColor("dark:from-$baseColor-900")({ $baseColor })}
        dark:to-gray-800
        `
      : $hasHiddenChildren
      ? `
        border-l-4
        ${twBaseColor("border-$baseColor-700")({ $baseColor })}
        ${twBaseColor("dark:border-$baseColor-400")({ $baseColor })}
      `
      : ""}
`;

const TwContentEditable = tw(ContentEditable)`
  flex-1
  py-3
  outline-none
  tracking-wide
  ${twBaseColor("text-$baseColor-800")}
  ${twBaseColor("dark:text-$baseColor-100")}
`;
