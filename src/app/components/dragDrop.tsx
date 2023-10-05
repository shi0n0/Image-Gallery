"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Auth from "./auth";
import { useSession } from "next-auth/react";
import supabase from "../utils/supabase";
import router from "next/router";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {
  const { data: session } = useSession();
  const [header, setHeader] = useState<File | null>(null);
  const [userHeaders, setUserHeaders] = useState<
    { url: string }[]
  >([]);
  const userId = session?.user?.id;

  useEffect(() => {
    // クライアントサイドでのみ実行する初期化コードをここに配置
    setHeader(new File([], ""));
  }, []);
  const handleHeaderChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setHeader(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!header) {
      console.error("ヘッダー画像が選択されていません！");
      return;
    }

    const filePath = `${header.name}`;

    // 画像をストレージにアップロード
    const { error: storageError } = await supabase.storage
      .from("Headers")
      .upload(filePath, header);

    if (storageError) {
      console.error("ストレージエラー:", storageError.message);
      return;
    }

    // 画像のURLを取得
    const { data } = await supabase.storage
      .from("Headers")
      .getPublicUrl(filePath);
    const imageUrl = data.publicUrl;

    const userId = session?.user?.id;

    // 画像のURLをDBに保存
    const { error: databaseError } = await supabase
      .from("Header")
      .insert([
        {
          url: imageUrl,
          userId: userId,
        },
      ]);

    if (databaseError) {
      console.error("データベースエラー:", databaseError.message);
    } else {
      console.log("データベースにデータを挿入しました。");    }
  };

  useEffect(() => {
    async function fetchUserHeaders() {
      if (userId) {
        // ユーザーIDが存在する場合のみクエリを実行
        const { data, error } = await supabase
          .from("Header")
          .select("url")
          .eq("userId", userId);

        if (error) {
          console.error("Error fetching user images:", error);
        } else {
          setUserHeaders(data);
          console.log(userHeaders)
        }
      }
    }

    fetchUserHeaders();
  }, [userId]);

  return (
    <div className="relative w-full h-60 flex justify-center z-0">
      <Image
        src={userHeaders.length > 0 ? userHeaders[0].url : "/ImageGallery-30.png"}
        alt="デフォルトヘッダー"
        objectFit="cover"
        className="opacity-50"
        fill
      />
      <Auth />
      <div className="absolute bottom-5 right-5 z-20">
        <label
          htmlFor="fileInput"
          className="px-4 py-3.5 text-white bg-black rounded-full cursor-pointer opacity-10 transition-opacity duration-150 hover:opacity-50"
          onChange={handleSave}
        >
          ＋
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleHeaderChange}
          />
        </label>
      </div>
    </div>
  );
}

export default DragDrop;
