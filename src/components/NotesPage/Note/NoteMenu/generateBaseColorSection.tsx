import { NotesModel } from "../../../../noteModel/NotesModel";
import { Note } from "../../../../noteModel/types";
import { allColors } from "../../../../utils/twIncludeAllColors";

interface MenuItem {
  label: string;
  onSelect: () => void;
  component: React.ReactNode;
}
interface MenuSection extends MenuItem {
  items: MenuItem[];
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
    component: <h2>Color</h2>,
    items: allColors.map((color) => ({
      label: color,
      onSelect: () => {
        console.log("base color changed to " + color);
        notesModel.setBaseColor(note._id, color);
        notesModel.closeNoteMenu(note._id);
      },
      component: <div>{color}</div>,
    })),
  };

  return section;
}
