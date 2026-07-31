"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

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

      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ph = t.philosophy;

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section-padding bg-card/20 font-[family-name:var(--font-chakra)]"
    >
      <div className="max-w-content mx-auto">
        
        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-rajdhani)] uppercase tracking-wide">
            {ph.titleFirst} <span className="text-emerald-400">{ph.titleLast}</span>
          </h2>
          <div className="w-16 h-1 bg-emerald-500 rounded-none mt-2" />
        </div>

        <div ref={contentRef} className="grid md:grid-cols-2 gap-8">
          
          {/* Section 1: Mi forma de trabajar */}
          <div className="p-6 sm:p-8 rounded-sm border border-border bg-background/90 space-y-5">
            <h3 className="font-bold text-emerald-400 font-[family-name:var(--font-rajdhani)] text-2xl uppercase tracking-wider border-b border-border pb-2">
              {ph.phTitle}
            </h3>
            
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              {ph.phDesc}
            </p>

            <h4 className="text-sm font-mono text-emerald-400 uppercase tracking-widest pt-2 font-bold">
              {ph.phSub}
            </h4>

            <ul className="space-y-2.5 text-sm sm:text-base font-mono text-muted">
              {ph.phItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Objetivos Profesionales */}
          <div className="p-6 sm:p-8 rounded-sm border border-emerald-500/30 bg-emerald-950/10 space-y-5">
            <h3 className="font-bold text-emerald-400 font-[family-name:var(--font-rajdhani)] text-2xl uppercase tracking-wider border-b border-emerald-500/30 pb-2">
              {ph.goalsTitle}
            </h3>
            
            <div className="space-y-4 text-base sm:text-lg text-muted leading-relaxed">
              <p>{ph.g1}</p>
              <p>{ph.g2}</p>

              <p className="pt-3 border-t border-emerald-500/20 text-sm sm:text-base font-mono text-muted/90">
                <strong className="text-foreground">{ph.gVisionTitle}</strong> {ph.gVisionDesc}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
