import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#music', label: 'Music' },
  { href: '#events', label: 'Events' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition backdrop-blur-md ${scrolled ? 'bg-dark/70 border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="font-display text-2xl font-bold tracking-wider flex items-center gap-2">
          <span className="text-neon">DJ T-Hein</span>
        </a>
        <nav className="hidden md:flex gap-8 text-sm">
          {links.map(l => (
            <a key={l.href} href={l.href} className="relative py-2 group">
              <span className="text-white/70 group-hover:text-white transition">{l.label}</span>
              <span className="absolute left-0 bottom-0 w-0 h-px bg-neon group-hover:w-full transition-all" />
            </a>
          ))}
        </nav>
        <button className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span className={`h-0.5 bg-white transition ${open ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`h-0.5 bg-white transition ${open ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 bg-white transition ${open ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/10 bg-dark/90 backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-white/80 hover:text-white">
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
