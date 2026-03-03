"use client";
import React from "react";
import Marquee from "./ui/Marquee";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Nguyễn Minh Phương",
    username: "@minhphuong_mkt",
    body: "JOYFUL MEDIA đã giúp chúng tôi booking thành công nghệ sĩ phù hợp trong thời gian kỷ lục. Chiến dịch đạt 150% KPI đề ra.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=MP",
  },
  {
    name: "Trần Hoàng Anh",
    username: "@hoanganh_director",
    body: "Đội nhóm chuyên nghiệp, sáng tạo và luôn đúng deadline. Chúng tôi đã hợp tác qua 5 chiến dịch lớn và kết quả đều vượt kỳ vọng.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=HA",
  },
  {
    name: "Lê Thị Hương",
    username: "@huongle_vrohto",
    body: "Mạng lưới KOL của JOYFUL MEDIA rộng và chất lượng. Content seeding hiệu quả, đo lường minh bạch – đây là đối tác lý tưởng.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=LH",
  },
  {
    name: "Phạm Thành Nam",
    username: "@nampham_ceo",
    body: "Dịch vụ tận tâm và chuyên nghiệp. Tôi ấn tượng với cách các bạn tối ưu chi phí mà vẫn giữ được chất lượng nghệ sĩ tốt nhất.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=PN",
  },
  {
    name: "Vũ Thùy Linh",
    username: "@thuylinh_vp",
    body: "Sự thấu hiểu thị trường và network rộng khắp giúp Joyful Media trở thành lựa chọn hàng đầu cho các chiến dịch Brand Awareness.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=TL",
  },
  {
    name: "Đặng Quốc Hùng",
    username: "@quochung_tech",
    body: "Tư vấn chiến lược rất sát sao. Đội ngũ support nhiệt tình, hỗ trợ 24/7 giúp chiến dịch luôn vận hành trôi chảy.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=QH",
  },
  {
    name: "Lê Quốc Duy",
    username: "@duyle_founder",
    body: "Mọi thứ từ khâu tư vấn đến thực thi đều rất chuyên nghiệp. Joyful Media thực sự hiểu brand cần gì.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Duy",
  },
  {
    name: "Ngô Mỹ Hạnh",
    username: "@hanhngo_brand",
    body: "Ý tưởng sáng tạo và khả năng kết nối tuyệt vời. Campaign vừa qua đã giúp chúng tôi tăng 40% engagement.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hanh",
  },
  {
    name: "Trần Thế Vinh",
    username: "@vinh_ceo",
    body: "Rất tin tưởng khi làm việc cùng team Joyful. Minh bạch, tận tâm và hiệu quả là những từ khóa về các bạn.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vinh",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-black text-joyful-black">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-joyful-black/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-gray-600 leading-relaxed italic">"{body}"</blockquote>
    </figure>
  );
};

export default function Testimonials() {
  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);

  return (
    <section id="khach-hang" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-yellow-600 tracking-[0.2em] text-xs font-black uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-6xl font-black leading-[1.1] text-joyful-black uppercase">
            Khách hàng nói gì về <br />
            <span className="text-yellow-500">Chất lượng dịch vụ</span>
          </h2>
        </div>

        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </div>
    </section>
  );
}
