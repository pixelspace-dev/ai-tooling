import SavedArticlesPageBanner from "./SavedArticlesPageBanner";
import SavedArticleCard from "./SavedArticleCard";
import React from "react";

const SavedArticlesPage = ({ setSidebar, sidebar }) => {
  let articleHistory = JSON.parse(localStorage.getItem("articleHistory"));
  let articleID = [];
  let articleName = [];
  let articleSubheader = [];
  let articleBody = [];
  let companyName = [];
  if (articleHistory !== null) {
    for (let i = 0; i < articleHistory.length; i++) {
      if (articleHistory[i].bookmarked === "true") {
        articleID.push(articleHistory[i].id);
        articleName.push(articleHistory[i].articleName);
        articleSubheader.push(articleHistory[i].articleSubheader);
        articleBody.push(articleHistory[i].articleBody);
        companyName.push(articleHistory[i].companyName)
      }
    }
    const filteredArray = articleHistory.filter(
      (item) => item.bookmarked === "true"
    );
    console.log(filteredArray);
    localStorage.setItem("articleHistory", JSON.stringify(filteredArray));
  }

  let arrayLength = articleID.length;

  return (
    <div className="App">
      <div className="app-container">
        <SavedArticlesPageBanner
          companyName="Foresight"
          setSidebar={setSidebar}
          sidebar={sidebar}
        />
        <div className="setup-and-articles">
          {[...Array(arrayLength)].map((_, index) => (
            <SavedArticleCard
              key={index}
              id={articleID[index]}
              articleName={articleName[index]}
              articleSubheader={articleSubheader[index]}
              articleBody={articleBody[index]}
              companyName={companyName[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedArticlesPage;
