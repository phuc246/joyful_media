"use client";
import { motion } from "framer-motion";

const logoUrl = "https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:ifs%3A%2F%2FM%2Faf585b9a-245b-4967-8d73-91fc378818d9/watermark:F/width:189?csig=AAAAAAAAAAAAAAAAAAAAAAV4rq3JXAn-6Kaw9qB9mPQKVtAcSNKaFeCDWkD_vue1&exp=1771802111&osig=AAAAAAAAAAAAAAAAAAAAAD6chP-S0zmuVC--GZWeTq2oB6tVR-QY4z6Opdm3I9KG&signer=media-rpc&x-canva-quality=thumbnail";

const teamMembers = [
  {
    name: "My Julie",
    role: "Founder",
    bio: "Có hơn 12 năm kinh nghiệm trong lĩnh vực quản lý nghệ sĩ và booking KOL. Góp mặt trong nhiều chiến dịch truyền thông giải trí lớn, tiêu biểu như Chị Đẹp 2023, Đệ Nhất Mưu Sinh, ATVNCG..., với vai trò điều phối và kết nối giữa nghệ sĩ, nhà sản xuất và thương hiệu.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
    reverse: false,
  },
  {
    name: "An Zuno",
    role: "Cố vấn chiến lược truyền thông",
    bio: "Hiện là Giám đốc Truyền thông tập đoàn Yeah1, với bề dày kinh nghiệm triển khai thương hiệu tại các nền tảng như Realme, VieON, Yeah1. Am hiểu thị trường và chiến lược influencer, An Zuno đóng vai trò cố vấn truyền thông cho các dự án của Joyful Media.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
    reverse: true,
  },
];

export default function Team() {
  return (
    <section id="doi-ngu" className="py-24 md:py-32 bg-joyful-yellow relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6 items-stretch">
          
          {/* Left Block: Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center shadow-xl shadow-yellow-600/20"
          >
            <img src={logoUrl} alt="Joyful Media Logo" className="w-56 mb-8 object-contain" />
            <h2 className="text-5xl md:text-6xl font-black text-center text-joyful-black leading-none uppercase tracking-tighter">
              Joyful <br /> Media
              <span className="block text-[#F5C518] mt-4 tracking-normal">Là ai?</span>
            </h2>
          </motion.div>

          {/* Right Block: Team Members */}
          <div className="flex flex-col gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-white rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8 shadow-xl shadow-yellow-600/20 items-center overflow-hidden"
              >
                {!member.reverse ? (
                  <>
                    {/* Portrait Photo (Left) */}
                    <div className="w-full md:w-5/12 aspect-[4/5] rounded-[2rem] overflow-hidden flex-shrink-0 relative group">
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    {/* Info (Right) */}
                    <div className="flex-1 w-full text-left">
                      <div className="flex justify-start items-center gap-4 mb-2">
                        <h3 className="text-3xl md:text-4xl font-black text-joyful-black whitespace-nowrap uppercase tracking-tighter">{member.name}</h3>
                        <div className="h-[3px] bg-[#F5C518] flex-1 rounded-full"></div>
                      </div>
                      <p className="text-xl md:text-2xl font-black text-joyful-black mb-6 text-right w-full block">{member.role}</p>
                      <p className="text-gray-600 leading-relaxed font-medium text-justify">{member.bio}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Info (Left on Desktop, Right alignment text) */}
                    <div className="flex-1 w-full text-right order-2 md:order-1">
                      <div className="flex justify-end items-center gap-4 mb-2">
                        <div className="h-[3px] bg-[#F5C518] flex-1 rounded-full"></div>
                        <h3 className="text-3xl md:text-4xl font-black text-joyful-black whitespace-nowrap uppercase tracking-tighter">{member.name}</h3>
                      </div>
                      <p className="text-xl md:text-2xl font-black text-joyful-black mb-6 text-left w-full block">{member.role}</p>
                      <p className="text-gray-600 leading-relaxed font-medium text-justify">{member.bio}</p>
                    </div>
                    {/* Portrait Photo (Right on Desktop) */}
                    <div className="w-full md:w-5/12 aspect-[4/5] rounded-[2rem] overflow-hidden flex-shrink-0 relative order-1 md:order-2 group">
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
