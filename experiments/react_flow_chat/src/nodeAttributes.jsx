
export default function defineAttributes(id, x, y, content, previousResponseID) {
    const nodeArray = JSON.parse(localStorage.getItem('nodeArray'))
    let newNode = {
        "id" : id,
        "xVal" : x,
        "yVal" : y,
        "content" : content,
        "previousResponseID" : previousResponseID
    }
    nodeArray.push(newNode)
    localStorage.setItem('nodeArray', JSON.stringify(nodeArray))

}