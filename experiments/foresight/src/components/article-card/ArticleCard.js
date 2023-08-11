import InitialGenerateButton from "./InitialGenerateButton";
import { v4 as uuidv4 } from "uuid";
import ArticleTypeMenu from "./ArticleTypeMenu";
import ToggleButtons from "./ToggleButton";
import BookmarkButton from "./Bookmark";
import React, { useState } from "react";
import "./article-card.css";

const ArticleCard = (props) => {
  const [articleName, setArticleName] = useState(null);
  const [articleSubheader, setArticleSubheader] = useState(null);
  const [articleBody, setArticleBody] = useState(null);

  // let articleHistory = JSON.parse(localStorage.getItem("articleHistory"));
  // if (!articleHistory) {
  //   articleHistory = [];
  // }
  // let articleName = "";
  // let articleSubheader = "";
  // let articleBody = "";
  // if (articleHistory[articleHistory.length-1]) {
  //   articleName = articleHistory[articleHistory.length-1].articleName;
  //   articleSubheader = articleHistory[articleHistory.length-1].articleSubheader;
  //   articleBody = articleHistory[articleHistory.length-1].articleBody;
  // }
  // if (articleName == null) {
  //   articleName = "";
  // }
  // if (articleSubheader == null) {
  //   articleSubheader = "";
  // }
  let id = uuidv4();
  return (
    <div className="article-form-box">
      <div className="article-editable">
        <ToggleButtons />
        <ArticleTypeMenu />
        <BookmarkButton articleID={id}/>
      </div>
      <div className="full-article">
        <p className="article-header">{articleName}</p>
        <p className="article-subheader">{articleSubheader}</p>
        <p className="article-body-text">{articleBody}</p>
      </div>
      <InitialGenerateButton articleID={id} setArticleName={setArticleName} setArticleSubheader={setArticleSubheader} setArticleBody={setArticleBody}/>
    </div>
  );
};

export default ArticleCard;
