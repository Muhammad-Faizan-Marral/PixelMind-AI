import React from "react";

const Landing = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          NEW: GENERATIVE FILL 2.0 IS HERE
        </div>

        {/* Heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8">
          <span className="font-display bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-purple-500 bg-[length:200%_auto] animate-[gradient_6s_linear_infinite]">
            Transform Images
          </span>
          <br />
          With The Power of AI
        </h1>

        {/* Description */}
        <p className="font-mono max-w-2xl mx-auto text-lg text-gray-400 mb-12 leading-relaxed">
          Unlock the potential of your visuals with our suite of advanced AI
          tools. Analyze, generate, and detect with professional-grade
          precision in seconds.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button className="w-full sm:w-auto px-8 py-4 bg-primary rounded-xl text-white font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform">
            Start Creating Free
          </button>

          <button className="w-full sm:w-auto px-8 py-4 border border-white/10 rounded-xl font-bold text-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            ▶ Watch Demo
          </button>
        </div>

        {/* App Mockup */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>

          <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-3 border border-white/10">
            <div className="rounded-xl overflow-hidden aspect-video flex items-center justify-center border border-white/5">

              <img
                className="w-full h-full object-cover opacity-80"
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                alt="AI Dashboard"
              />

              {/* Play Button */}
              <div className="absolute flex items-center justify-center">
                <div className="size-20 rounded-full bg-purple-500/20 backdrop-blur-xl border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <span className="text-4xl text-white">▶</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Landing;