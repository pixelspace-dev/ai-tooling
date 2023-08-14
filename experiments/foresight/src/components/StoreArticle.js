export default function StoreArticle(id) {
    let articleName = localStorage.getItem("articleName")
    let articleSubheader = (localStorage.getItem("authorName") !== null) ? localStorage.getItem("authorName") + ", " + localStorage.getItem("date") : null;
    let articleBody = localStorage.getItem("articleBody")

    let articleHistory = JSON.parse(localStorage.getItem("articleHistory"));
    if (!articleHistory) {
      articleHistory = [];
    }

    let newArticle = {
        "id" : id,
        "bookmarked" : false,
        "articleName" : articleName,
        "articleSubheader" : articleSubheader,
        "articleBody" : articleBody
    }
    articleHistory.push(newArticle)
    localStorage.setItem("articleHistory", JSON.stringify(articleHistory))
}