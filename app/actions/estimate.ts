"use server"

export async function generateAiQuote(data: any) {
  // 1. Thinking Delay (Feels like AI)
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    let price = 3000; // Starting Base Price
    
    // 2. Platform Multipliers
    if (data.projectType === 'mobile') price = 5000;
    if (data.projectType === 'both') price = 8500;

    // 3. Feature Costing
    const features = data.features || [];
    features.forEach((feat: string) => {
        if (['Payments (Stripe)', 'Map / GPS', 'Chat System', 'Admin Panel'].includes(feat)) {
            price += 1200; // Expensive modules
        } else {
            price += 400;  // Standard modules
        }
    });

    // 4. Complexity Keywords
    const desc = (data.description || '').toLowerCase();
    if (desc.includes('uber') || desc.includes('marketplace') || desc.includes('social')) {
        price = price * 1.25; // 25% Markup for complex logic
    }

    // 5. Round to nearest $100 (Makes it look professional)
    const exactPrice = Math.ceil(price / 100) * 100;

    return {
        estimated_price: exactPrice,
        timeline: features.length > 4 ? "6-8 weeks" : "3-4 weeks",
    };

  } catch (error) {
    return null;
  }
}