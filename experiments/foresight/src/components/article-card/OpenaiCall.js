import { OpenAI } from "langchain/llms/openai";

async function OpenaiCall(storageName, message) {
  //Send message to ai and get response
  async function sendText(message) {
    const llm = new OpenAI({
      openAIApiKey: process.env.REACT_APP_API_KEY,
      temperature: 0.9,
    });
    response = await llm.call(message);
    console.log(response);
    response.slice(1, 0);
    response.slice(0, -1);
    localStorage.setItem(storageName, response);
  }

  var response = await sendText(message);
}

export default OpenaiCall;
