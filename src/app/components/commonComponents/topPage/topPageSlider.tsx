import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import supabase from "@/app/utils/supabase";

export default async function TopPageSlider() {
  const { data, error } = await supabase
    .from("TopPageSlider")
    .select("id, image, url")
    .order("createdAt", { ascending: false })
    .limit(6);

    if (!data) return null;

  return (
    <div className="bg-gray-100 md:p-2 relative">
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView="auto"
          breakpoints={{
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
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
          {data.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="relative aspect-video w-full h-full hover:opacity-60"
            >
              <Image
                src={slide.url}
                alt={slide.image}
                className="object-cover rounded-md"
                fill
              />
            </SwiperSlide>
          ))}

          <div className="swiper-pagination absolute bottom-10 right-2 z-30"></div>
        </Swiper>
      </div>
    </div>
  );
}
