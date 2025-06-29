import { imageToText } from "./IG/imageToText.js";
import { textToImage } from "./IG/textToImage.js";
import { textToText } from "./IG/textToText.js";

export async function generateComicImage(cast1, cast2) {
  try {
    // Step 1: Convert PFPs to text descriptions
    const cast1PfpDesc = await imageToText(cast1.pfp);
    const cast2PfpDesc = await imageToText(cast2.pfp);
    
    // Step 2: Generate image prompt
    const prompt = await textToText(cast1.text, cast2.text, cast1PfpDesc, cast2PfpDesc);
    
    // Step 3: Generate comic image
    const comicImage = await textToImage(prompt);
    
    return comicImage;
  } catch (error) {
    console.error('Error generating comic:', error);
    throw error;
  }
}
 