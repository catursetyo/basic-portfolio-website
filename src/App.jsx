import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import SmoothScroller from './components/layout/SmoothScroller';
import DataOverlay from './components/ui/DataOverlay';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';

function App() {
  const location = useLocation();

  return (
    <>
      <SmoothScroller />
      <Navbar />
      <DataOverlay />

      <main className="bg-background min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App
