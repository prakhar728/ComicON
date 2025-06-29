export async function textToText(messageText, responseText, messagePfpDesc, responsePfpDesc) {
  try {
    const prompt = `You are a visual storyteller AI that turns a Tweet + Reply conversation into a 2-panel comic strip prompt for image generation.

Input:
- Tweet: "${messageText}"
- Reply: "${responseText}"
- Character 1 description (from profile picture): ${messagePfpDesc}
- Character 2 description (from profile picture): ${responsePfpDesc}

Instructions:
- Break it into 2 comic panels.
- Panel 1: Show Character 1 delivering the exact text of "${messageText}", expressing an emotion appropriate to what they're saying. Use ${messagePfpDesc} for appearance.
- Panel 2: Show Character 2 replying with the exact text of "${responseText}", reacting with a suitable emotion. Use ${responsePfpDesc} for appearance.
- Characters must match their descriptions exactly.
- Use a colorful cartoon style with thick black outlines, natural hands and faces.
- Include white speech bubbles with clean, readable comic-style font containing the exact quoted text (no changes, no gibberish, no text errors).
- Describe only background details if they are crucial to understanding the scene.
- Layout should be clear and comic-like.

Return only the final prompt as an instruction for image generation:
"Comic strip with 2 panels. Panel 1 shows Character 1 as described, expressing their message: '${messageText}'. Panel 2 shows Character 2 as described, responding with: '${responseText}'. Characters must match their descriptions exactly. Use a colorful cartoon style with thick black outlines, natural hands and faces, and white speech bubbles containing the exact quoted text. No gibberish. No text errors. Layout should be clear and comic-like."`;

    const payload = {
      "messages": [
        {
          "role": "system",
          "content": "You are a comic panel designer assistant."
        },
        {
          "role": "user",
          "content": prompt
        }
      ],
      "model": "deepseek-ai/DeepSeek-V3-0324",
      "max_tokens": null,
      "temperature": 0.5,
      "top_p": 0.9,
      "stream": false
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEBULA_API_KEY}`
    };

    const response = await fetch("https://inference.nebulablock.com/v1/chat/completions", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();
    return result.choices[0].message.content;
    
  } catch (error) {
    console.error('Error in textToText:', error);
    throw error;
  }
}
