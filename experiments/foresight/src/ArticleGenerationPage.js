import Banner from "./components/top-banner/Banner";
import SetupForm from "./components/SetupForm";
import TolaLogo from "./components/TolaLogo";
import ArticleCard from "./components/article-card/ArticleCard";
import React from "react";

const ArticleGenerationPage = ({companyName, setSidebar, sidebar}) => {


  return (
    <div className="App">
      <Banner companyName={companyName} setSidebar={setSidebar} sidebar={sidebar}/>
      <div className="setup-and-articles">
        <SetupForm />
        <ArticleCard
        />
        <ArticleCard />
      </div>
      <TolaLogo />
    </div>
  );
}

export default ArticleGenerationPage;