import Banner from "./components/top-banner/Banner";
import SetupForm from "./components/SetupForm";
import TolaLogo from "./components/TolaLogo";
import ArticleCard from "./components/article-card/ArticleCard";
import React, {useState} from "react";

const ArticleGenerationPage = ({companyName, setCompanyName, setSidebar, sidebar}) => {
  const [fillStatus, setFillStatus] = useState("none");

  return (
    <div className="App">
      <div className="app-container">
      <Banner companyName={companyName}  setCompanyName={setCompanyName} setSidebar={setSidebar} sidebar={sidebar}/>
      <div className="setup-and-articles">
        <SetupForm />
        <ArticleCard fillStatus={fillStatus} setFillStatus={setFillStatus}
        />
        <ArticleCard fillStatus={fillStatus} setFillStatus={setFillStatus}/>
      </div>
      <TolaLogo />
      </div>
    </div>
  );
}

export default ArticleGenerationPage;