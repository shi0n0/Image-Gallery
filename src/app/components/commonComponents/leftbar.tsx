"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const shouldOpenSidebar = event.clientX <= 40;

      const shouldCloseSidebar = event.clientX > 1000;

      if (shouldOpenSidebar || shouldCloseSidebar) {
        setIsSidebarOpen(shouldOpenSidebar);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      {/* オーバーレイ */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 transition-opacity duration-300 ease-in-out"
          onClick={handleMouseLeave} // オーバーレイをクリックするとサイドバーが閉じるように
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-white w-52 z-50 transition-transform transform duration-300 py-4 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-60"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="text-sm font-semibold text-gray-500 px-4">ホーム</p>
        <Link href="/" className="text-md text-gray-500 flex px-4 py-2 hover:bg-gray-100">
          <Image
            src={"/file-circle-plus-solid.svg"}
            alt="最近の投稿"
            width={20}
            height={20}
            className="text-gray-400 m-1"
           />
          <p>最近のイラスト</p>
        </Link>

        <Link href="/" className="text-md text-gray-500 flex px-4 py-2 hover:bg-gray-100">
          <Image
            src={"/file-circle-plus-solid.svg"}
            alt="最近の投稿"
            width={20}
            height={20}
            className="text-gray-400 m-1"
           />
          <p>穴埋め</p>
        </Link>

        <Link href="/" className="text-md text-gray-500 flex px-4 py-2 hover:bg-gray-100">
          <Image
            src={"/file-circle-plus-solid.svg"}
            alt="最近の投稿"
            width={20}
            height={20}
            className="text-gray-400 m-1"
           />
          <p>穴埋め</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
