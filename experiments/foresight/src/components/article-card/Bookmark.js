import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import "./bookmark.css";

const BookmarkButton = ({ articleID, fillStatus, setFillStatus }) => {
  let articleHistory = JSON.parse(localStorage.getItem("articleHistory"));
  let idIndex;
  if (articleHistory !== null) {
    idIndex = articleHistory.findIndex((id) => id.id === articleID);
  }

  const handleBookmark = (event) => {
    if (fillStatus === "none") {
      setFillStatus("black");
      if (articleHistory[articleHistory.length - 1]) {
        articleHistory[articleHistory.length - 1].bookmarked = "true";
        localStorage.setItem("articleHistory", JSON.stringify(articleHistory));
      }
      console.log(articleHistory);
    } else {
      setFillStatus("none");
      console.log(idIndex);
      if (articleHistory[idIndex]) {
        articleHistory[idIndex].bookmarked = "false";
        localStorage.setItem("articleHistory", JSON.stringify(articleHistory));
      }
      console.log(articleHistory);
    }
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
