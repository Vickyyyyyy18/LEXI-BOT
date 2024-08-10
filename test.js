import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";
document.addEventListener('DOMContentLoaded', () => {
    const genAI = new GoogleGenerativeAI("AIzaSyCGX9idIFFrKbWj6p9FeWyN912KZJ6fQ4s");

    document.getElementById('generate-btn').addEventListener('click', async () => {
        const prompt = document.getElementById('prompt').value;
        const fileInput = document.getElementById('file-input');
        const outputDiv = document.getElementById('output');

        outputDiv.textContent = 'Generating...';

        let fileContent = '';

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];

            
            if (file.type !== "text/plain") {
                alert('Please give only text files');
                outputDiv.textContent = 'Invalid input type . Please upload a text file.';
                return;
            }

            const reader = new FileReader();

            try {
                fileContent = await new Promise((resolve, reject) => {
                    reader.onload = (event) => resolve(event.target.result);
                    reader.onerror = () => reject(new Error("Error reading file"));
                    reader.readAsText(file);
                });
            } catch (error) {
                outputDiv.textContent = `File Reading Error: ${error.message}`;
                return;
            }

            const legalTerms = [
                'agreement',
                'confidential',
                'liability',
                'warranty',
                'indemnification',
                'dispute',
                'jurisdiction',
                'governing law',
                'termination'
            ];

            const contentLowerCase = fileContent.toLowerCase();
            const containsLegalTerms = legalTerms.every(legalTermsterm => contentLowerCase.includes(legalTermsterm));

            
        }

        const finalPrompt = `${prompt}\n${fileContent}`;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(finalPrompt);
            const response = await result.response;
            const text = await response.text();

            // Output the response text
            outputDiv.textContent = text;
        } catch (error) {
            outputDiv.textContent = `API Error: ${error.message}`;
        }
    });
});
