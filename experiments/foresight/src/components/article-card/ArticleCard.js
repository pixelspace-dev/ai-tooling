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
  const [sentiment, setSentiment] = useState("positive");
  const [fillStatus, setFillStatus] = useState("none");
  const [articleClass, setArticleClass] = useState("clear");

  let id = uuidv4();
  return (
    <div className="article-form-box">
      <div className="article-editable">
        <ToggleButtons
          sentiment={sentiment}
          setSentiment={setSentiment}
          setArticleClass={setArticleClass}
        />
        <ArticleTypeMenu
          setArticleClass={setArticleClass}
        />
        <div style={{ marginLeft: "80px" }}>
          <BookmarkButton
            articleID={id}
            fillStatus={fillStatus}
            setFillStatus={setFillStatus}
          />
        </div>
      </div>

      <div className="full-article">
        <p className="article-header">{articleName}</p>
        <p className="article-subheader">{articleSubheader}</p>
        <p className="article-body-text">{articleBody}</p>
      </div>
      <div className={articleClass}></div>
      <InitialGenerateButton
        articleID={id}
        sentiment={sentiment}
        setArticleName={setArticleName}
        setArticleSubheader={setArticleSubheader}
        setArticleBody={setArticleBody}
        setArticleClass={setArticleClass}
      />
    </div>
  );
};

export default ArticleCard;
