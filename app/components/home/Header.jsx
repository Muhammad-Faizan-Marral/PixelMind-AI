"use client";
import { Brain, Menu , X} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isopen, setIsOen] = useState(false);

  return (
    <div className="">
      <header className="relative top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md ">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="size-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">
                <Brain className="bg-transparent bg-gradient-to-br from-primary to-secondary" />
              </span>
            </div>
            <h2 className="text-xl font-sans font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              PixelMind AI
            </h2>
          </div>

          <nav className="hidden font-mono md:flex items-center gap-8">
            <Link
              className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Tools
            </Link>
            <Link
              className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Gallery
            </Link>
            <Link
              className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Pricing
            </Link>
            <Link
              className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Docs
            </Link>
          </nav>
          <div className="font-display flex items-center gap-4">
            <button className="hidden sm:block text-sm font-semibold hover:text-primary transition-colors">
              Sign In
            </button>
            <button className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(105,97,255,0.3)] hover:shadow-[0_0_30px_rgba(105,97,255,0.5)] transition-all">
              Get Started Free
            </button>
          </div>

         <div className="block md:hidden" onClick={()=>setIsOen(!isopen)}>{isopen ?  <X /> : <Menu />}</div>
        </div>

          {isopen ? (
            <div className="absolute bg-background w-full">
              <nav className=" font-mono flex flex-col p-7  gap-4">
                <Link
                  className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Home
                </Link>
                <Link
                  className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Tools
                </Link>
                <Link
                  className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Gallery
                </Link>
                <Link
                  className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Pricing
                </Link>
                <Link
                  className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  Docs
                </Link>
              </nav>
             
            </div>
          ) : (
            ""
          )}

      </header>
    </div>
  );
};

export default Header;
