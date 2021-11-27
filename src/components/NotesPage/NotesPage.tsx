import { useEffect } from "react";
import tw from "tailwind-styled-components";
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

  // #FIXME: This will not work for deeply nested notes opened as page.
  // If the note has no baseColor it should recursively get the baseColor
  // of the parent. And if there is no baseColor at all, then it should use
  // the DEFAULT_BASE_COLOR defined in settings.
  // Also it would possibly make sense to implement a getter in the note model
  // like getBaseColor() or getBaseColorRecursive()
  // #SPIKE: Interesting corelation: how do we get the baseColor of a shared note?
  // That's gonna be interesting
  const baseColor = mainNote.baseColor || "gray";
  return (
    <Flipper flipKey={Math.random()}>
      <NoteHeader
        mainNote={mainNote}
        notesModel={notesModel}
        baseColor={baseColor}
      />
      <TwMain>
        <ul>
          {mainNote.childrenIds.map((id) => (
            <NotesTree
              key={id}
              notesModel={notesModel}
              id={id}
              defaultBaseColor={baseColor}
            />
          ))}
        </ul>
      </TwMain>
    </Flipper>
  );
}

const TwMain = tw.main`
  max-w-md
  mx-auto
  my-0
`;
