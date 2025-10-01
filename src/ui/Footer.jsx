import React from 'react';

const socials = [
  { name: 'Spotify', href: '#' },
  { name: 'SoundCloud', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'TikTok', href: '#' }
];

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-white/10 py-10 bg-black/40">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8 md:items-center justify-between">
        <p className="text-xs text-white/50">© {new Date().getFullYear()} DJ NEXUS. All rights reserved.</p>
        <div className="flex gap-4 flex-wrap text-xs">
          {socials.map(s => (
            <a key={s.name} href={s.href} className="text-white/60 hover:text-neon transition">
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
