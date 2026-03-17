import { NextResponse } from "next/server";

export async function POST(req) {
  const { imageUrl } = await req.json();

  const apiKey = process.env.GOOGLE_VISION_API_KEY;

  try {
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                source: {
                  imageUri: imageUrl,
                },
              },
              features: [
                {
                  type: "LABEL_DETECTION",
                  maxResults: 5,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ err: error });
  }
}
