export interface Note {
  _id: string;
  text: string;
  childrenIds: string[];
  isExpanded: boolean;
  needsFocus?: true;
}

export interface NotesStore {
  subscribeOne(noteId: string, callback: (note: Note | null) => void): void;
  subscribeAll?(callback: (note: Note | null) => void): void;
  getAll?(): Note[];
  getOne(noteId: string): Promise<Note | null>;
  getParent(noteId: string): Promise<Note | null>;
  addOne(note: Note): void;
  replaceOne(noteId: string, note: Note): void;
  patchOne(
    noteId: string,
    partialNote: Partial<Note> | ((note: Note) => Partial<Note>)
  ): void;
  deleteOne(noteId: string): void;
}
