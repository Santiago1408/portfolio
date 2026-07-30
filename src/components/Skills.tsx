"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    skills: ["Angular", "Next.js", "React", "React Native", "Expo", "Ionic"],
  },
  {
    title: "Backend",
    skills: ["Python", "Express", "Flask"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL"],
  },
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "C++", "Java"],
  },
];

const allSkills = [
  { name: "Angular", level: 80 },
  { name: "Next.js", level: 70 },
  { name: "React", level: 75 },
  { name: "React Native", level: 70 },
  { name: "Expo", level: 65 },
  { name: "Ionic", level: 60 },
  { name: "Python", level: 75 },
  { name: "Express", level: 55 },
  { name: "Flask", level: 50 },
  { name: "PostgreSQL", level: 60 },
  { name: "C++", level: 65 },
  { name: "Java", level: 60 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const barsRef = useRef<HTMLDivElement[]>([]);

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
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });

      barsRef.current.forEach((bar) => {
        const width = bar.dataset.width;
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: width,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar.closest(".skill-bar-group"),
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
      id="skills"
      className="section-padding bg-card/50"
    >
      <div className="max-w-content">
        <div ref={titleRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Skills &amp; <span className="text-accent">Tech Stack</span>
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-12" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              ref={(el) => { cardsRef.current[i] = el!; }}
              className="p-6 rounded-2xl border border-border bg-background"
            >
              <h3 className="font-semibold text-accent mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs rounded-full border border-border text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 skill-bar-group">
          {allSkills.map((skill, i) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground">{skill.name}</span>
                <span className="text-muted">{skill.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-border overflow-hidden">
                <div
                  ref={(el) => { barsRef.current[i] = el!; }}
                  data-width={`${skill.level}%`}
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-dim"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
