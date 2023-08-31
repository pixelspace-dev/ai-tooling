import Banner from "./components/top-banner/Banner";
import SetupForm from "./components/SetupForm";
import ArticleCard from "./components/article-card/ArticleCard";
import React, { useState } from "react";

const ArticleGenerationPage = ({
  companyName,
  setCompanyName,
  // setSidebar,
  // sidebar,
}) => {
  // determines fill status of the bookmark button
  const [fillStatus, setFillStatus] = useState("none");

  // determines which company has been selected in the dropdown menu for each card
  const [selected1, setSelected1] = useState({
    id: 1,
    name: "TechCrunch",
  });
  const [selected2, setSelected2] = useState({
    id: 1,
    name: "TechCrunch",
  });

  return (
    <div className="App">
      <div className="app-container">
        <Banner
          companyName={companyName}
          setCompanyName={setCompanyName}
          // setSidebar={setSidebar}
          // sidebar={sidebar}
        />
        <div className="setup-and-articles">
          <SetupForm />
          <ArticleCard
            fillStatus={fillStatus}
            setFillStatus={setFillStatus}
            selected={selected1}
            setSelected={setSelected1}
          />
          <ArticleCard
            fillStatus={fillStatus}
            setFillStatus={setFillStatus}
            selected={selected2}
            setSelected={setSelected2}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleGenerationPage;
