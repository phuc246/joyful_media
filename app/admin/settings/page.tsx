"use client";
import { useState, useEffect } from "react";

const settingsConfig = [
  { key: "hero_title", label: "Hero – Tiêu đề chính", placeholder: "JOYFUL MEDIA", type: "text" },
  { key: "hero_subtitle", label: "Hero – Subtitle", placeholder: "Celebrity & KOL Booking Vietnam", type: "text" },
  { key: "about_text", label: "Giới thiệu (About)", placeholder: "Nội dung về công ty...", type: "textarea" },
  { key: "contact_email", label: "Email liên hệ", placeholder: "contact@joyfulmedia.vn", type: "email" },
  { key: "contact_phone", label: "Số điện thoại", placeholder: "0xxx xxx xxx", type: "text" },
  { key: "contact_address", label: "Địa chỉ", placeholder: "TP. Hồ Chí Minh, Việt Nam", type: "text" },
  { key: "social_facebook", label: "Facebook URL", placeholder: "https://facebook.com/joyfulmedia", type: "url" },
  { key: "social_instagram", label: "Instagram URL", placeholder: "https://instagram.com/joyfulmedia", type: "url" },
  { key: "social_tiktok", label: "TikTok URL", placeholder: "https://tiktok.com/@joyfulmedia", type: "url" },
  { key: "social_youtube", label: "YouTube URL", placeholder: "https://youtube.com/@joyfulmedia", type: "url" },
];

export default function AdminSettings() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then(setValues);
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-black text-joyful-black mb-6">Cài đặt Website</h1>

      <div className="bg-white rounded-3xl p-6 shadow-card max-w-2xl">
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl px-4 py-3 text-sm font-semibold mb-6">
            ✅ Đã lưu thành công!
          </div>
        )}

        <form onSubmit={save} className="space-y-5">
          {settingsConfig.map((setting) => (
            <div key={setting.key}>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">{setting.label}</label>
              {setting.type === "textarea" ? (
                <textarea
                  rows={4}
                  placeholder={setting.placeholder}
                  value={values[setting.key] || ""}
                  onChange={(e) => setValues({ ...values, [setting.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow resize-none"
                />
              ) : (
                <input
                  type={setting.type}
                  placeholder={setting.placeholder}
                  value={values[setting.key] || ""}
                  onChange={(e) => setValues({ ...values, [setting.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-joyful-yellow"
                />
              )}
            </div>
          ))}

          <div className="border-t pt-5">
            <button type="submit" disabled={saving} className="btn-yellow">
              {saving ? "Đang lưu..." : "💾 Lưu cài đặt"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
