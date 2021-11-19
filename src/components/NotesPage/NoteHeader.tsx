import tw from "tailwind-styled-components";
import { Flipped } from "react-flip-toolkit";
import { NotesModel } from "../../noteModel/NotesModel";
import { Note } from "../../noteModel/types";
import BackButton from "./Note/BackButton";
import ContentEditable from "./Note/ContentEditable";

export function NoteHeader({
  mainNote,
  notesModel,
}: {
  mainNote: Note;
  notesModel: NotesModel;
}) {
  return (
    <TwHeader>
      <Flipped flipId={mainNote._id}>
        <TwFlexDiv>
          {mainNote._id !== "ROOT" && <BackButton />}
          <TwContentEditable
            defaultValue={mainNote.text}
            needsFocus={false}
            onNewValue={(value) =>
              notesModel.updateNoteText(mainNote._id, value)
            }
            onEnter={() => {
              notesModel.addNoteBelow(mainNote._id, true);
            }}
            onDelete={() => {}}
            onFocusTriggered={() => {}}
            onIndent={() => {}}
            onOutdent={() => {}}
            onSelectPrevious={() => {}}
            onSelectNext={() => {}}
            onExpand={() => {}}
            onCollapse={() => {}}
          />
        </TwFlexDiv>
      </Flipped>
    </TwHeader>
  );
}

const background = () => `
  bg-gradient-to-br
  from-white
  to-blue-50
  dark:from-gray-900
  dark:to-blue-900
`;

const TwHeader = tw.header`
  sticky
  top-0
  inset-x-0
  z-10
  shadow-md
  ${background}
`;

const TwFlexDiv = tw.div`
  flex
  max-w-md
  mx-auto
  p-1
  pl-3
  rounded-2xl
  ${background}
`;

const TwContentEditable = tw(ContentEditable)`
  flex-1
  p-3
  tracking-widest
  rounded-xl
  text-3xl
  text-blue-900
`;
