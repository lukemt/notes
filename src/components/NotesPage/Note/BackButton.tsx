import { useNavigate } from "react-router-dom";
import classNames from "classnames";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      className={classNames(
        "p-2",
        "transition",
        "ease-out",
        "hover:scale-125",
        "text-blue-900",
        "dark:text-blue-200"
      )}
      onClick={() => navigate(-1)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <title>Go back</title>
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
