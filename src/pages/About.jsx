import { motion } from 'framer-motion';

export default function About() {
    return (
        <motion.section
            id="about"
            className="min-h-screen bg-background border-x border-grid max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8 }}
        >
            {/* Photo Section */}
            <div className="border-b md:border-b-0 md:border-r border-grid p-6 md:p-10 flex items-center justify-center bg-[url('https://placehold.co/800x1200/111/333')] bg-cover bg-center grayscale contrast-125 relative overflow-hidden min-h-[50vh] md:min-h-auto md:h-full">
                {/* Halftone Overlay Effect using CSS gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,var(--color-grid)_1px,transparent_1px)] [background-size:4px_4px] opacity-20 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

                {/* Actual Image if user had one, placeholder for now */}
                <div className="relative z-10 w-full max-w-sm aspect-[3/4] border border-grid bg-grid/10 backdrop-blur-sm grayscale brightness-90"></div>
            </div>

            {/* Text Section */}
            <div className="p-6 md:p-10 flex flex-col justify-between min-h-[50vh] md:min-h-auto">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase mb-8 md:mb-16">Manifesto.</h1>
                    <p className="text-xl md:text-3xl leading-snug font-medium text-justify uppercase tracking-tight">
                        i am a data scientist based in surabaya. my work exists at the intersection of artificial intelligence and utilitarian design. i do not just write code, i archive reality into digital structures.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-8 font-mono text-sm border-t border-grid pt-8">
                    <div>
                        <h3 className="uppercase opacity-50 mb-2">[Education]</h3>
                        <p>INSTITUT TEKNOLOGI SEPULUH NOPEMBER</p>
                        <p>INFORMATION TECHNOLOGY</p>
                    </div>
                    <div>
                        <h3 className="uppercase opacity-50 mb-2">[Focus]</h3>
                        <p>DATA SCIENCE</p>
                        <p>MACHINE LEARNING</p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
