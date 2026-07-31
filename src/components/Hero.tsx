"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HeroCanvas from "./HeroCanvas";

const ROLES = [
  "Frontend Developer",
  "React & Next.js Specialist",
  "UI/UX Motion Enthusiast",
  "Systems Engineering Student",
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const techPillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = ROLES[roleIndex];
    let typingSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && displayText === currentFullText) {
      const timeout = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentFullText.substring(0, prev.length - 1)
          : currentFullText.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 }
      )
        .fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          roleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          descRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          techPillsRef.current?.children || [],
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen min-h-screen max-h-screen w-full flex flex-col justify-between overflow-hidden pt-20 pb-6 font-[family-name:var(--font-space-grotesk)]"
    >
      {/* Subtle Interactive Particle Canvas Background */}
      <HeroCanvas />

      {/* Clean Cyber Grid Background */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Main Content Layout - Left column text, right column blank space */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Text content formatted with futuristic computer typography */}
          <div className="lg:col-span-8 text-left flex flex-col items-start pr-0 lg:pr-4">
            
            {/* Status Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-md mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase">
                Frontend Developer
              </span>
              <span className="text-muted text-xs hidden sm:inline">•</span>
              <span className="text-muted text-xs font-mono hidden sm:inline tracking-wide">
                Available for hire
              </span>
            </div>

            {/* Futuristic Orbitron Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-wide leading-[1.15] text-foreground font-[family-name:var(--font-orbitron)] uppercase"
            >
              Hi, I&apos;m <span className="text-cyan-400">Josue Garcia</span>
            </h1>

            {/* Futuristic Computer / Terminal Typewriter Role Message */}
            <div
              ref={roleRef}
              className="mt-4 text-lg sm:text-2xl lg:text-3xl font-mono text-foreground font-semibold flex items-center gap-2 min-h-[38px] whitespace-nowrap tracking-tight"
            >
              <span className="text-muted">&gt; I build as a</span>
              <span className="text-cyan-400 font-bold">
                {displayText}
              </span>
              <span className="w-[3px] h-6 sm:h-7 bg-cyan-400 animate-blink inline-block rounded-sm" />
            </div>

            {/* Persona Description */}
            <p
              ref={descRef}
              className="mt-5 text-base sm:text-lg text-muted max-w-2xl leading-relaxed font-[family-name:var(--font-space-grotesk)]"
            >
              Crafting responsive, high-performance, and visually captivating web user experiences.
              Specializing in modern JavaScript frameworks, smooth motion UI, and pixel-perfect design systems.
            </p>

            {/* Computer Tech Stack Badges */}
            <div
              ref={techPillsRef}
              className="mt-6 flex flex-wrap gap-2 sm:gap-2.5 font-mono"
            >
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"].map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg border border-border bg-card/40 backdrop-blur-md text-xs text-foreground/80 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div
              ref={ctaRef}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto font-[family-name:var(--font-space-grotesk)]"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-cyan-500 text-background font-semibold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 group tracking-wide"
              >
                <span>View My Work</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-border bg-card/30 backdrop-blur-md text-foreground font-medium hover:border-cyan-400 hover:text-cyan-400 transition-colors text-center tracking-wide"
              >
                Get In Touch
              </a>
            </div>

          </div>

          {/* Right Column: Left completely blank as requested */}
          <div className="hidden lg:block lg:col-span-4 pointer-events-none" />

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 flex flex-col items-center pb-2 font-mono">
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-muted/60 hover:text-cyan-400 transition-colors group"
          aria-label="Scroll to About section"
        >
          <span className="text-[10px] tracking-widest uppercase opacity-80 group-hover:opacity-100">
            Scroll
          </span>
          <div className="w-5 h-7 rounded-full border border-muted/30 group-hover:border-cyan-400/50 flex justify-center p-1 transition-colors">
            <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
