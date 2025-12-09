"use server"

// No API keys needed! 
export async function generateAiQuote(data: any) {
  // Simulate AI "thinking" time (makes it feel real)
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    let basePrice = 3000;
    
    // 1. Platform Rules
    if (data.projectType === 'mobile') basePrice = 5000;
    if (data.projectType === 'both') basePrice = 8000;

    // 2. Feature Rules (Complexity Math)
    const features = data.features || [];
    let featureCost = 0;
    
    features.forEach((feat: string) => {
        if (['Payments (Stripe)', 'Map / GPS', 'Chat System'].includes(feat)) {
            featureCost += 1500; // Complex features
        } else {
            featureCost += 500; // Simple features
        }
    });

    // 3. Description Rules (Keyword Analysis)
    const desc = data.description.toLowerCase();
    if (desc.includes('uber') || desc.includes('marketplace') || desc.includes('social')) {
        basePrice = basePrice * 1.3; // +30% complexity for complex keywords
    }

    const totalLow = Math.round(basePrice + featureCost);
    const totalHigh = Math.round(totalLow * 1.2); // +20% buffer

    // Return the "AI" response
    return {
        price_low: totalLow,
        price_high: totalHigh,
        timeline: features.length > 4 ? "6-8 weeks" : "3-4 weeks",
        reasoning: "Calculated based on selected modules and platform complexity."
    };

  } catch (error) {
    return null;
  }
}