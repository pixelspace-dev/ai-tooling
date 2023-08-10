import "./App.css";
import Banner from "./components/top-banner/Banner";
import SetupForm from "./components/SetupForm";
import TolaLogo from "./components/TolaLogo";
import ArticleCard from "./components/article-card/ArticleCard";

function App() {
  let articleHistory = JSON.parse(localStorage.getItem("articleHistory"));
  if (!articleHistory) {
    articleHistory = [];
  }
  let articleName = "";
  let articleSubheader = "";
  let articleBody = "";
  if (articleHistory[articleHistory.length-1]) {
    articleName = articleHistory[articleHistory.length-1].articleName;
    articleSubheader = articleHistory[articleHistory.length-1].articleSubheader;
    articleBody = articleHistory[articleHistory.length-1].articleBody;
  }

  return (
    <div className="App">
      <Banner />
      <div className="setup-and-articles">
        <SetupForm />
        <ArticleCard
          articleHeader={articleName}
          articleSubheader={articleSubheader}
          articleText={articleBody}
        />
        <ArticleCard />
      </div>
      <TolaLogo />
    </div>
  );
}

export default App;