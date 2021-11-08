import { useState } from "react";
import { Flipper } from "react-flip-toolkit";
import ContentEditable from "./components/ContentEditable";
import NotesComponent from "./components/NotesComponent";
import { useSubscribeOneNote } from "./hooks/useSubscribeOneNote";
import { NotesModel } from "./noteModel/NotesModel";
import { NotesStore } from "./noteModel/NotesStore";
import { loadNotes, saveNotes } from "./utils/autoSaveSingleton";

export default function App() {
  const [notesModel] = useState(() => {
    const notes = loadNotes();
    const notesStore = new NotesStore(notes);
    const notesModel = new NotesModel(notesStore);
    notesModel.subscribeOne(null, () => saveNotes(notesStore.getAll()));
    return notesModel;
  });

  const rootNote = useSubscribeOneNote(notesModel, "ROOT")!;

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
        </Flipper>
      </main>
    </>
  );
}
