import "./banner.css";
import SavedArticlesButton from "./SavedArticlesButton";
import SidebarArrow from "./SidebarArrow";

export default function Banner() {
  return (
    <>
      <div className="banner">
        <SidebarArrow className="sidebar-button"/>
        <h1>Unnamed Company</h1>
        <SavedArticlesButton className="saved-articles-button"/>
      </div>
    </>
  );
}
