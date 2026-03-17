
export async function imageAnalyze(payload) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), 
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || "Analysis failed");
  }
  
  return result.data; 
}
