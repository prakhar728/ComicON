export async function imageToText(pfpUrl) {
  try {
    const payload = {
      "model": "Qwen/Qwen2.5-VL-7B-Instruct",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "image_url",
              "image_url": {
                "url": pfpUrl
              }
            },
            {
              "type": "text",
              "text": "This is a profile picture that will be turned into a comic strip character. Describe only the subject's appearance in detail: face, hair, skin tone, clothing, and EXTREMELY unusual or distinctive visual features only (like accessories, animals, or props connected to them). Ignore the background. The description should be short, specific, and useful for turning this subject into a cartoon. Do not include emotions or non-visual details."
            }
          ]
        }
      ],
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
    console.error('Error in imageToText:', error);
    throw error;
  }
}
