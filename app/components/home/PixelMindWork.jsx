import React from "react";

const PixelMindWork = () => {
  return (
    <div>
      <section className="  font-display py-20 px-6">
        <div className="  font-display max-w-7xl mx-auto flex flex-wrap justify-center gap-12 text-center">
          <div className="  font-display min-w-[200px]">
            <p className="  font-display text-4xl md:text-5xl font-black text-white mb-2">
              10,000+
            </p>
            <p className="  font-display text-slate-400 font-medium">
              Images Analyzed
            </p>
          </div>
          <div className="  font-display h-20 w-px bg-white/10 hidden md:block"></div>
          <div className="  font-display min-w-[200px]">
            <p className="  font-display text-4xl md:text-5xl font-black text-white mb-2">
              50,000+
            </p>
            <p className="  font-display text-slate-400 font-medium">
              Assets Generated
            </p>
          </div>
          <div className="  font-display h-20 w-px bg-white/10 hidden md:block"></div>
          <div className="  font-display min-w-[200px]">
            <p className="  font-display text-4xl md:text-5xl font-black text-primary mb-2">
              100%
            </p>
            <p className="  font-display text-slate-400 font-medium">
              Free Tier Available
            </p>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans">
              How PixelMind Works
            </h2>
            <p className="text-slate-400 font-display">
              Go from vision to reality in three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* <!-- Step 1 --> */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="size-20 rounded-full bg-background-dark border-4 border-primary/20 flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-[0_0_20px_rgba(105,97,255,0.2)]">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 font-sans" >Choose Your Tool</h3>
              <p className="text-slate-400 font-display">
                Select from our suite of specialized AI image tools tailored for
                your specific creative workflow.
              </p>
            </div>
            {/* <!-- Dotted Line 1 --> */}
            <div className="hidden md:block absolute top-10 left-[20%] w-[20%] border-t-2 border-dashed border-primary/20"></div>
            {/* <!-- Step 2 --> */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="size-20 rounded-full bg-background-dark border-4 border-secondary/20 flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 font-sans">Upload or Type</h3>
              <p className="text-slate-400 font-display">
                Upload your source imagery or describe your vision with detailed
                text prompts in our intuitive workspace.
              </p>
            </div>
            {/* <!-- Dotted Line 2 --> */}
            <div className="hidden md:block absolute top-10 right-[20%] w-[20%] border-t-2 border-dashed border-secondary/20"></div>
            {/* <!-- Step 3 --> */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="size-20 rounded-full bg-background-dark border-4 border-primary/20 flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-[0_0_20px_rgba(105,97,255,0.2)]">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 font-sans">Get AI Results</h3>
              <p className="text-slate-400 font-display">
                Our neural engine processes your request in under 10 seconds.
                Download high-res results instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PixelMindWork;
