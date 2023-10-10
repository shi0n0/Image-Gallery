"use client";

import supabase from "@/app/utils/supabase";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Auth from "../myComponents/auth";

export default function UserHeader() {
  const [userHeader, setUserHeader] = useState("");
  const [userProps, setUserProps] = useState<{ id: string; image: string; name: string }[]>([]);
  const getPagePath = usePathname();
  const userId = getPagePath.replace("/userprofile/", "");

  useEffect(() => {
    async function fetchuserHeader() {
      const { data: headerData, error: headerError } = await supabase // ヘッダー画像の取得
        .from("Header")
        .select("url")
        .eq("userId", userId);
  
      const { data: userData, error: userError } = await supabase
        .from("User")
        .select("id, image, name")
        .eq("id", userId);
  
      if (headerError) {
        console.error("ヘッダー画像の取得エラー:", headerError);
      } else {
        const headerImageUrl =
          headerData.length > 0 ? headerData[0].url : "/ImageGallery-30.png";
        setUserHeader(headerImageUrl);
      }
  
      if (userError) {
        console.error("ユーザー情報の取得エラー:", userError);
      } else {
        setUserProps(userData);
      }
    }
    fetchuserHeader();
  }, [userId]);
  
  
  return (
    <div>
      <div className="relative w-full h-60 flex justify-center z-0">
        <Image
          src={userHeader || "/ImageGallery-30.png"}
          alt="デフォルトヘッダー"
          objectFit="cover"
          className="opacity-50"
          fill
        />
        <div className="z-10 p-3 flex items-center flex-col">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src={userProps.length > 0 ? userProps[0].image : "/default-image.png"}
              alt="ユーザーアイコン"
              objectFit="cover"
              className="rounded-full"
              fill
            />
          </div>
          <p className="text-5xl font-midium">{userProps.length > 0 ? userProps[0].name : "名無し"}</p>
        </div>
      </div>
    </div>
  );
}
