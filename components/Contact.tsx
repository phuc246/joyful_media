"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { BackgroundGradientAnimation } from "./ui/GradientBg";
import { Particles } from "./ui/Particles";
import { RippleButton } from "./ui/RippleButton";

const serviceOptions = [
  "Celebrity Booking",
  "KOL/KOC Booking",
  "Social Campaign Planning",
  "Strategic Seeding",
  "Production House",
  "Khác",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg(data.message);
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
        setMsg(data.error || "Có lỗi xảy ra");
      }
    } catch {
      setStatus("error");
      setMsg("Có lỗi kết nối, vui lòng thử lại");
    }
  };

  return (
    <section id="lien-he" className="py-24 md:py-32 relative overflow-hidden bg-white">
      {/* Background Effect */}
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
          interactive={false}
          containerClassName="opacity-40"
        />
      </div>

      <Particles
        className="absolute inset-0 z-0 pointer-events-none"
        quantity={150}
        staticity={30}
        color="#F5C518"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-joyful-black/50 tracking-[0.3em] text-xs font-black uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Contact Us
            </motion.p>
            <h2 className="text-5xl md:text-6xl font-jakarta font-black leading-[1.1] mb-8 text-joyful-black uppercase tracking-tighter">
              Bắt đầu <br />
              <span className="text-yellow-500">Hợp tác ngay</span>
            </h2>
            <p className="text-gray-600 text-lg font-medium leading-relaxed mb-12 max-w-lg">
              Đội ngũ Joyful Media luôn sẵn sàng đồng hành cùng thương hiệu của bạn để tạo nên những chiến dịch bùng nổ.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <MapPin className="w-5 h-5 text-yellow-600" />, label: "Văn phòng", value: "Q7, TP. Hồ Chí Minh" },
                { icon: <Mail className="w-5 h-5 text-yellow-600" />, label: "Email", value: "contact@joyfulmedia.vn" },
                { icon: <Phone className="w-5 h-5 text-yellow-600" />, label: "Điện thoại", value: "081 234 5678" },
                { icon: <Clock className="w-5 h-5 text-yellow-600" />, label: "Giờ làm việc", value: "8:00 - 18:00 (T2-T7)" },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-2xl bg-yellow-400 shadow-lg shadow-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase mb-0.5">{info.label}</p>
                    <p className="text-joyful-black font-black text-sm">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-yellow-500/10 rounded-[2.5rem] p-8 md:p-12 relative">
              
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="text-7xl mb-6">🤟</div>
                  <h3 className="text-3xl font-black text-joyful-black mb-4 uppercase tracking-tighter">Cảm ơn bạn!</h3>
                  <p className="text-gray-600 mb-8 font-medium">{msg}</p>
                  <button 
                    className="px-8 py-3 rounded-full bg-joyful-black text-white font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform" 
                    onClick={() => setStatus("idle")}
                  >
                    Gửi tin nhắn mới
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Tên của bạn</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Nguyễn Văn A"
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-joyful-black font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Email liên hệ</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="email@company.com"
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-joyful-black font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Số điện thoại</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="0xxx xxx xxx"
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-joyful-black font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Dịch vụ</label>
                        <select
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-joyful-black font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all appearance-none"
                        >
                          <option value="">Chọn dịch vụ...</option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Lời nhắn</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Bạn cần hỗ trợ gì?"
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-joyful-black font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 font-bold text-xs ml-2">{msg}</p>
                  )}

                  <div className="pt-2">
                    <RippleButton
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 bg-joyful-black text-white font-black uppercase tracking-widest text-sm shadow-2xl flex items-center gap-2"
                      rippleColor="rgba(255, 255, 255, 0.3)"
                    >
                      {status === "loading" ? "Đang gửi..." : "Gửi yêu cầu ngay"}
                    </RippleButton>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
