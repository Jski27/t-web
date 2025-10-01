import React from 'react';
import { motion } from 'framer-motion';

// Temporarily empty until active public links are available.
const tracks = [];

const Music = () => {
  return (
    <section id="music" className="container mx-auto px-6 max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-5xl font-bold mb-10"
      >
        Music
      </motion.h2>
      {tracks.length === 0 && (
        <div className="glass rounded-xl p-10 text-center">
          <p className="text-white/70 mb-2">Public mixes coming soon.</p>
          <p className="text-xs text-white/40">Spotify & SoundCloud links will appear here once released.</p>
        </div>
      )}
    </section>
  );
};

export default Music;
