import tw from "tailwind-styled-components";
import { Flipped } from "react-flip-toolkit";
import { NotesModel } from "../../noteModel/NotesModel";
import { Note } from "../../noteModel/types";
import BackButton from "./Note/BackButton";
import ContentEditable from "./Note/ContentEditable";
import { twBaseColor } from "../../utils/twIncludeAllColors";

export function NoteHeader({
  mainNote,
  notesModel,
}: {
  mainNote: Note;
  notesModel: NotesModel;
}) {
  return (
    <TwHeader $baseColor={mainNote.baseColor}>
      <Flipped flipId={mainNote._id}>
        <TwFlexDiv>
          {mainNote._id !== "ROOT" && (
            <BackButton baseColor={mainNote.baseColor} />
          )}
          <TwContentEditable
            $baseColor={mainNote.baseColor}
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

const background = ({ $baseColor }: { $baseColor?: string }) => `
  bg-gradient-to-br
  from-white
  ${twBaseColor("to-$baseColor-50")({ $baseColor })}
  dark:from-gray-900
  ${twBaseColor("dark:to-$baseColor-900")({ $baseColor })}
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
  ${twBaseColor("text-$baseColor-900")}
  ${twBaseColor("dark:text-$baseColor-100")}
`;
