import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative pt-28 md:pt-36 min-h-[90vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-screen" />
      <div className="relative container mx-auto px-6 text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl font-bold tracking-tight neon-text"
        >
          DJ NEXUS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-6 text-lg md:text-2xl text-white/80"
        >
          Elevating nights with high-energy beats, immersive soundscapes, and neon-drenched vibes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#music" className="px-8 py-3 rounded-full bg-neon text-dark font-semibold shadow-neon hover:shadow-lg hover:scale-105 transition-transform">Listen</a>
          <a href="#contact" className="px-8 py-3 rounded-full bg-accent text-white font-semibold shadow hover:bg-accent/90 transition">Book Now</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
