"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding"
    >
      <div ref={contentRef} className="max-w-content">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          About <span className="text-accent">Me</span>
        </h2>
        <div className="w-16 h-1 bg-accent rounded-full mb-8" />

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              I&apos;m a Systems Engineering student passionate about frontend
              development. I build responsive, accessible, and performant web
              and mobile applications using modern frameworks.
            </p>
            <p>
              My journey started with curiosity about how websites work, and
              evolved into a deep interest in UI/UX, component design, and
              crafting smooth user experiences. I&apos;m currently expanding
              my skills toward fullstack development.
            </p>
            <p>
              I enjoy working with React, Angular, and React Native, and I&apos;m
              always exploring new tools and technologies to improve my craft.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm">Systems Engineering</p>
                <p className="text-xs text-muted">Currently studying</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm">Frontend Focus</p>
                <p className="text-xs text-muted">React, Angular, Next.js</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm">Fullstack Aspiring</p>
                <p className="text-xs text-muted">Learning Node, Express, Flask</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
