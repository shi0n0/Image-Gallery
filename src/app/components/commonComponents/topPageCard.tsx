import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TopUserCard() {
  const { data: session } = useSession();
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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
      {userImages.map((image, index) => {
        const matchingUser = userProps.find((user) => user.id === image.userId);

        return (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
            <Link href={`illustrations/${image.id}`}>
              <div className="relative pb-[75%]">
                <Image
                  src={image.url}
                  alt={`ユーザー画像 ${index}`}
                  layout="fill"
                  objectFit="cover"
                  quality={50}
                />
              </div>
              <div className="p-4">
                <p className="text-2xl font-semibold">{image.title}</p>
                <Link href={`/userprofile/${matchingUser?.id}`}>
                  <div className="flex justify-end items-center mt-2">
                    <Image
                      src={
                        matchingUser?.image ||
                        "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
                      }
                      alt="ユーザーアイコン"
                      objectFit="cover"
                      className="rounded-full mr-2"
                      width={40}
                      height={40}
                    />
                    <p className="text-xl text-gray-700 duration-100 hover:text-gray-900">
                      {matchingUser?.name || "Unknown"}
                    </p>
                  </div>
                </Link>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
