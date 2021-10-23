import { useState } from "react";
import ContentEditable from "./ContentEditable";

function App() {
  const [value, setValue] = useState("Hello World!");
  return (
    <>
      <header className="fixed top-0 inset-x-0 p-5 bg-gradient-to-br from-white to-blue-50 shadow-md">
        <h1>Hello World</h1>
      </header>
      <main className="max-w-sm mx-auto my-20">
        <ul>
          <li>
            <ContentEditable
              defaultValue={value}
              onNewValue={setValue}
              className="px-5 py-3 m-5 rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg"
            />
            <ul className="pl-20">
              <li>
                <ContentEditable
                  defaultValue={value}
                  onNewValue={setValue}
                  className="px-5 py-3 m-5 rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg"
                />
              </li>
              <li>
                <ContentEditable
                  defaultValue={value}
                  onNewValue={setValue}
                  className="px-5 py-3 m-5 rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-lg"
                />
              </li>
            </ul>
          </li>
        </ul>
      </main>
      <footer className="fixed bottom-0 inset-x-0 p-5  bg-gradient-to-br from-white to-blue-50 shadow-xl">
        foo
      </footer>
    </>
  );
}

export default App;
