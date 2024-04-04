import express from "express";
import { addMessage, getMessages } from "../controller/messageController.js";
import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
const messageRouter = express.Router();

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = "AIzaSyB-u1rkOT2v8wXEowPK8KCDto46z06Ja64";

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

// async function main() {
//   let first = "Tell me a one short animal fact.";
//   let messages = [{ content: first }];

//   const result = await client.generateMessage({
//     model: MODEL_NAME,
//     prompt: { messages },
//   });

//   console.log("User:\n\n", first, "\n\n");
//   console.log("Palm:\n\n", result[0].candidates[0].content, "\n\n");

//   let second = "Oh, where do those live?";

//   messages.push({ content: result[0].candidates[0].content });
//   messages.push({ content: second });

//   const secondResult = await client.generateMessage({
//     model: MODEL_NAME,
//     prompt: { messages },
//   });

//   console.log("User:\n\n", second, "\n\n");
//   console.log("Palm:\n\n", secondResult[0].candidates[0].content, "\n\n");
// }

messageRouter.post("/add_message", addMessage);
messageRouter.get("/get_message:id", getMessages);

// messageRouter.post("/chat", async (req, res) => {
//   console.log(req?.body?.body?.question);
//   let first = req?.body?.body?.question;
//   let messages = [{ content: first }];

//   const result = await client.generateMessage({
//     model: MODEL_NAME,
//     prompt: { messages },
//   });

//   console.log("User:\n\n", first, "\n\n");
//   console.log("Palm:\n\n", result[0].candidates[0].content, "\n\n");
//   res.status(200).send({
//     res: result,
//   });

// });
export { messageRouter };
