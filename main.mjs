import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCGX9idIFFrKbWj6p9FeWyN912KZJ6fQ4s");

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "what is the legal document?."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();