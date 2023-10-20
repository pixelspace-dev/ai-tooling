import openaiCall from "./OpenaiCall";
import storeArticle from "../StoreArticle";
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
  setFillStatus,
}) => {
  const [generateStyle, setGenerateStyle] = useState("initial-generate-button");
  const [generateMessage, setGenerateMessage] = useState("Create Article");
  const handleOpenAiCall = async () => {
    setArticleClass("opaque");
    setFillStatus("none");
    setGenerateStyle("updated-generate-button");
    setGenerateMessage("");

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
      "Write a title for a" +
        sentiment +
        "sentiment news article as written by" +
        articleType +
        ", making sure you respect the tone, style, language and biases that this new organization is known for. An article piece based on the following information about the company the article is written about, and the hypothesis for this company's potential future described here as well:" +
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
      "Write a" +
        sentiment +
        "sentiment news article as written by" +
        articleType +
        ", making sure you respect the tone, style, language and biases that this new organization is known for. An article piece based on the following information about the company the article is written about, and the hypothesis for this company's potential future described here as well:" +
        companyInformation +
        hypothesis +
        "Your goal is to predict the " +
        sentiment +
        " future of that company by the date that the article is written. You do not need to give the article a name. Do not make any make up any information about the company. Only base your article on the provided information about the company and the hypotheses exposed there. The article will be of a good length, it will not a be a short little article, and it will also not be a full book. Consider approximately 1,000 words length."
    );
    //update visible article
    setArticleClass("clear");
    setArticleName(localStorage.getItem("articleName"));
    setArticleSubheader(localStorage.getItem("authorName") + ", " + date);
    setArticleBody(localStorage.getItem("articleBody"));
    // store the article to be accessed by saved articles page
    storeArticle(
      articleID,
      localStorage.getItem("articleName"),
      localStorage.getItem("authorName") + ", " + date,
      localStorage.getItem("articleBody"),
      localStorage.getItem("companyName")
    );
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
