"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export function ServicesSection() {
    return (
        <section id="services" className="relative w-full min-h-screen py-32 px-6 md:px-12 bg-[#05050B]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-[var(--color-foreground)] mb-4">
                        THE CAPABILITY MATRIX
                    </h2>
                    <div className="w-24 h-1 bg-[var(--color-primary)] mb-8" />
                    <p className="font-mono text-[var(--color-muted)] max-w-2xl text-lg">
                        Standard solutions are obsolete. We deploy interactive computational artifacts designed for maximum efficiency and extreme scale.
                    </p>
                </div>

                <div className="flex flex-col gap-24">
                    <ArtifactAI />
                    <ArtifactCloud />
                    <ArtifactEngineering />
                </div>
            </div>
        </section>
    );
}

// Artifact 1: Data Visualizer (Canvas Particle Coalescing)
function ArtifactAI() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, margin: "-100px" });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isInView || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = canvas.width = canvas.parentElement?.clientWidth || 400;
        let h = canvas.height = canvas.parentElement?.clientHeight || 400;

        // Abstract particle coalescing simulation
        let particles: { x: number, y: number, tx: number, ty: number, speed: number }[] = [];
        const numParticles = 200;

        // Core shape (circle/sphere)
        const cx = w / 2;
        const cy = h / 2;
        const r = Math.min(w, h) * 0.25;

        for (let i = 0; i < numParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = r * Math.cbrt(Math.random());
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                tx: cx + Math.cos(angle) * (r + (Math.random() * 20 - 10)),
                ty: cy + Math.sin(angle) * (r + (Math.random() * 20 - 10)),
                speed: Math.random() * 0.05 + 0.01
            });
        }

        let animationId: number;
        let time = 0;

        const animate = () => {
            ctx.fillStyle = "rgba(5, 5, 11, 0.2)";
            ctx.fillRect(0, 0, w, h);

            const hoverMultiplier = isHovered ? 5 : 1;
            time += 0.01 * hoverMultiplier;

            ctx.fillStyle = "#00F0FF";
            particles.forEach((p, idx) => {
                // Move towards target smoothly
                p.x += (p.tx - p.x) * p.speed * hoverMultiplier;
                p.y += (p.ty - p.y) * p.speed * hoverMultiplier;

                // Add some noise 
                const nx = Math.sin(time + idx) * 2 * hoverMultiplier;
                const ny = Math.cos(time + idx) * 2 * hoverMultiplier;

                ctx.beginPath();
                ctx.arc(p.x + nx, p.y + ny, 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Connect nearby particles to look like a neural net
                if (idx % 5 === 0) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(123, 44, 191, ${0.1 * hoverMultiplier})`;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(cx, cy);
                    ctx.stroke();
                }
            });

            // Randomly retarget some particles to break the shape slightly
            if (Math.random() < 0.1 * hoverMultiplier) {
                const p = particles[Math.floor(Math.random() * particles.length)];
                p.x = Math.random() * w;
                p.y = Math.random() * h;
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            w = canvas.width = canvas.parentElement?.clientWidth || 400;
            h = canvas.height = canvas.parentElement?.clientHeight || 400;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, [isInView, isHovered]);

    return (
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <h3 className="text-sm font-mono text-[var(--color-primary)] mb-2 uppercase tracking-widest">[01] AI & Machine Learning</h3>
                <h4 className="text-3xl font-sans font-bold text-[var(--color-foreground)] mb-6">Cognitive Processing Engines</h4>
                <p className="text-[var(--color-muted)] font-mono mb-6 pr-4">
                    We don't just train models; we architect digital nervous systems. Our AI solutions deploy predictive analytics, neural networks, and automated decision matrices that learn and adapt in real-time.
                </p>
                <ul className="space-y-3 font-mono text-sm text-[var(--color-muted)] mb-8">
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-pulse" /> Custom LLM Fine-Tuning
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[var(--color-secondary)] rounded-full animate-pulse" /> Predictive Data Models
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Computer Vision Systems
                    </li>
                </ul>
            </div>

            <div
                className="glass border-glow rounded-sm h-[400px] w-full relative overflow-hidden cursor-crosshair group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute top-4 left-4 font-mono text-xs text-[var(--color-primary)] z-10 flex gap-4">
                    <span>DATA_STREAM: {isHovered ? "ACCELERATED" : "NORMAL"}</span>
                    <span>V: {isHovered ? "9.8x" : "1.0x"}</span>
                </div>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>
        </div>
    );
}

// Artifact 2: Isometric Stack Builder
function ArtifactCloud() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-150px" });

    const layerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: custom * 0.2,
                type: "spring" as const,
                stiffness: 120,
                damping: 12,
                mass: 1
            }
        })
    };

    return (
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 h-[400px] w-full flex items-center justify-center relative">
                <div className="relative w-64 h-64 flex flex-col items-center justify-center transform scale-y-75 -rotate-x-12 cursor-pointer group">
                    {[2, 1, 0].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute w-48 h-48 border border-[var(--color-secondary)] bg-[var(--color-background)]/80 backdrop-blur-sm"
                            style={{
                                top: `${i * 30 + 50}px`,
                                transform: `rotateZ(45deg)`,
                                boxShadow: "inset 0 0 20px rgba(123, 44, 191, 0.2), 0 10px 30px rgba(0, 0, 0, 0.5)",
                                zIndex: 10 - i
                            }}
                            custom={i}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={layerVariants}
                            whileHover={{
                                top: `${i * 35 + 40}px`,
                                boxShadow: "inset 0 0 30px rgba(0, 240, 255, 0.4), 0 10px 40px rgba(0, 240, 255, 0.2)",
                                borderColor: "var(--color-primary)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="absolute inset-2 border border-white/10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 rotate-[-45deg]">
                                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse delay-75" />
                                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse delay-150" />
                            </div>
                        </motion.div>
                    ))}
                    {/* Snap Line */}
                    <motion.div
                        className="absolute w-[2px] h-[150px] bg-gradient-to-b from-[var(--color-primary)] to-transparent left-1/2 -translate-x-1/2 -top-10 z-0"
                        initial={{ height: 0, opacity: 0 }}
                        animate={isInView ? { height: 150, opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    />
                </div>
            </div>

            <div className="order-1 md:order-2">
                <h3 className="text-sm font-mono text-[var(--color-secondary)] mb-2 uppercase tracking-widest">[02] Cloud Infrastructure</h3>
                <h4 className="text-3xl font-sans font-bold text-[var(--color-foreground)] mb-6">Elastic Architecture Matrix</h4>
                <p className="text-[var(--color-muted)] font-mono mb-6">
                    We design and deploy auto-scaling Kubernetes clusters and serverless environments. Absolute high availability configured with atomic precision. It’s not just hosting; it’s an automated cloud orchestration fabric.
                </p>
                <ul className="space-y-3 font-mono text-sm text-[var(--color-muted)] mb-8">
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-pulse" /> Multi-Region Failover
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[var(--color-secondary)] rounded-full animate-pulse" /> Microservices Deployment
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Automated Disaster Recovery
                    </li>
                </ul>
            </div>
        </div>
    );
}

// Artifact 3: Code-to-Reality Compiler
function ArtifactEngineering() {
    const codeLines = [
        "function buildSystem() {",
        "  const ui = new Interface();",
        "  ui.connect(database.core);",
        "  ui.render(WebGLContext);",
        "  ",
        "  if (performance > 0.99) {",
        "    deployToEdgeNodes();",
        "  }",
        "  return ui.interactive();",
        "}"
    ];

    const [activeLine, setActiveLine] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLine((prev) => (prev + 1) % codeLines.length);
        }, 800);
        return () => clearInterval(interval);
    }, [codeLines.length]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <h3 className="text-sm font-mono text-white mb-2 uppercase tracking-widest">[03] Custom Engineering</h3>
                <h4 className="text-3xl font-sans font-bold text-[var(--color-foreground)] mb-6">Quantum-Grade Applications</h4>
                <p className="text-[var(--color-muted)] font-mono mb-6 pr-4">
                    From complex Web3 DApps to high-frequency trading platforms, we write bare-metal efficient code. No bloat. Pure performance compiled directly to reality.
                </p>
            </div>

            <div className="glass border-glow rounded-sm h-[400px] w-full flex overflow-hidden">
                {/* Left: Code Box */}
                <div className="w-1/2 h-full bg-[#030305] border-r border-[#00F0FF20] p-6 font-mono text-xs overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#030305] to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#030305] to-transparent z-10" />

                    <div className="flex flex-col transform translate-y-10 transition-transform duration-300">
                        {codeLines.map((line, idx) => (
                            <div
                                key={idx}
                                className={`py-1 transition-colors duration-300 ${activeLine === idx
                                    ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 -mx-2 rounded-sm"
                                    : "text-[var(--color-muted)]"
                                    }`}
                            >
                                <span className="opacity-50 mr-4">{idx + 1}</span>
                                {line}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: UI Generation Box */}
                <div className="w-1/2 h-full bg-[#05050B]/50 p-6 flex flex-col items-center justify-center relative">
                    <motion.div
                        className="w-full h-32 border border-[var(--color-secondary)]/50 rounded-sm mb-4 bg-gradient-to-tr from-[#7B2CBF10] to-transparent flex items-center justify-center"
                        animate={{
                            borderColor: activeLine % 2 === 0 ? "rgba(123, 44, 191, 0.8)" : "rgba(123, 44, 191, 0.2)",
                            boxShadow: activeLine % 2 === 0 ? "0 0 20px rgba(123, 44, 191, 0.2)" : "none"
                        }}
                    >
                        <div className="w-12 h-12 rounded-full border border-white/20 animate-spin-slow flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </motion.div>

                    <div className="w-full flex gap-2">
                        <motion.div
                            className="h-8 flex-1 bg-[var(--color-primary)]/20 rounded-sm"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                            className="h-8 w-16 bg-white/10 rounded-sm"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 h-1 bg-white/5 overflow-hidden">
                        <motion.div
                            className="h-full bg-[var(--color-primary)]"
                            animate={{ width: ["0%", "100%", "0%"] }}
                            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
