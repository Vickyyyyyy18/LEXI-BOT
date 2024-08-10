import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";

document.addEventListener('DOMContentLoaded', () => {
    const genAI = new GoogleGenerativeAI("AIzaSyCGX9idIFFrKbWj6p9FeWyN912KZJ6fQ4s");

    document.getElementById('generate-btn').addEventListener('click', async () => {
        const prompt = document.getElementById('prompt').value;
        const fileInput = document.getElementById('file-input');
        const outputDiv = document.getElementById('output');
        

        if (prompt.trim() === '' && fileInput.files.length === 0) {
            alert('Please enter a prompt or select a file!');
            return;
        }

        outputDiv.textContent = 'Please be patient Generating...';

        let fileContent = '';

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            fileContent = await file.text();
        }

        const finalPrompt = `${prompt}\n${fileContent}`;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(finalPrompt);
            const response = await result.response;
            const text = await response.text();

            outputDiv.textContent = text;
        } catch (error) {
            outputDiv.textContent = `Error: ${error.message}`;
        }
    });
});
