"use client"

import supabase from "@/app/utils/supabase";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function UserProfileCard() {
  const getPagePath = usePathname();
  const userId = getPagePath.replace("/userprofile/", "");
  const [userImages, setUserImages] = useState<
    { id: string; url: string; title: string }[]
  >([]);
  const [userAccounts, setUserAccounts] = useState<
    { id: string; image: string; name: string }[]
  >([]);

  useEffect(() => {
    async function fetchUserData() {
      if (userId) {
        // ユーザー画像データの取得
        const { data: userImageData, error: userImageError } = await supabase
          .from("Image")
          .select("id,url,title")
          .eq("userId", userId);

        // ユーザーアカウントデータの取得
        const { data: userAccountData, error: userAccountError } = await supabase
          .from("User")
          .select("id,image,name")
          .eq("id", userId);

        if (userImageError) {
          console.error("ユーザー画像の取得エラー:", userImageError);
        } else {
          setUserImages(userImageData);
        }

        if (userAccountError) {
          console.error("ユーザーアカウントの取得エラー", userAccountError);
        } else {
          setUserAccounts(userAccountData);
        }
      }
    }

    fetchUserData();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
      {userImages.map((image, index) => {

      const userAccount = userAccounts.find((account) => account.id === userId);

        return (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link href={`/illustrations/${image.id}`}>
              <div className="relative pb-[75%]">
                <Image
                  src={image.url}
                  alt={`User Image ${index}`}
                  layout="fill"
                  objectFit="cover"
                  quality={50}
                  className="transition duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <p className="text-2xl font-semibold">{image.title}</p>
                <Link href={`/userprofile/${userAccount?.id}`}>
                  <div className="flex justify-end items-center mt-2">
                    <Image
                      src={userAccount?.image || "デフォルトのアイコンURL"}
                      alt="User Icon"
                      objectFit="cover"
                      className="rounded-full mr-2"
                      width={40}
                      height={40}
                    />
                    <p className="text-xl">{userAccount?.name || "Unknown"}</p>
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
