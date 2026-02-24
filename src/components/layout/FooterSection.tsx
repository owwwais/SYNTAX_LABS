"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function FooterSection() {
    const [btnHover, setBtnHover] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);

    // Magnetic button effect
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btnRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleMouseLeave = () => {
        setBtnHover(false);
        if (!btnRef.current) return;
        btnRef.current.style.transform = `translate(0px, 0px)`;
    };

    return (
        <footer id="system" className="relative w-full min-h-[50vh] bg-black border-t border-[var(--color-primary)]/20 px-6 md:px-12 py-24 flex flex-col items-center justify-between font-mono">
            {/* Background terminal static / grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle at 50% 100%, #00F0FF 0%, transparent 40%)"
                }}
            />

            <div className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-24 cursor-default">
                <p className="text-[var(--color-muted)] text-sm mb-6 uppercase tracking-widest">
          // Awaiting Command Input
                </p>

                <button
                    ref={btnRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setBtnHover(true)}
                    onMouseLeave={handleMouseLeave}
                    className="relative px-12 py-6 bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-black font-sans font-black text-2xl md:text-5xl uppercase tracking-tighter"
                    style={{ transition: btnHover ? "none" : "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                >
                    Initialize Collaboration Protocol
                    {btnHover && (
                        <span className="absolute inset-0 border border-white animate-ping opacity-20" />
                    )}
                </button>
            </div>

            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 z-10">
                <div className="flex flex-col gap-2 text-[var(--color-muted)] text-sm w-full md:w-auto mb-8 md:mb-0">
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">GITHUB</a>
                        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">TWITTER</a>
                        <a href="#" className="hover:text-[var(--color-primary)] transition-colors">LINKEDIN</a>
                    </div>
                    <div className="mt-4 opacity-50 text-xs">
                        DATA.TRANSMISSION: ENCRYPTED // 2048-BIT RSA
                    </div>
                </div>

                <div className="text-[var(--color-primary)] text-sm md:text-base flex items-center">
                    <span>&gt; SYNTAX LABS SYSTEMS ONLINE</span>
                    <span className="inline-block w-2.5 h-4 bg-[var(--color-primary)] ml-1 animate-[pulse_1s_steps(2,start)_infinite]" />
                </div>
            </div>
        </footer>
    );
}
