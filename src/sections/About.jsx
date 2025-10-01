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
          DJ NEXUS is a genre-bending performer blending pulsating techno, atmospheric house, and bass-driven rhythms into immersive, high-energy sets. Each performance is crafted to take the crowd on a journey through layered emotion and kinetic momentum.
        </span>{' '}
        <span>
          With a focus on sonic storytelling, seamless transitions, and luminous aesthetics, NEXUS creates unforgettable night experiences built around connection, movement, and elevation.
        </span>
      </motion.p>
    </section>
  );
};

export default About;
