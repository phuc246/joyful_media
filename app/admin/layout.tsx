"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/services", label: "Dịch vụ", icon: "🎬" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "🖼️" },
  { href: "/admin/team", label: "Đội ngũ", icon: "👥" },
  { href: "/admin/clients", label: "Khách hàng", icon: "🤝" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "💬" },
  { href: "/admin/messages", label: "Tin nhắn", icon: "📨" },
  { href: "/admin/settings", label: "Cài đặt", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  // Don't show sidebar on login page
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-joyful-gray">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-joyful-yellow rounded-full flex items-center justify-center font-black text-joyful-black">J</div>
            <span className="font-black text-sm text-white">JOYFUL MEDIA</span>
          </Link>
          <p className="text-gray-500 text-xs mt-0.5 ml-10">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-joyful-yellow text-joyful-black"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-4 py-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <span>🌐</span> Xem trang web
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <span>🚪</span> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="admin-content flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
