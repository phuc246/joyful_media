"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/MovingBorders";

// Tạm thời hardcode data, phần API có thể fetch thay thế sau
const services = [
  {
    id: 1,
    slug: "celebrity-booking",
    title: "Celebrity Booking",
    subtitle: "Kết nối nghệ sĩ hàng đầu",
    desc: "Booking diễn viên, ca sĩ, người nổi tiếng tham gia TVC, sự kiện, campaign. Mạng lưới rộng, thương lượng chuyên nghiệp, đảm bảo đúng hạn.",
  },
  {
    id: 2,
    slug: "kol-koc-booking",
    title: "KOL/KOC Booking",
    subtitle: "Social Outreach",
    desc: "Tuyển chọn KOL/KOC phù hợp với từng thương hiệu, lên kế hoạch seeding, triển khai đa nền tảng TikTok, Instagram, Facebook, YouTube.",
  },
  {
    id: 3,
    slug: "social-campaign",
    title: "Social Campaign",
    subtitle: "Chiến lược truyền thông",
    desc: "Lập kế hoạch chiến dịch toàn diện cho các dự án giải trí – từ concept, timeline đến execution và báo cáo hiệu quả.",
  },
  {
    id: 4,
    slug: "strategic-seeding",
    title: "Strategic Seeding",
    subtitle: "Online Buzz Management",
    desc: "Quản lý viral content, tạo buzz trên mạng xã hội, điều phối cộng đồng KOL để tối đa hóa độ nhận diện thương hiệu.",
  },
  {
    id: 5,
    slug: "production-house",
    title: "Production House",
    subtitle: "Sản xuất nội dung",
    desc: "Sản xuất TVC, MV ngắn, viral clip, content marketing đa định dạng. Đội ngũ sáng tạo chuyên nghiệp, thiết bị hiện đại.",
  },
];

export default function Services() {
  return (
    <section id="dich-vu" className="py-32 bg-gray-50 relative overflow-hidden text-joyful-black">
      {/* Subtle Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Minimal */}
        <div className="mb-20">
          <motion.p
            className="text-yellow-600 tracking-[0.2em] text-sm font-bold uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Services
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-jakarta font-black leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Giải pháp truyền thông
            <span className="block text-gray-500 font-bold mt-2">Toàn diện từ A–Z</span>
          </motion.h2>
        </div>

        {/* Services List - Minimalist Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <Link href={`/services/${service.slug}`} className="block h-full cursor-pointer">
                <Button
                  duration={Math.floor(Math.random() * 5000) + 5000}
                  borderRadius="1rem"
                  className="bg-white group hover:shadow-xl hover:shadow-yellow-100 p-8 flex flex-col items-start transition-all duration-300 text-left border border-gray-100"
                  containerClassName="h-full w-full"
                >
                  <div className="flex-1 w-full relative z-10">
                    <h3 className="text-2xl font-black text-joyful-black mb-2 group-hover:text-yellow-600 transition-colors">{service.title}</h3>
                    <p className="text-gray-500 text-sm font-bold mb-6">{service.subtitle}</p>
                    <p className="text-gray-600 text-base leading-relaxed">{service.desc}</p>
                  </div>

                  {/* Arrow link */}
                  <div className="mt-8 pt-6 border-t border-gray-100 w-full flex items-center justify-start text-sm font-bold text-gray-400 group-hover:text-yellow-600 transition-colors relative z-10">
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>
              </Link>
            </motion.div>
          ))}

          {/* CTA Info card */}
          <motion.div
            className="h-full bg-gradient-to-br from-joyful-yellow/10 to-transparent border border-joyful-yellow/30 rounded-2xl p-8 flex flex-col justify-center items-start transition-colors hover:border-joyful-yellow/50 hover:shadow-lg hover:shadow-yellow-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-xl font-black text-joyful-black mb-3">Chưa rõ giải pháp nào phù hợp?</h3>
            <p className="text-gray-600 text-base leading-relaxed mb-8 font-medium">
              Nhận tư vấn trực tiếp từ chuyên gia để thiết kế chiến dịch tối ưu nhất.
            </p>
            <a href="#lien-he" className="flex items-center text-yellow-600 font-bold hover:text-yellow-700 transition-colors">
              Liên hệ ngay
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
