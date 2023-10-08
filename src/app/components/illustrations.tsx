"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import supabase from "../utils/supabase";
import Link from "next/link";

const ImageDetail = () => {
  const getPagePath = usePathname();
  const pagePath = getPagePath.replace("/illustrations/", "");
  const [imageData, setImageData] = useState<
    {
      url: string;
      userId: string;
      title: string;
      description: string;
    }[]
  >([]);
  const [userProps, setUserProps] = useState<
    { id: string; image: string; name: string }[]
  >([]);
  const matchingUser = userProps.find((user) => user.id === imageData[0].userId);

  useEffect(() => {
    async function fetchUserImages() {
      if (pagePath) {
        // pagePathが存在する場合のみクエリを実行
        const { data, error } = await supabase
          .from("Image")
          .select("url,userId,title,description")
          .eq("id", pagePath);

        const { data: userData, error: userError } = await supabase
          .from("User")
          .select("id,image,name");

        if (error) {
          console.error("Error fetching user images:", error);
        } else {
          setImageData(data);
        }

        if (userError) {
          console.error("Error fetching data from users:", userError);
        } else {
          setUserProps(userData);
        }
      }
    }

    fetchUserImages();
  }, [pagePath]);

  if (!imageData) {
    return <div>Loading now...</div>;
  }

  return (
    <div className="p-10">
      <div className="relative w-4/6 h-[60vh] bg-gray-300">
        <Image
          src={imageData.length > 0 ? imageData[0].url : "/ImageGallery-30.png"}
          alt="ユーザーが投稿した画像"
          className="object-contain w-full h-full"
          fill
        />
      </div>
      <div className="p-5">
        <p className="text-3xl font-bold mb-4">
          {imageData.length > 0 ? imageData[0].title : "ダミータイトル"}
        </p>
        <p className="text-xl text-gray-800 mb-6">
          {imageData.length > 0
            ? imageData[0].description
            : "ディスクリプションの文章がここに入ります"}
        </p>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 relative">
            <Link href={`/userprofile/${matchingUser?.id}`}>
              <Image
                src={matchingUser?.image as string}
                alt="ユーザーのアイコン"
                className="rounded-full"
                layout="fill"
              />
            </Link>
          </div>
          <p className="text-lg font-semibold">{matchingUser?.name}</p>
        </div>
      </div>
    </div>
  );
};
export default ImageDetail;
