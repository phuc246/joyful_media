"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Star, Zap, Target, Handshake } from "lucide-react";
import { Button } from "./ui/MovingBorders";
import { BackgroundGradientAnimation } from "./ui/GradientBg";
import { AuroraText } from "./ui/AuroraText";

const stats = [
  { label: "Năm hoạt động", value: 5, suffix: "+" },
  { label: "Dự án thành công", value: 200, suffix: "+" },
  { label: "Thương hiệu đối tác", value: 50, suffix: "+" },
  { label: "KOL trong mạng lưới", value: 500, suffix: "+" },
];

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, end, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, end]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const strengths = [
  { icon: <Star className="w-8 h-8 text-yellow-500 fill-yellow-500/20" />, title: "Mạng lưới rộng lớn", desc: "Kết nối hàng trăm Celebrity, KOL/KOC hàng đầu Việt Nam" },
  { icon: <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500/20" />, title: "Tốc độ triển khai", desc: "Quy trình tối ưu, cam kết deadline, xử lý nhanh" },
  { icon: <Target className="w-8 h-8 text-red-500" />, title: "Chiến lược chính xác", desc: "Data-driven, đo lường ROI minh bạch cho từng chiến dịch" },
  { icon: <Handshake className="w-8 h-8 text-yellow-600" />, title: "Đồng hành lâu dài", desc: "Xây dựng quan hệ đối tác bền vững, không chỉ giao dịch" },
];

export default function About() {
  return (
    <section id="ve-chung-toi" className="py-24 md:py-32 bg-white overflow-hidden relative">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Unique Mission Header with Gradient Background Overlay */}
        <div className="relative mb-24 rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <BackgroundGradientAnimation 
              gradientBackgroundStart="rgb(255, 255, 255)"
              gradientBackgroundEnd="rgb(254, 252, 232)"
              firstColor="245, 197, 24"
              secondColor="250, 204, 21"
              pointerColor="255, 255, 255"
              interactive={false}
            />
          </div>
          
          <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row gap-16 items-center">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-black leading-[1.15] text-joyful-black uppercase">
                Sứ mệnh <br />
                <AuroraText className="text-yellow-500 italic drop-shadow-sm">JOYFUL MEDIA</AuroraText>
              </h2>
              <div className="w-24 h-2 bg-yellow-500 mt-8 rounded-full" />
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl text-joyful-black font-bold leading-tight mb-6">
                Kiến tạo giá trị thực qua những chiến dịch "chạm" tới cảm xúc khách hàng.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Chúng tôi không chỉ booking, chúng tôi xây dựng <strong className="text-joyful-black">quan hệ đồng hành</strong>. Mỗi chiến dịch là một câu chuyện độc bản, giúp thương hiệu khẳng định vị thế trên thị trường.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats - Redesigned to be "Unique & Bright" */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <Button
                duration={Math.floor(Math.random() * 5000) + 5000}
                borderRadius="2.5rem"
                className="bg-white/40 backdrop-blur-md border border-white flex flex-col items-center justify-center p-10 text-center group"
                containerClassName="h-full w-full shadow-[0_20px_50px_rgba(245,197,24,0.08)] hover:shadow-[0_20px_50px_rgba(245,197,24,0.15)] transition-all"
              >
                <div className="relative z-10">
                  <div className="text-6xl md:text-7xl font-black text-joyful-black mb-2 group-hover:scale-110 transition-transform duration-500">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-400 font-black uppercase tracking-[0.3em]">
                    {stat.label}
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Strengths grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-white/50 backdrop-blur-sm border-2 border-gray-50 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <div className="mb-8 w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-yellow-100 transition-all">
                {item.icon}
              </div>
              <h3 className="font-black text-xl text-joyful-black mb-4 uppercase tracking-tight">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
