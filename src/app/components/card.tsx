"use client";

import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Card() {
  const { data: session } = useSession();
  const [userImages, setUserImages] = useState<
    { url: string; title: string }[]
  >([]);
  const userId = session?.user?.id;

  useEffect(() => {
    async function fetchUserImages() {
      if (userId) {
        // ユーザーIDが存在する場合のみクエリを実行
        const { data, error } = await supabase
          .from("Image")
          .select("url,title")
          .eq("userId", userId);

        if (error) {
          console.error("Error fetching user images:", error);
        } else {
          setUserImages(data);
        }
      }
    }

    fetchUserImages();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userImages.map((image, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md">
          <Link
          href="profile" //詳細ページ未作成のため仮に/profileとする
          >
            <div className="relative h-0 pb-[75%]">
              <Image
                src={image.url}
                alt={`User Image ${index}`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold">{image.title}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
