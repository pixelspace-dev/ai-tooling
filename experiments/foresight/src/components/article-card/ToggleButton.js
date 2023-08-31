import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import "./toggle-button.css";

export default function ToggleButtons({
  sentiment,
  setSentiment,
  articleClass,
  setArticleClass,
}) {
  // toggle between positive and negative when button is pressed
  const handleSentiment = (event) => {
    if (sentiment === "positive") {
      setSentiment("negative");
    } else {
      setSentiment("positive");
    }
    localStorage.setItem("sentiment", sentiment);
    // when something is changed, the article text should change css
    if (articleClass === "clear") {
      setArticleClass("opaque");
    }
  };

  return (
    <ToggleButton
      value="sentiment"
      onChange={handleSentiment}
      className={sentiment}
    >
      {sentiment}
    </ToggleButton>
  );
}
