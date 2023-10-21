"use client"

import { ChangeEvent, useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function Upload() {
  const { data: session } = useSession()
  const router = useRouter()


const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    // クライアントサイドでのみ実行する初期化コードをここに配置
    setSelectedImage(new File([], ""));
  }, []);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!selectedImage) {
      console.error("画像が選択されていません。");
      return;
    }

    const filePath = `${selectedImage.name}`;

    // 画像をストレージにアップロード
    const { error: storageError } = await supabase.storage
      .from('Images')
      .upload(filePath, selectedImage);

    if (storageError) {
      console.error('ストレージエラー:', storageError.message);
      return;
    }

    // 画像のURLを取得
    const { data } = await supabase.storage.from('Images').getPublicUrl(filePath);
    const imageUrl = data.publicUrl;

    const userId = session?.user?.id

    // 画像のURL、タイトル、および概要をDBに保存
    const { error: databaseError } = await supabase
      .from('Image')
      .insert([
        { url: imageUrl, userId: userId, title: title, description: description }
      ]);

    if (databaseError) {
      console.error('データベースエラー:', databaseError.message);
    } else {
      console.log('データベースにデータを挿入しました。');
      router.push("/")
    }

    
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">画像をアップロード</h1>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          className="border p-2"
          id="file_input"
          onChange={handleImageChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="タイトル"
          className="border p-2 w-full"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="概要"
          className="border p-2 w-full h-24"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        送信
      </button>
    </div>
  );
}