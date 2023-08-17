import BookmarkButton from "../article-card/Bookmark";
import "./saved-article-card.css";
import React, { useState } from "react";

const SavedArticleCard = ({
  id,
  articleName,
  articleSubheader,
  articleBody,
  companyName,
}) => {
  const [savedFillStatus, setSavedFillStatus] = useState("black");

  return (
    <div className="saved-article-form-box">
      <div className="saved-article-bookmark">
        <p className="saved-article-company-name">{companyName}</p>
        <BookmarkButton
          className="saved-bookmark-button"
          articleID={id}
          fillStatus={savedFillStatus}
          setFillStatus={setSavedFillStatus}
        />
      </div>
      <div className="full-article">
        <p className="article-header">{articleName}</p>
        <p className="article-subheader">{articleSubheader}</p>
        <p className="article-body-text">{articleBody}</p>
      </div>
    </div>
  );
};

export default SavedArticleCard;
