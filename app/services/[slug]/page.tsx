import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

// For demo purposes, we provide fallback data if DB is empty
const fallbackServices = {
  "celebrity-booking": {
    title: "Celebrity Booking",
    subtitle: "Kết nối nghệ sĩ hàng đầu",
    description: "Booking diễn viên, ca sĩ, người nổi tiếng tham gia TVC, sự kiện, campaign. Mạng lưới rộng, thương lượng chuyên nghiệp, đảm bảo đúng hạn.",
  },
  "kol-koc-booking": {
    title: "KOL/KOC Booking",
    subtitle: "Social Outreach",
    description: "Tuyển chọn KOL/KOC phù hợp với từng thương hiệu, lên kế hoạch seeding, triển khai đa nền tảng TikTok, Instagram, Facebook, YouTube.",
  },
  "social-campaign": {
    title: "Social Campaign",
    subtitle: "Chiến lược truyền thông",
    description: "Lập kế hoạch chiến dịch toàn diện cho các dự án giải trí – từ concept, timeline đến execution và báo cáo hiệu quả.",
  },
  "strategic-seeding": {
    title: "Strategic Seeding",
    subtitle: "Online Buzz Management",
    description: "Quản lý viral content, tạo buzz trên mạng xã hội, điều phối cộng đồng KOL để tối đa hóa độ nhận diện thương hiệu.",
  },
  "production-house": {
    title: "Production House",
    subtitle: "Sản xuất nội dung",
    description: "Sản xuất TVC, MV ngắn, viral clip, content marketing đa định dạng. Đội ngũ sáng tạo chuyên nghiệp, thiết bị hiện đại.",
  },
};

export default async function ServicePage({ params }: { params: { slug: string } }) {
  // Attempt to fetch from DB
  let service = await prisma.service.findUnique({
    where: { slug: params.slug },
  });

  // Fallback to static data if not found in DB (for demo purposes)
  if (!service && fallbackServices[params.slug as keyof typeof fallbackServices]) {
    const fallback = fallbackServices[params.slug as keyof typeof fallbackServices];
    service = {
      id: "fallback",
      slug: params.slug,
      title: fallback.title,
      subtitle: fallback.subtitle,
      description: fallback.description,
      iconSvg: null,
      imageUrl: null,
      imagePublicId: null,
      order: 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-joyful-black pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">

          {/* Back link */}
          <Link
            href="/#dich-vu"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-joyful-black mb-12 transition-colors text-sm font-semibold uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Quay lại danh sách
          </Link>

          {/* Optional image */}
          {service.imageUrl && (
            <div className="w-full aspect-video rounded-3xl overflow-hidden bg-gray-100 border border-gray-100 mb-12 shadow-sm">
              <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Header */}
          <div className="mb-16">
            {/* Chip */}
            <span className="inline-block bg-joyful-yellow/15 text-joyful-black border border-joyful-yellow/40 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5">
              SERVICES
            </span>

            <p className="text-joyful-yellow tracking-[0.2em] text-sm font-bold uppercase mb-3">
              {service.subtitle || "Dịch vụ truyền thông"}
            </p>

            <h1 className="text-4xl md:text-6xl font-jakarta font-black leading-tight mb-8 text-joyful-black">
              {service.title}
            </h1>

            {/* Decorative line */}
            <div className="w-16 h-1 bg-joyful-yellow rounded-full mb-8" />

            <div className="text-gray-600 text-lg md:text-xl leading-relaxed">
              {service.description.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-10 md:p-16 text-center mt-20 relative overflow-hidden shadow-sm">
            {/* Subtle yellow dot glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-joyful-yellow/10 blur-[80px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-joyful-yellow/8 blur-[60px] pointer-events-none rounded-full" />

            <div className="relative z-10">
              <span className="inline-block bg-joyful-yellow/15 border border-joyful-yellow/40 text-joyful-black rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-5">
                Liên hệ ngay
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-joyful-black mb-4">
                Chưa rõ giải pháp nào phù hợp?
              </h2>
              <p className="text-gray-500 mb-8 max-w-xl mx-auto text-base leading-relaxed">
                Nhận tư vấn trực tiếp từ chuyên gia để thiết kế chiến dịch tối ưu nhất cho thương hiệu của bạn.
              </p>
              <Link
                href="/#lien-he"
                className="btn-yellow inline-flex items-center gap-2 text-sm"
              >
                Liên hệ ngay
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
