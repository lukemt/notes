import { Flipper } from "react-flip-toolkit";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import ContentEditable from "./components/ContentEditable";
import Notes from "./components/Notes";
import {
  getNextVisibleNoteId,
  getNote,
  getParentNote,
  getPreviousVisibleNoteId,
} from "./noteModel/getters";
import { loadNotes, saveNotes } from "./utils/autoSaveSingleton";

export default function App() {
  const [notes, setNotes] = useState(() => loadNotes());

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const rootNote = getNote(notes, "ROOT");

  return (
    <>
      <header>
        <ContentEditable
          className="fixed top-0 inset-x-0 p-5 bg-gradient-to-br from-white to-blue-50 shadow-md dark:from-gray-900 dark:to-blue-900"
          defaultValue={rootNote.text}
          needsFocus={false}
          onNewValue={(value) => updateNote(rootNote._id, value)}
          onEnter={() => {}}
          onDelete={() => {}}
          onFocusTriggered={() => {}}
          onIndent={() => {}}
          onOutdent={() => {}}
          onSelectPrevious={() => {}}
          onSelectNext={() => {}}
          onExpand={() => {}}
          onCollapse={() => {}}
        />
      </header>
      <main className="max-w-md mx-auto my-20">
        <Flipper flipKey={notes}>
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
                onIndentNote={indentNote}
                onOutdentNote={outdentNote}
                onSelectPreviousNote={selectPrevious}
                onSelectNextNote={selectNext}
                onExpandNote={expandNote}
                onCollapseNote={collapseNote}
              />
            ))}
          </ul>
        </Flipper>
      </main>
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
    const newId = nanoid();

    setNotes(
      // add an empty note to the collection
      [
        ...notes,
        {
          _id: newId,
          text: "",
          childrenIds: [],
          isExpanded: true,
          needsFocus: true as true,
        },
      ]
        // set the reference:
        .map((note) => {
          // if the sponsoring note has children, add new note to the top of the children
          if (
            sponsoringNote.isExpanded &&
            sponsoringNote.childrenIds.length > 0
          ) {
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

    // Don't delete if the note has children
    if (getNote(notes, id).childrenIds.length) {
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

  function indentNote(id: string) {
    console.log("indent note", id);
    const parentNote = getParentNote(notes, id);

    // get the index of the note in the children array of the parent
    const index = parentNote.childrenIds.indexOf(id);

    // if the note is the first child, do nothing
    if (index === 0) {
      return;
    }

    // get the previous note
    const previousNoteId = parentNote.childrenIds[index - 1];

    setNotes(
      notes.map((note) => {
        if (note._id === parentNote._id) {
          // remove the note from the children array of the parent
          return {
            ...note,
            childrenIds: note.childrenIds.filter((childId) => childId !== id),
          };
        } else if (note._id === previousNoteId) {
          // add the note to the children array of the previous note
          return {
            ...note,
            isExpanded: true,
            childrenIds: [...note.childrenIds, id],
          };
        } else if (note._id === id) {
          // set needsFocus to true
          return {
            ...note,
            needsFocus: true,
          };
        } else {
          return note;
        }
      })
    );
  }
  function outdentNote(id: string) {
    console.log("outdent note", id);
    const parentNote = getParentNote(notes, id);
    if (parentNote._id === "ROOT") {
      return;
    }
    const grandParentNote = getParentNote(notes, parentNote._id);

    // get index of the parent note in the children array of the grandparent
    const index = grandParentNote.childrenIds.indexOf(parentNote._id);

    // insert the note in the children array of the grandparent
    setNotes(
      notes.map((note) => {
        if (note._id === grandParentNote._id) {
          return {
            ...note,
            childrenIds: [
              ...note.childrenIds.slice(0, index + 1),
              id,
              ...note.childrenIds.slice(index + 1),
            ],
          };
        } else if (note._id === parentNote._id) {
          return {
            ...note,
            childrenIds: note.childrenIds.filter((childId) => childId !== id),
          };
        } else if (note._id === id) {
          return {
            ...note,
            needsFocus: true,
          };
        } else {
          return note;
        }
      })
    );
  }

  function selectNext(id: string) {
    const nextNoteId = getNextVisibleNoteId(notes, id);
    if (nextNoteId) {
      setNotes(
        notes.map((note) => {
          if (note._id === nextNoteId) {
            return {
              ...note,
              needsFocus: true,
            };
          } else {
            return note;
          }
        })
      );
    }
  }

  function selectPrevious(id: string) {
    const previousNoteId = getPreviousVisibleNoteId(notes, id);

    if (previousNoteId) {
      setNotes(
        notes.map((note) => {
          if (note._id === previousNoteId) {
            return {
              ...note,
              needsFocus: true,
            };
          } else {
            return note;
          }
        })
      );
    }
  }

  function expandNote(id: string) {
    setNotes(
      notes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            isExpanded: true,
          };
        } else {
          return note;
        }
      })
    );
  }

  function collapseNote(id: string) {
    setNotes(
      notes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            isExpanded: false,
          };
        } else {
          return note;
        }
      })
    );
  }
}
