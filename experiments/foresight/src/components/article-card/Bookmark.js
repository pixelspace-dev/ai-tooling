import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import "./bookmark.css";

const BookmarkButton = ({ articleID, fillStatus, setFillStatus }) => {
  // figure out which article is being accessed
  let articleHistory = JSON.parse(localStorage.getItem("articleHistory"));
  let idIndex;
  if (articleHistory !== null) {
    idIndex = articleHistory.findIndex((id) => id.id === articleID);
  }

  // set bookmarked status when button is pressed
  const handleBookmark = () => {
    // Get a fresh copy of articleHistory
    let newArticleHistory =
      JSON.parse(localStorage.getItem("articleHistory")) || [];

    if (fillStatus === "none") {
      setFillStatus("black");
      if (newArticleHistory[newArticleHistory.length - 1]) {
        newArticleHistory[newArticleHistory.length - 1].bookmarked = "true";
      }
      console.log(newArticleHistory);
    } else {
      setFillStatus("none");
      if (newArticleHistory[idIndex]) {
        newArticleHistory[idIndex].bookmarked = "false";
      }
      console.log(newArticleHistory);
    }

    // Save the new articleHistory to local storage
    localStorage.setItem("articleHistory", JSON.stringify(newArticleHistory));
  };

  return (
    <ToggleButton
      value="bookmark"
      onChange={handleBookmark}
      className="bookmark-button"
    >
      <svg
        className="bookmark"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill={fillStatus}
      >
        <path
          d="M1 3C1 1.89543 1.89543 1 3 1H13C14.1046 1 15 1.89543 15 3V19L8 15.5L1 19V3Z"
          fill={fillStatus}
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </ToggleButton>
  );
};

export default BookmarkButton;
