import ArticleEditable from "./ArticleEditable";
import InitialGenerateButton from "./InitialGenerateButton";
import "./article-card.css";

const ArticleCard = (props) => {
  let articleHeader = props.articleHeader
  if ( articleHeader == null ) {
    articleHeader = ""
  }
  return (
    <div className="article-form-box">
      <ArticleEditable />
      <div className="full-article">
        <p className="article-header">{props.articleHeader}</p>
        <p className="article-subheader">{props.articleSubheader}</p>
        <p className="article-body-text">{props.articleText}</p>
      </div>
      <InitialGenerateButton/>
    </div>
  );
};

export default ArticleCard;
