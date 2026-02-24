"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

export function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-500 ease-out",
                isScrolled ? "glass hud-border-bottom h-16 px-4 md:px-8" : "bg-transparent h-24 px-6 md:px-12"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                <Link href="/" className="group flex items-center gap-3">
                    <Terminal className="text-[var(--color-primary)] w-6 h-6" />
                    <span className="font-sans font-bold text-xl tracking-tight text-[var(--color-foreground)] relative inline-block overflow-hidden">
                        <span className="block group-hover:hidden">SYNTAX_LABS</span>
                        <span className="hidden group-hover:block animate-glitch text-[var(--color-primary)] text-glow">SYNTAX_LABS</span>
                    </span>
                </Link>

                <nav className="hidden md:flex gap-8 font-mono text-sm tracking-wider">
                    {["SERVICES", "PROCESS", "WORK", "SYSTEM"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors duration-300 border-b border-transparent hover:border-[var(--color-primary)] pb-1"
                        >
              // {item}
                        </Link>
                    ))}
                </nav>

                <button className="md:hidden text-[var(--color-primary)] font-mono text-sm">
                    [ MENU ]
                </button>
            </div>
        </motion.header>
    );
}
