import Navbar from './components/layout/Navbar';
import SmoothScroller from './components/layout/SmoothScroller';
import DataOverlay from './components/ui/DataOverlay';
import Preloader from './components/ui/Preloader';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Preloader />
      <SmoothScroller />
      <Navbar />
      <DataOverlay />

      <main className="bg-background min-h-screen">
        <Home />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
