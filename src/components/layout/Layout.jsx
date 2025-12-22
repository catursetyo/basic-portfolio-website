import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-background text-primary selection:bg-white selection:text-black">
            <Navbar />
            <main className="pt-24 min-h-screen flex flex-col">
                {children}
            </main>
            <Footer />
        </div>
    );
}
