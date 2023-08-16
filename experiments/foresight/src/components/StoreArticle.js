export default function storeArticle(id, articleName, articleSubheader, articleBody) {

    let articleHistory = JSON.parse(localStorage.getItem("articleHistory"));
    if (!articleHistory) {
      articleHistory = [];
    }

    let newArticle = {
        "id" : id,
        "bookmarked" : "false",
        "articleName" : articleName,
        "articleSubheader" : articleSubheader,
        "articleBody" : articleBody
    }
    articleHistory.push(newArticle)
    console.log(articleHistory)
    localStorage.setItem("articleHistory", JSON.stringify(articleHistory))
}