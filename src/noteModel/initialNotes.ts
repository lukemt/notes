import { Note } from "./types";

export const initialNotes: Note[] = [
  {
    _id: "ROOT",
    text: "I am Groot!",
    childrenIds: ["2", "3", "5"],
    isExpanded: true,
  },
  {
    _id: "1",
    text: "Hello World",
    childrenIds: [],
    isExpanded: true,
  },
  {
    _id: "2",
    text: "This is a note",
    childrenIds: [],
    isExpanded: true,
  },
  {
    _id: "3",
    text: "This is another note",
    childrenIds: ["4"],
    isExpanded: true,
  },
  {
    _id: "4",
    text: "This is another note",
    childrenIds: [],
    isExpanded: true,
  },
  {
    _id: "5",
    text: "This is another note what???",
    childrenIds: [],
    isExpanded: true,
  },
];
