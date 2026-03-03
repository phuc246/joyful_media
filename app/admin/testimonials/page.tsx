"use client";
import { useState, useEffect } from "react";

type Testimonial = { id: string; quote: string; authorName: string; company?: string; rating: number; active: boolean; };
const empty = { quote: "", authorName: "", company: "", rating: 5, active: true };

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/testimonials");
    setItems(await res.json());
    setLoading(false);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = editing ? `/api/testimonials/${editing}` : "/api/testimonials";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setEditing(null);
    setForm(empty);
    await load();
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm("Xoá đánh giá này?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    await load();
  };

  const startEdit = (t: Testimonial) => {
    setEditing(t.id);
    setForm({ quote: t.quote, authorName: t.authorName, company: t.company || "", rating: t.rating, active: t.active });
  };

  return (
    <div>
      <h1 className="text-2xl font-black text-joyful-black mb-6">Quản lý Testimonials</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 shadow-card">
          <h2 className="font-bold text-joyful-black mb-4">{editing ? "✏️ Chỉnh sửa" : "➕ Thêm đánh giá"}</h2>
          <form onSubmit={save} className="space-y-4">
            <textarea placeholder="Nội dung đánh giá *" required rows={4} value={form.quote} onChange={(e) => setForm({...form, quote: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow resize-none" />
            <input type="text" placeholder="Tên người đánh giá *" required value={form.authorName} onChange={(e) => setForm({...form, authorName: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow" />
            <input type="text" placeholder="Công ty / Chức danh" value={form.company} onChange={(e) => setForm({...form, company: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow" />
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[1,2,3,4,5].map((star) => (
                  <button key={star} type="button" onClick={() => setForm({...form, rating: star})}
                    className={`text-2xl transition-transform hover:scale-110 ${star <= form.rating ? "text-joyful-yellow" : "text-gray-300"}`}>
                    ★
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({...form, active: e.target.checked})} className="w-4 h-4 accent-joyful-yellow" />
                Hiển thị
              </label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-yellow flex-1 justify-center">
                {saving ? "Đang lưu..." : editing ? "Cập nhật" : "Thêm mới"}
              </button>
              {editing && <button type="button" onClick={() => { setEditing(null); setForm(empty); }} className="btn-outline">Huỷ</button>}
            </div>
          </form>
        </div>

        <div className="space-y-3">
          {loading ? <p className="text-gray-400 text-sm">Đang tải...</p>
          : items.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-card text-gray-400">
              <p className="text-4xl mb-2">💬</p>
              <p className="text-sm">Chưa có testimonial nào.</p>
            </div>
          ) : items.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-4 shadow-card">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex gap-0.5 mb-2">{Array.from({length: t.rating}).map((_,i) => <span key={i} className="text-joyful-yellow text-sm">★</span>)}</div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-1">"{t.quote}"</p>
                  <p className="font-bold text-xs text-joyful-black">{t.authorName}</p>
                  {t.company && <p className="text-gray-400 text-xs">{t.company}</p>}
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button onClick={() => startEdit(t)} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-xl">Sửa</button>
                  <button onClick={() => del(t.id)} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-xl">Xoá</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
