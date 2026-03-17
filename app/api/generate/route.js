import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    // Model List (Pehle Flux try karega, phir Stable Diffusion)
    const MODEL_ID = "black-forest-labs/FLUX.1-schnell"; 
    // Agar Flux kaam na kare toh niche wala model try kar sakte hain:
    // const MODEL_ID = "runwayml/stable-diffusion-v1-5";

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    // Agar model load ho raha hai (Error 503)
    if (response.status === 503) {
      return NextResponse.json({ error: "Model is loading... Please wait 30 seconds and try again." }, { status: 503 });
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error("HF Error:", errorData);
      return NextResponse.json({ error: "Hugging Face is busy. Try a different prompt or wait a minute." }, { status: response.status });
    }

    // Image ko arrayBuffer mein convert karein
    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    return NextResponse.json({ 
      image: `data:image/png;base64,${base64Image}` 
    });

  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json({ error: "Server Error: " + error.message }, { status: 500 });
  }
}