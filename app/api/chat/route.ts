export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    const encodedPrompt = encodeURIComponent(prompt.trim());
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

    const imageRes = await fetch(imageUrl);

    if (!imageRes.ok) {
      return new Response("Failed to generate image", { status: 500 });
    }

    return new Response(imageRes.body, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (err) {
    console.error("API error:", err);
    return new Response("Server error", { status: 500 });
  }
}
