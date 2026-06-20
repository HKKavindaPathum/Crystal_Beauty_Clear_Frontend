import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        access_key: "3cfaa846-0f91-46f4-ab27-05cde43e3abf",
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: "New Contact Message - BeautyClear",
        from_name: "BeautyClear Store"
      };

      const res = await axios.post("https://api.web3forms.com/submit", payload);

      if (res.data.success) {
        toast.success("Message sent successfully! We'll get back to you soon 😊");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error sending message via Web3Forms:", err);
      toast.error("An error occurred while sending the message.");
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent-hover disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-md cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Sending Message..." : "Send Message"}
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
