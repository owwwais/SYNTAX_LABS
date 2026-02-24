"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const phrases = [
    "> Initializing core protocols...",
    "> Optimizing neural pathways...",
    "> Syncing distributed clusters...",
    "> Compiling genesis block..."
];

export function HeroSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    // Terminal Typing Effect
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const fullText = phrases[currentPhrase];

        if (isTyping) {
            if (typedText.length < fullText.length) {
                timeout = setTimeout(() => {
                    setTypedText(fullText.slice(0, typedText.length + 1));
                }, 50 + Math.random() * 50);
            } else {
                timeout = setTimeout(() => setIsTyping(false), 2000);
            }
        } else {
            if (typedText.length > 2) {
                timeout = setTimeout(() => {
                    setTypedText(typedText.slice(0, -1));
                }, 30);
            } else {
                setCurrentPhrase((prev) => (prev + 1) % phrases.length);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [typedText, isTyping, currentPhrase]);

    // Particle Network Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;

        class Particle {
            x: number; y: number; vx: number; vy: number; radius: number;
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.radius = Math.random() * 1.5 + 0.5;
            }
            update() {
                if (this.x < 0 || this.x > w) this.vx = -this.vx;
                if (this.y < 0 || this.y > h) this.vy = -this.vy;
                this.x += this.vx;
                this.y += this.vy;
            }
            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const numParticles = Math.min(Math.floor((w * h) / 10000), 100);
            for (let i = 0; i < numParticles; i++) particles.push(new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 - dist / 1000})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            init();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 opacity-60 mix-blend-screen"
            />

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-xl md:text-2xl font-mono text-[var(--color-muted)] mb-4 tracking-widest uppercase">
                        Architecting the
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-sans tracking-tighter mb-8 leading-none bg-clip-text text-transparent bg-gradient-to-br from-[var(--color-primary)] via-white to-[var(--color-secondary)]">
                        DIGITAL NERVOUS <br className="hidden md:block" /> SYSTEM.
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="glass hud-border-bottom px-6 py-4 rounded-sm flex items-center gap-3 w-full max-w-lg mx-auto mb-10 border-glow"
                >
                    <Terminal className="w-5 h-5 text-[var(--color-primary)] animate-pulse" />
                    <p className="font-mono text-sm md:text-base text-left flex-1 text-[var(--color-foreground)]">
                        {typedText}
                        <span className="inline-block w-2 h-5 bg-[var(--color-primary)] ml-1 animate-pulse align-middle" />
                    </p>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-bold text-lg tracking-wide text-black bg-[var(--color-primary)] overflow-hidden rounded-sm transition-transform hover:scale-105 active:scale-95"
                >
                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-sm opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
                    <span className="relative flex items-center gap-2">
                        Execute Vision
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                    <div className="absolute inset-0 border border-white/40 group-hover:border-white transition-colors" />
                </motion.button>
            </div>
        </section>
    );
}
