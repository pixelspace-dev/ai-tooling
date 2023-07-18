import "reactflow/dist/style.css";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";

async function OpenaiCall() {
  //Send message to ai and get response
    const openaiKey = sessionStorage.getItem('openaiKey')
    if (!openaiKey || !openaiKey.length) return;

    async function sendText(message) {

      // pastMessagesString = sessionStorage.getItem('pastMessages')
      // console.log(pastMessagesString)
      // pastMessages = JSON.parse(pastMessagesString)
      // console.log(pastMessages)
      // const memory = new BufferMemory({
      //   chatHistory: new ChatMessageHistory(pastMessages),
      // });
      const memory = new BufferMemory();

      const chat = new ChatOpenAI({
        openAIApiKey: sessionStorage.getItem('openaiKey'),
        temperature: 0.9,
      });
      const chain = new ConversationChain({ llm: chat, memory: memory });

      response = await chain.call({ input: message });
      console.log(response.response);
      localStorage.setItem('openAiResponse', JSON.stringify(response.response))
    }

    const message = localStorage.getItem('message')

    var response = await sendText(message);
}

export default OpenaiCall
