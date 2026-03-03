"use client";
import Link from "next/link";

const cards = [
  { href: "/admin/services", icon: "🎬", label: "Dịch vụ", desc: "Quản lý 5 dịch vụ", color: "bg-yellow-50 border-yellow-200" },
  { href: "/admin/portfolio", icon: "🖼️", label: "Portfolio", desc: "Dự án & ảnh", color: "bg-slate-50 border-slate-200" },
  { href: "/admin/team", icon: "👥", label: "Đội ngũ", desc: "Thành viên", color: "bg-yellow-50 border-yellow-200" },
  { href: "/admin/clients", icon: "🤝", label: "Khách hàng", desc: "Logo & đối tác", color: "bg-slate-50 border-slate-200" },
  { href: "/admin/testimonials", icon: "💬", label: "Testimonials", desc: "Đánh giá KH", color: "bg-yellow-50 border-yellow-200" },
  { href: "/admin/messages", icon: "📨", label: "Tin nhắn", desc: "Yêu cầu liên hệ", color: "bg-slate-50 border-slate-200" },
  { href: "/admin/settings", icon: "⚙️", label: "Cài đặt", desc: "Nội dung website", color: "bg-yellow-50 border-yellow-200" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-joyful-black">Dashboard</h1>
        <p className="text-gray-500 mt-1">Quản trị nội dung website JOYFUL MEDIA</p>
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`group border ${card.color} rounded-2xl p-6 hover:shadow-card transition-all duration-200 hover:-translate-y-1`}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-black text-joyful-black">{card.label}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{card.desc}</p>
            <div className="text-joyful-yellow-dark text-xs font-bold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              Quản lý →
            </div>
          </Link>
        ))}
      </div>

      {/* Quick info */}
      <div className="bg-joyful-black rounded-3xl p-6 text-white">
        <h3 className="font-black mb-2">💡 Hướng dẫn nhanh</h3>
        <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
          <li>Vào <strong className="text-white">Dịch vụ</strong> để chỉnh nội dung, icon SVG từng dịch vụ</li>
          <li>Vào <strong className="text-white">Portfolio</strong> để thêm dự án mới với ảnh Cloudinary</li>
          <li>Vào <strong className="text-white">Khách hàng</strong> để cập nhật logo đối tác (Wall of Fame)</li>
          <li>Vào <strong className="text-white">Cài đặt</strong> để chỉnh title Hero, About text, thông tin liên hệ</li>
          <li>Vào <strong className="text-white">Tin nhắn</strong> để xem form liên hệ từ khách</li>
        </ul>
      </div>
    </div>
  );
}
