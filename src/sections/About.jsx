import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="container mx-auto px-6 max-w-5xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="font-display text-3xl md:text-5xl font-bold mb-8"
      >
        About
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true, amount: 0.4 }}
        className="text-lg leading-relaxed text-white/80 space-y-4"
      >
        <span>
          DJ T-Hein is an Oxford, Ohio based performer blending upbeat house grooves, modern dance edits, and energy-lift transitions designed for campus nightlife and private events. Every set focuses on reading the room and building momentum organically.
        </span>{' '}
        <span>
          Centered on clean transitions, crowd interaction, and a feel-good atmosphere, T-Hein delivers reliable, dance-floor focused mixes that keep people engaged start to finish.
        </span>
      </motion.p>
    </section>
  );
};

export default About;
