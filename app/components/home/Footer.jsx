import { Brain } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-white/5 bg-background-dark py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm">
                <Brain />
              </span>
            </div>
            <span className="font-bold">PixelMind AI</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500 font-display">
            <Link className="hover:text-white transition-colors" href="#">
              Privacy
            </Link>
            <Link className="hover:text-white transition-colors" href="#">
              Terms
            </Link>
            <Link className="hover:text-white transition-colors" href="#">
              Twitter
            </Link>
            <Link className="hover:text-white transition-colors" href="#">
              Discord
            </Link>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>Built with Next.js + Vercel</span>
            <div className="size-4 opacity-50">
              <svg fill="currentColor" viewBox="0 0 115 100">
                <path d="M57.5 0L115 100H0L57.5 0Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-xs text-slate-600">
          © 2026 PixelMind AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
