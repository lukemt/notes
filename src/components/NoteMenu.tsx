import styled from "styled-components";

interface NoteMenuProps {
  isPage: boolean;
  onToggleIsPage: () => void;
}

export default function NoteMenu({ isPage, onToggleIsPage }: NoteMenuProps) {
  console.log("render NoteMenu");
  return (
    <StyledButton
      onClick={onToggleIsPage}
      className="p-3 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-900 x-hover:scale-125 transition"
    >
      {isPage ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: absolute;
  left: -54px;
  z-index: 1;
`;
