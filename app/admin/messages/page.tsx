"use client";
import { useState, useEffect } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/contact");
    setMessages(await res.json());
    setLoading(false);
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-black text-joyful-black">Tin nhắn liên hệ</h1>
        {unread > 0 && (
          <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">{unread} mới</span>
        )}
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Đang tải...</p>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-card">
          <p className="text-4xl mb-2">📭</p>
          <p className="text-gray-500 text-sm">Chưa có tin nhắn nào</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {messages.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className={`w-full text-left bg-white rounded-2xl p-4 shadow-card hover:-translate-y-0.5 transition-all duration-150 ${
                  selected?.id === m.id ? "ring-2 ring-joyful-yellow" : ""
                } ${!m.read ? "border-l-4 border-joyful-yellow" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-joyful-black text-sm">{m.name}</p>
                  <p className="text-gray-400 text-xs">{new Date(m.createdAt).toLocaleDateString("vi-VN")}</p>
                </div>
                <p className="text-gray-500 text-xs">{m.email}</p>
                {m.service && <span className="chip-yellow text-xs mt-2 inline-block">{m.service}</span>}
                <p className="text-gray-600 text-xs mt-2 line-clamp-2">{m.message}</p>
              </button>
            ))}
          </div>

          {/* Detail view */}
          {selected && (
            <div className="bg-white rounded-3xl p-6 shadow-card sticky top-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-black text-joyful-black text-lg">{selected.name}</h3>
                  <p className="text-gray-500 text-sm">{selected.email}</p>
                  {selected.phone && <p className="text-gray-500 text-sm">{selected.phone}</p>}
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              {selected.service && (
                <div className="mb-4">
                  <span className="chip-yellow">{selected.service}</span>
                </div>
              )}
              <div className="bg-joyful-gray rounded-2xl p-4">
                <p className="text-gray-700 text-sm leading-relaxed">{selected.message}</p>
              </div>
              <div className="mt-4 text-xs text-gray-400">
                {new Date(selected.createdAt).toLocaleString("vi-VN")}
              </div>
              <a
                href={`mailto:${selected.email}?subject=Re: Yêu cầu tư vấn JOYFUL MEDIA`}
                className="btn-yellow mt-5 text-sm"
              >
                📧 Trả lời qua Email
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
