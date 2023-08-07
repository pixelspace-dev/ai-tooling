import "./article-type-button.css";

export default function ArticleTypeButton() {
  return (
    <button className="article-type-button">
      article type
      <svg className="article-type-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="10"
        viewBox="0 0 17 10"
        fill="none"
      >
        <path
          d="M1.5197 8.87246e-07L-3.70442e-07 1.52528L8.5 10L17 1.51671L15.4803 2.77009e-07L8.5 6.96658L1.5197 8.87246e-07Z"
          fill="#3A4259"
        />
      </svg>
    </button>
  );
}
