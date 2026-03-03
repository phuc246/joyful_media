"use client";
import { useState, useEffect, useRef } from "react";

type Portfolio = { id: string; title: string; category: string; description?: string; images: string[]; client?: string; year?: number; featured: boolean; };

const categories = ["Interview", "Social Video", "TVC", "MV", "Event", "Campaign"];
const empty = { title: "", category: "Campaign", description: "", images: [] as string[], client: "", year: new Date().getFullYear(), featured: false };

export default function AdminPortfolio() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/portfolio");
    setItems(await res.json());
    setLoading(false);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, folder: "JOYFULMEDIA/portfolio" }),
      });
      const data = await res.json();
      if (data.url) setForm((f) => ({ ...f, images: [...f.images, data.url] }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (url: string) => setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = editing ? `/api/portfolio/${editing}` : "/api/portfolio";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setEditing(null);
    setForm(empty);
    await load();
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm("Xoá dự án này?")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    await load();
  };

  const startEdit = (p: Portfolio) => {
    setEditing(p.id);
    setForm({ title: p.title, category: p.category, description: p.description || "", images: p.images, client: p.client || "", year: p.year || new Date().getFullYear(), featured: p.featured });
  };

  return (
    <div>
      <h1 className="text-2xl font-black text-joyful-black mb-6">Quản lý Portfolio</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-3xl p-6 shadow-card">
          <h2 className="font-bold text-joyful-black mb-4">{editing ? "✏️ Chỉnh sửa" : "➕ Thêm dự án"}</h2>
          <form onSubmit={save} className="space-y-4">
            <input type="text" required placeholder="Tên dự án *" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}
                className="px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow">
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
              <input type="number" placeholder="Năm" value={form.year} onChange={(e) => setForm({...form, year: Number(e.target.value)})}
                className="px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow" />
            </div>
            <input type="text" placeholder="Client (VD: Samsung)" value={form.client} onChange={(e) => setForm({...form, client: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow" />
            <textarea placeholder="Mô tả dự án" rows={2} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow resize-none" />

            {/* Image upload */}
            <div>
              <label className="text-xs font-bold text-gray-500 mb-2 block">Ảnh dự án (Cloudinary)</label>
              <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
                  onChange={(e) => { Array.from(e.target.files || []).forEach(uploadImage); }} />
                {uploading ? (
                  <p className="text-sm text-gray-500">⏳ Đang upload...</p>
                ) : (
                  <p className="text-sm text-gray-400">Click để chọn ảnh (tự động upload Cloudinary)</p>
                )}
              </div>
              {/* Uploaded images */}
              {form.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.images.map((url) => (
                    <div key={url} className="relative group">
                      <img src={url} alt="" className="w-20 h-16 object-cover rounded-xl" />
                      <button type="button" onClick={() => removeImage(url)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} className="w-4 h-4 accent-joyful-yellow" />
              Featured (hiển thị đầu tiên)
            </label>

            <div className="flex gap-3">
              <button type="submit" disabled={saving || uploading} className="btn-yellow flex-1 justify-center">
                {saving ? "Đang lưu..." : editing ? "Cập nhật" : "Thêm mới"}
              </button>
              {editing && <button type="button" onClick={() => { setEditing(null); setForm(empty); }} className="btn-outline">Huỷ</button>}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="space-y-3">
          {loading ? <p className="text-gray-400 text-sm">Đang tải...</p>
          : items.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 shadow-card">
              <p className="text-4xl mb-2">📭</p>
              <p className="text-sm">Chưa có dự án nào.</p>
            </div>
          ) : items.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-4">
              {p.images[0] ? (
                <img src={p.images[0]} alt="" className="w-16 h-12 object-cover rounded-xl flex-shrink-0" />
              ) : (
                <div className="w-16 h-12 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl">🖼️</div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-joyful-black text-sm">{p.title}</p>
                <p className="text-gray-400 text-xs">{p.category} · {p.client} · {p.year}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(p)} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-xl">Sửa</button>
                <button onClick={() => del(p.id)} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-xl">Xoá</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
