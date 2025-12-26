import { motion } from 'framer-motion';

export default function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-16 md:pt-20 min-h-screen flex flex-col justify-center relative border-x border-grid max-w-[1920px] mx-auto bg-background"
        >
            <div className="flex-1 flex flex-col justify-center items-start px-2 md:px-0">
                {/* Giant Name */}
                <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase break-words w-full border-b border-grid pb-4 md:pb-10 pl-4 md:pl-10">
                    <span className="block">Catur</span>
                    <span className="block ml-[10vw]">Setyo</span>
                    <span className="block text-right pr-4 md:pr-10">Ragil</span>
                </h1>

                {/* Subtext */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-grid border-b border-grid">
                    <div className="p-4 md:p-8">
                        <p className="font-mono text-sm">[ROLE]</p>
                        <p className="text-xl md:text-3xl font-medium mt-2">DATA SCIENTIST & AI ENGINEER</p>
                    </div>
                    <div className="p-4 md:p-8">
                        <p className="font-mono text-sm">[LOCATION]</p>
                        <p className="text-xl md:text-3xl font-medium mt-2">SURABAYA, INDONESIA</p>
                    </div>
                    <div className="p-4 md:p-8 flex items-end justify-end">
                        <p className="font-mono text-xs opacity-50">SCROLL FOR ARCHIVE ↓</p>
                    </div>
                </div>

                {/* Infinite Marquee */}
                <div className="w-full border-b border-grid py-3 md:py-6 overflow-hidden flex bg-foreground text-background">
                    <motion.div
                        animate={{ x: "-50%" }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="flex whitespace-nowrap min-w-max gap-8 font-bold text-4xl md:text-6xl uppercase tracking-tight"
                    >
                        {[...Array(4)].map((_, i) => (
                            <span key={i} className="flex items-center gap-8">
                                DATA SCIENTIST • CREATIVE CODER • AI ENGINEER • ITS STUDENT •
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
