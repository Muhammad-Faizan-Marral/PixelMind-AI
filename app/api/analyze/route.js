
import { NextResponse } from "next/server";

const IMAGGA_API_KEY = process.env.IMAGGA_API_KEY;
const IMAGGA_API_SECRET = process.env.IMAGGA_API_SECRET;
const IMAGGA_BASE_URL = "https://api.imagga.com";

export async function POST(request) {
  try {
    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    if (!IMAGGA_API_KEY || !IMAGGA_API_SECRET) {
      console.error("Missing Imagga credentials:", { IMAGGA_API_KEY, IMAGGA_API_SECRET });
      return NextResponse.json({ error: "Server misconfiguration: missing API credentials" }, { status: 500 });
    }

    const auth = Buffer.from(`${IMAGGA_API_KEY}:${IMAGGA_API_SECRET}`).toString("base64");

    const url = `${IMAGGA_BASE_URL}/v2/tags?image_url=${encodeURIComponent(imageUrl)}`;
    console.log("Calling Imagga URL:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    console.log("Imagga response status:", response.status);
    console.log("Imagga response body:", JSON.stringify(data));

    if (!response.ok) {
      return NextResponse.json(
        { error: data.status?.text || "Imagga API Error" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: data.result.tags,
    });

  } catch (error) {
    console.error("API Route Error:", error.message, error.stack);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}