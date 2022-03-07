import tw from "tailwind-styled-components";
import { twBaseColor, TwColor } from "../../../utils/twIncludeAllColors";

interface ExpandButtonProps {
  isExpanded: boolean;
  baseColor: TwColor;
  onExpand: () => void;
  onCollapse: () => void;
}

export default function ExpandButton({
  isExpanded,
  baseColor,
  onExpand,
  onCollapse,
}: ExpandButtonProps) {
  if (isExpanded) {
    return (
      <TwCollapseButton onClick={onCollapse} $baseColor={baseColor}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Collapse</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </TwCollapseButton>
    );
  } else {
    return (
      <TwExpandButton onClick={onExpand} $baseColor={baseColor}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Expand</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </TwExpandButton>
    );
  }
}

const TwCollapseButton = tw.button`
  p-4
  opacity-0
  group-hover:opacity-100
  transition
  ${twBaseColor("text-$baseColor-600")}
  ${twBaseColor("dark:text-$baseColor-400")}
`;

const TwExpandButton = tw.button`
  p-4
  opacity-100
  group-hover:opacity-100
  group-focus:opacity-100
  transition
  ${twBaseColor("text-$baseColor-600")}
  ${twBaseColor("dark:text-$baseColor-400")}
`;
