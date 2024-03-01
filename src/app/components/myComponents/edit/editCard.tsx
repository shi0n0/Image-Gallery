"use client";

import React, { useState, useEffect } from "react";
import supabase from "@/app/utils/supabase";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const EditImagePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const imageId = usePathname()
    .split("/dashboard/edit/")[1]
    ?.replace(/%7D/g, "");
  const [imageData, setImageData] = useState({
    id: "",
    title: "",
    description: "",
    url: "",
    tags: "Tag1, Tag2", // プレースホルダータグ
  });

  useEffect(() => {
    const fetchImageData = async () => {
      const { data, error } = await supabase
        .from("Image")
        .select("*")
        .eq("id", imageId)
        .single();

      if (error) {
        console.error("フェッチングに失敗:", error);
      } else {
        setImageData(data);
      }
    };

    fetchImageData();
  }, [imageId]);

  const handleSave = async () => {
    const { title, description } = imageData;

    // Supabaseに画像データをアップデート
    const { error } = await supabase
      .from("Image")
      .update({
        title,
        description,
      })
      .eq("id", imageId);

    if (error) {
      console.error("アップデートに失敗:", error);
    } else {
      console.log("アップデートに成功");
      await router.push("/dashboard/edit");
    }
  };

  const handleDelete = async () => {
    // Supabaseから画像データを削除
    const { error } = await supabase.from("Image").delete().eq("id", imageId);

    if (error) {
      console.error("削除に失敗:", error);
    } else {
      console.log("削除に成功");
      // 削除に成功した場合editページに飛ぶ
      await router.push("/dashboard/edit");
    }
  };

  return (
    <div className="p-4 bg-gray-50 h-[80vh]">
      <div className="flex flex-col md:flex-row w-full gap-2 h-full">
        {/* Image Preview */}
        <div className="w-full relative h-full bg-gray-200 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={imageData.url}
            alt="プレビュー"
            className="w-full h-full object-contain p-2"
            layout="fill"
          />
        </div>

        {/* Form */}
        <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
          {/* Title */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">タイトル:</label>
            <input
              type="text"
              value={imageData.title}
              onChange={(e) =>
                setImageData({ ...imageData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">タグ:</label>
            <input
              type="text"
              value={imageData.tags}
              onChange={(e) =>
                setImageData({ ...imageData, tags: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">概要や詳細など:</label>
            <textarea
              value={imageData.description}
              onChange={(e) =>
                setImageData({ ...imageData, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-2 justify-center pb-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 w-32"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 w-32"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditImagePage;
