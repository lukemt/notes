import tw from "tailwind-styled-components";
import { NotesModel } from "../../noteModel/NotesModel";
import NoteCard from "./Note/NoteCard";

interface NotesTreeProps {
  notesModel: NotesModel;
  id: string;
}

export default function NotesTree({ notesModel, id }: NotesTreeProps) {
  const note = notesModel.getOne(id);

  if (!note) {
    console.error("Note not found", id);
    return null;
  }
  return (
    <li>
      <NoteCard note={note} notesModel={notesModel} />
      {note.isExpanded && note.childrenIds.length > 0 && (
        <TwUl>
          {note.childrenIds.map((childId) => (
            <NotesTree key={childId} notesModel={notesModel} id={childId} />
          ))}
        </TwUl>
      )}
    </li>
  );
}

const TwUl = tw.ul`
  pl-10
`;
