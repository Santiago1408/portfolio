"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
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
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const s = t.skills;

  const techCategories = [
    {
      title: s.c1,
      skills: ["Angular", "TypeScript", "JavaScript", "Ionic", "Next.js", "React", "React Native", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: s.c2,
      skills: ["Standalone Components", "Reactive Forms", "Custom Pipes", "Component Architecture", "Responsive Design", "Interfaces", "Enums", "Generics", "Custom Types"],
    },
    {
      title: s.c3,
      skills: ["Express", "Flask", "Django", "PostgreSQL", "MySQL", "REST APIs"],
    },
    {
      title: s.c4,
      skills: ["Git", "GitHub", "Jira", "Postman", "Google Cloud", "JWT", "QA Testing", "Bug Fixing", "Version Control", "Kanban"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding font-[family-name:var(--font-chakra)]"
    >
      <div className="max-w-content mx-auto">
        <div ref={titleRef} className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-rajdhani)] uppercase tracking-wide">
            {s.titleFirst} <span className="text-emerald-400">{s.titleLast}</span>
          </h2>
          <div className="w-16 h-1 bg-emerald-500 rounded-none mt-2" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {techCategories.map((cat, i) => (
            <div
              key={cat.title}
              ref={(el) => { cardsRef.current[i] = el!; }}
              className="p-6 rounded-sm border border-border bg-card/60 hover:border-emerald-500/40 transition-colors"
            >
              <h3 className="font-bold text-emerald-400 font-[family-name:var(--font-rajdhani)] text-xl sm:text-2xl uppercase tracking-wider mb-4 border-b border-border/80 pb-2">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm rounded-sm border font-mono transition-colors ${
                      ["Angular", "TypeScript", "Ionic"].includes(skill)
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-semibold"
                        : "border-border bg-background text-muted hover:text-foreground"
                    }`}
                  >
                    {skill}
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
