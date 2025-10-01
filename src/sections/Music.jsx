import React from 'react';
import { motion } from 'framer-motion';

const tracks = [
  {
    title: 'Live Set – Neon Pulse',
    embed: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/13158665&color=%2314f1ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
  },
  {
    title: 'House Mix – Afterglow',
    embed: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293'
  }
];

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
      <div className="grid md:grid-cols-2 gap-10">
        {tracks.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">{t.title}</h3>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-neon">
              <iframe
                width="100%"
                height="100%"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={t.embed}
                title={t.title}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-8 text-sm text-white/50">Add Spotify embeds similarly by replacing iframe src with a Spotify embed URL.</p>
    </section>
  );
};

export default Music;
