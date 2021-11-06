import { Note } from "./types";

export class NotesStore {
  private notes: Note[];
  private subscriptions: {
    noteId: string | null;
    callback: (note: Note | null) => void;
  }[] = [];

  constructor(notes: Note[]) {
    this.notes = notes;
  }

  subscribeOne(noteId: string | null, callback: (note: Note | null) => void) {
    console.log("subscribe", noteId);
    const subscription = { noteId, callback };
    this.subscriptions.push(subscription);
    return () => {
      console.log("unsubscribe", noteId);
      const filteredSubscriptions = this.subscriptions.filter(
        (s) => s !== subscription
      );
      if (filteredSubscriptions.length !== this.subscriptions.length - 1) {
        console.error("unsubscribe failed", { noteId, filteredSubscriptions });
      }
      this.subscriptions = filteredSubscriptions;
    };
  }

  private notifySubscribers(id: string) {
    const note = this.getOne(id);
    this.subscriptions.forEach((subscription) => {
      if (subscription.noteId === id) {
        subscription.callback(note);
      }
    });
    this.subscriptions.forEach((subscription) => {
      if (subscription.noteId === null) {
        subscription.callback(note);
      }
    });
  }

  getAll() {
    return this.notes;
  }
  getOne(id: string) {
    return this.notes.find((note) => note._id === id) ?? null;
  }
  addOne(note: Note) {
    this.notes = [...this.notes, note];
    this.notifySubscribers(note._id);
  }
  replaceOne(id: string, note: Note) {
    this.notes = this.notes.map((n) => (n._id === id ? note : n));
    this.notifySubscribers(id);
  }
  patchOne(
    id: string,
    partialNote: Partial<Note> | ((note: Note) => Partial<Note>)
  ) {
    let newPartialNote = partialNote;
    if (typeof partialNote === "function") {
      const gotNote = this.getOne(id);
      if (!gotNote) {
        throw new Error(`Note with id ${id} not found`);
      }
      newPartialNote = partialNote(gotNote);
    }
    this.notes = this.notes.map((n) =>
      n._id === id ? { ...n, ...newPartialNote } : n
    );
    this.notifySubscribers(id);
  }
  deleteOne(id: string) {
    this.notes = this.notes.filter((note) => note._id !== id);
    this.notifySubscribers(id);
  }
}
