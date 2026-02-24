"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const projects = [
    {
        id: 1,
        client: "OMNIPAY LABS",
        title: "Global FinTech Architecture",
        metricPrefix: "",
        metricNum: 99.99,
        metricSuffix: "%",
        metricLabel: "Uptime on distributed Ledger",
        desc: "Rewrote the monolithic legacy system into a high-availability microservices mesh.",
        color: "#00F0FF"
    },
    {
        id: 2,
        client: "NEXUS AI",
        title: "Cognitive Data Pipeline",
        metricPrefix: "",
        metricNum: 10,
        metricSuffix: "x",
        metricLabel: "Faster Query Execution",
        desc: "Implemented a vectorized database structure accelerating LLM context retrieval.",
        color: "#7B2CBF"
    },
    {
        id: 3,
        client: "AETHER PROTOCOL",
        title: "Web3 Defi Platform",
        metricPrefix: "$",
        metricNum: 2.5,
        metricSuffix: "B",
        metricLabel: "Total Value Locked (TVL)",
        desc: "Built a mathematically proven, un-exploitable smart contract ecosystem.",
        color: "#EAEAEA"
    }
];

export function WorkSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    return (
        <section ref={containerRef} id="work" className="relative w-full bg-[#05050B]">
            {/* Sticky container for stacking */}
            <div className="relative w-full">
                {projects.map((proj, idx) => (
                    <ProjectCard
                        key={proj.id}
                        index={idx}
                        total={projects.length}
                        project={proj}
                        progress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ index, total, project, progress }: any) {
    // Normalize scroll progress per card
    const start = index / total;
    const end = (index + 1) / total;

    // Calculate scale and opacity for the stack effect
    const scale = useTransform(progress, [start, end], [1, 0.9]);
    const y = useTransform(progress, [start, end], [0, 50]);

    // Encryption glitch effect (opacity of the noise layer)
    const encryptionOpacity = useTransform(progress, [start - 0.1, start, end], [0, 0, 1]);

    return (
        <div className="h-screen w-full flex items-center justify-center sticky top-0 overflow-hidden perspective-1000">
            <motion.div
                style={{ scale, y }}
                className="relative w-full h-full max-w-[95vw] max-h-[90vh] md:max-w-6xl md:max-h-[85vh] mx-auto rounded-sm border border-white/10 glass p-8 md:p-16 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
                {/* Encryption Noise Layer */}
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none mix-blend-screen opacity-20"
                    style={{ opacity: encryptionOpacity }}
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-60 contrast-200" style={{ filter: 'url(#glitch)' }} />
                    <svg className="hidden">
                        <filter id="glitch">
                            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </svg>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 w-full h-full flex flex-col">
                    <div className="flex justify-between items-start mb-auto">
                        <div className="font-mono text-sm tracking-widest text-[var(--color-muted)]">
              // PROJECT_{project.id.toString().padStart(2, '0')}
                        </div>
                        <div className="font-sans font-bold text-xs uppercase px-3 py-1 border border-white/20 rounded-full text-white">
                            {project.client}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-end justify-between w-full h-full pb-10">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-6xl font-sans font-black text-white mb-6 uppercase tracking-tighter leading-none" style={{ color: "white" }}>
                                {project.title}
                            </h2>
                            <p className="font-mono text-lg text-[var(--color-muted)]">
                                &gt; {project.desc}
                            </p>
                        </div>

                        <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                            <SlotMachineNumber
                                prefix={project.metricPrefix}
                                value={project.metricNum}
                                suffix={project.metricSuffix}
                                color={project.color}
                            />
                            <p className="font-mono text-sm text-[var(--color-muted)] uppercase tracking-wider text-right mt-2">
                                {project.metricLabel}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Background ambient glow based on project color */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-10 z-0 pointer-events-none"
                    style={{ backgroundColor: project.color }}
                />
            </motion.div>
        </div>
    );
}

// Slot-machine style number counter
function SlotMachineNumber({ value, prefix, suffix, color }: { value: number, prefix: string, suffix: string, color: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            let startTimestamp: number;
            const duration = 2000; // 2 seconds

            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                // Easing out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                setDisplayValue(easeProgress * value);

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        } else {
            setDisplayValue(0);
        }
    }, [isInView, value]);

    // Format to 2 decimal places if it has decimals, else integer
    const formattedValue = value % 1 === 0
        ? Math.floor(displayValue)
        : displayValue.toFixed(2);

    return (
        <div ref={ref} className="font-sans font-black flex items-baseline">
            <span className="text-4xl md:text-6xl text-white mr-1">{prefix}</span>
            <span
                className="text-7xl md:text-[120px] leading-none tracking-tighter text-transparent bg-clip-text"
                style={{
                    backgroundImage: `linear-gradient(to bottom right, #FFFFFF, ${color})`,
                    textShadow: `0 0 30px ${color}40`
                }}
            >
                {formattedValue}
            </span>
            <span className="text-4xl md:text-6xl text-white ml-1">{suffix}</span>
        </div>
    );
}
