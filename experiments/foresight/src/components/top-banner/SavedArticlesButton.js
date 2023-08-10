import "./saved-articles-button.css";

export default function SavedArticlesButton() {
  return (
    <button className="saved-articles-button">
      SAVED ARTICLES
      <svg className="arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="11"
        viewBox="0 0 20 11"
        fill="none"
      >
        <path
          d="M14 1.5L18 5.5M18 5.5L14 9.5M18 5.5H0"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
