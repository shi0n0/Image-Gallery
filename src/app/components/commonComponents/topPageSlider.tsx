import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function TopPageSlider() {
  return (
    <div className="bg-gray-100 p-3 relative">
      <div className="w-full h-[5vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh]">
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
          className="h-full"
        >
          <SwiperSlide className="relative w-full h-full">
            <Image
              src={"/ImageGallery.png"}
              alt="テスト1"
              className="object-cover rounded-md opacity-100 duration-200 hover:opacity-60"
              fill
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-full h-full">
            <Image
              src={"/ImageGallery-30.png"}
              alt="テスト2"
              className="object-cover rounded-md opacity-100 duration-200 hover:opacity-60"
              fill
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-full h-full">
            <Image
              src={"/ImageGallery.png"}
              alt="テスト3"
              className="object-cover rounded-md opacity-100 duration-200 hover:opacity-60"
              fill
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-ful h-full">
            <Image
              src={"/ImageGallery-30.png"}
              alt="テスト3"
              className="object-cover rounded-md opacity-100 duration-200 hover:opacity-60"
              fill
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-full h-full">
            <Image
              src={"/ImageGallery.png"}
              alt="テスト3"
              className="object-cover rounded-md opacity-100 duration-200 hover:opacity-60"
              fill
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-full h-full">
            <Image
              src={"/ImageGallery-30.png"}
              alt="テスト3"
              className="object-cover rounded-md opacity-100 duration-200 hover:opacity-60"
              fill
            />
          </SwiperSlide>

          <div className="swiper-pagination absolute bottom-10 right-2 z-30"></div>
        </Swiper>
      </div>
    </div>
  );
}
