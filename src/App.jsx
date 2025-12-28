import Navbar from './components/layout/Navbar';
import SmoothScroller from './components/layout/SmoothScroller';
import DataOverlay from './components/ui/DataOverlay';
import Preloader from './components/ui/Preloader';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      // If passing standard touch events, maybe also:
      // document.body.style.position = 'fixed'; 
      // but overflow hidden should suffice for basic blocking
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <SmoothScroller />
      <Navbar />
      <DataOverlay />

      <main className="bg-background min-h-screen">
        <Home startAnimation={!isLoading} />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
