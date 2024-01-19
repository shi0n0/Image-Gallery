"use client"

import GridContainer from "../components/commonComponents/container/gridContainer";
import PaddingContainer from "../components/commonComponents/container/paddingCotainer";
import Link from "next/link";
import Image from "next/image";
import supabase from "../utils/supabase";
import { useState } from "react";
import { useEffect } from "react";

interface Illustration {
  id: number;
  url: string;
  title: string;
  userId: number;
}

interface User {
  name: string;
  image: string;
}

export default function CurrentIllust() {
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const [user, setUser] = useState<User[]>([]); // 型を指定

  useEffect(() => {
    const fetchIllustrations = async () => {
      const { data:illustrationsData, error:illustrationsError } = await supabase
        .from("Image")
        .select("id, url, title, userId")
        .order("postedAt", { ascending: false });

      if (illustrationsError) {
        console.error("Error fetching illustrations", illustrationsError);
      } else {
        setIllustrations(illustrationsData);
      }
    };

    const fetchUser = async () => {
      const {data:userData,error} = await supabase
        .from("User")
        .select("name, image")

      if (error) {
        console.error("Error fetching user", error);
      } else {
        setUser(userData)
      }

    }

    fetchIllustrations();
    fetchUser();
  }, []);

  return (
    <PaddingContainer>
      <GridContainer>
        {illustrations.map((illust) => (
          <Link key={illust.id} href={`illustrations/test`}>
            <div className="sm:rounded-lg sm:p-2 duration-150 sm:hover:-translate-y-1.5 active:bg-gray-100  active:duration-0">
              <div className="relative aspect-square">
                <Image
                  src={illust.url}
                  alt={`ユーザー画像 | ${illust.id}`}
                  objectFit="cover"
                  quality={10}
                  className="sm:rounded-lg hover:opacity-95 transition-opacity"
                  fill
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                    New
                  </span>
                </div>
              </div>

              <div className="py-1 px-2">
                <h2 className="font-semibold text-gray-800 truncate">
                  {illust.title}
                </h2>

                <Link href={`/userprofile/username`}>
                  <div className="flex items-center">
                    <Image
                      src={"/ImageGallery.png"}
                      alt="ユーザーアイコン"
                      objectFit="cover"
                      className="w-6 h-6 rounded-full"
                      width={20}
                      height={20}
                    />
                    <p className="text-gray-600 text-sm ml-1 hover:text-black">
                      {illust?.userId || "Unknown"}
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
