import { Note } from "./types";

export const initialNotes: Note[] = [
  {
    _id: "ROOT",
    text: "I am Groot!",
    childrenIds: [
      "2",
      "3",
      "5",
      "e7Gh8g7hXE9-jDnPKYTPQ",
      "wh7GpX3LY2p_dsagiCo-L",
    ],
    isExpanded: true,
  },
  {
    _id: "1",
    text: "Hello World",
    childrenIds: [],
    isExpanded: true,
  },
  {
    _id: "2",
    text: "Hello,",
    childrenIds: [],
    isExpanded: true,
    isPage: false,
  },
  {
    _id: "3",
    text: "Welcome to a new way of note taking ",
    childrenIds: ["4", "XhuyzNJtehlngZbsKe8vp", "qGsn9pjYGVRSUsQ7pGxhU"],
    isExpanded: true,
    isPage: false,
  },
  {
    _id: "4",
    text: "This doesn't do much now",
    childrenIds: [],
    isExpanded: true,
  },
  {
    _id: "5",
    text: "Enjoy the app...",
    childrenIds: [],
    isExpanded: true,
  },
  {
    _id: "XhuyzNJtehlngZbsKe8vp",
    text: "But maybe, it will one day",
    childrenIds: [],
    isExpanded: true,
  },
  {
    _id: "qGsn9pjYGVRSUsQ7pGxhU",
    text: "Behind this are hidden notes",
    childrenIds: ["F23J4bS6dmM46VxaKTA6_", "fzYIQVGPfCG0_PepGu9yt"],
    isExpanded: false,
    isPage: true,
  },
  {
    _id: "F23J4bS6dmM46VxaKTA6_",
    text: "Isn't this fun?",
    childrenIds: ["jAwojYlHuHWT6StVeq-Ab"],
    isExpanded: true,
    isPage: true,
  },
  {
    _id: "jAwojYlHuHWT6StVeq-Ab",
    text: "yes it is 🕺",
    childrenIds: [],
    isExpanded: true,
  },
  {
    _id: "fzYIQVGPfCG0_PepGu9yt",
    text: "some more hidden notes hiding here...",
    childrenIds: ["YtrXgja7v61bwTDffPS3k"],
    isExpanded: false,
    isPage: false,
  },
  {
    _id: "e7Gh8g7hXE9-jDnPKYTPQ",
    text: "Your words here...",
    childrenIds: [],
    isExpanded: true,
  },
  {
    _id: "wh7GpX3LY2p_dsagiCo-L",
    text: "",
    childrenIds: [],
    isExpanded: true,
  },
  {
    _id: "YtrXgja7v61bwTDffPS3k",
    text: "I am a big secret",
    childrenIds: [],
    isExpanded: true,
  },
];
