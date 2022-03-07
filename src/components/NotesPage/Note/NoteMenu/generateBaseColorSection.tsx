import { NotesModel } from "../../../../noteModel/NotesModel";
import { Note } from "../../../../noteModel/types";
import {
  allColors,
  twBaseColor,
  TwColor,
} from "../../../../utils/twIncludeAllColors";
import tw from "tailwind-styled-components";

interface MenuItem {
  label: string;
  onSelect: () => void;
  component: (props: { highlighted: boolean; itemProps: any }) => JSX.Element;
}
interface MenuSection extends MenuItem {
  items: MenuItem[];
  component: (props: { highlighted: boolean; itemProps: any }) => JSX.Element;
}

export default function generateBaseColorSection(
  note: Note,
  notesModel: NotesModel,
  inputValue: string
) {
  const section: MenuSection = {
    label: "Color: ",
    onSelect: () => {
      console.log("onSelect: Color");
    },
    component: ({ highlighted, itemProps }) => (
      <TwLi $baseColor={"black"} $highlighted={highlighted} {...itemProps}>
        Color
      </TwLi>
    ),
    items: allColors.map((color) => ({
      label: color,
      onSelect: () => {
        console.log("base color changed to " + color);
        notesModel.setBaseColor(note._id, color);
        notesModel.closeNoteMenu(note._id);
      },
      component: ({ highlighted, itemProps }) => (
        <TwLi $baseColor={color} $highlighted={highlighted} {...itemProps}>
          ● &nbsp; {color}
        </TwLi>
      ),
    })),
  };

  return section;
}

const TwLi = tw.li`
  ${twBaseColor("bg-$baseColor-50")}
  ${twBaseColor("text-$baseColor-800")}
  py-3
  px-5
  cursor-pointer

  ${({
    $highlighted,
    $baseColor,
  }: {
    $highlighted: boolean;
    $baseColor: TwColor;
  }) =>
    $highlighted
      ? `
      ${twBaseColor("border-$baseColor-300")({ $baseColor })}
      border-4
      py-2
      px-4
      rounded-lg
    `
      : null}}}
`;
