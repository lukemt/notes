import { useState } from "react";
import ContentEditable from "./ContentEditable";
import Notes from "./Note";
import { Note } from "./types";

const initialNotes: Note[] = [
  {
    _id: "1",
    text: "Hello World",
    children: ["2", "3", "5"],
  },
  {
    _id: "2",
    text: "This is a note",
    children: [],
  },
  {
    _id: "3",
    text: "This is another note",
    children: ["4"],
  },
  {
    _id: "4",
    text: "This is another note",
    children: [],
  },
  {
    _id: "5",
    text: "This is another note what???",
    children: [],
  },
];

function App() {
  const [notes, setNotes] = useState(initialNotes);

  function updateNote(id: string, text: string) {
    setNotes(
      notes.map((note) => {
        if (note._id === id) {
          return { ...note, text };
        }
        return note;
      })
    );
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 p-5 bg-gradient-to-br from-white to-blue-50 shadow-md">
        <h1>Hello World</h1>
      </header>
      <main className="max-w-sm mx-auto my-20">
        <Notes notes={notes} onUpdate={updateNote} id={"1"} />
      </main>
      <footer className="fixed bottom-0 inset-x-0 p-5  bg-gradient-to-br from-white to-blue-50 shadow-xl">
        foo
      </footer>
    </>
  );
}

export default App;
