export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-pink-50 via-white to-pink-100/50 dark:from-[#120D0E] dark:via-[#1A1012] dark:to-[#251317] flex flex-col items-center py-16 px-4 md:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-pink-300/10 dark:bg-pink-950/5 blur-[80px] md:blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-accent/10 dark:bg-accent/5 blur-[80px] md:blur-[150px] pointer-events-none"></div>

      <div className="max-w-5xl w-full z-10 flex flex-col items-center">
        {/* Page Header */}
        <span className="text-xs uppercase tracking-widest text-accent font-bold mb-3 font-heading">
          Discover Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-fancy font-bold text-pink-950 dark:text-[var(--color-dark-text)] mb-6 text-center">
          About BeautyClear
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center leading-relaxed font-main mb-16">
          Welcome to <span className="font-semibold text-accent">BeautyClear</span> – your destination for premium skincare, makeup, and haircare. We believe beauty is more than skin deep; it’s an expression of confidence, self-care, and natural glow.
        </p>

        {/* Core Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8 w-full">
          
          {/* Card 1: Our Mission */}
          <div className="group bg-white/70 dark:bg-[#1C1416]/70 backdrop-blur-md border border-white/40 dark:border-white/5 rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden flex flex-col items-center text-center">
            {/* Gold Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon Wrapper */}
            <div className="w-14 h-14 rounded-2xl bg-pink-100/50 dark:bg-[#120D0E]/60 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-300 border border-pink-200/20 dark:border-[var(--color-dark-border)] shadow-xs">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] mb-3">
              Our Mission
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-main leading-relaxed">
              To curate and deliver exceptionally high-quality beauty formulations that enhance, nourish, and reveal your skin's natural radiance.
            </p>
          </div>

          {/* Card 2: Our Values */}
          <div className="group bg-white/70 dark:bg-[#1C1416]/70 backdrop-blur-md border border-white/40 dark:border-white/5 rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden flex flex-col items-center text-center">
            {/* Gold Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon Wrapper */}
            <div className="w-14 h-14 rounded-2xl bg-pink-100/50 dark:bg-[#120D0E]/60 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-300 border border-pink-200/20 dark:border-[var(--color-dark-border)] shadow-xs">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] mb-3">
              Our Values
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-main leading-relaxed">
              We value transparency, cruelty-free production, and sustainable sourcing. We are committed to rendering luxury self-care inclusive.
            </p>
          </div>

          {/* Card 3: Our Promise */}
          <div className="group bg-white/70 dark:bg-[#1C1416]/70 backdrop-blur-md border border-white/40 dark:border-white/5 rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden flex flex-col items-center text-center">
            {/* Gold Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon Wrapper */}
            <div className="w-14 h-14 rounded-2xl bg-pink-100/50 dark:bg-[#120D0E]/60 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-300 border border-pink-200/20 dark:border-[var(--color-dark-border)] shadow-xs">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)] mb-3">
              Our Promise
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-main leading-relaxed">
              We pledge to deliver dermatologically tested formulations that are completely safe, effective, and tailored to meet your unique skin profile.
            </p>
          </div>

        </div>

        {/* Mini Quote Section */}
        <div className="mt-20 w-full text-center border-t border-pink-200/20 dark:border-[var(--color-dark-border)] pt-12">
          <p className="text-md italic text-gray-400 dark:text-gray-500 font-fancy max-w-xl mx-auto">
            "Beauty begins the moment you decide to be yourself."
          </p>
        </div>
      </div>
    </div>
  );
}
