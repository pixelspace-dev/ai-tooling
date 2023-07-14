import { useEffect, useCallback } from "react";
import "reactflow/dist/style.css";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import "./button.css";
import { openaiKey } from "./nodes/KeyNode.jsx";
//import { message } from "./nodes/TextUpdaterNode.jsx";

function OpenaiCall(message) {
  //// Send message to ai and get response
  useEffect(() => {
    if (openaiKey.length != 51) return;

    async function sendText(message) {
      //chat call instance
      const chat = new ChatOpenAI({
        openAIApiKey: openaiKey,
        temperature: 0.9,
      });

      // make call to ai
      response = await chat.call([new HumanMessage(message)]);
      //record response
      console.log(response.content);
      //can't return a value
    }
    //call ai function - does not get response back
    var response = sendText(message);
  }, [openaiKey]);
}

export default OpenaiCall;
