import { Flipped } from "react-flip-toolkit";
import tw from "tailwind-styled-components";
import { NotesModel } from "../../noteModel/NotesModel";
import { twBaseColor, TwColor } from "../../utils/twIncludeAllColors";
import NoteCard from "./Note/NoteCard";

type Design = "card" | "boxes" | null;

interface NotesTreeProps {
  notesModel: NotesModel;
  id: string;
  defaultBaseColor: TwColor;
  parentDesign: Design;
}

export default function NotesTree({
  notesModel,
  id,
  defaultBaseColor,
  parentDesign,
}: NotesTreeProps) {
  const note = notesModel.getOne(id);

  if (!note) {
    console.error("Note not found", id);
    return null;
  }

  const baseColor = note.baseColor ?? defaultBaseColor;
  // TODO: seperate the design from the baseColor
  const design: Design =
    baseColor !== defaultBaseColor
      ? "card"
      : parentDesign === "card"
      ? null
      : parentDesign;

  return (
    <Flipped
      flipId={note._id}
      scale={false}
      translate={true}
      opacity={true}
      onAppear={(element) => {
        element.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 500,
          fill: "forwards",
        });
      }}
    >
      <TwLi $baseColor={baseColor} $design={design}>
        <NoteCard
          note={note}
          notesModel={notesModel}
          baseColor={baseColor}
          design={design}
        />
        {note.isExpanded && note.childrenIds.length > 0 && (
          <Flipped inverseFlipId={note._id}>
            <TwUl $baseColor={baseColor} $design={design}>
              {note.childrenIds.map((childId) => (
                <NotesTree
                  key={childId}
                  notesModel={notesModel}
                  id={childId}
                  defaultBaseColor={baseColor}
                  parentDesign={design}
                />
              ))}
            </TwUl>
          </Flipped>
        )}
      </TwLi>
    </Flipped>
  );
}

const TwLi = tw.li`
  rounded-xl
  x-divide-y
  ${({ $design, $baseColor }: { $design: Design; $baseColor: TwColor }) =>
    $design === "card"
      ? `
        mr-0
        ${twBaseColor("bg-$baseColor-50")({ $baseColor })}
        dark:bg-gradient-to-br
        ${twBaseColor("dark:from-$baseColor-900")({ $baseColor })}
        dark:to-gray-800
        shadow-lg
        border-2
        ${twBaseColor("border-$baseColor-200")({ $baseColor })}
        mb-3
        mt-2
    `
      : ""}
`;

const TwUl = tw.ul`
  ml-5
  pl-5
  pr-3

  ${({ $design, $baseColor }: { $design: Design; $baseColor: TwColor }) =>
    $design !== "card"
      ? `
      border-l
      `
      : null}
`;
