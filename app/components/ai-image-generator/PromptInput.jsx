"use client";
import React, { useState } from "react";
import { Loader2, Send, Sparkles, Download } from "lucide-react";
import { imageGenerator } from "../../service/imageGenerator";

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrlSrc, setImageUrlSrc] = useState(null);
  const [error, setError] = useState(null);

 const handleGenerate = async (e) => {
  e.preventDefault();
  if (!prompt.trim() || prompt.length <= 6) return;

  try {
    setIsLoading(true);
    setImageUrlSrc(null);
    
    // Yahan await lagana zaroori hai
    const imageBase64 = await imageGenerator(prompt);
    setImageUrlSrc(imageBase64);

  } catch (error) {
    console.error("UI ERROR:", error.message);
    alert("Error: " + error.message); // Isse aapko exact error pata chalega
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4">
      <form
        onSubmit={handleGenerate}
        className="relative flex items-center gap-2 p-2 rounded-2xl bg-slate-900 border border-white/10 focus-within:border-blue-500 transition-all shadow-2xl"
      >
        <Sparkles className="ml-3 text-gray-400" size={20} />
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A magical forest with neon mushrooms..."
          className="w-full bg-transparent py-3 px-2 text-white outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || prompt.length <= 5}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      {imageUrlSrc && (
        <div className="mt-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
          <div className="relative group">
            <img
              src={imageUrlSrc}
              alt="AI Generated"
              className="w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl transition-transform hover:scale-[1.01]"
            />
            <a
              href={imageUrlSrc}
              download="ai-image.png"
              className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-full text-white hover:bg-black/80 transition-all"
            >
              <Download size={20} />
            </a>
          </div>
          <p className="mt-4 text-gray-400 italic text-sm">&quot;{prompt}&quot;</p>
        </div>
      )}
    </div>
  );
};

export default PromptInput;