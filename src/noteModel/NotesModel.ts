import { nanoid } from "nanoid";
import { NotesStore } from "./NotesStore";
import { Note } from "./types";

export class NotesModel {
  private notesStore: NotesStore;

  constructor(notesStore: NotesStore) {
    this.notesStore = notesStore;
  }

  subscribeOne(id: string | null, callback: (note: Note | null) => void) {
    return this.notesStore.subscribeOne(id, callback);
  }

  getOne(id: string): Note | null {
    return this.notesStore.getOne(id);
  }

  getParent(id: string): Note | null {
    return (
      this.notesStore.getAll().find((note) => note.childrenIds.includes(id)) ??
      null
    );
  }

  getLastVisibleChildId(id: string): string {
    const note = this.notesStore.getOne(id);
    if (!note) {
      throw new Error(`getLastVisibleChildId: Note with id ${id} not found`);
    }
    if (note.childrenIds.length > 0 && note.isExpanded) {
      const lastChildId = note.childrenIds[note.childrenIds.length - 1];
      // recursively get the last visible child of the last visible child
      return this.getLastVisibleChildId(lastChildId);
    } else {
      return note._id;
    }
  }

  getPreviousSilblingId(id: string) {
    // find parent note
    const parentNote = this.getParent(id);
    if (!parentNote) {
      throw new Error(`getPreviousSilblingId: Note with id ${id} not found`);
    }
    // find index of the current note in the children array
    const index = parentNote.childrenIds.indexOf(id);
    if (index === 0) {
      return {
        previousSilblingIsParent: true,
        previousSilblingId: parentNote._id,
      };
    } else {
      return {
        previousSilblingIsParent: false,
        previousSilblingId: parentNote.childrenIds[index - 1],
      };
    }
  }

  getPreviousVisibleNoteId(id: string): string {
    const { previousSilblingId, previousSilblingIsParent } =
      this.getPreviousSilblingId(id);
    if (previousSilblingIsParent) {
      return previousSilblingId;
    } else {
      return this.getLastVisibleChildId(previousSilblingId);
    }
  }

  getNextSilblingId(id: string): string | null {
    // find parent note
    const parentNote = this.getParent(id);
    if (!parentNote) {
      throw new Error(`getNextSilblingId: Note with id ${id} not found`);
    }
    // find index of the current note in the children array
    const index = parentNote.childrenIds.indexOf(id);
    if (index === parentNote.childrenIds.length - 1) {
      if (parentNote._id === "ROOT") {
        return null;
      } else {
        return this.getNextSilblingId(parentNote._id);
      }
    } else {
      return parentNote.childrenIds[index + 1];
    }
  }

  getNextVisibleNoteId(id: string): string {
    const note = this.notesStore.getOne(id);
    if (!note) {
      throw new Error(`getNextVisibleNoteId: Note with id ${id} not found`);
    }
    if (note.childrenIds.length > 0 && note.isExpanded) {
      const firstChild = note.childrenIds[0];
      return firstChild;
    } else {
      const nextSilblingId = this.getNextSilblingId(id);
      if (nextSilblingId) {
        return nextSilblingId;
      } else {
        return id;
      }
    }
  }

  // Mutations:

  updateNoteText(noteId: string, newText: string) {
    this.notesStore.patchOne(noteId, { text: newText });
  }

  addNoteBelow(sponsoringNoteId: string) {
    const sponsoringNote = this.notesStore.getOne(sponsoringNoteId);
    if (!sponsoringNote) {
      throw new Error(
        `addNoteBelow: Sponsoring note with id ${sponsoringNoteId} not found`
      );
    }

    const newNote: Note = {
      _id: nanoid(),
      text: "",
      childrenIds: [],
      isExpanded: true,
      needsFocus: true, // TODO move to memory store
    };
    this.notesStore.addOne(newNote);

    // if the sponsoring note has expanded children, add new note to the top of the children
    if (sponsoringNote.isExpanded && sponsoringNote.childrenIds.length > 0) {
      this.notesStore.patchOne(sponsoringNoteId, {
        childrenIds: [newNote._id, ...sponsoringNote.childrenIds],
      });
    } else {
      // if sponsoring note has no children, add new note in the middle of the list below the sponsoring note
      // when we have the parent:
      const parentNote = this.getParent(sponsoringNoteId);
      if (!parentNote) {
        throw new Error(
          `addNoteBelow: Sponsoring note with id ${sponsoringNoteId} has no parent`
        );
      }
      // insert the new note id after the sponsoring note
      this.notesStore.patchOne(parentNote._id, (note) => {
        // get index of the sponsoring note in the children array
        const index = note.childrenIds.indexOf(sponsoringNoteId);
        return {
          childrenIds: [
            ...note.childrenIds.slice(0, index + 1),
            newNote._id,
            ...note.childrenIds.slice(index + 1),
          ],
        };
      });
    }
  }

