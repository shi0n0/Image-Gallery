import GridContainer from "../components/commonComponents/container/gridContainer";
import PaddingContainer from "../components/commonComponents/container/paddingCotainer";
import Link from "next/link";
import Image from "next/image";

export default function CurrentIllust() {
  // 仮データ
  const illustrations = [
    { id: 1, title: "イラスト1", author: "作者A"},
    { id: 2, title: "イラスト2", author: "作者B"},
    { id: 3, title: "イラスト3", author: "作者C"},
  ];

  return (
    <PaddingContainer>
      <GridContainer>
        {illustrations.map((illust) => (
          <Link key={illust.id} href={`illustrations/test`}>
          <div className="sm:rounded-lg sm:p-2 duration-150 sm:hover:-translate-y-1.5 active:bg-gray-100  active:duration-0">
            <div className="relative aspect-square">
              <Image
                src={"/ImageGallery.png"}
                alt={`ユーザー画像 | ${illust.id}`}
                objectFit="cover"
                quality={10}
                className="sm:rounded-lg hover:opacity-95 transition-opacity"
                fill
              />
              <div className="absolute top-2 right-2">
                <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                  New
                </span>
              </div>
            </div>

            <div className="py-1 px-2">
              <h2 className="font-semibold text-gray-800 truncate">
                {illust.title}
              </h2>

              <Link href={`/userprofile/username`}>
                <div className="flex items-center">
                  <Image
                    src={"/ImageGallery.png"}
                    alt="ユーザーアイコン"
                    objectFit="cover"
                    className="w-6 h-6 rounded-full"
                    width={20}
                    height={20}
                  />
                  <p className="text-gray-600 text-sm ml-1 hover:text-black">
                    {illust?.author || "Unknown"}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </Link>
        ))}
      </GridContainer>
    </PaddingContainer>
  );
}
