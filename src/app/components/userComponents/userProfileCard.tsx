"use client";

import supabase from "@/app/utils/supabase";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GridContainer from "../commonComponents/gridContainer";
import PaddingContainer from "../commonComponents/paddingCotainer";

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
        const { data: userAccountData, error: userAccountError } =
          await supabase.from("User").select("id,image,name").eq("id", userId);

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
    <PaddingContainer>
      <GridContainer>
        {userImages.map((image, index) => {
          const userAccount = userAccounts.find(
            (account) => account.id === userId
          );

          return (
            <Link key={image.id} href={`/illustrations/${image.id}`}>
              <div className="bg-white rounded-lg shadow-md p-4 duration-150 hover:-translate-y-1.5 active:bg-gray-100  active:duration-0">
                <div className="relative w-full h-0 pb-[100%]">
                  <Image
                    src={image.url}
                    alt={`User Image ${index}`}
                    layout="fill"
                    objectFit="cover"
                    quality={50}
                    className="w-full h-full rounded-lg hover:opacity-95 transition-opacity"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                      New
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {image.title}
                  </h2>
                  <Link href={`/userprofile/${userAccount?.id}`}>
                    <div className="flex items-center mt-2">
                      <Image
                        src={
                          userAccount?.image ||
                          "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
                        }
                        alt="ユーザーアイコン"
                        objectFit="cover"
                        className="w-8 h-8 rounded-full"
                        width={40}
                        height={40}
                      />
                      <p className="text-gray-600 ml-2">
                        {userAccount?.name || "Unknown"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </Link>
          );
        })}
      </GridContainer>
    </PaddingContainer>
  );
}
