import "reactflow/dist/style.css";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import "./button.css";

async function OpenaiCall() {
  //// Send message to ai and get response
    const openaiKey = localStorage.getItem('openaiKey')
    if (!openaiKey || !openaiKey.length) return;

    async function sendText(message) {
      const chat = new ChatOpenAI({
        openAIApiKey: localStorage.getItem('openaiKey'),
        temperature: 0.9,
      });

      response = await chat.call([new HumanMessage(message)]);
      console.log(response.content);
      localStorage.setItem('openAiResponse', JSON.stringify(response.content))
    }

    const message = localStorage.getItem('message')

    var response = await sendText(message);
}

export default OpenaiCall