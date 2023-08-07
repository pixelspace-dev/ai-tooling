import ArticleEditable from "./ArticleEditable";
import "./article-card.css"

export default function ArticleCard() {
  return (
    <form className="article-form-box">
        <ArticleEditable />
    </form>
  );
}
