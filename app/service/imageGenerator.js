export async function imageGenerator(prompt) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  // Agar Next.js API route hi nahi mila (404)
  if (response.status === 404) {
    throw new Error("API Route '/api/generate' not found. Check your file path.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate image");
  }

  return data.image; // Return base64 string
}