"use client";
import { motion } from "framer-motion";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { BackgroundGradientAnimation } from "./ui/GradientBg";
import GridGlobe from "./ui/GridGlobe";
import { AuroraText } from "./ui/AuroraText";
import { InteractiveGridPattern } from "./ui/InteractiveGridPattern";
import { RippleButton } from "./ui/RippleButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Dynamic Yellow Gradient Background */}
      <div className="absolute inset-0 z-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(255, 255, 255)"
          gradientBackgroundEnd="rgb(254, 252, 232)"
          firstColor="245, 197, 24"
          secondColor="250, 204, 21"
          thirdColor="253, 224, 71"
          fourthColor="254, 243, 199"
          fifthColor="255, 255, 255"
          pointerColor="245, 197, 24"
          interactive={true}
        />
      </div>

      {/* Interactive Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-40 pointer-events-none">
        <InteractiveGridPattern
          width={60}
          height={60}
          squares={[30, 30]}
          squaresClassName="hover:fill-yellow-500/20"
        />
      </div>

      {/* Subtle Grid Globe Overlay */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
        <GridGlobe />
      </div>

      {/* Radial fade for the content area */}
      <div className="absolute inset-0 bg-white/40 z-20 pointer-events-none" />

      <div className="relative z-30 max-w-5xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-xs md:text-sm font-black tracking-[0.3em] text-joyful-black/60 uppercase">
            Creative Media Agency Vietnam
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-jakarta font-black text-joyful-black mb-10 leading-[1.15]">
          <TextEffect per="word" preset="blur" delay={0.1}>
            Kiến Tạo Giải Pháp
          </TextEffect>
          <span className="text-yellow-500 block">
            <TextEffect per="word" preset="blur" delay={0.6}>
              Truyền Thông Đột Phá
            </TextEffect>
          </span>
        </h1>

        <motion.p
          className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <AuroraText className="font-black text-joyful-black">Joyful Media</AuroraText> – Nơi hội tụ các Celebrity, KOL/KOC và những chiến dịch Social đột phá. Đồng hành cùng sự phát triển của thương hiệu.
        </motion.p>
      </div>
    </section>
  );
}
