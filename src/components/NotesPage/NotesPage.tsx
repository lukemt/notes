import classNames from "classnames";
import { useEffect } from "react";
import { Flipper } from "react-flip-toolkit";
import { useLocation, useParams } from "react-router-dom";
import { NotesModel } from "../../noteModel/NotesModel";
import { NoteHeader } from "./NoteHeader";
import NotesTree from "./NotesTree";

interface NotesPageProps {
  notesModel: NotesModel;
}

export default function NotesPage({ notesModel }: NotesPageProps) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let { mainNoteId } = useParams();
  if (!mainNoteId) {
    mainNoteId = "ROOT";
  }
  const mainNote = notesModel.getOne(mainNoteId);

  if (!mainNote) {
    return <div>Not found</div>;
  }

  return (
    <Flipper flipKey={Math.random()}>
      <NoteHeader mainNote={mainNote} notesModel={notesModel} />
      <main className={classNames("max-w-md", "mx-auto", "my-0")}>
        <ul>
          {mainNote.childrenIds.map((id) => (
            <NotesTree key={id} notesModel={notesModel} id={id} />
          ))}
        </ul>
      </main>
    </Flipper>
  );
}
