import { useEffect, useState } from "react";
import { NotesModel } from "../noteModel/NotesModel";
import { Note } from "../noteModel/types";

export function useSubscribeOneNote(notesModel: NotesModel | null, id: string) {
  const [note, setNote] = useState<Note | null>(null);
  useEffect(() => {
    if (notesModel) {
      return notesModel.subscribeOne(id, setNote);
    }
  }, [id, notesModel]);

  return note;
}
