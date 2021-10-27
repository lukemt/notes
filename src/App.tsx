import { useState } from "react";
import Notes from "./components/Notes";
import { Note } from "./types";

const initialNotes: Note[] = [
  {
    _id: "ROOT",
    text: "I am Groot!",
    childrenIds: ["2", "3", "5"],
  },
  {
    _id: "1",
    text: "Hello World",
    childrenIds: [],
  },
  {
    _id: "2",
    text: "This is a note",
    childrenIds: [],
  },
  {
    _id: "3",
    text: "This is another note",
    childrenIds: ["4"],
  },
  {
    _id: "4",
    text: "This is another note",
    childrenIds: [],
  },
  {
    _id: "5",
    text: "This is another note what???",
    childrenIds: [],
  },
];

export default function App() {
  const [notes, setNotes] = useState(initialNotes);
  const rootNote = getNote(notes, "ROOT");

  return (
    <>
      <header className="fixed top-0 inset-x-0 p-5 bg-gradient-to-br from-white to-blue-50 shadow-md">
        <h1>Hello World</h1>
      </header>
      <main className="max-w-md mx-auto my-20">
        <ul>
          {rootNote.childrenIds.map((id) => (
            <Notes
              key={id}
              notes={notes}
              id={id}
              onUpdateNote={updateNote}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
              onFocusTriggered={removeNeedsFocus}
            />
          ))}
        </ul>
      </main>
      <footer className="fixed bottom-0 inset-x-0 p-5  bg-gradient-to-br from-white to-blue-50 shadow-xl">
        foo
      </footer>
    </>
  );

  function updateNote(id: string, text: string) {
    setNotes(
      notes.map((note) => {
        if (note._id === id) {
          return { ...note, text };
        }
        return note;
      })
    );
  }

  function addNote(sponsoringNoteId: string) {
    const sponsoringNote = getNote(notes, sponsoringNoteId);
    const newId = String(Math.random());

    setNotes(
      // add an empty note to the collection
      [
        ...notes,
        {
          _id: newId,
          text: "",
          childrenIds: [],
          needsFocus: true as true,
        },
      ]
        // set the reference:
        .map((note) => {
          // if the sponsoring note has children, add new note to the top of the children
          if (sponsoringNote.childrenIds.length) {
            if (note._id === sponsoringNote._id) {
              return {
                ...note,
                childrenIds: [newId, ...note.childrenIds],
              };
            }
          }
          // if sponsoring note has no children, add new note in the middle of the list below the sponsoring note
          // when we have the parent:
          else if (note.childrenIds.includes(sponsoringNoteId)) {
            // get index of the sponsoring note in the children array
            const index = note.childrenIds.indexOf(sponsoringNoteId);
            // insert the new note id after the sponsoring note
            return {
              ...note,
              childrenIds: [
                ...note.childrenIds.slice(0, index + 1),
                newId,
                ...note.childrenIds.slice(index + 1),
              ],
            };
          }
          // otherwise, do nothing
          return note;
        })
    );
  }

  function deleteNote(id: string) {
    const parentNote = getParentNote(notes, id);
    const previousNoteId = getPreviousVisibleNoteId(notes, id);

    // Don't delete the last note
    if (parentNote._id === "ROOT" && parentNote.childrenIds.length === 1) {
      return;
    }

    setNotes(
      notes
        .map((note) => {
          let returnNote = note;

          // set the focus
          if (note._id === previousNoteId) {
            returnNote = {
              ...returnNote,
              needsFocus: true,
            };
          }

          // remove reference to deleted note
          if (note._id === parentNote._id) {
            returnNote = {
              ...returnNote,
              childrenIds: [
                ...note.childrenIds.filter((childId) => childId !== id),
              ],
            };
          }

          return returnNote;
        })

        // remove the deleted note
        .filter((note) => note._id !== id)
    );
  }

  function removeNeedsFocus(id: string) {
    setNotes(
      notes.map((note) => {
        if (note._id === id) {
          // remove needsFocus
          const { needsFocus, ...returnNote } = note;
          return returnNote;
        } else {
          return note;
        }
      })
    );
  }
}

function getLastVisibleChild(notes: Note[], id: string): string {
  const note = getNote(notes, id);
  if (note.childrenIds.length > 0) {
    const lastChild = note.childrenIds[note.childrenIds.length - 1];
    // recursively get the last visible child of the last visible child
    return getLastVisibleChild(notes, lastChild);
  } else {
    return note._id;
  }
}

function getPreviousVisibleNoteId(notes: Note[], id: string): string {
  const { previousSilblingId, previousSilblingIsParent } =
    getPreviousSilblingId(notes, id);
  if (previousSilblingIsParent) {
    return previousSilblingId;
  } else {
    return getLastVisibleChild(notes, previousSilblingId);
  }
}

function getPreviousSilblingId(notes: Note[], id: string) {
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

function getParentNote(notes: Note[], id: string): Note {
  const parentNote = notes.find((note) => note.childrenIds.includes(id));
  if (!parentNote) {
    throw new Error("Could not find note");
  }
  return parentNote;
}

function getNote(notes: Note[], id: string): Note {
  const note = notes.find((note) => note._id === id);
  if (!note) {
    throw new Error("Could not find note");
  }
  return note;
}
