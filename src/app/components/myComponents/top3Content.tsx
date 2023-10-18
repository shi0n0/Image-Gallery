import Image from "next/image";

export default function Top3Content() {
  return (
    <div className="bg-white rounded-xl w-2/3">
      <div className="bg-gray-100 rounded-t-lg py-3 px-5 font-semibold text-xl">
        トップ3
      </div>
      <div className="flex w-full justify-center flex-col sm:flex-row">
        <div className="py-3 px-5 font-semibold w-1/3">
          👀視聴数
          <div className="relative w-full pb-[100%]">
            <Image className="rounded-lg" src="/headercat.jpeg" alt="視聴数No1コンテンツ" objectFit="cover" fill></Image>
          </div>
        </div>
        <div className="py-3 px-5 font-semibold w-1/3">
          ❤️いいね
          <div className="relative w-full pb-[100%]">
            <Image className="rounded-lg" src="/headercat.jpeg" alt="いいね数No1コンテンツ" objectFit="cover" fill></Image>
          </div>
        </div>
        <div className="py-3 px-5 font-semibold w-1/3">
          ⭐︎お気に入り
          <div className="relative w-full pb-[100%]">
            <Image className="rounded-lg" src="/headercat.jpeg" alt="お気に入り数No1コンテンツ" objectFit="cover" fill></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
