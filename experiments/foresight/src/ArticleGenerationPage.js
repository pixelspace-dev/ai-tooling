import Banner from "./components/top-banner/Banner";
import SetupForm from "./components/SetupForm";
import TolaLogo from "./components/TolaLogo";
import ArticleCard from "./components/article-card/ArticleCard";
import React, { useState } from "react";

const ArticleGenerationPage = () => {



  return (
    <div className="App">
      <Banner/>
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