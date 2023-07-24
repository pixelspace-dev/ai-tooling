import "reactflow/dist/style.css";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanMessage, AIMessage } from "langchain/schema";

async function OpenaiCall(currentID) {
  //Send message to ai and get response
  const openaiKey = sessionStorage.getItem("openaiKey");
  if (!openaiKey || !openaiKey.length) return;

  let pastMessages = JSON.parse(sessionStorage.getItem("chatHistory"));
  let idIndex = pastMessages.findIndex((id) => id == currentID);
  let numberElements;
  if (idIndex < 0) {
    numberElements = 0;
  } else {
    numberElements = pastMessages[idIndex + 1];
  }
  console.log("id index: " + idIndex);

  // history is the usable chat history
  let history = [];
  for (let i = idIndex + 2; i < idIndex + numberElements + 2; i = i + 2) {
    //works
    history.push(new HumanMessage(pastMessages[i].text));
    history.push(new AIMessage(pastMessages[i + 1].text));
  }
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
      modelName: "gpt-4"
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
