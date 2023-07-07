import { OpenAI } from "langchain/llms/openai";
import React from "react";



function sendText( model, message ) {
    //res = await model.call(message);
    console.log(message);
    return message 
}

export default sendText;