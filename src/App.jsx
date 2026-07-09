import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import SmoothScroller from './components/layout/SmoothScroller';
import DataOverlay from './components/ui/DataOverlay';
import Preloader from './components/ui/Preloader';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [path, setPath] = useState(window.location.pathname);

  const navigate = (nextPath) => {
    if (nextPath === path) return;
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  };

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
  }, [isLoading]);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [path]);

  const page = getPage(path, navigate);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <SmoothScroller />
      <Navbar activePath={path} onNavigate={navigate} />
      <DataOverlay />

      <main className="site-main">
        {page ?? <Home startAnimation={!isLoading} onNavigate={navigate} />}
      </main>
    </>
  );
}

function getPage(path, navigate) {
  if (path === '/') return <Home startAnimation onNavigate={navigate} />;
  if (path === '/projects') return <Projects onNavigate={navigate} />;
  if (path === '/blog') return <Blog onNavigate={navigate} />;
  if (path.startsWith('/blog/')) return <BlogPost slug={path.replace('/blog/', '')} onNavigate={navigate} />;
  if (path === '/contact') return <Contact />;
  if (path === '/resume') return <Resume />;
  return null;
}

export default App;
