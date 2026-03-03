"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-joyful-yellow via-[#FDE68A] to-joyful-yellow text-joyful-black overflow-hidden relative border-t border-yellow-300">
      {/* Top CTA bar - Minimalist */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-4xl md:text-6xl font-jakarta font-black text-joyful-black mb-4 tracking-tight">
              Sẵn sàng tỏa sáng?
            </h3>
            <p className="text-gray-800 font-medium text-lg md:text-xl">
              Cùng JOYFUL MEDIA tạo nên chiến dịch tiếp theo của bạn.
            </p>
          </div>
          <a
            href="#lien-he"
            className="group flex-shrink-0 bg-joyful-black text-white font-bold px-8 py-5 rounded-full hover:bg-gray-900 transition-all duration-300 flex items-center gap-3 text-sm uppercase tracking-wider shadow-xl shadow-black/10"
          >
            Bắt đầu ngay
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div className="w-full h-px bg-yellow-600/10" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-full border border-joyful-black flex items-center justify-center font-black text-sm text-joyful-black transition-colors">
                J
              </div>
              <span className="font-black text-xl tracking-tight text-joyful-black">
                JOYFUL<span className="font-bold opacity-80">MEDIA</span>
              </span>
            </Link>
            <p className="text-gray-800 font-medium text-base leading-relaxed max-w-sm">
              Đơn vị hàng đầu về Celebrity Booking, KOL/KOC và Production House tại Việt Nam.
              Đồng hành cùng thương hiệu kiến tạo giá trị khác biệt.
            </p>

            {/* Social Minimalist */}
            <div className="flex gap-4 mt-8">
              {["FB", "IG", "TT", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-sm font-bold text-gray-800 hover:text-black transition-colors duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="border-b border-yellow-600/20 pb-4 mb-6 font-bold text-joyful-black tracking-wider text-sm uppercase">Khám phá</h4>
            <ul className="space-y-4 font-medium">
              {["Về chúng tôi", "Dịch vụ giải pháp", "Dự án tiêu biểu", "Đội ngũ chuyên gia"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-gray-800 hover:text-black text-base transition-colors duration-200">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="border-b border-yellow-600/20 pb-4 mb-6 font-bold text-joyful-black tracking-wider text-sm uppercase">Liên hệ</h4>
            <ul className="space-y-4 text-base text-gray-800 font-medium">
              <li className="hover:text-black transition-colors"><a href="mailto:contact@joyfulmedia.vn">contact@joyfulmedia.vn</a></li>
              <li>TP. Hồ Chí Minh</li>
              <li className="text-sm">T2–T7 · 8:00–18:00</li>
            </ul>

            <Link
              href="/admin/login"
              className="mt-10 inline-flex items-center gap-2 text-xs font-bold text-gray-800 hover:text-black transition-colors uppercase tracking-widest"
            >
              System Admin
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-gray-800">
          <p>
            © {currentYear} JOYFUL MEDIA. All rights reserved.
          </p>
          <div className="flex gap-8 font-bold">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
