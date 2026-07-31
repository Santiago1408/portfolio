"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
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

      linksRef.current.forEach((link) => {
        gsap.fromTo(
          link,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: link,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const c = t.contact;

  const links = [
    {
      label: "WhatsApp",
      value: "+591 69435058",
      url: "https://wa.me/59169435058",
      icon: (
        <svg className="w-6 h-6 text-emerald-400 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.277.44-1.157 4.227 4.316-1.131.307.231z"/>
        </svg>
      ),
    },
    {
      label: c.sendEmail,
      value: "josueg4rcia@gmail.com",
      url: "mailto:josueg4rcia@gmail.com",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "josue-santiago-garcia-gamez",
      url: "https://www.linkedin.com/in/josue-santiago-garcia-gamez-b90982340/",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/Santiago1408",
      url: "https://github.com/Santiago1408",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding font-[family-name:var(--font-chakra)]"
    >
      <div className="max-w-content mx-auto text-center">
        <div ref={titleRef}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-mono text-sm font-semibold uppercase tracking-wider mb-3">
            {c.loc}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-2 font-[family-name:var(--font-rajdhani)] uppercase tracking-wide">
            {c.titleFirst} <span className="text-emerald-400">{c.titleLast}</span>
          </h2>
          <div className="w-16 h-1 bg-emerald-500 rounded-none mb-4 mx-auto" />
          <p className="text-base sm:text-lg text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            {c.desc}
          </p>
        </div>

        {/* Contact Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {links.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => { linksRef.current[i] = el!; }}
              href={link.url}
              target={link.url.startsWith("mailto") ? undefined : "_blank"}
              rel={link.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="flex flex-col items-center p-6 rounded-sm border border-border bg-card/60 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-muted hover:text-foreground transition-all duration-300 group"
            >
              <div className="p-3.5 rounded-sm border border-emerald-500/30 bg-emerald-500/10 mb-3 group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
              <span className="text-sm font-mono text-emerald-400 uppercase font-semibold mb-1">
                {link.label}
              </span>
              <span className="text-xs sm:text-sm text-muted truncate max-w-full font-mono">
                {link.value}
              </span>
            </a>
          ))}
        </div>

        {/* Footer info */}
        <p className="mt-16 text-xs sm:text-sm text-muted font-mono">
          &copy; {new Date().getFullYear()} Josue Garcia. Frontend Developer • Cochabamba, Bolivia.
        </p>
      </div>
    </section>
  );
}
