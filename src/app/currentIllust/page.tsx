"use client";

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
  postedAt: string;
}

interface User {
  id: number;
  name: string;
  image: string;
}


export default function CurrentIllust() {
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [sortOption, setSortOption] = useState("latest"); // 最新順をデフォルトとする

  // ソートオプションの変更を処理する関数
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  useEffect(() => {
    const fetchIllustrations = async () => {
      const { data: illustrationsData, error: illustrationsError } =
        await supabase
          .from("Image")
          .select("id, url, title, userId, postedAt")
          .order("postedAt", { ascending: false });

      if (illustrationsError) {
        console.error("Error fetching illustrations", illustrationsError);
      } else {
        setIllustrations(illustrationsData);
        if (illustrationsData && illustrationsData.length > 0) {
          // ユニークなユーザーIDのリストを作成
          const userIds = [
            ...new Set(illustrationsData.map((illust) => illust.userId)),
          ];
          // すべてのユーザー情報を取得
          fetchUsers(userIds);
        }
      }
    };

    const fetchUsers = async (userIds: number[]) => {
      const { data: usersData, error: usersError } = await supabase
        .from("User")
        .select("name, image, id")
        .in("id", userIds);

      if (usersError) {
        console.error("Error fetching users", usersError);
      } else {
        setUser(usersData);
      }
    };

    fetchIllustrations();
  }, []);

  // 新しい投稿かどうかを判断する関数
  const isRecent = (postedAt: string) => {
    const postedDate = new Date(postedAt);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return postedDate > oneWeekAgo;
  };

  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 描画部分
  return (
    <PaddingContainer>
      <div className="sort-options flex justify-end items-center px-10 my-4">
        <label htmlFor="sort" className="mr-2 text-lg font-medium">
          ソート:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="latest">最新順</option>
          <option value="old">古い順</option>
          <option value="likes">いいね順</option>
          <option value="comment">コメント順</option>
        </select>
      </div>

      <GridContainer>
        {illustrations.map((illust) => {
          // 対応するユーザー情報を検索
          const userProfile = user.find((u) => u.id === illust.userId);

          return (
            <Link key={illust.id} href={`/illustrations/${illust.id}`}>
              <div className="...">
                {/* Image component */}
                <div className="relative aspect-square">
                  <Image
                    src={illust.url}
                    alt={`ユーザー画像 | ${illust.title}`}
                    objectFit="cover"
                    quality={10}
                    className="sm:rounded-lg hover:opacity-95 transition-opacity"
                    fill
                  />
                  <div className="absolute top-2 right-2">
                    {isRecent(illust.postedAt) && (
                      <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                        New
                      </span>
                    )}
                  </div>
                </div>
                {/* Title and user info */}
                <div className="py-1 px-2">
                  <h2 className="font-semibold text-gray-800 truncate">
                    {illust.title}
                  </h2>
                  <p className="text-gray-600 text-sm ml-1 hover:text-black">
                    {formatDate(illust.postedAt)}
                  </p>
                  {/* User Profile Link */}
                  <Link href={`/userprofile/${userProfile?.id}`}>
                    <div className="flex items-center cursor-pointer">
                      <Image
                        src={userProfile?.image || "/ImageGallery.png"}
                        alt="ユーザーアイコン"
                        objectFit="cover"
                        className="w-6 h-6 rounded-full"
                        width={24}
                        height={24}
                      />
                      <p className="text-gray-600 text-sm ml-1 hover:text-black">
                        {userProfile?.name || "Unknown"}
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
