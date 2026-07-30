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
  const codeCardRef = useRef<HTMLDivElement>(null);
  const techPillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = ROLES[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentFullText) {
      // Pause at full word before deleting
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
        { y: -20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7 }
      )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          roleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          descRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          codeCardRef.current,
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          techPillsRef.current?.children || [],
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Dynamic Interactive Canvas Background */}
      <HeroCanvas />

      {/* Modern Radial Cyber Grid & Glowing Blurs */}
      <div className="absolute inset-0 bg-tech-grid opacity-35 pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="section-padding text-center relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Animated Status Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/30 bg-card/60 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.12)] mb-6 transition-all duration-300 hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-cyan-400 font-mono text-xs md:text-sm font-semibold tracking-wider uppercase">
            Frontend Developer
          </span>
          <span className="text-muted text-xs hidden sm:inline">•</span>
          <span className="text-muted text-xs font-mono hidden sm:inline tracking-wide">
            Available for hire
          </span>
        </div>

        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15]"
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(34,211,238,0.2)]">
            Josue Garcia
          </span>
        </h1>

        {/* Dynamic Typewriter Role Message */}
        <div
          ref={roleRef}
          className="mt-4 text-xl sm:text-3xl font-mono text-foreground font-semibold flex items-center justify-center gap-2 min-h-[44px]"
        >
          <span className="text-muted">I build as a</span>
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent font-bold">
            {displayText}
          </span>
          <span className="w-[3px] h-7 bg-cyan-400 animate-blink inline-block rounded-sm shadow-[0_0_8px_#22d3ee]" />
        </div>

        {/* Concise Persona Description */}
        <p
          ref={descRef}
          className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Crafting responsive, high-performance, and visually captivating web user experiences.
          Specializing in modern JavaScript frameworks, smooth motion UI, and pixel-perfect design systems.
        </p>

        {/* Interactive Mini Terminal / Code Snippet Preview */}
        <div
          ref={codeCardRef}
          className="mt-8 w-full max-w-xl text-left rounded-xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-2xl overflow-hidden group hover:border-cyan-500/40 transition-all duration-500"
        >
          {/* Terminal Top Bar */}
          <div className="px-4 py-2.5 bg-background/80 border-b border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-muted/70 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              developer.ts
            </span>
            <div className="w-12" />
          </div>

          {/* Code Content */}
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            <div className="text-purple-400">
              <span className="text-cyan-400">const</span> developer = &#123;
            </div>
            <div className="pl-4 text-foreground/90">
              <span className="text-cyan-300">name</span>: <span className="text-emerald-300">&quot;Josue Garcia&quot;</span>,
            </div>
            <div className="pl-4 text-foreground/90">
              <span className="text-cyan-300">primaryRole</span>: <span className="text-emerald-300">&quot;Frontend Developer&quot;</span>,
            </div>
            <div className="pl-4 text-foreground/90">
              <span className="text-cyan-300">coreStack</span>: [<span className="text-amber-300">&quot;React&quot;</span>, <span className="text-amber-300">&quot;Next.js&quot;</span>, <span className="text-amber-300">&quot;TypeScript&quot;</span>, <span className="text-amber-300">&quot;Tailwind&quot;</span>],
            </div>
            <div className="pl-4 text-foreground/90">
              <span className="text-cyan-300">passion</span>: <span className="text-emerald-300">&quot;Creating dynamic & accessible web experiences&quot;</span>
            </div>
            <div className="text-purple-400">&#125;;</div>
          </div>
        </div>

        {/* Interactive Floating Tech Stack Badges */}
        <div
          ref={techPillsRef}
          className="mt-8 flex flex-wrap justify-center items-center gap-2 sm:gap-3"
        >
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"].map((tech) => (
            <span
              key={tech}
              className="px-3.5 py-1.5 rounded-lg border border-border/80 bg-card/40 backdrop-blur-md font-mono text-xs text-foreground/80 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-950/20 hover:scale-105 transition-all duration-300 cursor-default shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-accent-dim text-background font-semibold hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-cyan-500/30 bg-card/30 backdrop-blur-md text-foreground font-medium hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-950/20 transition-all duration-300 text-center"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted/60 hover:text-cyan-400 transition-colors group"
          aria-label="Scroll to About section"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-80 group-hover:opacity-100">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-muted/30 group-hover:border-cyan-400/50 flex justify-center p-1 transition-colors">
            <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
