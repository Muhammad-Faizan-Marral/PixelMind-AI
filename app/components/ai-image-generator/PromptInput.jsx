'use client'
import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      console.log("User Prompt:", prompt);
     
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4">
      <form 
        onSubmit={handleGenerate}
        className="relative group flex items-center gap-2 p-1.5 rounded-2xl bg-surface-secondary/50 border border-white/10 focus-within:border-primary/50 transition-all duration-300 shadow-2xl backdrop-blur-xl"
      >
        {/* Decorative Glow inside input */}
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Sparkles className="text-text-secondary group-focus-within:text-primary transition-colors" size={20} />
        </div>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to generate..."
          className="w-full font-display bg-transparent py-4 pl-12 pr-4 text-text-primary placeholder:text-text-secondary focus:outline-none  text-lg"
        />

        <button
          type="submit"
          disabled={!prompt.trim()}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-all shrink-0 shadow-lg shadow-primary/20 active:scale-95"
        >
          <span className="hidden sm:inline">Generate</span>
          <Send size={18} />
        </button>
      </form>
     
    </div>
  );
};

export default PromptInput;