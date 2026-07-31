"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HeroCanvas from "./HeroCanvas";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const techPillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();

  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = t.hero.typewriter;
    const currentFullText = roles[roleIndex % roles.length];
    let typingSpeed = isDeleting ? 30 : 65;

    if (!isDeleting && displayText === currentFullText) {
      const timeout = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
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
  }, [displayText, isDeleting, roleIndex, t.hero.typewriter]);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
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
      className="relative h-screen min-h-screen max-h-screen w-full flex flex-col justify-between overflow-hidden pt-20 pb-6 font-[family-name:var(--font-chakra)]"
    >
      {/* Dynamic Green Particle Canvas Background */}
      <HeroCanvas />

      {/* Clean Cyber Grid Background */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Main Content Layout (Fills 100vh viewport) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full my-auto flex-1 flex items-center">
        <div className="flex flex-col items-start w-full">
          
          {/* Bigger Status Badge (NO emojis) */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-emerald-500/40 bg-card/90 backdrop-blur-md mb-5 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-sm h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-mono text-sm sm:text-base md:text-lg font-bold tracking-wider uppercase">
              {t.hero.roleBadge}
            </span>
            <span className="text-muted text-sm hidden sm:inline">•</span>
            <span className="text-muted text-xs sm:text-sm font-mono hidden sm:inline tracking-wide font-medium">
              {t.hero.location}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-wider leading-[1.1] text-foreground font-[family-name:var(--font-rajdhani)] uppercase"
          >
            {t.hero.nameFirst} <span className="text-emerald-400">{t.hero.nameLast}</span>
          </h1>

          {/* Subtitle & Dynamic Role Typewriter */}
          <div
            ref={roleRef}
            className="mt-4 text-lg sm:text-2xl lg:text-3xl font-mono text-foreground font-semibold flex items-center gap-2 min-h-[40px] tracking-tight"
          >
            <span className="text-emerald-400 font-bold">&gt; {displayText}</span>
            <span className="w-[3.5px] h-7 bg-emerald-400 animate-blink inline-block rounded-none" />
          </div>

          {/* Core Highlighted Technologies */}
          <div
            ref={techPillsRef}
            className="mt-6 flex flex-wrap gap-2.5 font-mono"
          >
            {["Angular", "TypeScript", "Ionic", "Next.js", "REST APIs", "Git"].map((tech) => (
              <span
                key={tech}
                className={`px-3.5 py-1.5 text-xs sm:text-sm rounded-sm border ${
                  ["Angular", "TypeScript", "Ionic"].includes(tech)
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-400 font-semibold"
                    : "border-border bg-card/60 text-foreground/80"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div
            ref={ctaRef}
            className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto font-[family-name:var(--font-rajdhani)] text-base"
          >
            {/* Primary CTA: Ver proyectos */}
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-emerald-500 text-background font-bold hover:bg-emerald-400 transition-all duration-300 flex items-center justify-center gap-2.5 group tracking-wider uppercase border border-emerald-400"
            >
              <span>{t.hero.btnProjects}</span>
              <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center">
                <svg
                  className="w-4 h-4 transform group-hover:animate-arrow-slide"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>

            {/* Secondary CTA: Descargar CV */}
            <a
              href="/CV_Josue_Garcia.pdf"
              download="CV_Josue_Garcia.pdf"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 font-bold hover:bg-emerald-500 hover:text-background transition-all duration-300 flex items-center justify-center gap-2 tracking-wider uppercase"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{t.hero.btnCv}</span>
            </a>

            {/* Tertiary CTA: Contactarme */}
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-border bg-card/40 text-foreground font-bold hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300 text-center tracking-wider uppercase"
            >
              {t.hero.btnContact}
            </a>
          </div>

        </div>
      </div>

      {/* Smooth Fade Transition Effect between Hero & Experience */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none z-20" />

      {/* Scroll Down Indicator */}
      <div className="relative z-30 flex flex-col items-center pb-2 font-mono">
        <a
          href="#experience"
          className="flex flex-col items-center gap-1 text-muted/60 hover:text-emerald-400 transition-colors group"
          aria-label="Scroll to Professional Experience"
        >
          <span className="text-[10px] tracking-widest uppercase opacity-80 group-hover:opacity-100">
            Scroll
          </span>
          <div className="w-5 h-7 rounded-sm border border-muted/30 group-hover:border-emerald-400/50 flex justify-center p-1 transition-colors">
            <div className="w-1 h-2 rounded-sm bg-emerald-400 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
