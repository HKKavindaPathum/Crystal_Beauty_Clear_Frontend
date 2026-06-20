export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-pink-50 dark:bg-[var(--color-dark-bg)] flex flex-col items-center py-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold font-heading text-pink-900 dark:text-[var(--color-accent)] mb-6">About Us</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-main">
          Welcome to <span className="font-semibold text-pink-700 dark:text-[var(--color-accent)]">BeautyClear</span> – 
          your one-stop destination for skincare, makeup, and haircare products.  
          We believe beauty is more than skin deep; it’s about confidence, 
          self-expression, and care.  
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/50 dark:border-[var(--color-dark-border)] rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-bold font-heading text-pink-800 dark:text-[var(--color-accent)] mb-3">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 font-main text-sm">
              To provide high-quality beauty products that enhance your natural glow.
            </p>
          </div>
          <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/50 dark:border-[var(--color-dark-border)] rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-bold font-heading text-pink-800 dark:text-[var(--color-accent)] mb-3">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-400 font-main text-sm">
              We value authenticity, sustainability, and making self-care accessible to all.
            </p>
          </div>
          <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/50 dark:border-[var(--color-dark-border)] rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-bold font-heading text-pink-800 dark:text-[var(--color-accent)] mb-3">Our Promise</h2>
            <p className="text-gray-600 dark:text-gray-400 font-main text-sm">
              Delivering trusted products that are safe, cruelty-free, and effective.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
