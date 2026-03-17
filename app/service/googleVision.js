export const analyzeImage = async (imageUrl) => {
  try {
    const res = await fetch("/api/vision", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({imageUrl: imageUrl,}),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    return error;
  }
};
