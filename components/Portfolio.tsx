"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

const categories = ["Tất cả", "Interview", "Social Video", "TVC", "MV", "Event", "Campaign"];

// Static demo data (will be replaced by API data when DB is populated)
const portfolioItems = [
  { id: 1, title: "Samsung Galaxy Campaign", category: "Campaign", client: "Samsung", year: 2025, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80", featured: true },
  { id: 2, title: "Yeah1 Music Interview Series", category: "Interview", client: "Yeah1", year: 2024, image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80", featured: true },
  { id: 3, title: "BYD Launch Event", category: "Event", client: "BYD", year: 2025, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80", featured: false },
  { id: 4, title: "V.Rohto TVC Production", category: "TVC", client: "V.Rohto", year: 2024, image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80", featured: true },
  { id: 5, title: "Golden Music MV", category: "MV", client: "Golden", year: 2024, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80", featured: false },
  { id: 6, title: "Yamaha Social Video", category: "Social Video", client: "Yamaha", year: 2025, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", featured: false },
];

export default function Portfolio() {
  const [active, setActive] = useState("Tất cả");
  const [selected, setSelected] = useState<(typeof portfolioItems)[0] | null>(null);

  const filtered = active === "Tất cả" ? portfolioItems : portfolioItems.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-32 bg-white relative text-joyful-black">
      {/* Subtle Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.p
              className="text-yellow-600 tracking-[0.2em] text-sm font-bold uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Selected Works
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-jakarta font-black leading-tight text-joyful-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Dự án tiêu biểu
            </motion.h2>
          </div>

          {/* Minimalist text underline filter */}
          <motion.div
            className="flex flex-wrap gap-x-8 gap-y-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`Relative pb-1 text-sm font-bold transition-colors duration-300 ${
                  active === cat ? "text-joyful-black border-b-2 border-joyful-yellow" : "text-gray-400 hover:text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setSelected(item)}
            >
              {/* Image Frame */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-black/5 relative mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                
                {item.featured && (
                  <div className="absolute top-4 left-4 bg-joyful-yellow text-joyful-black text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full shadow-md shadow-yellow-500/20">
                    Featured
                  </div>
                )}
                
                {/* Hover Overlay Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <ArrowUpRight className="w-5 h-5 text-joyful-black" />
                </div>
              </div>

              {/* Text Info (Outside minimal) */}
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-joyful-black group-hover:text-yellow-600 transition-colors">{item.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <span className="text-gray-600">{item.client}</span>
                  <span>•</span>
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>{item.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selected && (
          <div
            className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl relative"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gray-50">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-contain" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4 text-xs font-black tracking-widest uppercase">
                  <span className="text-yellow-600">{selected.category}</span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-500">{selected.year}</span>
                </div>
                <h3 className="text-3xl font-black text-joyful-black mb-2">{selected.title}</h3>
                <p className="text-gray-600 font-medium text-lg">Client: {selected.client}</p>
                <button
                  className="mt-8 px-6 py-2.5 rounded-full border-2 border-joyful-black text-joyful-black font-bold hover:bg-gray-50 transition-colors"
                  onClick={() => setSelected(null)}
                >
                  Đóng
                </button>
              </div>

              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-joyful-black transition-colors shadow-lg"
                onClick={() => setSelected(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
