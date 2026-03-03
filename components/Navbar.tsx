"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Về chúng tôi", href: "/#ve-chung-toi", sectionId: "ve-chung-toi" },
  { name: "Dịch vụ", href: "/#dich-vu", sectionId: "dich-vu" },
  { name: "Portfolio", href: "/#portfolio", sectionId: "portfolio" },
  { name: "Đội ngũ", href: "/#doi-ngu", sectionId: "doi-ngu" },
  { name: "Khách hàng", href: "/#khach-hang", sectionId: "khach-hang" },
  { name: "Liên hệ", href: "/#lien-he", sectionId: "lien-he" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const observersRef = useRef<IntersectionObserver[]>([]);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver (only on home page)
  useEffect(() => {
    if (!isHome) return;

    // Cleanup previous observers
    observersRef.current.forEach((obs) => obs.disconnect());
    observersRef.current = [];

    const sectionMap = new Map<string, number>();

    const updateActive = () => {
      // Pick the section with highest intersection ratio
      let best: string | null = null;
      let bestRatio = 0;
      sectionMap.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });
      setActiveSection(bestRatio > 0 ? best : null);
    };

    navLinks.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          sectionMap.set(sectionId, entry.intersectionRatio);
          updateActive();
        },
        { threshold: [0, 0.1, 0.25, 0.5], rootMargin: "-80px 0px -20% 0px" }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });

    return () => {
      observersRef.current.forEach((obs) => obs.disconnect());
      observersRef.current = [];
    };
  }, [isHome]);

  const isActive = (sectionId: string) => isHome && activeSection === sectionId;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-joyful-yellow rounded-full flex items-center justify-center font-black text-lg text-joyful-black group-hover:scale-110 transition-transform duration-200">
            J
          </div>
          <span className="font-black text-lg tracking-tight text-joyful-black">
            JOYFUL<span className="text-joyful-yellow">MEDIA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.sectionId);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 relative group ${
                  active ? "text-joyful-black" : "text-gray-500 hover:text-joyful-black"
                }`}
              >
                {link.name}
                {/* Underline bar: visible when active, appears on hover otherwise */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-joyful-yellow rounded-full transition-all duration-200 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
                {/* Active dot indicator */}
                {active && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-joyful-yellow rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="/#lien-he" className="btn-yellow text-sm px-6 py-2.5">
            Liên hệ ngay
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-joyful-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-joyful-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-joyful-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-gray-100 px-6 pb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => {
                const active = isActive(link.sectionId);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-base font-semibold py-2 border-b border-gray-50 flex items-center gap-2 transition-colors ${
                      active ? "text-joyful-black" : "text-gray-700 hover:text-joyful-black"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-joyful-yellow flex-shrink-0" />}
                    {link.name}
                  </a>
                );
              })}
              <a href="/#lien-he" className="btn-yellow text-center mt-2">
                Liên hệ ngay
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
