"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
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

  const ed = t.education;

  return (
    <section
      ref={sectionRef}
      id="education"
      className="section-padding bg-card/40 border-y border-border/50 font-[family-name:var(--font-chakra)]"
    >
      <div className="max-w-content mx-auto">
        
        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-rajdhani)] uppercase tracking-wide">
            {ed.titleFirst} <span className="text-emerald-400">{ed.titleLast}</span>
          </h2>
          <div className="w-16 h-1 bg-emerald-500 rounded-none mt-2" />
        </div>

        <div ref={contentRef} className="grid md:grid-cols-3 gap-8">
          
          {/* Column 1: Formación Académica */}
          <div className="p-6 rounded-sm border border-border bg-background/90 space-y-5">
            <h3 className="font-bold text-emerald-400 font-[family-name:var(--font-rajdhani)] text-2xl uppercase tracking-wider border-b border-border pb-2">
              {ed.eduTitle}
            </h3>
            
            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500 pl-3">
                <h4 className="font-bold text-foreground text-lg">{ed.umss}</h4>
                <p className="text-base text-emerald-400 font-mono font-semibold">{ed.umssDegree}</p>
                <p className="text-xs sm:text-sm text-muted font-mono mt-0.5">{ed.umssDetail}</p>
              </div>

              <div className="border-l-2 border-border pl-3">
                <h4 className="font-bold text-foreground text-lg">{ed.jala}</h4>
                <p className="text-xs sm:text-sm text-muted font-mono">{ed.jalaDetail}</p>
              </div>
            </div>
          </div>

          {/* Column 2: Certificaciones */}
          <div className="p-6 rounded-sm border border-border bg-background/90 space-y-5">
            <h3 className="font-bold text-emerald-400 font-[family-name:var(--font-rajdhani)] text-2xl uppercase tracking-wider border-b border-border pb-2">
              {ed.certTitle}
            </h3>
            
            <div className="space-y-4 font-mono text-xs sm:text-sm text-muted">
              <div>
                <p className="font-bold text-foreground text-base font-sans">{ed.cisco}</p>
                <p className="text-emerald-400 font-medium">• CCNA 1 – Introduction to Networks</p>
                <p className="text-emerald-400 font-medium">• Switching, Routing and Wireless Essentials</p>
              </div>

              <div className="pt-2 border-t border-border/60">
                <p className="font-bold text-foreground text-base font-sans">{ed.cba}</p>
                <p>• {ed.cbaDetail}</p>
              </div>

              <div className="pt-2 border-t border-border/60">
                <p className="font-bold text-foreground text-base font-sans">{ed.scesi}</p>
                <p>• Mantenimiento de Computadoras</p>
                <p>• Encaminamiento de Redes con Packet Tracer</p>
              </div>
            </div>
          </div>

          {/* Column 3: Idiomas */}
          <div className="p-6 rounded-sm border border-border bg-background/90 space-y-5">
            <h3 className="font-bold text-emerald-400 font-[family-name:var(--font-rajdhani)] text-2xl uppercase tracking-wider border-b border-border pb-2">
              {ed.langTitle}
            </h3>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-sm border border-border bg-card">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-foreground text-base">{ed.esLabel}</span>
                  <span className="text-emerald-400 font-mono text-xs sm:text-sm font-bold">{ed.esLevel}</span>
                </div>
                <p className="text-muted text-sm">{ed.esDesc}</p>
              </div>

              <div className="p-4 rounded-sm border border-emerald-500/30 bg-emerald-950/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-foreground text-base">{ed.enLabel}</span>
                  <span className="text-emerald-400 font-mono text-xs sm:text-sm font-bold">{ed.enLevel}</span>
                </div>
                <p className="text-muted text-sm leading-relaxed">
                  {ed.enDesc}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
