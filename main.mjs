import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyC23mNrEF8ybZrXcYNYA7Ibp9bsMtk57aA");

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "what is the legal document?."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
