import { Note } from "../types";

export function getNote(notes: Note[], id: string): Note {
  const note = notes.find((note) => note._id === id);
  if (!note) {
    throw new Error("Could not find note");
  }
  return note;
}

export function getParentNote(notes: Note[], id: string): Note {
  const parentNote = notes.find((note) => note.childrenIds.includes(id));
  if (!parentNote) {
    throw new Error("Could not find note");
  }
  return parentNote;
}

export function getLastVisibleChild(notes: Note[], id: string): string {
  const note = getNote(notes, id);
  if (note.childrenIds.length > 0) {
    const lastChild = note.childrenIds[note.childrenIds.length - 1];
    // recursively get the last visible child of the last visible child
    return getLastVisibleChild(notes, lastChild);
  } else {
    return note._id;
  }
}

export function getPreviousSilblingId(notes: Note[], id: string) {
  // find parent note
  const parentNote = getParentNote(notes, id);
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

export function getPreviousVisibleNoteId(notes: Note[], id: string): string {
  const { previousSilblingId, previousSilblingIsParent } =
    getPreviousSilblingId(notes, id);
  if (previousSilblingIsParent) {
    return previousSilblingId;
  } else {
    return getLastVisibleChild(notes, previousSilblingId);
  }
}

export function getNextSilblingId(notes: Note[], id: string): string | null {
  // find parent note
  const parentNote = getParentNote(notes, id);
  // find index of the current note in the children array
  const index = parentNote.childrenIds.indexOf(id);
  if (index === parentNote.childrenIds.length - 1) {
    if (parentNote._id === "ROOT") {
      return null;
    } else {
      return getNextSilblingId(notes, parentNote._id);
    }
  } else {
    return parentNote.childrenIds[index + 1];
  }
}

export function getNextVisibleNoteId(notes: Note[], id: string): string {
  const note = getNote(notes, id);
  if (note.childrenIds.length > 0) {
    const firstChild = note.childrenIds[0];
    return firstChild;
  } else {
    const nextSilblingId = getNextSilblingId(notes, id);
    if (nextSilblingId) {
      return nextSilblingId;
    } else {
      return id;
    }
  }
}
