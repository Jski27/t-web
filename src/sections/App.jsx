import React from 'react';
import Navbar from '../ui/Navbar';
import Hero from './Hero';
import About from './About';
import Music from './Music';
import Events from './Events';
import Gallery from './Gallery';
import Contact from './Contact';
import Footer from '../ui/Footer';

const App = () => {
  return (
    <div className="font-body scroll-smooth">
      <Navbar />
      <main className="space-y-28 md:space-y-40">
        <Hero />
        <About />
        <Music />
        <Events />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
