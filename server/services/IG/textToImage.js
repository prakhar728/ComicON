export async function textToImage(prompt) {
  try {
    const payload = {
      "model": "black-forest-labs/FLUX.1-schnell",
      "prompt": prompt,
      "num_steps": 25,
      "guidance_scale": 6,
      "seed": 42,
      "width": 768,
      "height": 768
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEBULA_API_KEY}`
    };

    const response = await fetch("https://api.nebulablock.com/api/v1/images/generation", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();
    
    // Return the image URL or base64 data from the response
    // You might need to adjust this based on the actual response structure
    return result.data?.[0]?.url || result.url || result;
    
  } catch (error) {
    console.error('Error in textToImage:', error);
    throw error;
  }
}
