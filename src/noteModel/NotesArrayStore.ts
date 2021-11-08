import { Note, NotesStore } from "./types";

export class NotesArrayStore implements NotesStore {
  private notes: Note[];
  private subscriptions: {
    noteId: string | null;
    callback: (note: Note | null) => void;
  }[] = [];

  constructor(notes: Note[]) {
    this.notes = notes;
  }

  private async notifySubscribers(id: string) {
    const note = await this.getOne(id);
    this.subscriptions.forEach((subscription) => {
      if (subscription.noteId === id || subscription.noteId === null) {
        subscription.callback(note);
      }
    });
  }

  private addSubscriber(
    noteId: string | null,
    callback: (note: Note | null) => void
  ) {
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

  public subscribeOne(
    id: string,
    callback: (note: Note | null) => void
  ): () => void {
    (async () => callback(await this.getOne(id)))();
    return this.addSubscriber(id, callback);
  }

  public subscribeAll(callback: (note: Note | null) => void): () => void {
    return this.addSubscriber(null, callback);
  }

  public getAll() {
    return this.notes;
  }
  public async getOne(id: string) {
    return this.notes.find((note) => note._id === id) ?? null;
  }
  public async getParent(id: string) {
    return this.notes.find((note) => note.childrenIds.includes(id)) ?? null;
  }
  public addOne(note: Note) {
    this.notes = [...this.notes, note];
    this.notifySubscribers(note._id);
  }
  public replaceOne(id: string, note: Note) {
    this.notes = this.notes.map((n) => (n._id === id ? note : n));
    this.notifySubscribers(id);
  }
  public async patchOne(
    id: string,
    partialNote: Partial<Note> | ((note: Note) => Partial<Note>)
  ) {
    let newPartialNote = partialNote;
    if (typeof partialNote === "function") {
      const gotNote = await this.getOne(id);
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
  public deleteOne(id: string) {
    this.notes = this.notes.filter((note) => note._id !== id);
    this.notifySubscribers(id);
  }
}
