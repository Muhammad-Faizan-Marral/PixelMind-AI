import { Image as ImageIcon, Lock, ArrowRight, History } from "lucide-react";

const Gallary = ({ isLoggedIn = true }) => {
  // Mock data for gallery
  const historyItems = [1, 2, 3, 4];

  return (
    <div className="section mt-20 w-full">
      {/* Header Section */}
      <div className="flex-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <History className="text-primary" size={24} />
          </div>
          <h2 className="font-display text-3xl text-text-primary">
            Your Gallery
          </h2>
        </div>
        {isLoggedIn && (
          <button className="text-secondary hover:underline flex items-center gap-1 text-sm">
            View All <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Main Gallery Container */}
      <div className="relative min-h-[300px] w-full rounded-3xl border border-white/10 bg-surface-secondary/30 backdrop-blur-md p-6 overflow-hidden">
        {/* Conditional Logic */}
        {!isLoggedIn ? (
          /* --- Case 1: NOT LOGGED IN (Blur Overlay) --- */
          <div className="relative w-full h-full flex flex-col items-center justify-center py-12">
            {/* Background Fake Blurred Photos */}
            <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-20 blur-sm pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-surface-secondary aspect-square rounded-xl border border-white/5"
                />
              ))}
            </div>

            {/* Lock Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-md">
              <div className="w-16 h-16 bg-surface-primary rounded-full flex-center border border-primary/50 mb-4 shadow-[0_0_20px_rgba(108,99,255,0.3)]">
                <Lock className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Unlock Your History</h3>
              <p className="text-text-secondary mb-6">
                Sign in to sync your previous analysis and access your
                personalized image gallery across all devices.
              </p>
              <button className="bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-primary/20">
                Login to View
              </button>
            </div>
          </div>
        ) : (
          /* --- Case 2: LOGGED IN (Show Gallery) --- */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {historyItems.map((item) => (
              <div
                key={item}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-surface-primary hover:border-secondary transition-all cursor-pointer shadow-xl"
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-secondary font-mono">
                    Analyzed 2h ago
                  </span>
                </div>
                <div className="w-full h-full flex-center bg-white/5">
                  <ImageIcon
                    className="text-text-secondary/20 group-hover:scale-110 transition-transform"
                    size={40}
                  />
                </div>
              </div>
            ))}

            {/* Add New Placeholder */}
            <div className="aspect-square rounded-2xl border-2 border-dashed border-text-secondary/20 flex-center hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="text-center">
                <div className="text-text-secondary group-hover:text-primary transition-colors text-3xl">
                  +
                </div>
                <div className="text-[10px] uppercase tracking-widest text-text-secondary">
                  New
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Decorative Background Glow for the whole section */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10" />
      </div>
    </div>
  );
};

export default Gallary;
