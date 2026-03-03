"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Đăng nhập thất bại");
        setLoading(false);
      }
    } catch {
      setError("Lỗi kết nối");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-joyful-gray flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-joyful-yellow rounded-full flex items-center justify-center font-black text-3xl text-joyful-black mx-auto mb-4">
            J
          </div>
          <h1 className="text-2xl font-black text-joyful-black">JOYFUL MEDIA</h1>
          <p className="text-gray-500 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 shadow-card">
          <h2 className="text-xl font-black text-joyful-black mb-6">Đăng nhập</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Tài khoản</label>
              <input
                type="text"
                required
                autoFocus
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow focus:ring-2 focus:ring-joyful-yellow/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Mật khẩu</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••••"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow focus:ring-2 focus:ring-joyful-yellow/20 transition-all"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2">{error}</p>
            )}

            <button type="submit" disabled={loading} className="btn-yellow w-full justify-center">
              {loading ? <><span className="spinner" /> Đang đăng nhập...</> : "Đăng nhập →"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <a href="/" className="hover:text-gray-600">← Quay về trang chủ</a>
        </p>
      </div>
    </div>
  );
}
