import { useEffect, useState } from "react";
import { NotesModel } from "../noteModel/NotesModel";

export function useSubscribeOneNote(notesModel: NotesModel, id: string) {
  const [note, setNote] = useState(notesModel.getOne(id));
  useEffect(() => {
    return notesModel.subscribeOne(id, setNote);
  }, [id, notesModel]);

  return note;
}
