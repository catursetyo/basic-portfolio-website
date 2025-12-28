import { motion } from 'framer-motion';

export default function Home({ startAnimation = true }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5 // Wait for preloader curtain to lift slightly
            }
        }
    };

    const itemVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center border-x border-grid max-w-[1920px] mx-auto bg-background overflow-hidden relative z-10">
            {/* Vertical Grid Lines Decoration */}
            <div className="absolute inset-0 pointer-events-none select-none flex justify-between px-[10%] md:px-[20%] opacity-20 z-0">
                <div className="w-[1px] h-full bg-grid"></div>
                <div className="w-[1px] h-full bg-grid"></div>
                <div className="w-[1px] h-full bg-grid"></div>
            </div>

            {/*Corner Decor */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute top-24 right-4 md:right-10 font-mono text-[10px] md:text-xs text-grid text-right select-none z-10"
            >
                [SYSTEM: ONLINE]<br />
                [MODE: NEO-BRUTALISM]
            </motion.div>

            <motion.div
                className="flex-1 flex flex-col justify-center items-start px-2 md:px-0 relative z-10 mt-20 md:mt-0"
                variants={containerVariants}
                initial="hidden"
                animate={startAnimation ? "visible" : "hidden"}
            >
                {/* Giant Name - Responsive Clamp */}
                <h1 className="leading-[0.85] font-bold tracking-tighter uppercase break-words w-full border-b border-grid pb-4 md:pb-10 pl-4 md:pl-10 overflow-hidden">
                    <motion.span variants={itemVariants} className="block text-[13vw] md:text-[clamp(10vw,11vw,200px)]">Catur*</motion.span>
                    <motion.span variants={itemVariants} className="block ml-[8vw] md:ml-[10vw] text-[13vw] md:text-[clamp(10vw,11vw,200px)]">→ Setyo</motion.span>
                    <motion.span variants={itemVariants} className="block text-[13vw] md:text-[clamp(10vw,11vw,200px)]">Ragil+++++</motion.span>
                </h1>

                {/* Subtext */}
                <motion.div variants={itemVariants} className="w-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-grid border-b border-grid bg-background">
                    <div className="p-4 md:p-8">
                        <p className="font-mono text-sm uppercase opacity-60">[Role]</p>
                        <p className="text-xl md:text-3xl font-medium mt-2">DATA SCIENTIST & AI ENGINEER</p>
                    </div>
                    <div className="p-4 md:p-8">
                        <p className="font-mono text-sm uppercase opacity-60">[Located]</p>
                        <p className="text-xl md:text-3xl font-medium mt-2">SURABAYA, INDONESIA</p>
                    </div>
                    <div className="p-4 md:p-8 flex items-end justify-end">
                        <p className="font-mono text-xs opacity-50 uppercase">SCROLL FOR ARCHIVE ↓</p>
                    </div>
                </motion.div>

                {/* Infinite Marquee */}
                <motion.div variants={itemVariants} className="w-full border-b border-grid py-3 md:py-6 overflow-hidden flex bg-foreground text-background">
                    <motion.div
                        animate={{ x: "-50%" }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="flex whitespace-nowrap min-w-max gap-8 font-bold text-3xl md:text-5xl uppercase tracking-tight"
                    >
                        {[...Array(4)].map((_, i) => (
                            <span key={i} className="flex items-center gap-8">
                                DATA SCIENCE ENTHUSIAST • INFORMATION TECHNOLOGY STUDENT AT INSTITUT TEKNOLOGI SEPULUH NOPEMBER •
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
