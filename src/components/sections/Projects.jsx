import { useRef } from 'react';
import { motion } from 'framer-motion';
import Container from '../layout/Container';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const projects = [
    {
        title: "AI Ethics Classifier",
        category: "NLP / Research",
        image: "https://placehold.co/600x400/121212/FFF?text=AI+Ethics",
        link: "#"
    },
    {
        title: "Predictive Analytics",
        category: "Data Visualization",
        image: "https://placehold.co/600x400/121212/FFF?text=Analytics",
        link: "#"
    },
    {
        title: "Neural Net Visualizer",
        category: "Deep Learning",
        image: "https://placehold.co/600x400/121212/FFF?text=Neural+Net",
        link: "#"
    },
    {
        title: "Smart City Traffic",
        category: "Computer Vision",
        image: "https://placehold.co/600x400/121212/FFF?text=Computer+Vision",
        link: "#"
    },
    {
        title: "Algo Trading Bot",
        category: "FinTech / Python",
        image: "https://placehold.co/600x400/121212/FFF?text=Algo+Trading",
        link: "#"
    }
];

export default function Projects() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="projects" className="py-24 md:py-32 bg-surface overflow-hidden">
            <Container className="mb-12 flex justify-between items-end">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
                        projects.
                    </h2>
                </motion.div>

                <div className="hidden md:flex gap-4">
                    <button onClick={() => scroll('left')} className="p-3 rounded-full border border-border hover:bg-background hover:text-primary transition-colors text-secondary" aria-label="Scroll left">
                        <ArrowLeft size={24} />
                    </button>
                    <button onClick={() => scroll('right')} className="p-3 rounded-full border border-border hover:bg-background hover:text-primary transition-colors text-secondary" aria-label="Scroll right">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </Container>


            {/* Scroll Snap Container */}
            <div
                className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar flex cursor-grab active:cursor-grabbing px-6 md:px-[max(calc((100vw-1200px)/2),2rem)] pb-12"
                ref={scrollRef}
            >
                {projects.map((project, idx) => (
                    <div key={idx} className="snap-center shrink-0 pr-8 last:pr-0">
                        <Card project={project} index={idx} />
                    </div>
                ))}
                {/* Spacer for end of list alignment */}
                <div className="shrink-0 w-8 md:w-24 border-none" aria-hidden="true" />
            </div>
        </section>
    );
}

function Card({ project, index }) {
    return (
        <motion.a
            href={project.link}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ margin: "-50px" }}
            className="relative block w-[85vw] md:w-[600px] aspect-[16/9] group"
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                }}
                className="w-full h-full relative overflow-hidden rounded-lg border border-border bg-background"
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />

                {/* Overlay - adjusted for Light Mode visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-8 transition-opacity duration-300">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-white text-xs font-mono uppercase tracking-widest mb-3 font-bold lowercase">{project.category.toLowerCase()}</p>
                        <h3 className="text-white text-3xl md:text-4xl font-bold flex items-center gap-3 lowercase">
                            {project.title.toLowerCase()}
                            <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white" />
                        </h3>
                    </div>
                </div>

                {/* Glow Effect / Border on Hover - Monochrome */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-lg transition-colors duration-300 pointer-events-none" />
            </motion.div>
        </motion.a>
    )
}
