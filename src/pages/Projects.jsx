import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        id: 1,
        year: "2024",
        name: "AI Ethics Classifier",
        category: "NLP / RESEARCH",
        img: "https://placehold.co/600x400/111/FFF?text=AI+ETHICS",
        description: "A transformer-based model designed to detect bias in synthetic text generation. This project explores the intersection of ethical AI guidelines and practical NLP implementation, ensuring generated content adheres to safety standards.",
        techStack: ["PYTHON", "PYTORCH", "HUGGING FACE", "REACT"],
        githubUrl: "https://github.com/catursetyo"
    },
    {
        id: 2,
        year: "2024",
        name: "Predictive Analytics",
        category: "DATA VIS",
        img: "https://placehold.co/600x400/111/FFF?text=PREDICTIVE",
        description: "An advanced dashboard for visualizing high-dimensional datasets. features real-time clustering algorithms and interactive t-SNE projections to reveal hidden patterns in complex data structures.",
        techStack: ["D3.JS", "PYTHON", "FLASK", "SCIKIT-LEARN"],
        githubUrl: "https://github.com/catursetyo"
    },
    {
        id: 3,
        year: "2023",
        name: "Neural Net Visualizer",
        category: "DEEP LEARNING",
        img: "https://placehold.co/600x400/111/FFF?text=NEURAL+NET",
        description: "Educational tool for visualizing the flow of tensors through a neural network. Users can adjust weights and biases in real-time to see how they affect activation functions.",
        techStack: ["TENSORFLOW.JS", "WEBGL", "REACT", "TYPESCRIPT"],
        githubUrl: "https://github.com/catursetyo"
    },
    {
        id: 4,
        year: "2023",
        name: "Smart City Traffic",
        category: "COMPUTER VISION",
        img: "https://placehold.co/600x400/111/FFF?text=SMART+CITY",
        description: "Computer vision system for real-time traffic density estimation using YOLOv8. Optimized for edge devices to monitor congestion and automate traffic light intervals.",
        techStack: ["OPENCV", "YOLOv8", "PYTHON", "DOCKER"],
        githubUrl: "https://github.com/catursetyo"
    },
    {
        id: 5,
        year: "2022",
        name: "Algo Trading Bot",
        category: "FINTECH",
        img: "https://placehold.co/600x400/111/FFF?text=ALGO+TRADING",
        description: "Automated trading algorithm utilizing sentiment analysis on financial news and historical price data. Includes a backtesting engine to validate strategies against past market conditions.",
        techStack: ["PANDAS", "NUMPY", "ALPACA API", "AWS"],
        githubUrl: "https://github.com/catursetyo"
    },
];

export default function Projects() {
    const [openProjectId, setOpenProjectId] = useState(null);
    const [hoveredImg, setHoveredImg] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const toggleProject = (id) => {
        setOpenProjectId(prev => prev === id ? null : id);
    };

    return (
        <motion.section
            id="projects"
            className="min-h-screen bg-background text-foreground border-x border-grid max-w-[1920px] mx-auto cursor-crosshair relative z-10"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8 }}
        >
            <div className="border-b border-grid p-6 md:p-10 sticky top-16 md:top-20 bg-background z-20">
                <h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter">Project.</h1>
            </div>

            <div className="flex flex-col">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 md:px-10 py-4 border-b border-grid text-sm font-mono opacity-50 uppercase">
                    <div className="col-span-2">[YEAR]</div>
                    <div className="col-span-6">[PROJECT]</div>
                    <div className="col-span-4 text-right">[CATEGORY]</div>
                </div>

                {projects.map((project) => (
                    <div key={project.id} className="border-b border-grid overflow-hidden">
                        {/* Header Row */}
                        <div
                            onClick={() => toggleProject(project.id)}
                            onMouseEnter={() => setHoveredImg(project.img)}
                            onMouseLeave={() => setHoveredImg(null)}
                            className={`group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-10 py-8 md:py-12 cursor-pointer transition-colors duration-300 items-baseline ${openProjectId === project.id ? 'bg-foreground text-background' : 'hover:bg-foreground hover:text-background'}`}
                        >
                            <div className="col-span-2 font-mono text-sm md:text-lg">{project.year}</div>
                            <div className="col-span-6 text-2xl md:text-5xl font-bold uppercase tracking-tight flex items-center gap-4">
                                {project.name}
                                {openProjectId === project.id && (
                                    <span className="text-sm font-mono opacity-50 hidden md:inline-block">
                                        [OPEN]
                                    </span>
                                )}
                            </div>
                            <div className="col-span-4 text-sm md:text-xl font-medium md:text-right flex justify-between md:block">
                                <span className="md:hidden opacity-50 font-mono">[CATEGORY]</span>
                                {project.category}
                            </div>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                            {openProjectId === project.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-10 pb-12 pt-4">
                                        {/* Image Placeholder - Responsive */}
                                        <div className="col-span-12 md:col-span-4">
                                            <div className="aspect-video w-full bg-grid/10 border border-grid overflow-hidden relative group">
                                                <img
                                                    src={project.img}
                                                    alt={project.name}
                                                    className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </div>

                                        {/* Description & Tech Stack */}
                                        <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
                                            <p className="font-mono text-sm md:text-base leading-relaxed opacity-80 uppercase text-justify">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech, i) => (
                                                    <span key={i} className="px-2 py-1 border border-grid text-xs font-mono uppercase bg-background text-foreground">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <div className="col-span-12 md:col-span-3 flex md:justify-end items-start md:items-end">
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 border border-current px-6 py-3 font-bold uppercase tracking-tight hover:bg-foreground hover:text-background transition-colors duration-300"
                                            >
                                                VIEW ON GITHUB
                                                <ArrowUpRight className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Floating Image Portal (Only when NOT expanded? Or always? User didn't specify, I'll keep it active on hover for cool factor) */}
            <AnimatePresence>
                {hoveredImg && !openProjectId && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, x: mousePos.x - 200, y: mousePos.y - 150 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.1, ease: "linear" }}
                        className="fixed top-0 left-0 w-[400px] h-[300px] z-50 pointer-events-none hidden md:block mix-blend-difference"
                        style={{ x: mousePos.x - 200, y: mousePos.y - 150 }}
                    >
                        <img src={hoveredImg} alt="Preview" className="w-full h-full object-cover border border-background grayscale" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
