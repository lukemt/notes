import { useEffect, useRef, useState } from "react";

interface ContentEditableProps {
  defaultValue: string;
  onNewValue: (value: string) => void;
  className?: string;
}

export default function ContentEditable(props: ContentEditableProps) {
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function setValue(value: string) {
    if (ref.current) ref.current.textContent = value;
  }

  useEffect(() => {
    if (!isFocus) {
      setValue(props.defaultValue);
    }
  }, [isFocus, props.defaultValue]);

  return (
    <div
      className={props.className}
      contentEditable={true}
      spellCheck={true}
      ref={ref}
      onInput={handleInput}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    console.log("ContentEditable: onInput");
    const div = e.target as HTMLDivElement;
    props.onNewValue(div.textContent ?? "");
  }

  function handleBlur(e: React.FormEvent<HTMLDivElement>) {
    console.log("ContentEditable: onBlur: replacing with defaultValue");
    const div = e.target as HTMLDivElement;
    if ((div.textContent ?? "") !== props.defaultValue)
      console.error("A ContentEditable seems to be wrongly updated", {
        divContent: div.textContent ?? "",
        defaultValue: props.defaultValue,
      });
    setIsFocus(false);
    // setValue(props.defaultValue);
  }

  function handleFocus(e: React.FormEvent<HTMLDivElement>) {
    setIsFocus(true);
  }
}
