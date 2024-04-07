"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Auth from "./auth";
import { useSession } from "next-auth/react";
import supabase from "../../../utils/supabase";
import { useRouter } from "next/navigation";

function MyHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const [header, setHeader] = useState<File | null>(null);
  const [userHeaders, setUserHeaders] = useState<{ url: string }[]>([]);
  const userId = session?.user?.id;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch user headers on initial render
  useEffect(() => {
    async function fetchUserHeaders() {
      if (userId) {
        const { data, error } = await supabase
          .from("Header")
          .select("url")
          .eq("userId", userId);

        if (error) {
          console.error("Error fetching user images:", error);
        } else {
          setUserHeaders(data);
        }
      }
    }

    fetchUserHeaders();
  }, [userId]);

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

    // 既存のヘッダー画像を削除
    for (const userHeader of userHeaders) {
      const headerUrl = userHeader.url;

      if (headerUrl) {
        const headerFileName = headerUrl.split("/").pop();
        if (headerFileName) {
          const { error: deleteStorageError } = await supabase.storage
            .from("Headers")
            .remove([headerFileName]);

          const { error: deleteDatabaseError } = await supabase
            .from("Header")
            .delete()
            .eq("url", headerUrl);

          console.log(headerFileName);
          if (deleteStorageError) {
            console.error(
              "ヘッダー画像のストレージ削除エラー:",
              deleteStorageError.message
            );
          }
          if (deleteDatabaseError) {
            console.log(
              "ヘッダー画像のデータベース削除エラー:",
              deleteDatabaseError
            );
          }
        }
      }
    }

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
    const { error: databaseError } = await supabase.from("Header").insert([
      {
        url: imageUrl,
        userId: userId,
      },
    ]);

    if (databaseError) {
      console.error("データベースエラー:", databaseError.message);
    } else {
      router.refresh();
      console.log("データベースにデータを挿入しました。");
    }
    setIsPopupOpen(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative w-full h-60 flex justify-center z-10">
      <Image
        src={
          userHeaders.length > 0 ? userHeaders[0].url : "/ImageGallery-30.png"
        }
        alt="デフォルトヘッダー"
        objectFit="cover"
        className="opacity-50"
        fill
      />
      <Auth />
      <div className="absolute bottom-5 right-5">
        <label
          htmlFor="fileInput"
          className="px-4 py-3.5 text-white bg-black rounded-full cursor-pointer opacity-10 transition-opacity duration-150 hover:opacity-50"
          onClick={(e) => {
            e.preventDefault(); // デフォルトの動作を抑制
            openPopup(); // ポップアップを開く
          }}
        >
          ＋
        </label>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">ヘッダー画像を更新</h2>
            <p className="text-red-500 mb-3">
              ヘッダーを更新すると前のヘッダーは完全に削除されます！
              <br />
              前のヘッダーが必要な方は右クリックから新規ページで画像を開くからダウンロードしてください。
              <br />
              ※ヘッダー更新後はリロードで表示されます！
            </p>
            <input
              type="file"
              accept="image/*"
              className="text-sm text-slate-500 file:mr-4 file:py-3 file:px-5
                         file:rounded-full file:border-0 file:text-sm file:font-semibold
                         file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              onChange={handleHeaderChange}
            />
            <div className="mt-5 flex justify-end gap-4">
              <button
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded"
                onClick={closePopup}
              >
                キャンセル
              </button>
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded"
                onClick={handleSave}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyHeader;
