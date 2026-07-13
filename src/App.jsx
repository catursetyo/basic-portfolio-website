import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import SmoothScroller from './components/layout/SmoothScroller';
import DataOverlay from './components/ui/DataOverlay';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Home from './pages/Home';
import OwnerLogin from './pages/OwnerLogin';
import Projects from './pages/Projects';
import Resume from './pages/Resume';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  const navigate = (nextPath) => {
    if (nextPath === path) return;
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  };

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [path]);

  const page = getPage(path, navigate);

  return (
    <>
      <SmoothScroller />
      <Navbar activePath={path} onNavigate={navigate} />
      <DataOverlay hidden={path === '/'} />

      <main className="site-main">
        {page ?? <Home onNavigate={navigate} />}
      </main>
    </>
  );
}

function getPage(path, navigate) {
  if (path === '/') return <Home onNavigate={navigate} />;
  if (path === '/projects') return <Projects onNavigate={navigate} />;
  if (path === '/blog') return <Blog onNavigate={navigate} />;
  if (path.startsWith('/blog/')) return <BlogPost slug={path.replace('/blog/', '')} onNavigate={navigate} />;
  if (path === '/contact') return <Contact />;
  if (path === '/resume') return <Resume />;
  if (path === '/owner/login') return <OwnerLogin onNavigate={navigate} />;
  return null;
}

export default App;
