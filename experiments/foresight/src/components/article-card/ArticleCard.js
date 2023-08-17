import InitialGenerateButton from "./InitialGenerateButton";
import { v4 as uuidv4 } from "uuid";
import ArticleTypeMenu from "./ArticleTypeMenu";
import ToggleButtons from "./ToggleButton";
import BookmarkButton from "./Bookmark";
import React, { useState } from "react";
import "./article-card.css";

const ArticleCard = ({selected, setSelected}) => {
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
        <div className="left-side">
          <ToggleButtons
            sentiment={sentiment}
            setSentiment={setSentiment}
            setArticleClass={setArticleClass}
          />
          <ArticleTypeMenu
            style={{ zIndex: 1, position: "absolute" }}
            setArticleClass={setArticleClass}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div>
          <BookmarkButton
            articleID={id}
            fillStatus={fillStatus}
            setFillStatus={setFillStatus}
          />
        </div>
      </div>

      <div className="full-article" style={{ zIndex: 10 }}>
        <p className="article-header">{articleName}</p>
        <p className="article-subheader">{articleSubheader}</p>
        <p className="article-body-text">{articleBody}</p>
      </div>
      <div className={articleClass}></div>
      <InitialGenerateButton
        articleID={id}
        sentiment={sentiment}
        articleType={selected.name}
        setArticleName={setArticleName}
        setArticleSubheader={setArticleSubheader}
        setArticleBody={setArticleBody}
        setArticleClass={setArticleClass}
      />
    </div>
  );
};

export default ArticleCard;
