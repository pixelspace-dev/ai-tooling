import ArticleTypeMenu from "./ArticleTypeMenu";
import ToggleButtons from "./ToggleButton";
import BookmarkButton from "./Bookmark";
import "./article-editable.css";

export default function ArticleEditable() {
  return (
    <div className="article-editable">
      <ToggleButtons />
      <ArticleTypeMenu />
      <BookmarkButton />
    </div>
  );
}
