import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/*
  GenerativeBackground
  - Fullscreen animated canvas with neon gradient pulses + particle orbs.
  - Random seed per load; lightweight, no external libs.
  - Responsive: resizes with window.
*/

const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const PALETTES = [
  ['#14f1ff', '#ff007a', '#6a00ff'],
  ['#14f1ff', '#4effa1', '#ffb800'],
  ['#ff007a', '#ff4d00', '#14f1ff'],
];

const GenerativeBackground = () => {
  const canvasRef = useRef(null);
  const seedPalette = useRef(pick(PALETTES));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let running = true;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', handleResize);

    const orbCount = 22;
    const orbs = [];
    const gradients = [];

    function createGradient() {
      // Radial gradient parameters
      const x = rand(0, width);
      const y = rand(0, height);
      const r = rand(width * 0.3, width * 0.9);
      const g = ctx.createRadialGradient(x, y, r * 0.05, x, y, r);
      const cols = seedPalette.current.slice().sort(() => Math.random() - 0.5);
      g.addColorStop(0, cols[0] + 'dd');
      g.addColorStop(0.35, cols[1] + '33');
      g.addColorStop(1, '#00000000');
      return { g, x, y, r, shift: rand(0, Math.PI * 2) };
    }

    function init() {
      gradients.length = 0;
      for (let i = 0; i < 3; i++) gradients.push(createGradient());
      orbs.length = 0;
      for (let i = 0; i < orbCount; i++) {
        const base = pick(seedPalette.current);
        orbs.push({
          x: rand(0, width),
          y: rand(0, height),
            r: rand(18, 70),
            hue: base,
            alpha: rand(0.15, 0.55),
            vx: rand(-0.25, 0.25),
            vy: rand(-0.25, 0.25),
            pulse: rand(0.5, 1.5),
            t: rand(0, Math.PI * 2)
        });
      }
    }

    function drawGradients(time) {
      gradients.forEach((gr, i) => {
        const scale = 1 + Math.sin(time * 0.00015 + gr.shift) * 0.15;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.translate(gr.x, gr.y);
        ctx.scale(scale, scale);
        ctx.translate(-gr.x, -gr.y);
        ctx.fillStyle = gr.g;
        ctx.fillRect(gr.x - gr.r, gr.y - gr.r, gr.r * 2, gr.r * 2);
        ctx.restore();
      });
    }

    function drawOrbs(time) {
      orbs.forEach(o => {
        o.x += o.vx;
        o.y += o.vy;
        o.t += 0.01 * o.pulse;
        const pr = o.r + Math.sin(o.t) * (o.r * 0.25);
        if (o.x < -100) o.x = width + 50;
        if (o.x > width + 100) o.x = -50;
        if (o.y < -100) o.y = height + 50;
        if (o.y > height + 100) o.y = -50;
        const grad = ctx.createRadialGradient(o.x, o.y, pr * 0.05, o.x, o.y, pr);
        grad.addColorStop(0, o.hue + Math.floor(o.alpha * 255).toString(16).padStart(2,'0'));
        grad.addColorStop(1, '#00000000');
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, pr, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function animate(ts) {
      if (!running) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // subtle base gradient background
      const base = ctx.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, '#05060a');
      base.addColorStop(1, '#070a14');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      drawGradients(ts);
      drawOrbs(ts);

      // film grain overlay
      if (frame % 2 === 0) {
        const grainDensity = 70;
        ctx.globalAlpha = 0.03;
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < grainDensity; i++) {
          const gx = Math.random() * width;
          const gy = Math.random() * height;
          ctx.fillRect(gx, gy, 1, 1);
        }
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(animate);
    }

    init();
    requestAnimationFrame(animate);

    return () => {
      running = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 w-full h-full block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    />
  );
};

export default GenerativeBackground;
