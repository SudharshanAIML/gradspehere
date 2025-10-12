import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyABbhCq5HN_U9UgmFQ_HJZMDU-cDGwYJVY"); // Replace with your Gemini API key
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const askGemini = async (input, studentData) => {
  try {
    // Combine the user's input and student data into a single prompt
    const prompt = `
      You are an academic and career advisor chatbot. A student has asked the following question:
      "${input}"

      Here is the student's data in JSON format:
      ${JSON.stringify(studentData, null, 2)}

      Provide a detailed and personalized response to the student's query. If the query is about academics, compare their performance and suggest improvements. If it's about career, suggest roles or skills they should focus on. Be specific and use the data provided.
    `;

    // Send the prompt to the Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error: Could not process your request. Please try again later.";
  }
};