  deleteNote(id: string) {
    const note = this.notesStore.getOne(id);
    if (!note) {
      throw new Error(`deleteNote: Note with id ${id} not found`);
    }

    const parentNote = this.getParent(id);
    if (!parentNote) {
      throw new Error(`deleteNote: Note with id ${id} not found`);
    }
    const previousNoteId = this.getPreviousVisibleNoteId(id);

    // Don't delete the last note
    if (parentNote._id === "ROOT" && parentNote.childrenIds.length === 1) {
      return;
    }

    // Don't delete if the note has children
    if (note.childrenIds.length > 0) {
      return;
    }

    // Remove the reference to the note from the parent note
    this.notesStore.patchOne(parentNote._id, (note) => ({
      childrenIds: note.childrenIds.filter((childId) => childId !== id),
    }));

    // Remove the note from the store
    this.notesStore.deleteOne(id);

    // Set the focus to the previous note
    this.notesStore.patchOne(previousNoteId, {
      needsFocus: true, // TODO move to memory store
    });
  }

  removeNeedsFocus(id: string) {
    this.notesStore.patchOne(id, {
      needsFocus: undefined, // TODO move to memory store
    });
  }

  indentNote(id: string) {
    const parentNote = this.getParent(id);
    if (!parentNote) {
      throw new Error(`indentNote: Note with id ${id} not found`);
    }
    const index = parentNote.childrenIds.indexOf(id);
    if (index === 0) {
      return;
    }

    // remove the note from the children array of the parent
    this.notesStore.patchOne(parentNote._id, (note) => ({
      childrenIds: note.childrenIds.filter((childId) => childId !== id),
    }));

    // insert the note in the children array of the previous note
    const previousNoteId = parentNote.childrenIds[index - 1];
    this.notesStore.patchOne(previousNoteId, (note) => ({
      isExpanded: true,
      childrenIds: [...note.childrenIds, id],
    }));

    // set the focus to the note
    this.notesStore.patchOne(id, {
      needsFocus: true, // TODO move to memory store
    });
  }

  outdentNote(id: string) {
    const parentNote = this.getParent(id);
    if (!parentNote) {
      throw new Error(`outdentNote: Note with id ${id} not found`);
    }

    if (parentNote._id === "ROOT") {
      return;
    }

    const grandParentNote = this.getParent(parentNote._id);
    if (!grandParentNote) {
      throw new Error(`outdentNote: Note with id ${id} not found`);
    }

    // insert the note in the children array of the grandparent
    this.notesStore.patchOne(grandParentNote._id, (note) => {
      const index = note.childrenIds.indexOf(parentNote._id);
      return {
        childrenIds: [
          ...note.childrenIds.slice(0, index + 1),
          id,
          ...note.childrenIds.slice(index + 1),
        ],
      };
    });

    // remove the note from the children array of the parent
    this.notesStore.patchOne(parentNote._id, (note) => ({
      childrenIds: note.childrenIds.filter((childId) => childId !== id),
    }));

    // set the focus to the note again
    this.notesStore.patchOne(id, {
      needsFocus: true, // TODO move to memory store
    });
  }

  selectNext(id: string) {
    const nextId = this.getNextVisibleNoteId(id);
    if (!nextId) {
      return;
    }
    this.notesStore.patchOne(nextId, {
      needsFocus: true, // TODO move to memory store
    });
  }

  selectPrevious(id: string) {
    const previousId = this.getPreviousVisibleNoteId(id);
    if (!previousId) {
      return;
    }
    this.notesStore.patchOne(previousId, {
      needsFocus: true, // TODO move to memory store
    });
  }

  expandNote(id: string) {
    this.notesStore.patchOne(id, {
      isExpanded: true,
    });
  }

  collapseNote(id: string) {
    this.notesStore.patchOne(id, {
      isExpanded: false,
    });
  }
}
