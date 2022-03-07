import { useCombobox } from "downshift";
import { useState } from "react";
import tw from "tailwind-styled-components";

import { NotesModel } from "../../../../noteModel/NotesModel";
import { Note } from "../../../../noteModel/types";
import { twBaseColor, TwColor } from "../../../../utils/twIncludeAllColors";
import generateMenuContent from "./generateMenuContent";

interface NoteMenuProps {
  note: Note;
  notesModel: NotesModel;
  baseColor: TwColor;
}

export default function NoteMenu({
  note,
  notesModel,
  baseColor,
}: NoteMenuProps) {
  const [menuContent, setMenuContent] = useState(() =>
    generateMenuContent(note, notesModel, "")
  );

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    defaultIsOpen: true,
    // defaultHighlightedIndex: 0,
    items: menuContent.menuItems,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue === "#") {
        notesModel.updateNoteText(note._id, note.text + "#");
        notesModel.closeNoteMenu(note._id);
      } else {
        setMenuContent(generateMenuContent(note, notesModel, inputValue ?? ""));
      }
    },
    onSelectedItemChange: ({ selectedItem, type }) => {
      console.log("selectedItem", type, selectedItem);
      if (selectedItem && type !== useCombobox.stateChangeTypes.InputBlur) {
        selectedItem.onSelect();
      }
    },
    itemToString: (item) => {
      return item?.label ?? "";
    },
    stateReducer: (state, actionAndChanges) => {
      // Highlight the Heading (index 0), if the user searches parts of the Heading,
      // otherwise highlight the first sub-item (index 1)
      console.log("stateReducer", { actionAndChanges, state });
      const { type, changes, inputValue } = actionAndChanges;
      if (type === useCombobox.stateChangeTypes.InputChange) {
        // Unfortunately we have to gernate the menu content here too
        // so it's done twice which is not optimal
        const newMenuContent = generateMenuContent(
          note,
          notesModel,
          inputValue ?? ""
        );
        console.log("newMenuContent", newMenuContent);
        return {
          ...changes,
          isOpen: true,
          highlightedIndex: newMenuContent.menuItems.find(
            (item) => item.score > 0
          )?.index,
        };
      }
      return changes;
    },
    ...{
      onOuterClick: () => {
        console.log("outer click");
      },
    },
  });

  return (
    <TwNoteMenuDiv $baseColor={baseColor}>
      <TwLabel {...getLabelProps()}>Do something with the note:</TwLabel>
      <TwComboboxDiv {...getComboboxProps()}>
        <TwSearchInput
          {...getInputProps({
            onBlur: () => {
              notesModel.closeNoteMenu(note._id);
            },
          })}
          placeholder="Search..."
          $baseColor={baseColor}
        />
      </TwComboboxDiv>
      <TwUl {...getMenuProps()}>
        {isOpen &&
          menuContent.menuItems.map((item) => (
            <TwLi
              $highlighted={highlightedIndex === item.index}
              key={`${item.label}${item.index}`}
              {...getItemProps({ item, index: item.index })}
            >
              {item.component}
            </TwLi>
          ))}
      </TwUl>
    </TwNoteMenuDiv>
  );
}

const TwNoteMenuDiv = tw.div`
  m-3
  -mt-0
  rounded-xl
  overflow-hidden
  shadow-lg
  bg-gradient-to-br
  from-white
  ${twBaseColor("to-$baseColor-50")}
  ${twBaseColor("dark:from-$baseColor-900")}
  dark:to-gray-800
`;

const TwLabel = tw.label`
  hidden
`;

const TwComboboxDiv = tw.div`
  px-5
  py-4
`;

const TwSearchInput = tw.input`
  w-full
  px-6
  py-3
  rounded-xl
  bg-gray-200
  dark:bg-gray-800
  opacity-70
  outline-none
  focus:ring-0
  ${twBaseColor("focus:ring-$baseColor-300")}
`;

const TwUl = tw.ul`

`;

const TwLi = tw.li<{ $highlighted: boolean }>`
  py-3
  px-5
  cursor-pointer
${({ $highlighted }) =>
  $highlighted ? `bg-gray-300 dark:bg-gray-700` : null}}}
`;
