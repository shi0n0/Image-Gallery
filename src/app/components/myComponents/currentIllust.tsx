import Image from "next/image";

export default function CurrentIllust() {
  return (
    <div className="bg-white rounded-xl w-full h-80 mt-3">
      <div className="bg-gray-100 rounded-t-lg py-3 px-5 font-semibold text-xl">
        最近投稿されたイラスト
      </div>
      <div className="py-3 px-5 font-semibold">
        <div className="flex w-full justify-center flex-col sm:flex-row">
          <div className="py-3 px-5 font-semibold w-1/3">
            <div className="relative w-full pb-[100%]">
              <Image
                className="rounded-lg"
                src="/headercat.jpeg"
                alt="視聴数No1コンテンツ"
                objectFit="cover"
                fill
              ></Image>
            </div>
          </div>
          <div className="py-3 px-5 font-semibold w-1/3">
            <div className="relative w-full pb-[100%]">
              <Image
                className="rounded-lg"
                src="/headercat.jpeg"
                alt="いいね数No1コンテンツ"
                objectFit="cover"
                fill
              ></Image>
            </div>
          </div>
          <div className="py-3 px-5 font-semibold w-1/3">
            <div className="relative w-full pb-[100%]">
              <Image
                className="rounded-lg"
                src="/headercat.jpeg"
                alt="お気に入り数No1コンテンツ"
                objectFit="cover"
                fill
              ></Image>
            </div>
          </div>
          <div className="py-3 px-5 font-semibold w-1/3">
            <div className="relative w-full pb-[100%]">
              <Image
                className="rounded-lg"
                src="/headercat.jpeg"
                alt="お気に入り数No1コンテンツ"
                objectFit="cover"
                fill
              ></Image>
            </div>
          </div>
          <div className="py-3 px-5 font-semibold w-1/3">
            <div className="relative w-full pb-[100%]">
              <Image
                className="rounded-lg"
                src="/headercat.jpeg"
                alt="お気に入り数No1コンテンツ"
                objectFit="cover"
                fill
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
