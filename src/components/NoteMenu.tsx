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
      className="p-3 opacity-0 group-hover:opacity-100 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-50 hover:scale-125 transition"
    >
      {isPage ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <title>Turn Note into Page</title>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
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
          <title>Turn Page into Note</title>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
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
