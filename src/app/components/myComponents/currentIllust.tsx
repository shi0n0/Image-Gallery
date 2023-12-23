"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";
import supabase from "@/app/utils/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CurrentIllust() {
  const [data, setData] = useState<
    { id: String; url: string; title: string }[]
  >([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("Image")
        .select("id,url,title")
        .eq("userId", userId)
        .limit(10);
      if (error) {
        console.error("カレントイラスト取得中にエラー:", error.message);
      } else {
        setData(data);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="bg-white rounded-xl w-full h-80 mt-3">
      <div className="bg-gray-100 rounded-t-lg py-3 px-5 font-semibold text-xl">
        最近投稿されたイラスト
      </div>
      <div className="py-3 px-5 font-semibold">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1.5}
          breakpoints={{
            768: {
              slidesPerView: 5,
            },
          }}
          centeredSlides={true}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          navigation
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="h-full"
        >
          {data &&
            data.map((image, index) => (
              <SwiperSlide key={index}>
                <Link href={`/illustrations/${image.id}`}>
                  <div className="aspect-square hpver:opacity-110">
                    <Image
                      src={image.url}
                      alt={image.title}
                      className="object-cover rounded-md"
                      fill
                    />
                    <p>{image.title}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
