"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize Google Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateAiQuote(data: any) {
  try {
    // 2. Select the "Flash" model (Fast & Free)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a Senior Project Manager at Gysis CRD.
      Estimate the cost for this software project.
      
      DETAILS:
      - Project: ${data.projectName}
      - Platform: ${data.projectType}
      - Features: ${data.features.join(', ')}
      - Description: ${data.description}

      PRICING RULES:
      - Base Web App: $3,000. Mobile: $5,000.
      - Each feature adds $500 - $2000 depending on complexity.
      - "Uber/Social/Marketplace" keywords increase cost by 30%.
      
      Return ONLY a raw JSON object (no markdown, no backticks) with this format:
      {
        "price_low": number,
        "price_high": number,
        "timeline": string,
        "reasoning": string
      }
    `;

    // 3. Generate Content
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // 4. Clean up the response (Gemini sometimes adds ```json ... ``` wrappers)
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // 5. Parse
    const parsed = JSON.parse(text);
    return parsed;

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return null; // Fallback to manual if it fails
  }
}