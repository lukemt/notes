export default function ExpandIcon({
  isExpanded,
  onExpand,
  onCollapse,
}: {
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}) {
  if (isExpanded) {
    return (
      <button
        className="p-4 opacity-0 group-hover:opacity-100 transition text-gray-600"
        onClick={onCollapse}
      >
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
      </button>
    );
  } else {
    return (
      <button
        className="p-4 opacity-100 group-hover:opacity-100 group-focus:opacity-100 transition text-gray-600"
        onClick={onExpand}
      >
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
      </button>
    );
  }
}
