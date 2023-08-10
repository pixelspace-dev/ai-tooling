import InitialGenerateButton from "./InitialGenerateButton";
import { v4 as uuidv4 } from "uuid";
import ArticleTypeMenu from "./ArticleTypeMenu";
import ToggleButtons from "./ToggleButton";
import BookmarkButton from "./Bookmark";
import "./article-card.css";

const ArticleCard = (props) => {
  let articleHeader = props.articleHeader;
  if (articleHeader == null) {
    articleHeader = "";
  }
  let id = uuidv4();
  return (
    <div className="article-form-box">
      <div className="article-editable">
        <ToggleButtons />
        <ArticleTypeMenu />
        <BookmarkButton articleID={id}/>
      </div>
      <div className="full-article">
        <p className="article-header">{props.articleHeader}</p>
        <p className="article-subheader">{props.articleSubheader}</p>
        <p className="article-body-text">{props.articleText}</p>
      </div>
      <InitialGenerateButton articleID={id} />
    </div>
  );
};

export default ArticleCard;
