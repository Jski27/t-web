import React from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1557626204-08a9f39d27ae?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1518972559570-0bde6a760b09?w=800&auto=format&fit=crop&q=60'
];

const Gallery = () => {
  return (
    <section id="gallery" className="container mx-auto px-6 max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-5xl font-bold mb-10"
      >
        Gallery
      </motion.h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-white/5"
          >
            <img
              src={src}
              alt="DJ performance"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
