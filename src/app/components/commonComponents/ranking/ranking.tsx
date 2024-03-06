import supabase from "@/app/utils/supabase";
import PaddingContainer from "../container/paddingCotainer";
import Image from "next/image";
import Link from "next/link";

interface ImageData {
  id: number;
  url: string;
  title: string;
  description: string;
  userId: number;
}

interface UserData {
  name: string;
  image: string;
}

interface ImageCardProps {
  imageData: ImageData;
  userData: UserData[];
  index: number;
}

const ImageCard = ({ imageData, userData, index }: ImageCardProps) => (
  <div
    key={imageData.id}
    className="max-w-sm rounded overflow-hidden shadow-lg my-8"
  >
    <div className="relative aspect-square hover:opacity-95 duration-100">
      <Image
        className="object-cover"
        src={imageData.url}
        alt={imageData.description}
        fill
      />
    </div>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{imageData.title}</div>
      <div className="flex items-center">
        <div className="relative aspect-square w-10 mr-2">
          <Image
            className="rounded-full"
            src={userData[0].image}
            alt="アイコン"
            fill
          />
        </div>
        <div className="hover:opacity-95 duration-100">
          <Link href={`/userprofile/${imageData.userId}`}>
            <p className="text-gray-500 text-md hover:text-black duration-100">
              {userData[0]?.name}
            </p>
          </Link>
          <p className="text-gray-400 text-xs">フォロー数 200人</p>
        </div>
      </div>
      <p className="text-gray-700 text-base">ランキング: {index + 1}位</p>
    </div>

    <div className="px-6 py-4">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
        #カテゴリ
      </span>
    </div>
  </div>
);

export default async function Ranking() {
  const { data: viewRankingData, error } = await supabase
    .from("Image")
    .select("id, url, title, description, userId, viewCount")
    .order("viewCount", { ascending: false })
    .limit(10);

  if (error) {
    console.error("ランキング情報を取得中にエラーが発生:", error.message);
    return null;
  }

  if (viewRankingData) {
    const { data: userData, error: userError } = await supabase
      .from("User")
      .select("name, image")
      .eq("id", viewRankingData[0]?.userId);

    if (userError) {
      console.error("ユーザー情報を取得中にエラーが発生:", userError.message);
      return null;
    }

    return (
      <PaddingContainer>
        <div className="flex justify-between">
          <div>
            <p className="text-4xl font-bold text-center">閲覧数</p>
            {viewRankingData.map((imageData, index) => (
              <Link href={`/illustrations/${imageData.id}`} key={imageData.id}>
                <ImageCard
                  key={imageData.id}
                  imageData={imageData}
                  userData={userData}
                  index={index}
                />
              </Link>
            ))}
          </div>
          <div>
            <p className="text-4xl font-bold text-center">いいね数</p>
            {/* 今後いいねランキングにデータを差し替える */}
            {viewRankingData.map((imageData, index) => (
              <Link href={`/illustrations/${imageData.id}`} key={imageData.id}>
                <ImageCard
                  key={imageData.id}
                  imageData={imageData}
                  userData={userData}
                  index={index}
                />
              </Link>
            ))}
          </div>
          <div>
            <p className="text-4xl font-bold text-center">コメント数</p>
            {/* 今後いいねランキングにデータを差し替える */}
            {viewRankingData.map((imageData, index) => (
              <Link href={`/illustrations/${imageData.id}`} key={imageData.id}>
                <ImageCard
                  key={imageData.id}
                  imageData={imageData}
                  userData={userData}
                  index={index}
                />
              </Link>
            ))}
          </div>
        </div>
      </PaddingContainer>
    );
  } else {
    return null;
  }
}
