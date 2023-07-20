import React, { useCallback } from "react";

export default function ClearButton() {
  function handleClick() {
    sessionStorage.clear("chatHistory");
    window.location.reload();
  }
  return <button onClick={handleClick}>Clear History</button>;
}
