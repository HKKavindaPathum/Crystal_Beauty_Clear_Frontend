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
    <div className="w-full min-h-screen bg-gradient-to-tr from-pink-50 via-white to-pink-100/50 dark:from-[#120D0E] dark:via-[#1A1012] dark:to-[#251317] flex flex-col items-center py-16 px-4 md:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-pink-300/10 dark:bg-pink-950/5 blur-[80px] md:blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-accent/10 dark:bg-accent/5 blur-[80px] md:blur-[150px] pointer-events-none"></div>

      <div className="max-w-5xl w-full z-10 flex flex-col lg:flex-row gap-12 items-stretch mt-6">
        
        {/* Left Side: Contact Info Panel */}
        <div className="w-full lg:w-[40%] flex flex-col justify-between p-8 bg-white/50 dark:bg-[#1C1416]/50 backdrop-blur-md border border-white/30 dark:border-white/5 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-accent font-bold font-heading">
                Get In Touch
              </span>
              <h1 className="text-3xl font-fancy font-bold text-pink-950 dark:text-[var(--color-dark-text)] mt-2">
                We'd love to hear from you
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-main mt-4 leading-relaxed">
                Have questions about our cruelty-free skincare formulas, order delivery, or partnership opportunities? Drop us a line and our beauty clear specialists will reach out.
              </p>
            </div>

            {/* Info Items List */}
            <div className="space-y-4 pt-4">
              
              {/* Phone item */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-pink-100/50 dark:bg-[#120D0E]/60 flex items-center justify-center text-accent border border-pink-200/20 shadow-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Phone Hotline</p>
                  <p className="text-sm font-semibold text-secondary dark:text-[var(--color-dark-text)] mt-1">+94 77 123 4567</p>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-pink-100/50 dark:bg-[#120D0E]/60 flex items-center justify-center text-accent border border-pink-200/20 shadow-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Email Address</p>
                  <p className="text-sm font-semibold text-secondary dark:text-[var(--color-dark-text)] mt-1">support@beautyclear.com</p>
                </div>
              </div>

              {/* Location item */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-pink-100/50 dark:bg-[#120D0E]/60 flex items-center justify-center text-accent border border-pink-200/20 shadow-xs">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Flagship Store</p>
                  <p className="text-sm font-semibold text-secondary dark:text-[var(--color-dark-text)] mt-1">Colombo, Sri Lanka</p>
                </div>
              </div>

            </div>
          </div>

          {/* Customer Hours */}
          <div className="mt-8 pt-6 border-t border-pink-200/20 dark:border-[var(--color-dark-border)]">
            <p className="text-xs text-gray-400 dark:text-gray-500 font-main">
              Customer Support Hours:<br />
              <span className="font-semibold text-secondary dark:text-[var(--color-dark-text)]">Monday - Friday: 9:00 AM - 6:00 PM</span>
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form Panel */}
        <div className="w-full lg:w-[60%] p-8 bg-white/70 dark:bg-[#1C1416]/75 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 dark:border-white/5 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-pink-800 dark:text-[var(--color-accent)] font-bold mb-2 font-heading">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition duration-300 font-main placeholder-gray-400 dark:placeholder-gray-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-wider text-pink-800 dark:text-[var(--color-accent)] font-bold mb-2 font-heading">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition duration-300 font-main placeholder-gray-400 dark:placeholder-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-pink-800 dark:text-[var(--color-accent)] font-bold mb-2 font-heading">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message here..."
                className="w-full border border-pink-100 dark:border-[var(--color-dark-border)] bg-pink-50/20 dark:bg-[#120D0E]/50 text-secondary dark:text-[var(--color-dark-text)] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition duration-300 font-main resize-none placeholder-gray-400 dark:placeholder-gray-600"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-accent-hover disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-4 rounded-xl transition duration-300 shadow-md cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50 flex items-center justify-center gap-2 transform active:scale-[0.99] font-heading tracking-wide uppercase text-xs"
            >
              {isSubmitting ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
