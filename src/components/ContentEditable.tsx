import { useEffect, useRef } from "react";
import debounce from "lodash/debounce";

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
  const ref = useRef<HTMLDivElement>(null);

  function setValue(value: string) {
    if (ref.current) ref.current.textContent = value;
  }

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    // Save the text on unmount, if not done already
    // This is a precaution to avoid data loss
    // It should not happen in practice
    const refCurrent = ref.current;
    return () => {
      if (!refCurrent) {
        console.error("ContentEditable: ref is null");
        return;
      }
      const value = refCurrent.textContent;
      if (typeof value !== "string") {
        console.error("ContentEditable: ref.textContent is not a string");
        return;
      }

      if (value !== defaultValue) {
        console.warn(
          `ContentEditable: value is not equal to defaultValue. Saving the text now...`
        );
        onNewValue(value);
      }
    };
  }, []);

  // needs focus
  useEffect(() => {
    if (ref.current) {
      if (needsFocus) {
        ref.current.focus();
        setCaretToEnd(ref.current);
        onFocusTriggered();
      }
    }
  }, [needsFocus, onFocusTriggered]);

  function save() {
    if (ref.current) onNewValue(ref.current.textContent ?? "");
  }
  const debouncedSave = debounce(save, 1000);

  return (
    <div
      className={className}
      style={{ whiteSpace: "pre-line" }}
      contentEditable={true}
      spellCheck={true}
      ref={ref}
      onBlur={handleBlur}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
    />
  );

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    debouncedSave();
  }

  function handleBlur(e: React.FormEvent<HTMLDivElement>) {
    save();
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "Enter": {
        if (!e.shiftKey) {
          e.preventDefault();
          save();
          onEnter();
        }
        break;
      }

      case "Backspace": {
        if (ref.current?.textContent === "") {
          save();
          onDelete();
        }
        break;
      }

      case "Tab": {
        e.preventDefault();
        save();
        if (e.shiftKey) {
          onOutdent();
        } else {
          onIndent();
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
        save();
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
        save();
        if (e.ctrlKey || e.metaKey) {
          onExpand();
        } else {
          onSelectNext();
        }
        break;
      }
    }
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
