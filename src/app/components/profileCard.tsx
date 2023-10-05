"use client";

import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfileCard() {
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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
      {userImages.map((image, index) => (
        <div key={index} className="bg-white shadow-md">
          <Link
          href="/profile" //詳細ページ未作成のため仮に/profileとする
          >
            <div className="relative rounded-none md:h-0 pb-[75%] overflow-hidden rounded-t-lg">
              <Image
                src={image.url}
                alt={`User Image ${index}`}
                layout="fill"
                objectFit="cover"
                quality={50}
                className="transition duration-300 hover:scale-110"
              />
            </div>
            <div className="relative p-4">
              <p className="text-3xl font-semibold">
              {image.title}
              </p>
                <div className="flex justify-end items-center">
                  <Image
                  src={session?.user?.image || 'https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png'}
                  alt="User Icon" 
                  objectFit="cover"
                  className="rounded-none md:rounded-full mr-1"
                  width={40}
                  height={40}
                  />
                  <p className="text-2xl">{session?.user?.name}</p>
                </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
