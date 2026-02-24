"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { id: "01", title: "DISCOVER", desc: "Mapping the neural pathways. We extract the raw data and define the computational boundaries of the problem space.", icon: "⎔" },
    { id: "02", title: "ARCHITECT", desc: "Designing the system topology. We draft the schematics for high-availability nodes and elastic data pipelines.", icon: "◬" },
    { id: "03", title: "BUILD", desc: "Compiling reality. Writing bare-metal code with zero abstractions and maximum performance.", icon: "⚙" },
    { id: "04", title: "DEPLOY", desc: "Executing launch protocols. The system is containerized, orchestrated, and pushed to edge nodes globally.", icon: "🚀" }
];

export function ProcessSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !wrapperRef.current) return;

        const sections = gsap.utils.toArray(".process-step") as HTMLElement[];
        const totalScroll = wrapperRef.current.scrollWidth - window.innerWidth;

        const ctx = gsap.context(() => {
            gsap.to(sections, {
                x: () => -totalScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + wrapperRef.current!.scrollWidth,
                }
            });

            // Lighting up nodes progressively
            sections.forEach((step, i) => {
                gsap.to(step.querySelector(".node-indicator"), {
                    backgroundColor: "#00F0FF",
                    boxShadow: "0 0 20px rgba(0, 240, 255, 0.8)",
                    scale: 1.5,
                    scrollTrigger: {
                        trigger: step,
                        containerAnimation: gsap.getById("processScroll") // We need an ID to link it or calculate positions
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="process" className="relative h-screen w-full bg-[#05050B] overflow-hidden flex flex-col justify-center">
            <div className="absolute top-20 left-6 md:left-12 z-10 w-full pr-12">
                <h2 className="text-3xl md:text-5xl font-sans font-bold text-[var(--color-foreground)] mb-4">
                    DEPLOYMENT PIPELINE
                </h2>
                <div className="w-24 h-1 bg-[var(--color-secondary)] mb-8" />
            </div>

            <div ref={wrapperRef} className="flex relative items-center h-[500px]">
                {/* The continuous glowing line */}
                <div className="absolute top-1/2 left-0 w-[400vw] h-[2px] bg-white/10 -translate-y-1/2 z-0" />
                <div className="absolute top-1/2 left-0 w-[400vw] h-[2px] bg-[var(--color-primary)] -translate-y-1/2 z-0 origin-left scale-x-0 progress-line" />

                {steps.map((step, idx) => (
                    <div key={step.id} className="process-step relative w-[100vw] sm:w-[50vw] md:w-[33vw] lg:w-[400px] flex-shrink-0 flex flex-col items-center justify-center px-8 z-10">
                        {/* The Node */}
                        <div className="w-16 h-16 rounded-full glass border border-white/20 flex items-center justify-center text-2xl mb-8 relative z-10">
                            <span className="text-white relative z-10">{step.icon}</span>
                            <div className="node-indicator absolute inset-0 rounded-full transition-all duration-300 z-0 bg-transparent" />
                        </div>

                        <div className="text-center">
                            <span className="text-[var(--color-secondary)] font-mono text-sm tracking-widest block mb-2">[{step.id}]</span>
                            <h3 className="text-2xl font-sans font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                            <p className="font-mono text-sm text-[var(--color-muted)] leading-relaxed">
                                {step.desc}
                            </p>
                        </div>

                        {/* Particle emitter points (CSS animation styled) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[var(--color-primary)]/0 animate-[spin_4s_linear_infinite]" />
                    </div>
                ))}
            </div>
        </section>
    );
}
