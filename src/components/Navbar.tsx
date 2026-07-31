"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.education, href: "#education" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border font-[family-name:var(--font-chakra)]"
    >
      <div className="max-w-content mx-auto flex items-center justify-between px-6 py-3.5">
        <a
          href="#"
          className="text-xl font-bold tracking-wider text-emerald-400 font-[family-name:var(--font-rajdhani)] uppercase"
        >
          Josue Garcia<span className="text-foreground">.dev</span>
        </a>

        {/* Desktop Links & Language Switcher */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => { linksRef.current[i] = el; }}
              href={link.href}
              className="text-muted hover:text-emerald-400 transition-colors py-1 px-2 rounded-sm hover:bg-emerald-500/10"
            >
              {link.label}
            </a>
          ))}

          {/* Language Switch Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1 rounded-sm border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 font-bold hover:bg-emerald-500 hover:text-background transition-all duration-300 ml-2"
            aria-label="Switch Language"
          >
            <span className={language === "es" ? "text-emerald-400 font-extrabold" : "opacity-60"}>ES</span>
            <span className="opacity-40">/</span>
            <span className={language === "en" ? "text-emerald-400 font-extrabold" : "opacity-60"}>EN</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-sm border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold"
          >
            {language === "es" ? "EN" : "ES"}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground p-1.5 rounded-sm border border-border"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Links Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md">
          <div className="flex flex-col px-6 py-4 gap-3 font-mono text-sm uppercase">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleClick}
                className="text-muted hover:text-emerald-400 transition-colors py-1.5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
