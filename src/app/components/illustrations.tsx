"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import supabase from "../utils/supabase";

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

  useEffect(() => {
    async function fetchUserImages() {
      if (pagePath) {
        // pagePathが存在する場合のみクエリを実行
        const { data, error } = await supabase
          .from("Image")
          .select("url,userId,title,description")
          .eq("id", pagePath);

        if (error) {
          console.error("Error fetching user images:", error);
        } else {
          setImageData(data);
          console.log(imageData);
        }
      }
    }

    fetchUserImages();
  }, [pagePath]);

  if (!imageData) {
    return <div>Loading now...</div>;
  }

  return (
    <div className="p-20">
      <div className="relative w-3/5 h-[70vh] bg-gray-300">
        <Image
          src={imageData.length > 0 ? imageData[0].url : "/ImageGallery-30.png"}
          alt="ユーザーが投稿した画像"
          className="object-contain w-full h-full"
          fill
        />
      </div>
      <div className="p-10">
        <p className="text-5xl pb-1">{imageData.length > 0 ? imageData[0].title : "貴様！見ているなッ！"}</p>
        <p className="text-2xl text-gray-800 px-1">{imageData.length > 0 ? imageData[0].description : "ロードローラーだぁああああああああ！！！！！！！"}</p>
      </div>
    </div>
  );
};
export default ImageDetail;
