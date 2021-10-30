import { useEffect, useRef, useState } from "react";

interface ContentEditableProps {
  defaultValue: string;
  className?: string;
  needsFocus?: boolean;
  onNewValue: (value: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  onFocusTriggered: () => void;
  onIndent: () => void;
  onOutdent: () => void;
  onSelectPrevious: () => void;
  onSelectNext: () => void;
  onExpand: () => void;
  onCollapse: () => void;
}

export default function ContentEditable({
  defaultValue,
  needsFocus,
  onNewValue,
  onEnter,
  onDelete,
  onFocusTriggered,
  onIndent,
  onOutdent,
  onSelectPrevious,
  onSelectNext,
  onExpand,
  onCollapse,
  className,
}: ContentEditableProps) {
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function setValue(value: string) {
    if (ref.current) ref.current.textContent = value;
  }

  useEffect(() => {
    if (!isFocus) {
      setValue(defaultValue);
    }
  }, [isFocus, defaultValue]);

  // needs focus
  useEffect(() => {
    if (!isFocus && needsFocus) {
      if (ref.current) {
        ref.current.focus();
        setCaretToEnd(ref.current);
        onFocusTriggered();
      }
    }
  }, [needsFocus, isFocus, onFocusTriggered]);

  return (
    <div
      className={className}
      style={{ whiteSpace: "pre-line" }}
      contentEditable={true}
      spellCheck={true}
      ref={ref}
      onInput={handleInput}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
    />
  );

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    const div = e.target as HTMLDivElement;
    onNewValue(div.textContent ?? "");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "Enter": {
        if (!e.shiftKey) {
          onEnter();
          e.preventDefault();
        }
        break;
      }

      case "Backspace": {
        if (ref.current?.textContent === "") {
          onDelete();
        }
        break;
      }

      case "Tab": {
        if (e.shiftKey) {
          onOutdent();
          e.preventDefault();
        } else {
          onIndent();
          e.preventDefault();
        }
        break;
      }

      case "ArrowUp": {
        // check if curet is at the beginning of the line
        // const selection = window.getSelection();
        // if (selection) {
        //   const range = selection.getRangeAt(0);
        //   const start = range.startOffset;
        //   if (start === 0) {
        //     onSelectPrevious();
        //   }
        // }
        if (e.ctrlKey || e.metaKey) {
          onCollapse();
        } else {
          onSelectPrevious();
        }
        break;
      }

      case "ArrowDown": {
        // check if curet is at the end of the line
        // const selection = window.getSelection();
        // if (selection) {
        //   const range = selection.getRangeAt(0);
        //   const end = range.endOffset;
        //   if (end === ref.current?.textContent?.length) {
        //     onSelectNext();
        //   }
        // }
        if (e.ctrlKey || e.metaKey) {
          onExpand();
        } else {
          onSelectNext();
        }
        break;
      }
    }
  }

  function handleFocus(e: React.FormEvent<HTMLDivElement>) {
    setIsFocus(true);
  }

  function handleBlur(e: React.FormEvent<HTMLDivElement>) {
    console.log("ContentEditable: onBlur: replacing with defaultValue");
    const div = e.target as HTMLDivElement;
    if ((div.textContent ?? "") !== defaultValue)
      console.error("A ContentEditable seems to be wrongly updated", {
        divContent: div.textContent ?? "",
        defaultValue: defaultValue,
      });
    setIsFocus(false);
  }
}

function setCaretToEnd(contentEditableElement: HTMLDivElement) {
  // Found on StackOverflow
  const range = document.createRange(); // Create a range (a range is a like the selection but invisible)
  range.selectNodeContents(contentEditableElement); // Select the entire contents of the element with the range
  range.collapse(false); // Collapse the range to the end point. false means collapse to end rather than the start
  const selection = window.getSelection(); // Get the selection object (allows you to change selection)
  if (selection) {
    selection.removeAllRanges(); // Remove any selections already made
    selection.addRange(range); // Make the range you have just created the visible selection
  }
}
