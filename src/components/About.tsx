"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const a = t.about;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding font-[family-name:var(--font-chakra)]"
    >
      <div ref={contentRef} className="max-w-content mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-rajdhani)] uppercase tracking-wide">
            {a.titleFirst} <span className="text-emerald-400">{a.titleLast}</span>
          </h2>
          <div className="w-16 h-1 bg-emerald-500 rounded-none mt-2 mb-8" />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Narrative text (8 cols) */}
          <div className="lg:col-span-8 space-y-4 text-base sm:text-lg text-muted leading-relaxed">
            <p>{a.p1}</p>
            <p>{a.p2}</p>

            {/* Expandable Extra Paragraphs */}
            {isExpanded && (
              <div className="space-y-4 animate-fadeIn">
                <p>{a.p3}</p>
                <p>{a.p4}</p>
                <p>{a.p5}</p>
                <p>{a.p6}</p>
              </div>
            )}

            {/* Expand Button */}
            <div className="pt-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-5 py-2 rounded-sm border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 font-mono text-xs sm:text-sm font-bold hover:bg-emerald-500 hover:text-background transition-all duration-300 flex items-center gap-2 uppercase tracking-wider"
              >
                <span>{isExpanded ? t.common.btnShowLess : t.common.btnShowMore}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : "rotate-0"
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

          {/* Quick Facts Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Quick photo preview */}
            <div className="relative w-full h-80 rounded-sm overflow-hidden border border-border group">
              <Image
                src="/profile.jpeg"
                alt="Josue Garcia"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>

            {/* Quick Data Grid (No // in title) */}
            <div className="p-5 rounded-sm border border-border bg-card/60 space-y-4 font-mono text-xs sm:text-sm">
              <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-sm border-b border-border pb-2">
                {a.quickFacts}
              </h3>

              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{a.locValue}</p>
                  <p className="text-xs text-muted">{a.locLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{a.eduValue}</p>
                  <p className="text-xs text-muted">{a.eduLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{a.devValue}</p>
                  <p className="text-xs text-muted">{a.devLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{a.langValue}</p>
                  <p className="text-xs text-muted">{a.langLabel}</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
