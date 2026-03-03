"use client";
import { motion } from "framer-motion";

const clients = [
  { name: "SAMSUNG", logo: "" },
  { name: "YEAH1", logo: "" },
  { name: "BYD", logo: "" },
  { name: "YAMAHA", logo: "" },
  { name: "V.ROHTO", logo: "" },
  { name: "GOLDEN", logo: "" },
  { name: "CHEIL", logo: "" },
  { name: "VIETTEL", logo: "" },
  { name: "SHOPEE", logo: "" },
];

// Duplicate for seamless loop
const allClients = [...clients, ...clients, ...clients, ...clients];

export default function Clients() {
  return (
    <section id="khach-hang" className="py-24 bg-gray-50 text-joyful-black overflow-hidden relative border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        {/* Header */}
        <div className="text-center">
          <motion.p
            className="text-gray-400 tracking-[0.2em] text-sm font-bold uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trusted by the best
          </motion.p>
        </div>
      </div>

      {/* Marquee logos */}
      <div className="relative overflow-hidden py-10">
        {/* Gradients for smooth fade on edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-16 animate-marquee w-max">
          {allClients.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-none flex items-center justify-center min-w-[120px] group cursor-default"
            >
              <span className="font-black text-3xl md:text-5xl tracking-tighter text-gray-300 group-hover:text-gray-600 transition-colors duration-500">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
