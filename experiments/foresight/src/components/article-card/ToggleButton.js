import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import "./toggle-button.css";

export default function ToggleButtons({sentiment, setSentiment, setArticleClass}) {

  const handleSentiment = (event) => {
    if (sentiment === "positive") {
      setSentiment("negative");
    } else {
      setSentiment("positive");
    }
    localStorage.setItem("sentiment", sentiment)
    setArticleClass("opaque")
  };

  return (
      <ToggleButton value="sentiment" onChange={handleSentiment} className={sentiment} >
        {sentiment}
      </ToggleButton>
  );
}
