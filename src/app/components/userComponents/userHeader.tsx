"use client";

import supabase from "@/app/utils/supabase";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserHeader() {
  const [userHeader, setUserHeader] = useState("");
  const getPagePath = usePathname();
  const userId = getPagePath.replace("/userprofile/", "");

  useEffect(() => {
    async function fetchuserHeader() {
      const { data, error } = await supabase // URLのユーザーIDをもとにヘッダーを取得
        .from("Header")
        .select("url")
        .eq("userId", userId);

      if (error) {
        console.error(error);
      } else {
        const headerImageUrl =
          data.length > 0 ? data[0].url : "/ImageGallery-30.png";
        setUserHeader(headerImageUrl);
      }
    }
    fetchuserHeader();
  }, [userId]);

  console.log(userHeader);

  return (
    <div>
      <div>ユーザーヘッダー</div>
      <Image
        src={userHeader || "/ImageGallery-30.png"}
        alt="デフォルトヘッダー"
        objectFit="cover"
        className="opacity-50"
        fill
      />
    </div>
  );
}
