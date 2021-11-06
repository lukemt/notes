import { Note } from "../noteModel/types";
import { setLocalStorageItem } from "./localStorage";
import { getLocalStorageItem } from "./localStorage";
import { debounce } from "lodash";
import { initialNotes } from "../noteModel/initialNotes";

let savedNotes: Note[] | null = null;
let toBeSavedNotes: Note[] | null = null;

function saveNotesToLocalStorage() {
  if (toBeSavedNotes !== null && toBeSavedNotes !== savedNotes) {
    setLocalStorageItem("notes", toBeSavedNotes);
    savedNotes = toBeSavedNotes;
    console.log("Saved notes to localstorage");
  } else {
    console.error("No notes to save");
  }
}
const debouncedSaveNotesToLocalStorage = debounce(
  saveNotesToLocalStorage,
  1000
);

window.addEventListener("beforeunload", () => {
  saveNotesToLocalStorage();
});

export function saveNotes(notes: Note[]) {
  toBeSavedNotes = notes;
  debouncedSaveNotesToLocalStorage();
}

export function loadNotes(): Note[] {
  return getLocalStorageItem<Note[]>("notes") ?? initialNotes;
}
