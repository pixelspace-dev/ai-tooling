import {useEffect} from "react";
import "reactflow/dist/style.css";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import "./button.css";
import { openaiKey } from "./nodes/KeyNode.jsx";
import { message, buttonClicked} from "./nodes/TextUpdaterNode.jsx";

function OpenaiCall() {
  //// Send message to ai and get response
  useEffect(() => {
    if (openaiKey.length != 51) return;

    async function sendText(message) {
      const chat = new ChatOpenAI({
        openAIApiKey: openaiKey,
        temperature: 0.9,
      });

      response = await chat.call([new HumanMessage(message)]);
      console.log(response.content);

    }
    var response = sendText(message);
  }, [openaiKey]);

}

export default OpenaiCall