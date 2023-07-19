import "reactflow/dist/style.css";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanMessage, AIMessage } from "langchain/schema";

async function OpenaiCall(currentID, nextID) {
  //Send message to ai and get response
  const openaiKey = sessionStorage.getItem("openaiKey");
  if (!openaiKey || !openaiKey.length) return;

  /* pastMessages is an array of objects whose contents look like
    want:
    pastMessages = [
      idnum,
      numels,
      {type: "human",
      text: "hi"},
      idnum2,
      numels2,
      {type: "human",
      text: "hello"}
    ]
    this was necessary because saving the [new HumanMessage(""), new AIMessage("")] array
    in sessionStorage with stringify ruined the formatting
  */
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
    numberElements = pastMessages[idIndex].numberElements;
  }

  //pastMessages.push(nextID, (numberElements+2));

  // history is the usable chat history
  let history = [];
  for (let i = 0; i < pastMessages.length; i = i + 2) {
    //works
    history.push(new HumanMessage(pastMessages[i].text));
    history.push(new AIMessage(pastMessages[i + 1].text));

    // does not work
    // console.log(pastMessages[i]);
    // pastMessages.push(pastMessages[i]);
    // pastMessages.push(pastMessages[i + 1]);
  }
  //console.log(pastMessages[2]);
  console.log(history);
  console.log(pastMessages);

  async function sendText(message) {
    // initialize memory
    const memory = new BufferMemory({
      chatHistory: new ChatMessageHistory(history),
    });

    // initialize openai instance
    const chat = new ChatOpenAI({
      openAIApiKey: sessionStorage.getItem("openaiKey"),
      temperature: 0.9,
    });
    const chain = new ConversationChain({ llm: chat, memory: memory });

    // get response
    response = await chain.call({ input: message });
    console.log(response.response);
    localStorage.setItem("openAiResponse", JSON.stringify(response.response));

    // add input and output to memory array
    pastMessages.push({
      type: "human",
      text: message,
    });
    pastMessages.push({
      type: "ai",
      text: response.response,
    });

    sessionStorage.setItem("chatHistory", JSON.stringify(pastMessages));
  }
  //chat function call
  const message = localStorage.getItem("message");

  var response = await sendText(message);
}

export default OpenaiCall;
