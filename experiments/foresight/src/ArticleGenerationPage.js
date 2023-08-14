import Banner from "./components/top-banner/Banner";
import SetupForm from "./components/SetupForm";
import TolaLogo from "./components/TolaLogo";
import ArticleCard from "./components/article-card/ArticleCard";
import React, {useState} from "react";

const ArticleGenerationPage = ({companyName, setSidebar, sidebar}) => {
  const [fillStatus, setFillStatus] = useState("none");

  return (
    <div className="App">
      <Banner companyName={companyName} setSidebar={setSidebar} sidebar={sidebar}/>
      <div className="setup-and-articles">
        <SetupForm />
        <ArticleCard fillStatus={fillStatus} setFillStatus={setFillStatus}
        />
        <ArticleCard fillStatus={fillStatus} setFillStatus={setFillStatus}/>
      </div>
      <TolaLogo />
    </div>
  );
}

export default ArticleGenerationPage;