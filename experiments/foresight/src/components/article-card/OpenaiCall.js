import { OpenAI } from "langchain/llms/openai";

async function OpenaiCall(storageName, message) {
  sessionStorage.setItem(
    "openaiKey",
    "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"
  );
  //Send message to ai and get response
  const openaiKey = sessionStorage.getItem("openaiKey");
  if (!openaiKey || !openaiKey.length) return;

  async function sendText(message) {
    const llm = new OpenAI({
      openAIApiKey: sessionStorage.getItem("openaiKey"),
      temperature: 0.9,
      modelName: "gpt-4",
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
