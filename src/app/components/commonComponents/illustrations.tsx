"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import supabase from "../../utils/supabase";
import Link from "next/link";

// 必要なimport文を追加

const ImageDetail = () => {
  const getPagePath = usePathname();
  const pagePath = getPagePath.replace("/illustrations/", "");
  const [imageData, setImageData] = useState({
    url: "",
    userId: "",
    title: "",
    description: "",
    width: 0,
    height: 0,
    postedAt: "",
  });
  const [userProps, setUserProps] = useState({
    id: "",
    image: "",
    name: "",
  });

  const [showFullImage, setShowFullImage] = useState(false);

  const handleShowMoreClick = () => {
    setShowFullImage(true);
  };
  
  useEffect(() => {
    async function fetchUserImages() {
      if (pagePath) {
        const { data, error } = await supabase
          .from("Image")
          .select("url,userId,title,description,width,height,postedAt")
          .eq("id", pagePath);

        const { data: userData, error: userError } = await supabase
          .from("User")
          .select("id,image,name");

        if (error) {
          console.error("画像の取得にエラーが発生しました:", error);
        } else {
          setImageData(data[0]);
        }

        if (userError) {
          console.error("ユーザーデータの取得にエラーが発生しました:", userError);
        } else {
          setUserProps(userData[0]);
        }
      }
    }

    fetchUserImages();
  }, [pagePath]);

  if (!imageData.url) {
    return (
      <div className="p-10">
        イラストを探しています。1分以上この画面が表示されている場合はリロードするか、URLを見直してください。
      </div>
    );
  }

  const originalDateTime = new Date(imageData.postedAt);
  const formattedDate = `${originalDateTime.getFullYear()}年${(
    originalDateTime.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}月${originalDateTime
    .getDate()
    .toString()
    .padStart(2, "0")}日 ${originalDateTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${originalDateTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="sm:py-10 sm:px-20 lg:flex w-full">
      <div className="relative top-0 bg-gray-200 sm:p-4 rounded-md sm:flex sm:justify-center">
        <Image
          src={imageData.url}
          alt="ユーザーが投稿した画像"
          quality={80}
          width={imageData.width}
          height={imageData.height}
          className="object-contain sm:min-w-0 lg:max-w-[50vw]"
        />
      </div>
      <div className="sm:flex sm:justify-center sm:ml-4">
        <div className="bg-white rounded-lg mt-5 sm:mt-0">
          <div className="p-5">
            <p className="text-xl font-bold mb-1">
              {imageData.title || "ダミータイトル"}
            </p>
            <p className="text-md text-gray-800 mb-6">
              {imageData.description || "ディスクリプションの文章がここに入ります"}
            </p>
            <p className="text-md text-gray-500">{formattedDate}</p>
          </div>

          <div className="flex items-center space-x-1 p-5">
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

          {userProps.id && (
            <div className="flex items-center space-x-4 p-5">
              <Link
                href={`/userprofile/${userProps.id}`}
                className="flex items-center p-2 hover:bg-gray-800 hover:bg-opacity-10 hover:rounded-lg"
              >
                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                  <Image
                    src={userProps.image}
                    alt="ユーザーのアイコン"
                    className="object-cover w-full h-full"
                    fill
                  />
                </div>
                <p className="text-lg font-semibold px-2">{userProps.name}</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
