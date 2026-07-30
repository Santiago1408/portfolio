"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "CASA MUESTREOS",
    description:
      "A mobile app for filling forms offline with automatic upload when connectivity is restored. Built for field data collection.",
    tech: ["React Native", "Expo", "Free Maps"],
  },
  {
    title: "Sirvimos Delivery",
    description:
      "A restaurant delivery management app that handles receiving, accepting, delivering, and monitoring orders. Features document upload registration and login.",
    tech: ["Ionic"],
  },
  {
    title: "Sirvimos",
    description:
      "A web application that lets restaurants create custom websites by composing customizable components, building unique pages effortlessly.",
    tech: ["Angular"],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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
          { y: 60, opacity: 0 },
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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding"
    >
      <div className="max-w-content">
        <div ref={titleRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-12" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[i] = el!; }}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs rounded-full bg-accent/10 text-accent"
                  >
                    {t}
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
