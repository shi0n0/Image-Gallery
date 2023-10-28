import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function TopPageSlider() {
  return (
    <div className="bg-yellow-100 p-3">
      <p className="text-2xl text-center py-5 font-bold">🔥ホットなイラスト🔥</p>
      <div className="w-full h-[30vh]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={3.5}
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
          className="!h-full"
        >
          <SwiperSlide className="relative w-full h-full">
            <Image
              src={"/ImageGallery.png"}
              alt="テスト1"
              className="object-cover rounded-md"
              fill
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-full h-full">
            <Image
              src={"/ImageGallery-30.png"}
              alt="テスト2"
              className="object-cover rounded-md"
              fill
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-full h-full">
            <Image
              src={"/ImageGallery.png"}
              alt="テスト3"
              className="object-cover rounded-md"
              fill
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-full">
            <Image
              src={"/ImageGallery-30.png"}
              alt="テスト3"
              className="object-cover rounded-md"
              fill
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-full">
            <Image
              src={"/ImageGallery.png"}
              alt="テスト3"
              className="object-cover rounded-md"
              fill
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-full">
            <Image
              src={"/ImageGallery-30.png"}
              alt="テスト3"
              className="object-cover rounded-md"
              fill
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
