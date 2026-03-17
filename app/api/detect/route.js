import axios from "axios";
import FormData from "form-data";

export async function POST(req) {
  try {
    const incomingFormData = await req.formData();
    const file = incomingFormData.get("image");

    if (!file) {
      return Response.json({ error: "No image uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const form = new FormData();
    form.append("image", buffer, {
      filename: file.name || "upload.jpg",
      contentType: file.type || "image/jpeg",
    });

    const response = await axios.post(
      "https://object-detection-api.omkar.cloud/detect",
      form,
      {
        headers: {
          "API-Key": process.env.OMKAR_API_KEY,
          ...form.getHeaders(),
        },
        maxBodyLength: Infinity,
      }
    );

    return Response.json(response.data);
  } catch (error) {
    console.error("Detection API Error:", error?.response?.data || error.message);

    return Response.json(
      {
        error: "Detection failed",
        details: error?.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}