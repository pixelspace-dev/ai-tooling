import SentimentButton from "./SentimentButton";
import ArticleTypeButton from "./ArticleTypeButton";
import "./article-editable.css";

export default function ArticleEditable() {
  return (
    <div className="article-editable">
      <SentimentButton />
      <ArticleTypeButton />
      <svg
        className="bookmark"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
      >
        <path
          d="M1 3C1 1.89543 1.89543 1 3 1H13C14.1046 1 15 1.89543 15 3V19L8 15.5L1 19V3Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}
