import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "joyful-yellow": "#F5C518",
        "joyful-yellow-light": "#FEF08A",
        "joyful-yellow-dark": "#D4A017",
        "joyful-black": "#05050A", // Elegant dark background
        "joyful-white": "#F8FAFC",
        "joyful-gray": "#1E293B", // Sleek dark gray for cards
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-reverse": "marquee var(--duration) linear infinite reverse",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        aurora: "aurora 10s linear infinite",
        rippling: "rippling var(--duration) ease-out",
        "marquee-vertical-reverse": "marquee-vertical var(--duration) linear infinite reverse",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        rippling: {
          "0%": { opacity: "1", transform: "scale(0)" },
          "100%": { opacity: "0", transform: "scale(4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "yellow-gradient": "linear-gradient(135deg, #F5C518, #D4A017)",
        "hero-pattern":
          "linear-gradient(rgba(245,197,24,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.1) 1px, transparent 1px)",
      },
      boxShadow: {
        yellow: "0 8px 30px rgba(245, 197, 24, 0.3)",
        "yellow-lg": "0 20px 60px rgba(245, 197, 24, 0.2)",
        card: "0 4px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.10)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
