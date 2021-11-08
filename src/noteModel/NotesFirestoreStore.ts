import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocFromCache,
  getDocs,
  getDocsFromCache,
  onSnapshot,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { parseNote } from "./parseNote";
import { Note, NotesStore } from "./types";

export class NotesFirestoreStore implements NotesStore {
  private firestore: Firestore;
  private notes: Note[] = [];

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  public subscribeOne(
    noteId: string,
    callback: (note: Note | null) => void
  ): () => void {
    return onSnapshot(doc(this.firestore, "notes", noteId), (snapshot) => {
      const data = snapshot.data() ?? null;
      console.log("retrieved note from server", data, snapshot);
      if (data) {
        callback(parseNote(snapshot.id, data));
      } else {
        callback(null);
      }
    });
  }

  public async getOne(id: string) {
    const noteDocRef = doc(this.firestore, "notes", id);
    const noteDoc = await getDocFromCache(noteDocRef);
    const data = noteDoc.data() ?? null;
    if (data) {
      return parseNote(id, data);
    } else {
      return null;
    }
  }
  async getParent(id: string): Promise<Note | null> {
    const notesRef = collection(this.firestore, "notes");
    const q = query(notesRef, where("childrenIds", "array-contains", id));
    const snapshot = await getDocsFromCache(q);
    if (snapshot.empty) {
      return null;
    }
    if (snapshot.size > 1) {
      console.error("Multiple notes with same id");
    }
    return parseNote(snapshot.docs[0].id, snapshot.docs[0].data());
  }
  public async addOne(note: Note) {
    await setDoc(doc(this.firestore, "notes", note._id), note);
  }
  public replaceOne(id: string, note: Note) {
    console.error("replaceOne not implemented");
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
    await setDoc(doc(this.firestore, "notes", id), newPartialNote, {
      merge: true,
    });
  }
  public deleteOne(id: string) {
    deleteDoc(doc(this.firestore, "notes", id));
  }
}
