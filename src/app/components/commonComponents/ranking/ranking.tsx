import supabase from "@/app/utils/supabase";
import PaddingContainer from "../container/paddingCotainer";
import Image from "next/image";

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
    className="max-w-sm rounded overflow-hidden shadow-lg"
  >
    <div className="relative aspect-square">
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
        <div>
          <p className="text-gray-700 text-md">{userData[0]?.name}</p>
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
  const { data, error } = await supabase
    .from("Image")
    .select("id, url, title, description, userId, viewCount")
    .order("viewCount", { ascending: false })
    .limit(10);

  if (error) {
    console.error("ランキング情報を取得中にエラーが発生:", error.message);
    return null;
  }

  if (data) {
    const { data: userData, error: userError } = await supabase
      .from("User")
      .select("name, image")
      .eq("id", data[0]?.userId);

    if (userError) {
      console.error("ユーザー情報を取得中にエラーが発生:", userError.message);
      return null;
    }

    return (
      <PaddingContainer>
        <p className="text-4xl font-bold text-center">閲覧数</p>
        {data.map((imageData, index) => (
          <ImageCard
            key={imageData.id}
            imageData={imageData}
            userData={userData}
            index={index}
          />
        ))}
      </PaddingContainer>
    );
  } else {
    return null;
  }
}
