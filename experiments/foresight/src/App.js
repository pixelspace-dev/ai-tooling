import "./App.css";
import Banner from "./components/top-banner/Banner";
import SetupForm from "./components/SetupForm";
import TolaLogo from "./components/TolaLogo";
import ArticleCard from "./components/article-card/ArticleCard";

function App() {
  return (
    <div className="App">
      <Banner />
      <div className="setup-and-articles">
        <SetupForm />
        <ArticleCard articleHeader={localStorage.getItem("articleName")} articleSubheader={localStorage.getItem("authorName") + ", " + localStorage.getItem("date")} articleText={localStorage.getItem("articleBody")} />
        <ArticleCard />
      </div>
      <TolaLogo />
    </div>
  );
}

export default App;
