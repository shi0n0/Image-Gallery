import supabase from "@/app/utils/supabase";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";

interface MostViewedImage {
  id: string;
  url: string;
  userId: string;
  title: string;
  description: string;
  width: number;
  height: number;
  postedAt: string;
  viewCount: number;
}

export default async function Top3Content() {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;
  let mostViewedImage: MostViewedImage | null = {
    id: "",
    url: "",
    userId: "",
    title: "",
    description: "",
    width: 0,
    height: 0,
    postedAt: "",
    viewCount: 0,
  };

  const getMostViewedImage = async () => {
    const { data, error } = await supabase
      .from("Image")
      .select("*")
      .eq("userId", userId)
      .order("viewCount", { ascending: false })
      .limit(1);

    if (error) {
      console.error("getMostViewdImageでエラーが発生しました:", error.message);
    }
    if (data && data.length > 0) {
      mostViewedImage = data[0];
      console.log("No1閲覧数の画像を取得しました");
    } else {
      console.log("No1閲覧数の画像を取得できませんでした");
    }
  };

  await getMostViewedImage(); // 関数の非同期処理が完了するまで待機

  return (
    <div className="bg-white rounded-xl lg:w-2/3">
      <div className="bg-gray-100 rounded-t-lg py-3 px-5 font-semibold text-xl">
        トップ3
      </div>
      <div className="flex w-full justify-center flex-col sm:flex-row">
        {mostViewedImage ? (
          <>
            <div className="py-3 px-5 font-semibold lg:w-1/3">
              👀視聴数
              <div className="relative w-full aspect-square">
                <Image
                  className="rounded-lg"
                  src={mostViewedImage.url}
                  alt="視聴数No1コンテンツ"
                  objectFit="cover"
                  fill
                />
              </div>
              <p>{mostViewedImage.title}</p>
            </div>
            <div className="py-3 px-5 font-semibold w-1/3">
              📝コメント数
              <div className="relative w-full aspect-square">
                <Image
                  className="rounded-lg"
                  src={"/ImageGallery.png"}
                  alt="コメント数No1コンテンツ"
                  objectFit="cover"
                  fill
                />
                <p>Title: 仮タイトル</p>
              </div>
            </div>
            <div className="py-3 px-5 font-semibold w-1/3">
              ❤️いいね数
              <div className="relative w-full aspect-square">
                <Image
                  className="rounded-lg"
                  src={"/ImageGallery.png"}
                  alt="いいね数No1コンテンツ"
                  objectFit="cover"
                  fill
                />
                <p>Title: 仮タイトル</p>
              </div>
            </div>
          </>
        ) : (
          <div>No images found for the user</div>
        )}
      </div>
    </div>
  );
}
