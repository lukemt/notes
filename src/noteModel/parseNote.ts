import { Note } from "./types";
export function parseNote(id: string, docData: { [field: string]: any }): Note {
  return {
    _id: id,
    text: String(docData.text),
    childrenIds:
      docData.childrenIds instanceof Array ? docData.childrenIds : [],
    isExpanded: !!docData.isExpanded,
    // ...(docData.needsFocus ? { needsFocus: true } : {}),
  };
}
