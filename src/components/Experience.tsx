"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Frontend Developer (Student)",
    company: "Self-Taught Projects",
    period: "2024 — Present",
    description:
      "Building mobile and web applications using React Native, Angular, and Next.js. Focused on clean UI, performance, and real-world functionality.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

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

      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-padding bg-card/50"
    >
      <div className="max-w-content">
        <div ref={titleRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-accent">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-12" />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el!; }}
              className="relative pl-8 border-l-2 border-border"
            >
              <div className="absolute left-[-7px] top-0 w-3 h-3 rounded-full bg-accent" />
              <span className="text-xs text-accent font-mono">{exp.period}</span>
              <h3 className="text-lg font-semibold mt-1">{exp.role}</h3>
              <p className="text-sm text-muted">{exp.company}</p>
              <p className="text-sm text-muted leading-relaxed mt-2">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
