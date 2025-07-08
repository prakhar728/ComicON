import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function textToImage(prompt) {
  try {
    const response = await openai.images.generate({
      model: "gpt-image-1", 
      prompt: prompt,
      size: "1024x1024", // or "1792x1024", "1024x1024"
      quality:"medium",
      output_format:"jpeg"
    });

    // Return the image URL
    return response

  } catch (error) {
    console.error("Error generating image with OpenAI:", error);
    throw error;
  }
}