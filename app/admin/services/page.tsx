"use client";
import { useState, useEffect } from "react";

type Service = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  iconSvg?: string;
  order: number;
  active: boolean;
};

const emptyForm: Omit<Service, "id"> = {
  title: "", subtitle: "", description: "", iconSvg: "", order: 0, active: true,
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/services");
    setServices(await res.json());
    setLoading(false);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = editing ? `/api/services/${editing}` : "/api/services";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setEditing(null);
    setForm(emptyForm);
    await load();
    setSaving(false);
  };

  const del = async (id: string) => {
    if (!confirm("Xoá dịch vụ này?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    await load();
  };

  const startEdit = (s: Service) => {
    setEditing(s.id);
    setForm({ title: s.title, subtitle: s.subtitle || "", description: s.description, iconSvg: s.iconSvg || "", order: s.order, active: s.active });
  };

  return (
    <div>
      <h1 className="text-2xl font-black text-joyful-black mb-6">Quản lý Dịch vụ</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-3xl p-6 shadow-card">
          <h2 className="font-bold text-joyful-black mb-4">{editing ? "✏️ Chỉnh sửa" : "➕ Thêm dịch vụ"}</h2>
          <form onSubmit={save} className="space-y-4">
            <input type="text" required placeholder="Tên dịch vụ *" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow" />
            <input type="text" placeholder="Subtitle (VD: Kết nối nghệ sĩ)" value={form.subtitle} onChange={(e) => setForm({...form, subtitle: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow" />
            <textarea placeholder="Mô tả dịch vụ *" required rows={3} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow resize-none" />
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">SVG Icon (paste code SVG hoặc emoji)</label>
              <textarea placeholder='<svg>...</svg> hoặc emoji VD: 🎬' rows={3} value={form.iconSvg} onChange={(e) => setForm({...form, iconSvg: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow resize-none font-mono text-xs" />
            </div>
            <div className="flex gap-4">
              <input type="number" placeholder="Thứ tự (0,1,2...)" value={form.order} onChange={(e) => setForm({...form, order: Number(e.target.value)})}
                className="w-1/2 px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow" />
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({...form, active: e.target.checked})} className="w-4 h-4 accent-joyful-yellow" />
                Hiển thị
              </label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-yellow flex-1 justify-center">
                {saving ? "Đang lưu..." : editing ? "Cập nhật" : "Thêm mới"}
              </button>
              {editing && (
                <button type="button" onClick={() => { setEditing(null); setForm(emptyForm); }} className="btn-outline">
                  Huỷ
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="space-y-3">
          {loading ? (
            <p className="text-gray-400 text-sm">Đang tải...</p>
          ) : services.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 shadow-card">
              <p className="text-4xl mb-2">📭</p>
              <p className="text-sm">Chưa có dịch vụ nào. Thêm dịch vụ đầu tiên!</p>
            </div>
          ) : services.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-4">
              <div className="text-2xl w-10 flex-shrink-0">
                {s.iconSvg?.length && !s.iconSvg.startsWith("<") ? s.iconSvg : "🎬"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-joyful-black text-sm">{s.title}</p>
                <p className="text-gray-400 text-xs truncate">{s.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(s)} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-colors">Sửa</button>
                <button onClick={() => del(s.id)} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-colors">Xoá</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
