import { v4 as uuidv4 } from "uuid";

export default function StoreArticle() {
    let articleName = localStorage.getItem("articleName")
    let articleSubheader = localStorage.getItem("authorName") + ", " + localStorage.getItem("date");
    let articleBody = localStorage.getItem("articleBody")

    let articleHistory = JSON.parse(localStorage.getItem("articleHistory"));
    if (!articleHistory) {
      articleHistory = [];
    }

    let newArticle = {
        "id" : uuidv4(),
        "bookmarked" : false,
        "articleName" : articleName,
        "articleSubheader" : articleSubheader,
        "articleBody" : articleBody
    }
    articleHistory.push(newArticle)
    localStorage.setItem("articleHistory", JSON.stringify(articleHistory))
}