"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear,faRankingStar,faTachometerAlt,faFolderPlus,faQuestion } from "@fortawesome/free-solid-svg-icons";

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
      const shouldOpenSidebar = event.clientX <= 20;

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
          onClick={handleMouseLeave}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-white w-52 z-50 transition-transform transform duration-300 py-4 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-60"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* サイドバーの中身 */}
        {/* ロゴ兼トップページ遷移 */}
        <div>
          <div className="px-4">
            <Link href={"/"} passHref className="px-3">
              <p className="text-2xl text-center font-bold rounded text-white bg-custom-pink px-3 py-1">
                ImageGallery
              </p>
            </Link>
          </div>
          <p className="text-sm font-semibold text-gray-500 px-5">主要</p>
          {/* ランキング */}
          <Link
            href="/ranking"
            className="text-md text-gray-600 flex items-center px-4 py-2 hover:bg-gray-100"
            >
            <FontAwesomeIcon icon={faRankingStar} className="mx-2" />
            <p>ランキング</p>
          </Link>
          {/* ダッシュボード */}
          <Link
            href="/dashboard"
            className="text-md text-gray-500 flex items-center px-4 py-2 mb-4 hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="mx-2" />

            <p>ダッシュボード</p>
          </Link>
        </div>
        {/* ホームカテゴリ */}
        <p className="text-sm font-semibold text-gray-500 px-5">ホーム</p>
        <Link
          href="/"
          className="text-md text-gray-500 flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faFolderPlus} className="mx-2" />

          <p>最近のイラスト</p>
        </Link>

        <Link
          href="/"
          className="text-md text-gray-500 flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faQuestion} className="mx-2" />

          <p>穴埋め</p>
        </Link>

        <Link
          href="/"
          className="text-md text-gray-500 flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faQuestion} className="mx-2" />
          <p>穴埋め</p>
        </Link>
        <Link
          href="/options"
          className="text-md text-gray-500 flex items-center px-4 py-2 bottom-3 fixed w-full hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faGear} className="mx-2" />
          <p>設定</p>
        </Link>
      </div>

      {/* サイドバーの中身終了 */}
    </div>
  );
};

export default Sidebar;