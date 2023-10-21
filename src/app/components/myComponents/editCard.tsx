"use client"

import React, { useState, useEffect } from "react";
import supabase from "@/app/utils/supabase";
import { useSession } from "next-auth/react";
import { useRouter,usePathname } from 'next/navigation'

const EditImagePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const getPagePath = usePathname();
  const imageId = getPagePath.replace("/dashboard/edit/", "");
  const [imageData, setImageData] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {

    const fetchImageData = async () => {
      const { data, error } = await supabase.from("Image").select("*").eq("id", imageId).single();
  
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

    // Update image data in Supabase
    const { error } = await supabase.from("Image").update({
      title,
      description,
    }).eq("id", imageId);

    if (error) {
      console.error("アップデートに失敗:", error);
    } else {
      console.log("アップデートに成功");
    }
  };

  const handleDelete = async () => {
    // Delete image data in Supabase
    const { error } = await supabase.from("Image").delete().eq("id", imageId);

    if (error) {
      console.error("削除に失敗:", error);
    } else {
      console.log("削除に失敗");
      // Redirect to a different page after deletion
      router.push("/dashboard/edit");
    }
  };

  return (
    <div>
      <h1>Edit Image Page</h1>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={imageData.title}
          onChange={(e) => setImageData({ ...imageData, title: e.target.value })}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={imageData.description}
          onChange={(e) => setImageData({ ...imageData, description: e.target.value })}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EditImagePage;
