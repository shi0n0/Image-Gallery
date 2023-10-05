import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import Auth from "./auth";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file: React.SetStateAction<null>) => {
    setFile(file);
  };

  return (
    <div className="relative w-full h-60 flex justify-center z-10">
      <Image
        src="/ImageGallery-30.png"
        alt="デフォルトヘッダー"
        objectFit="cover"
        className="opacity-50"
        fill
      />
      <Auth />
      <div className="absolute bottom-5 right-5 z-20">
        <label
          htmlFor="fileInput"
          className="px-4 py-3.5 bg-gray-300 rounded-full cursor-pointer opacity-50 hover:opacity-100"
        >
          ＋
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>
      </div>
    </div>
  );
}

export default DragDrop;
