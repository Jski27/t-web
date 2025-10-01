import React from 'react';
import { motion } from 'framer-motion';

const upcoming = [
  { date: 'Nov 08 2025', venue: 'Lumen Club', city: 'Berlin, DE', status: 'Tickets' },
  { date: 'Nov 22 2025', venue: 'Pulse Arena', city: 'Amsterdam, NL', status: 'Soon' },
  { date: 'Dec 05 2025', venue: 'Neon Dock', city: 'London, UK', status: 'Tickets' }
];

const Events = () => {
  return (
    <section id="events" className="container mx-auto px-6 max-w-5xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-5xl font-bold mb-10"
      >
        Events
      </motion.h2>
      <div className="space-y-4">
        {upcoming.map((e, i) => (
          <motion.div
            key={e.date + e.venue}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
          >
            <div className="flex-1">
              <p className="text-neon font-mono text-sm tracking-wider">{e.date}</p>
              <p className="text-lg font-semibold">{e.venue}</p>
              <p className="text-white/60 text-sm">{e.city}</p>
            </div>
            <button className="px-5 py-2 rounded-full bg-accent hover:bg-accent/80 transition font-medium text-sm min-w-28">
              {e.status}
            </button>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-xs text-white/40">Data is static placeholder. Later this can be powered by a CMS or API.</p>
    </section>
  );
};

export default Events;
