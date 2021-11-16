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
        <ul className="pl-10">
          {note.childrenIds.map((childId) => (
            <NotesTree key={childId} notesModel={notesModel} id={childId} />
          ))}
        </ul>
      )}
    </li>
  );
}
