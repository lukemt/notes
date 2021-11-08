import { useState } from "react";
import { Flipper } from "react-flip-toolkit";
import ContentEditable from "./components/ContentEditable";
import NotesComponent from "./components/NotesComponent";
import { NotesModel } from "./noteModel/NotesModel";
import { Store } from "./noteModel/Store";
import { loadNotes, saveNotes } from "./utils/autoSaveSingleton";

export default function App() {
  const [notesModel, setNotesModel] = useState(() => {
    const notes = loadNotes();
    const notesStore = new Store(notes);
    const notesModel = new NotesModel(notesStore);
    notesModel.subscribeOne(null, () => saveNotes(notesStore.getAll()));
    return notesModel;
  });

  const rootNote = notesModel.getOne("ROOT")!;

  return (
    <>
      <header>
        <ContentEditable
          className="fixed top-0 inset-x-0 p-5 bg-gradient-to-br from-white to-blue-50 shadow-md dark:from-gray-900 dark:to-blue-900"
          defaultValue={rootNote.text}
          needsFocus={false}
          onNewValue={(value) => notesModel.updateNoteText(rootNote._id, value)}
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
        <Flipper flipKey={notesModel}>
          <ul>
            {rootNote.childrenIds.map((id) => (
              <NotesComponent
                key={id}
                notesModel={notesModel}
                id={id}
                onUpdateNote={(id, text) =>
                  setNotesModel(notesModel.updateNoteText(id, text))
                }
                onAddNote={(sponsoringNoteId) =>
                  setNotesModel(notesModel.addNoteBelow(sponsoringNoteId))
                }
                onDeleteNote={(id) => setNotesModel(notesModel.deleteNote(id))}
                onFocusTriggered={(id) =>
                  setNotesModel(notesModel.removeNeedsFocus(id))
                }
                onIndentNote={(id) => setNotesModel(notesModel.indentNote(id))}
                onOutdentNote={(id) =>
                  setNotesModel(notesModel.outdentNote(id))
                }
                onSelectPreviousNote={(id) =>
                  setNotesModel(notesModel.selectPrevious(id))
                }
                onSelectNextNote={(id) =>
                  setNotesModel(notesModel.selectNext(id))
                }
                onExpandNote={(id) => setNotesModel(notesModel.expandNote(id))}
                onCollapseNote={(id) =>
                  setNotesModel(notesModel.collapseNote(id))
                }
              />
            ))}
          </ul>
        </Flipper>
      </main>
    </>
  );
}
