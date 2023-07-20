export default function updatePastHistory(currentID, nextID, isHuman) {
  let pastMessages = JSON.parse(sessionStorage.getItem("chatHistory"));
  if (!pastMessages) {
    pastMessages = [];
  }

  // index of corresponding id value
  let idIndex = pastMessages.findIndex((id) => id == currentID);
  let numberElements;
  if (idIndex < 0) {
    numberElements = 0;
  } else {
    numberElements = pastMessages[idIndex + 1];
  }

  if (isHuman) {
    pastMessages.push(nextID, numberElements + 2);
  } else {
    pastMessages.push(nextID, numberElements);
  }

  for (let i = idIndex + 2; i < idIndex + numberElements + 2; i = i + 2) {
    pastMessages.push(pastMessages[i]);
    pastMessages.push(pastMessages[i + 1]);
  }
  sessionStorage.setItem("chatHistory", JSON.stringify(pastMessages));
}

/* pastMessages is an array of objects whose contents look like
    want:
    pastMessages = [
      idnum,
      numels,
      {type: "human",
      text: "hi"},
      {type: "aiMessage",
      text: "Hello! How can I assist you today?"}
      idnum2,
      numels2,
      {type: "human",
      text: "hello"},
      {type...}
    ]
    this was necessary because saving the [new HumanMessage(""), new AIMessage("")] array
    in sessionStorage with stringify ruined the formatting
  */
