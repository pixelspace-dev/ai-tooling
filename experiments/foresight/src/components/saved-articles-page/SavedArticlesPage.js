import SavedArticlesPageBanner from "./SavedArticlesPageBanner"
import ArticleCard from "../article-card/ArticleCard";
import React from "react";

const ArticleGenerationPage = ({companyName, setSidebar, sidebar}) => {
  return (
    <div className="App">
      <SavedArticlesPageBanner companyName={companyName} setSidebar={setSidebar} sidebar={sidebar}/>
      <div className="setup-and-articles">
        <ArticleCard
        />
        <ArticleCard />
      </div>
    </div>
  );
}

export default ArticleGenerationPage;