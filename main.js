import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBk_uC5BXA8AGTRq6nQjRxIGDlKINBIq54");

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });


  const prompt = "what is the legal document?."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
