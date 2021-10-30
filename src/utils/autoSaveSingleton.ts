import { Note } from "../noteModel/types";
import { setLocalStorageItem } from "./localStorage";
import { getLocalStorageItem } from "./localStorage";
import { debounce } from "lodash";
import { initialNotes } from "../noteModel/initialNotes";

let savedNotes: Note[] | null = null;

function saveNotesToLocalStorage() {
  if (savedNotes) {
    setLocalStorageItem("notes", savedNotes);
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
  savedNotes = notes;
  debouncedSaveNotesToLocalStorage();
}

export function loadNotes(): Note[] {
  return getLocalStorageItem<Note[]>("notes") ?? initialNotes;
}
