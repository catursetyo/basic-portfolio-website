import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    { year: "2024", name: "AI Ethics Classifier", category: "NLP / RESEARCH", link: "#", img: "https://placehold.co/600x400/111/FFF?text=AI+ETHICS" },
    { year: "2024", name: "Predictive Analytics", category: "DATA VIS", link: "#", img: "https://placehold.co/600x400/111/FFF?text=PREDICTIVE" },
    { year: "2023", name: "Neural Net Visualizer", category: "DEEP LEARNING", link: "#", img: "https://placehold.co/600x400/111/FFF?text=NEURAL+NET" },
    { year: "2023", name: "Smart City Traffic", category: "COMPUTER VISION", link: "#", img: "https://placehold.co/600x400/111/FFF?text=SMART+CITY" },
    { year: "2022", name: "Algo Trading Bot", category: "FINTECH", link: "#", img: "https://placehold.co/600x400/111/FFF?text=ALGO+TRADING" },
];

export default function Projects() {
    const [hoveredImg, setHoveredImg] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-20 min-h-screen bg-background text-foreground border-x border-grid max-w-[1920px] mx-auto cursor-crosshair"
            onMouseMove={handleMouseMove}
        >
            <div className="border-b border-grid p-6 md:p-10">
                <h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter">Archive.</h1>
            </div>

            <div className="flex flex-col">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 md:px-10 py-4 border-b border-grid text-sm font-mono opacity-50 uppercase">
                    <div className="col-span-2">[YEAR]</div>
                    <div className="col-span-6">[PROJECT]</div>
                    <div className="col-span-4 text-right">[CATEGORY]</div>
                </div>

                {projects.map((project, idx) => (
                    <a
                        key={idx}
                        href={project.link}
                        className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-10 py-8 md:py-12 border-b border-grid hover:bg-foreground hover:text-background transition-colors duration-200 items-baseline"
                        onMouseEnter={() => setHoveredImg(project.img)}
                        onMouseLeave={() => setHoveredImg(null)}
                    >
                        <div className="col-span-2 font-mono text-sm md:text-lg">{project.year}</div>
                        <div className="col-span-6 text-2xl md:text-5xl font-bold uppercase tracking-tight">{project.name}</div>
                        <div className="col-span-4 text-sm md:text-xl font-medium md:text-right flex justify-between md:block">
                            <span className="md:hidden opacity-50 font-mono">[CATEGORY]</span>
                            {project.category}
                        </div>
                    </a>
                ))}
            </div>

            {/* Floating Image Portal */}
            <AnimatePresence>
                {hoveredImg && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, x: mousePos.x - 200, y: mousePos.y - 150 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.1, ease: "linear" }}
                        className="fixed top-0 left-0 w-[400px] h-[300px] z-40 pointer-events-none hidden md:block mix-blend-difference"
                        style={{ x: mousePos.x - 200, y: mousePos.y - 150 }}
                    >
                        {/* We animate style x/y directly for performance or just rely on motion div transform */}
                        <img src={hoveredImg} alt="Preview" className="w-full h-full object-cover border border-background grayscale" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
