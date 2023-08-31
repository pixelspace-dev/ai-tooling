import "./saved-articles-button.css";
import { useNavigate } from "react-router-dom";

export default function SavedArticlesButton() {
  // navegates user to saved articles page when button is pressed
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `saved-articles`;
    navigate(path);
  };

  return (
    <button onClick={routeChange} className="saved-articles-button">
      SAVED ARTICLES
      <svg
        className="arrow"
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
