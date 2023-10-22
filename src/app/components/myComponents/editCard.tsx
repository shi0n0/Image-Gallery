"use client";

import React, { useState, useEffect } from "react";
import supabase from "@/app/utils/supabase";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const EditImagePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const imageId = usePathname().split("/dashboard/edit/")[1]?.replace(/%7D/g, '');
  const [imageData, setImageData] = useState({
    id: "",
    title: "",
    description: "",
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
    }
  };


  const handleDelete = async () => {
    // Supabaseから画像データを削除
    const { error } = await supabase.from("Image").delete().eq("id",imageId);

    if (error) {
      console.error("削除に失敗:", error);
    } else {
      console.log(imageId);
      // 削除に成功した場合editページに飛ぶ
      await router.push("/dashboard/edit");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Edit Image Page</h1>
      <div className="mb-4">
        <label className="block">Title:</label>
        <input
          type="text"
          value={imageData.title}
          onChange={(e) =>
            setImageData({ ...imageData, title: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block">Description:</label>
        <textarea
          value={imageData.description}
          onChange={(e) =>
            setImageData({ ...imageData, description: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mr-2 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Save
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Delete
      </button>
    </div>
  );
};

export default EditImagePage;
