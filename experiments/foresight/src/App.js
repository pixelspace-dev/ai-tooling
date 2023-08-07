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
        <ArticleCard />
        <ArticleCard />
      </div>
      <TolaLogo />
    </div>
  );
}

export default App;
