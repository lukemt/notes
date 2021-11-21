import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { twBaseColor } from "../../../utils/twIncludeAllColors";

interface PageLinkProps {
  to: string;
  baseColor?: string;
}

export default function PageLink({ to, baseColor }: PageLinkProps) {
  return (
    <TwLink to={to} $baseColor={baseColor}>
      <TwSvg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <title>Open as Page</title>
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
          clipRule="evenodd"
        />
      </TwSvg>
    </TwLink>
  );
}

const TwLink = tw(Link)<{ $baseColor?: string }>`
    p-3
    transition
    ease-out
    hover:scale-125
    ${twBaseColor("text-$baseColor-700")}
    ${twBaseColor("dark:text-$baseColor-200")}
`;

const TwSvg = tw.svg`
  h-6
  w-6
`;
