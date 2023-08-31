export default function storeArticle(
  id,
  articleName,
  articleSubheader,
  articleBody,
  companyName
) {
  // initialize article history
  let articleHistory = JSON.parse(localStorage.getItem("articleHistory"));
  if (!articleHistory) {
    articleHistory = [];
  }

  // set new array element
  let newArticle = {
    id: id,
    bookmarked: "false",
    articleName: articleName,
    articleSubheader: articleSubheader,
    articleBody: articleBody,
    companyName: companyName,
  };
  
  // add new article to article history
  articleHistory.push(newArticle);
  console.log(articleHistory);
  localStorage.setItem("articleHistory", JSON.stringify(articleHistory));
}
