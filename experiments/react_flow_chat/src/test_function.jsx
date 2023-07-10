import { OpenAI } from "langchain/llms/openai";
import React from "react";
import {message} from './TextUpdaterNode.jsx'
//import 'dotenv/config'

var response
//var OPENAI_API_KEY=process.env.REACT_APP_API_KEY

async function sendText( model ) {
    //res = model.call(message);
    console.log(message);
    response = "this is the message: " + message
    return response
}

export {response}
export default sendText;