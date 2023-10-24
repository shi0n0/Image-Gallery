"use client";

import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TabSwitch from "./tabSwitch";
import PaddingContainer from "../commonComponents/paddingCotainer";
import GridContainer from "../commonComponents/gridContainer";

export default function ProfileCard() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [userImages, setUserImages] = useState<
    { id: string; url: string; title: string; userId: string }[]
  >([]);

  useEffect(() => {
    async function fetchUserImages() {
      if (!userId) return;

      const { data, error } = await supabase
        .from("Image")
        .select("id, url, title, userId")
        .eq("userId", userId);

      if (error) {
        console.error("ユーザー画像の取得エラー:", error);
      } else {
        setUserImages(data);
      }
    }

    fetchUserImages();
  }, [userId]);

  return (
    <PaddingContainer>
      <p className="text-2xl mb-5 font-semibold text-gray-700">
        ダッシュボード
      </p>
      <TabSwitch />
      <GridContainer>
        {userImages.map((image, index) => (
          <Link key={image.id} href={`/illustrations/${image.id}`}>
            <div className="bg-white rounded-lg shadow-md p-4 duration-150 hover:-translate-y-1.5 active:bg-gray-100  active:duration-0">
              <div className="relative w-full h-0 pb-[100%]">
                <Image
                  src={image.url}
                  alt={`ユーザー画像 ${index}`}
                  objectFit="cover"
                  quality={10}
                  className="w-full h-full rounded-lg"
                  fill
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                    New
                  </span>
                </div>
                <Link href={`/dashboard/edit/${image.id}}`}>
                    <button className="absolute bottom-2 right-2 bg-gray-300 opacity-30 text-white p-3 rounded-full hover:opacity-60">
                      <Image
                        src="/pen-solid.svg"
                        alt="編集"
                        width={20}
                        height={20}
                      />
                    </button>
                  </Link>
              </div>

              <div className="mt-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {image.title}
                </h2>

                <Link href={`/userprofile/${image.userId}`}>
                  <div className="flex items-center">
                    <Image
                      src={
                        session?.user?.image ||
                        "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
                      }
                      alt="ユーザーアイコン"
                      objectFit="cover"
                      className="w-6 h-6 rounded-full"
                      width={20}
                      height={20}
                    />
                    <p className="text-gray-500 text-sm ml-1 hover:text-black">
                      {session?.user?.name || "Unknown"}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </GridContainer>
    </PaddingContainer>
  );
}
