import { useEffect, useState } from "react";
import ContentEditable from "./components/ContentEditable";
import NotesComponent from "./components/NotesComponent";
import { useSubscribeOneNote } from "./hooks/useSubscribeOneNote";
import { NotesModel } from "./noteModel/NotesModel";
import { NotesArrayStore } from "./noteModel/NotesArrayStore";
import { loadNotes, saveNotes } from "./utils/autoSaveSingleton";
import { initFirebase, firebaseConfigInvalidVars } from "./utils/initFirebase";
import { NotesFirestoreStore } from "./noteModel/NotesFirestoreStore";

type DataSource = "localStorage" | "firestore";

function initArrayStore(): NotesModel {
  const notes = loadNotes();
  const notesStore = new NotesArrayStore(notes);
  const notesModel = new NotesModel(notesStore);
  notesStore.subscribeAll(() => saveNotes(notesStore.getAll()));
  return notesModel;
}
function initFirestore(): NotesModel {
  const { firestore } = initFirebase(); // TODO: import lazily
  const notesStore = new NotesFirestoreStore(firestore);
  const notesModel = new NotesModel(notesStore);
  return notesModel;
}

export default function App() {
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [notesModel, setNotesModel] = useState<NotesModel | null>(null);
  const rootNote = useSubscribeOneNote(notesModel, "ROOT")!;

  useEffect(() => {
    if (dataSource === "localStorage") {
      setNotesModel(initArrayStore());
    } else if (dataSource === "firestore") {
      setNotesModel(initFirestore());
    }
  }, [dataSource]);

  if (!dataSource) {
    // show UI to choose data source designed with tailwind
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            Select data source
          </h1>
          <div className="flex gap-10">
            <div className="flex-1 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setDataSource("localStorage")}
              >
                Local Storage
              </button>
            </div>

            <div className="flex-1 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {firebaseConfigInvalidVars.length > 0 ? (
                <div className="text-red-500 text-center">
                  Firebase config is invalid. Please check the `.env` config
                  file. The following environment variables are missing:
                  <ul className="list-disc list-inside">
                    {firebaseConfigInvalidVars.map((key) => (
                      <li key={key}>{key}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <button
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setDataSource("firestore")}
                >
                  Firestore
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!notesModel) {
    return <div>Error</div>;
  }

  if (!rootNote) {
    return <div>Loading...</div>;
  }

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
        <ul>
          {rootNote.childrenIds.map((id) => (
            <NotesComponent
              key={id}
              notesModel={notesModel}
              id={id}
              onUpdateNote={(id, text) => notesModel.updateNoteText(id, text)}
              onAddNote={(sponsoringNoteId) =>
                notesModel.addNoteBelow(sponsoringNoteId)
              }
              onDeleteNote={(id) => notesModel.deleteNote(id)}
              onFocusTriggered={(id) => notesModel.removeNeedsFocus(id)}
              onIndentNote={(id) => notesModel.indentNote(id)}
              onOutdentNote={(id) => notesModel.outdentNote(id)}
              onSelectPreviousNote={(id) => notesModel.selectPrevious(id)}
              onSelectNextNote={(id) => notesModel.selectNext(id)}
              onExpandNote={(id) => notesModel.expandNote(id)}
              onCollapseNote={(id) => notesModel.collapseNote(id)}
            />
          ))}
        </ul>
      </main>
      <footer className="fixed bottom-0 inset-x-0 p-5  bg-gradient-to-br from-white to-blue-50 shadow-xl dark:from-gray-900 dark:to-green-900">
        foo
      </footer>
    </>
  );
}
