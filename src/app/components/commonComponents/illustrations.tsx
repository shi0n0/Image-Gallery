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
      postedAt: "",
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
          .select("url,userId,title,description,postedAt")
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
    return (
      <div className="p-10">
        イラストを探しています。1分以上この画面が表示されている場合リロードするか、URLを見直してください。
      </div>
    );
  }

  const image = imageData[0];
  const user = matchingUser;

  const originalDateTime = new Date(image.postedAt); // 指定された日付と時刻
  const year = originalDateTime.getFullYear(); // 年
  const month = (originalDateTime.getMonth() + 1).toString().padStart(2, "0"); // 月
  const day = originalDateTime.getDate().toString().padStart(2, "0"); // 日
  const hours = originalDateTime.getHours().toString().padStart(2, "0"); // 時
  const minutes = originalDateTime.getMinutes().toString().padStart(2, "0"); //　分

  const formattedDate = `${year}年${month}月${day}日 ${hours}:${minutes}`;

  return (
    <div className="p-10 flex">
      <div className="w-5/6 pr-5">
        <div className="relative h-[60vh] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={image.url || "/ImageGallery-30.png"}
            alt="ユーザーが投稿した画像"
            className="object-contain w-full h-full"
            quality={80}
            fill
          />
        </div>
      </div>
      <div>
        <div className="bg-white rounded-lg mb-5">
          <div className="p-5">
            <p className="text-3xl font-bold mb-1">
              {image.title || "ダミータイトル"}
            </p>
            <p className="text-xl text-gray-800 mb-6">
              {image.description || "ディスクリプションの文章がここに入ります"}
            </p>
            <p className="text-lg text-gray-500">
              {formattedDate || "◯◯◯◯年◯◯月◯◯日 "}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">いいね</p>
            <span className="text-5xl text-red-500 bg-white rounded-lg cursor-pointer">
              ♡
            </span>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">お気に入り</p>
            <span className="text-5xl text-yellow-300 bg-white rounded-lg cursor-pointer">
              ☆
            </span>
          </div>
        </div>

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
  );
};

export default ImageDetail;
