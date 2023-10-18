import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PaddingContainer from "./paddingCotainer";
import GridContainer from "./gridContainer";

export default function TopUserCard() {
  const [userImages, setUserImages] = useState<
    { id: string; url: string; title: string; userId: string }[]
  >([]);
  const [userProps, setUserProps] = useState<
    { id: string; image: string; name: string }[]
  >([]);

  useEffect(() => {
    async function fetchUserImages() {
      const { data: imagesData, error: imagesError } = await supabase
        .from("Image")
        .select("id, url, title, userId");

      const { data: usersData, error: usersError } = await supabase
        .from("User")
        .select("id, image, name");

      if (imagesError) {
        console.error("ユーザー画像の取得エラー:", imagesError);
      } else {
        setUserImages(imagesData);
      }

      if (usersError) {
        console.error("ユーザーデータの取得エラー:", usersError);
      } else {
        setUserProps(usersData);
      }
    }

    fetchUserImages();
  }, []);

  return (
    <PaddingContainer>
      <GridContainer>
        {userImages.map((image) => {
          const matchingUser = userProps.find(
            (user) => user.id === image.userId
          );

          return (
            <Link key={image.id} href={`illustrations/${image.id}`}>
              <div className="bg-white rounded-lg shadow-md p-4 duration-150 hover:-translate-y-1.5 active:bg-gray-100  active:duration-0">
                <div className="relative w-full h-0 pb-[100%]">
                  <Image
                    src={image.url}
                    alt={`ユーザー画像 | ${image.id}`}
                    objectFit="cover"
                    quality={10}
                    className="w-full h-full rounded-lg hover:opacity-95 transition-opacity"
                    fill
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                      New
                    </span>
                  </div>
                </div>

                <div className="mt-1">
                  <h2 className="text-lg font-semibold text-gray-800">
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
