import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import "./bookmark.css";

export default function BookmarkButton() {
  const [fillStatus, setFillStatus] = React.useState("none");

  const handleBookmark = (event) => {
    if (fillStatus === "none") {
      setFillStatus("black");
    } else {
      setFillStatus("none");
    }
  };

  return (
    <ToggleButton value="bookmark" onChange={handleBookmark} className="bookmark-button">
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
}
