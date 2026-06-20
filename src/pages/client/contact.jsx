import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon 😊");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full min-h-screen bg-pink-50 dark:bg-[var(--color-dark-bg)] flex flex-col items-center py-12 px-6 transition-colors duration-300">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold font-heading text-center text-pink-900 dark:text-[var(--color-accent)] mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-10 font-main">
          Have questions or feedback? We’d love to hear from you!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/50 dark:border-[var(--color-dark-border)] rounded-2xl shadow-lg p-8 space-y-6 transition-colors duration-300"
        >
          <div>
            <label className="block text-pink-700 dark:text-[var(--color-accent)] font-semibold mb-2 font-main">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition duration-300 font-main"
              required
            />
          </div>
          <div>
            <label className="block text-pink-700 dark:text-[var(--color-accent)] font-semibold mb-2 font-main">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition duration-300 font-main"
              required
            />
          </div>
          <div>
            <label className="block text-pink-700 dark:text-[var(--color-accent)] font-semibold mb-2 font-main">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[var(--color-dark-bg)] text-secondary dark:text-[var(--color-dark-text)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition duration-300 font-main resize-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-md cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            Send Message
          </button>
          <div className="mt-10 text-center text-gray-600 dark:text-gray-400 font-main text-sm">
            <p>Email: <span className="text-pink-700 dark:text-[var(--color-accent)] font-semibold">support@beautyclear.com</span></p>
            <p>Phone: <span className="text-pink-700 dark:text-[var(--color-accent)] font-semibold">+94 77 123 4567</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}
