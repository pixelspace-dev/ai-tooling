import React from "react";
import "./clear-button.css"

export default function ClearButton() {
  function handleClick() {
    sessionStorage.clear("chatHistory");
    window.location.reload();
  }
  return <button className="clear-button" onClick={handleClick}>Clear History</button>;
}
