"use client"
import { ChangeEvent } from "react";
import supabase from "../utils/supabase";

export default function Profile() {

  const handleUpload = async (e:ChangeEvent<HTMLInputElement>) => {
    let file;

    if (e.target.files){
      file = e.target.files[0];
    }

    const { data, error } = await supabase.storage
      .from("Images")
      .upload("Public-" + file?.name, file as File)
    
    if (data) {
      console.log(data)
    } else if (error) {
      console.log(error)
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
          onChange={(e) => 
            handleUpload(e)
          }
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="タイトル"
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="概要"
          className="border p-2 w-full h-24"
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        送信
      </button>
    </div>
  );
}