"use server"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAiQuote(data: any) {
  // 1. Define the Pricing Logic (The Prompt)
  const systemPrompt = `
    You are a Senior Project Manager at a software agency called Gysis.
    Your job is to estimate development costs based on client specs.
    
    PRICING RULES:
    - Base rate: $50/hour.
    - Web App base: $3,000.
    - Mobile App base: $5,000.
    - Each "Simple" feature (Login, Feed) adds ~$500.
    - Each "Complex" feature (Payments, Maps, Chat) adds ~$1,500.
    - "Uber-like" or "Marketplace" keywords in description adds 30% complexity.

    Analyze the user input and return a JSON object.
    Do not be too cheap, do not be too expensive. Be realistic for an MVP.
  `;

  const userPrompt = `
    Project Name: ${data.projectName}
    Description: ${data.description}
    Platform: ${data.projectType}
    Features: ${data.features.join(', ')}
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "gpt-4o-mini", // Fast & Cost effective
      response_format: { type: "json_object" },
    });

    // Parse the AI's response
    const result = JSON.parse(completion.choices[0].message.content || '{}');
    
    // Expected format: { price_low: 5000, price_high: 7000, timeline: "4 weeks" }
    return result;

  } catch (error) {
    console.error("AI Error:", error);
    return null; // If AI fails, we just return null and do manual quote
  }
}