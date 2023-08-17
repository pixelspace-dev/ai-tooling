import openaiCall from "./openaiCall";
import storeArticle from "../storeArticle";
import React, { useState } from "react";
import "./initial-generate-button.css";

const InitialGenerateButton = ({
  articleID,
  sentiment,
  articleType,
  setArticleName,
  setArticleSubheader,
  setArticleBody,
  setArticleClass,
}) => {
  const [generateStyle, setGenerateStyle] = useState("initial-generate-button");
  const [generateMessage, setGenerateMessage] = useState("Create Article");
  const handleOpenAiCall = async () => {
    setGenerateStyle("updated-generate-button")
    setGenerateMessage("")

    // get each variable that gets sent into ai
    // const sentiment = localStorage.getItem("sentiment");
    console.log(sentiment);
    if (!sentiment) return;
    console.log(articleType);
    if (!articleType) return;
    const hypothesis = localStorage.getItem("hypothesis");
    console.log(hypothesis);
    if (!hypothesis) return;
    const date = localStorage.getItem("date");
    console.log(date);
    if (!date) return;
    const companyName = localStorage.getItem("companyName");
    console.log(companyName);
    if (!companyName) return;
    const companyInformation = localStorage.getItem("companyInformation");
    console.log(companyInformation);
    if (!companyInformation || !companyInformation.length) return;
    //call openai
    console.log("calling openai");
    // create article name
    await openaiCall(
      "articleName",
      "Provide the name of a" +
        sentiment +
        "article that is written by" +
        articleType +
        "news company based on the following information about the company the article is written about:" +
        companyInformation +
        hypothesis +
        "Format the title as follows: {news company name}: {article title}"
    );
    // create author name
    await openaiCall(
      "authorName",
      "Provide the fake first and last name of a made up journalist that writes for" +
        articleType
    );
    //create article body
    await openaiCall(
      "articleBody",
      "Create a" +
        sentiment +
        "article that is written by" +
        articleType +
        "based on the following information about the company the article is written about:" +
        companyInformation +
        hypothesis +
        "You do not need to give the article a name."
    );
    //update visible article
    setArticleClass("clear")
    setArticleName(localStorage.getItem("articleName"));
    setArticleSubheader(localStorage.getItem("authorName") + ", " + date);
    setArticleBody(localStorage.getItem("articleBody"));
    // store the article to be accessed by saved articles page
    storeArticle(articleID, localStorage.getItem("articleName"), localStorage.getItem("authorName") + ", " + date, localStorage.getItem("articleBody"), localStorage.getItem("companyName") );
  };

  return (
    <button className={generateStyle} onClick={handleOpenAiCall}>
      <div className="create-article-text">{generateMessage}</div>
      <svg
        className="sparkles"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="28"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M6.95833 4.375V9.54167M4.375 6.95833H9.54167M8.25 22.4583V27.625M5.66667 25.0417H10.8333M17.2917 4.375L20.244 13.2321L27.625 16L20.244 18.7679L17.2917 27.625L14.3393 18.7679L6.95833 16L14.3393 13.2321L17.2917 4.375Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default InitialGenerateButton;
