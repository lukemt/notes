import tw from "tailwind-styled-components";
import { NotesModel } from "../../noteModel/NotesModel";
import { TwColor } from "../../utils/twIncludeAllColors";
import NoteCard from "./Note/NoteCard";

interface NotesTreeProps {
  notesModel: NotesModel;
  id: string;
  defaultBaseColor: TwColor;
}

export default function NotesTree({
  notesModel,
  id,
  defaultBaseColor,
}: NotesTreeProps) {
  const note = notesModel.getOne(id);

  if (!note) {
    console.error("Note not found", id);
    return null;
  }

  const baseColor = note.baseColor ?? defaultBaseColor;
  return (
    <li>
      <NoteCard note={note} notesModel={notesModel} baseColor={baseColor} />
      {note.isExpanded && note.childrenIds.length > 0 && (
        <TwUl>
          {note.childrenIds.map((childId) => (
            <NotesTree
              key={childId}
              notesModel={notesModel}
              id={childId}
              defaultBaseColor={baseColor}
            />
          ))}
        </TwUl>
      )}
    </li>
  );
}

const TwUl = tw.ul`
  pl-10
`;
