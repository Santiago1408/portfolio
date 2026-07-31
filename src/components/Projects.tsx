"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
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

  const p = t.projects;

  const projectsList = [
    {
      title: p.p1Title,
      subtitle: p.p1Subtitle,
      description: p.p1Desc,
      tech: ["Angular", "TypeScript", "Component Architecture", "CSS3"],
      highlight: p.p1Badge,
    },
    {
      title: p.p2Title,
      subtitle: p.p2Subtitle,
      description: p.p2Desc,
      tech: ["React Native", "REST APIs", "Postman", "Offline Sync"],
      highlight: p.p2Badge,
    },
    {
      title: p.p3Title,
      subtitle: p.p3Subtitle,
      description: p.p3Desc,
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
      highlight: p.p3Badge,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding bg-card/30 font-[family-name:var(--font-chakra)]"
    >
      <div className="max-w-content mx-auto">
        <div ref={titleRef} className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-rajdhani)] uppercase tracking-wide">
            {p.titleFirst} <span className="text-emerald-400">{p.titleLast}</span>
          </h2>
          <div className="w-16 h-1 bg-emerald-500 rounded-none mt-2" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projectsList.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[i] = el!; }}
              className="group p-6 rounded-sm border border-border bg-background/90 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    {project.highlight}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-[family-name:var(--font-rajdhani)] text-foreground group-hover:text-emerald-400 transition-colors uppercase tracking-wide">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-400/80 font-mono mb-3 font-semibold">
                  {project.subtitle}
                </p>

                <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 font-mono text-xs sm:text-sm pt-4 border-t border-border/60">
                {project.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className="px-2.5 py-1 rounded-sm bg-card text-muted border border-border"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
