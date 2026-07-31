"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { t } = useLanguage();

  const [isE1Expanded, setIsE1Expanded] = useState(false);
  const [isE2Expanded, setIsE2Expanded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      cardsRef.current.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const e = t.experience;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-padding bg-card/40 border-y border-border/50 font-[family-name:var(--font-chakra)] relative z-10"
    >
      <div className="max-w-content mx-auto">
        
        {/* Section Header */}
        <div ref={titleRef} className="mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide font-[family-name:var(--font-rajdhani)] uppercase">
            {e.titleFirst} <span className="text-emerald-400">{e.titleLast}</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-500 rounded-none mt-3" />
        </div>

        {/* Experience Cards */}
        <div className="space-y-12">
          
          {/* EXPERIENCE 1: WatchEye AB */}
          <div
            ref={(el) => { cardsRef.current[0] = el!; }}
            className="p-6 sm:p-8 rounded-sm border border-border bg-background/90 shadow-xl relative transition-all duration-300 hover:border-emerald-500/50"
          >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-border">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-[family-name:var(--font-rajdhani)] uppercase tracking-wide">
                    {e.e1.company}
                  </h3>
                  <span className="text-xs sm:text-sm font-mono px-2.5 py-1 rounded-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {e.e1.country}
                  </span>
                </div>
                <p className="text-lg sm:text-xl text-emerald-400 font-semibold mt-1">
                  {e.e1.position}
                </p>
              </div>
              <div className="text-left md:text-right font-mono text-xs sm:text-sm text-muted space-y-1">
                <p className="text-foreground font-semibold">{e.e1.duration}</p>
                <p>{e.e1.team}</p>
                <p>{e.e1.management}</p>
              </div>
            </div>

            {/* Main Intro Narrative */}
            <div className="mt-6 text-base sm:text-lg text-muted leading-relaxed space-y-3">
              <p>{e.e1.p1}</p>
              <p>{e.e1.p2}</p>
            </div>

            {/* Expandable Details Section */}
            {isE1Expanded && (
              <div className="mt-8 pt-6 border-t border-border/80 space-y-8 animate-fadeIn">
                
                {/* Responsibilities Grid */}
                <div>
                  <h4 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4 font-bold">
                    {e.e1.respTitle}
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3 text-sm sm:text-base text-muted font-mono">
                    {e.e1.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-bold shrink-0">&gt;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sub-Projects within WatchEye */}
                <div>
                  <h4 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4 font-bold">
                    {e.e1.projectsTitle}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Featured Project: Sirvimos */}
                    <div className="p-5 rounded-sm border border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/60 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-foreground font-[family-name:var(--font-rajdhani)] text-xl">
                          {e.e1.sirvimosTitle}
                        </h5>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-300 font-bold">
                          {e.e1.sirvimosBadge}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-muted leading-relaxed mb-3">
                        {e.e1.sirvimosDesc}
                      </p>
                      <p className="text-xs sm:text-sm text-muted/90 italic">
                        {e.e1.sirvimosRole}
                      </p>
                    </div>

                    {/* Confidential Project: Delivery Mobile App */}
                    <div className="p-5 rounded-sm border border-border bg-card/60 hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-foreground font-[family-name:var(--font-rajdhani)] text-xl">
                          {e.e1.deliveryTitle}
                        </h5>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-sm bg-amber-500/20 text-amber-300 font-bold">
                          {e.e1.deliveryBadge}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-muted leading-relaxed mb-3">
                        {e.e1.deliveryDesc}
                      </p>
                      <p className="text-xs sm:text-sm text-muted/90 italic">
                        {e.e1.deliveryRole}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Technologies Badges */}
                <div className="flex flex-wrap gap-2 font-mono text-xs sm:text-sm">
                  {["Angular", "TypeScript", "Ionic", "Next.js", "Framer Motion", "HTML", "CSS", "REST APIs", "Git", "GitHub", "Jira"].map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-sm border border-border bg-card text-muted">
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            )}

            {/* Expand / Collapse Button */}
            <div className="mt-6 pt-4 border-t border-border/50 flex justify-center">
              <button
                onClick={() => setIsE1Expanded(!isE1Expanded)}
                className="px-6 py-2 rounded-sm border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 font-mono text-xs sm:text-sm font-bold hover:bg-emerald-500 hover:text-background transition-all duration-300 flex items-center gap-2 uppercase tracking-wider"
              >
                <span>{isE1Expanded ? t.common.btnShowLess : t.common.btnShowMore}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    isE1Expanded ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

          </div>

          {/* EXPERIENCE 2: DTIC - UMSS */}
          <div
            ref={(el) => { cardsRef.current[1] = el!; }}
            className="p-6 sm:p-8 rounded-sm border border-border bg-background/90 shadow-xl relative transition-all duration-300 hover:border-emerald-500/50"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-border">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-[family-name:var(--font-rajdhani)] uppercase tracking-wide">
                  {e.e2.company}
                </h3>
                <p className="text-lg sm:text-xl text-emerald-400 font-semibold mt-1">
                  {e.e2.position}
                </p>
              </div>
              <div className="font-mono text-xs sm:text-sm text-muted">
                <p className="text-foreground font-semibold">{e.e2.duration}</p>
                <p>{e.e2.location}</p>
              </div>
            </div>

            <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed">
              {e.e2.desc}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs sm:text-sm">
              {["React Native", "REST APIs", "Postman", "Offline Sync"].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-sm border border-border bg-card text-muted">
                  {tech}
                </span>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
