import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesPage from "./components/NotesPage";
import { NotesModel } from "./noteModel/NotesModel";
import { SubscribableStore } from "./noteModel/SubscribableStore";
import { loadNotes, saveNotes } from "./utils/autoSaveSingleton";

export default function App() {
  const [, setRefresh] = useState(0);
  const [notesModel, setNotesModel] = useState(null as NotesModel | null);

  useEffect(() => {
    const notes = loadNotes();
    const notesStore = new SubscribableStore(notes);
    const notesModel = new NotesModel(notesStore);
    notesStore.addEventListener("transaction", () =>
      saveNotes(notesStore.getAll())
    );
    notesStore.addEventListener("transaction", () =>
      setRefresh((refresh) => refresh + 1)
    );
    notesStore.addEventListener("external-update", () =>
      setRefresh((refresh) => refresh + 1)
    );
    notesStore.addEventListener("ui-state", () =>
      setRefresh((refresh) => refresh + 1)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (e.shiftKey) {
          notesModel.getTransactionManager().redo();
        } else {
          notesModel.getTransactionManager().undo();
        }
      }
    });

    setNotesModel(notesModel);
  }, []);

  if (!notesModel) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotesPage notesModel={notesModel} />} />
        <Route
          path="/note/:mainNoteId"
          element={<NotesPage notesModel={notesModel} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
