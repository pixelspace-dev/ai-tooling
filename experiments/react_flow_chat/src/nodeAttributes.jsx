
export default function defineAttributes(id, x, y, content) {
    const nodeString = localStorage.getItem('nodeArray')
    const nodeArray = JSON.parse(nodeString)
    let newNode = {
        "id" : id,
        "xVal" : x,
        "yVal" : y,
        "content" : content
    }
    nodeArray.push(newNode)
    const nodeString2 = JSON.stringify(nodeArray)
    localStorage.setItem('nodeArray', nodeString2)

}