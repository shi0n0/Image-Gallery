"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import supabase from "../../utils/supabase";
import Link from "next/link";

const ImageDetail = () => {
  const getPagePath = usePathname();
  const pagePath = getPagePath.replace("/illustrations/", "");
  const [imageData, setImageData] = useState([
    {
      url: "",
      userId: "",
      title: "",
      description: "",
    },
  ]);
  const [userProps, setUserProps] = useState([
    {
      id: "",
      image: "",
      name: "",
    },
  ]);
  const matchingUser = userProps.find(
    (user) => user.id === imageData[0]?.userId
  );

  useEffect(() => {
    async function fetchUserImages() {
      if (pagePath) {
        const { data, error } = await supabase
          .from("Image")
          .select("url,userId,title,description")
          .eq("id", pagePath);

        const { data: userData, error: userError } = await supabase
          .from("User")
          .select("id,image,name");

        if (error) {
          console.error("画像の取得にエラーが発生しました:", error);
        } else {
          setImageData(data);
        }

        if (userError) {
          console.error(
            "ユーザーデータの取得にエラーが発生しました:",
            userError
          );
        } else {
          setUserProps(userData);
        }
      }
    }

    fetchUserImages();
  }, [pagePath]);

  if (!imageData || imageData.length === 0) {
    return <div className="p-10">読み込み中...</div>;
  }

  const image = imageData[0];
  const user = matchingUser;

  return (
    <div className="p-10 flex">
      <div className="w-4/6 pr-5">
        <div className="relative h-[60vh] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={image.url || "/ImageGallery-30.png"}
            alt="ユーザーが投稿した画像"
            className="object-contain w-full h-full"
            fill
          />
        </div>
      </div>

      <div className="w-2/6 bg-white rounded-lg">
        <div className="p-5">
          <p className="text-3xl font-bold mb-4">
            {image.title || "ダミータイトル"}
          </p>
          <p className="text-xl text-gray-800 mb-6">
            {image.description || "ディスクリプションの文章がここに入ります"}
          </p>

          {user && (
            <div className="flex items-center space-x-4">
              <Link
                href={`/userprofile/${user.id}`}
                className="flex items-center p-2 hover:bg-gray-800 hover:bg-opacity-10 hover:rounded-lg"
              >
                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                  <Image
                    src={user.image}
                    alt="ユーザーのアイコン"
                    className="object-cover w-full h-full"
                    layout="fill"
                  />
                </div>
                <p className="text-lg font-semibold px-2">{user.name}</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
