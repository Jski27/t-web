import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import emailjs from 'emailjs-com'; // Uncomment & configure when ready

const Contact = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder logic. Replace with emailjs.send(...) when configured.
    setStatus('Sending...');
    setTimeout(() => setStatus('Message sent (placeholder)! Configure EmailJS to enable real sending.'), 1000);
  };

  return (
    <section id="contact" className="container mx-auto px-6 max-w-4xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-5xl font-bold mb-10"
      >
        Contact / Booking
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-white/80 leading-relaxed">
            For bookings, collaborations, or media inquiries—reach out using the form. Management will respond within 24–48 hours.
          </p>
          <div className="space-y-4 text-sm">
            <p><span className="text-neon">Email:</span> booking@nexus.dj</p>
            <p><span className="text-neon">Based in:</span> Europe / Available Worldwide</p>
            <div className="flex gap-4 pt-2">
              {['spotify','soundcloud','instagram','tiktok'].map(s => (
                <a key={s} href="#" aria-label={s} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition border border-white/10">
                  <span className="capitalize text-xs">{s}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 glass p-6 rounded-2xl">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input required name="name" className="w-full bg-dark/40 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input required type="email" name="email" className="w-full bg-dark/40 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon" />
          </div>
          <div>
            <label className="block text-sm mb-1">Subject</label>
            <input name="subject" className="w-full bg-dark/40 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon" />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea required rows="5" name="message" className="w-full bg-dark/40 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon" />
          </div>
          <button type="submit" className="w-full py-3 rounded-full bg-neon text-dark font-semibold hover:scale-[1.02] transition shadow-neon">Send</button>
          {status && <p className="text-xs text-white/60">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
