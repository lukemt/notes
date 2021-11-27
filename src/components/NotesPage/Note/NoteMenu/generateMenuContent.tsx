import { NotesModel } from "../../../../noteModel/NotesModel";
import { Note } from "../../../../noteModel/types";
import generateBaseColorSection from "./generateBaseColorSection";
// import generateBasicsSection from "./generateBasicsSection";
import { countStartWith, includesAll } from "./searchUtils";

export default function generateMenuContent(
  note: Note,
  notesModel: NotesModel,
  inputValue: string
) {
  const sections = [
    // generateBasicsSection(note, notesModel, inputValue),
    generateBaseColorSection(note, notesModel, inputValue),
  ];

  const menuItems = sections
    // sort and filter
    .map((section) => ({
      ...section,
      score: calculateScore(section.label, inputValue),
    }))
    .map((section) => ({
      ...section,
      items: section.score === 2 ? [] : section.items,
    }))
    .map((section) => ({
      // sort and filter items inside sections
      ...section,
      items: section.items
        .map((item) => ({
          ...item,
          score: calculateScore(section.label + " " + item.label, inputValue),
        }))
        .filter((item) => item.score >= 0)
        .sort((a, b) => b.score - a.score),
    }))
    .filter((section) => section.score >= 0 || section.items.length > 0)
    .sort((a, b) => b.score - a.score)

    // transform to menuItems
    .flatMap((section) => {
      return [section, ...section.items];
    })
    .map((item, index) => ({
      ...item,
      index,
    }));

  return { sections, menuItems };
}

export function calculateScore(label: string, inputValue: string) {
  if (inputValue.startsWith(label)) {
    // searching inside the section
    return 0;
  }
  if (label.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase())) {
    // starts with it
    return 2;
  }

  if (includesAll(label, inputValue)) {
    const magic = 1 - 1 / (countStartWith(label, inputValue) + 1);
    return 1 + magic;
  }
  return -1;
}
