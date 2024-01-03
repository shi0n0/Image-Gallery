import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import Image from "next/image";
import Link from "next/link";
import PaddingContainer from "../container/paddingCotainer";
import GridContainer from "../container/gridContainer";
import Loading from "@/app/loading";

export default function TopUserCard() {
  const [userImages, setUserImages] = useState<
    { id: string; url: string; title: string; userId: string }[]
  >([]);
  const [userProps, setUserProps] = useState<
    { id: string; image: string; name: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUserImages() {
      const { data: imagesData, error: imagesError } = await supabase
        .from("Image")
        .select("id, url, title, userId")
        .order("postedAt", { ascending: false })
        .limit(12);

      const { data: usersData, error: usersError } = await supabase
        .from("User")
        .select("id, image, name")
        .limit(12);

      if (imagesError) {
        console.error("ユーザー画像の取得エラー:", imagesError);
      } else {
        setUserImages(imagesData);
      }

      if (usersError) {
        console.error("ユーザーデータの取得エラー:", usersError);
      } else {
        setUserProps(usersData);
        setIsLoading(false);
      }
    }

    fetchUserImages();
  }, []);

  return (
    <PaddingContainer>
      <div className="sm:px-12 sm:py-3 w-fit h-fit flex justify-between items-center">
        <p className="text-lg py-2 sm:text-xl sm:pr-2 font-semibold text-gray-700 inline-block">
          最近投稿されたイラスト
        </p>
        <p className="text-md sm:text-lg font-semibold text-custom-pink duration-100 hidden hover:opacity-60 sm:inline-block">
          もっと見る ＞
        </p>
      </div>
      {isLoading && <Loading />}
      <GridContainer>
        {userImages.map((image) => {
          const matchingUser = userProps.find(
            (user) => user.id === image.userId
          );

          return (
            <Link key={image.id} href={`illustrations/${image.id}`}>
              <div className="sm:rounded-lg sm:p-2 duration-150 sm:hover:-translate-y-1.5 active:bg-gray-100  active:duration-0">
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={`ユーザー画像 | ${image.id}`}
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
                    {image.title}
                  </h2>

                  <Link href={`/userprofile/${matchingUser?.id}`}>
                    <div className="flex items-center">
                      <Image
                        src={
                          matchingUser?.image ||
                          "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
                        }
                        alt="ユーザーアイコン"
                        objectFit="cover"
                        className="w-6 h-6 rounded-full"
                        width={20}
                        height={20}
                      />
                      <p className="text-gray-600 text-sm ml-1 hover:text-black">
                        {matchingUser?.name || "Unknown"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </Link>
          );
        })}
      </GridContainer>
    </PaddingContainer>
  );
}
