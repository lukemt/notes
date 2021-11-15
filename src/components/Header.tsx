import classNames from "classnames";
import { Flipped } from "react-flip-toolkit";
import { NotesModel } from "../noteModel/NotesModel";
import { Note } from "../noteModel/types";
import BackButton from "./BackButton";
import ContentEditable from "./ContentEditable";

export function Header({
  mainNote,
  notesModel,
}: {
  mainNote: Note;
  notesModel: NotesModel;
}) {
  const bgClassNames = [
    "bg-gradient-to-br",
    "from-white",
    "to-blue-50",
    "dark:from-gray-900",
    "dark:to-blue-900",
  ];

  return (
    <header
      className={classNames(
        "sticky", //
        "top-0",
        "inset-x-0",
        "z-10",
        "shadow-md",
        bgClassNames
      )}
    >
      <Flipped flipId={mainNote._id}>
        <div
          className={classNames(
            "flex",
            "max-w-md",
            "mx-auto",
            "p-1",
            "pl-3",
            "rounded-2xl",
            bgClassNames
          )}
        >
          {mainNote._id !== "ROOT" && <BackButton />}
          <ContentEditable
            className={classNames(
              "flex-1",
              "p-3",
              "tracking-widest",
              "rounded-xl",
              "text-3xl",
              "text-blue-900"
            )}
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
        </div>
      </Flipped>
    </header>
  );
}
