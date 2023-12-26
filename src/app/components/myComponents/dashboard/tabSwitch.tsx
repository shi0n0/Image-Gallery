"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabSwitch() {
  const getPagePath = usePathname();
  const pagePath = getPagePath.replace("/illustrations/", "");

  return (
    <div className="w-full mb-5 flex">
      <Link
        className={`py-2 px-4 m-2 duration-200 text-gray-500 hover:text-gray-800 ${
          pagePath == "/dashboard"
            ? "!text-gray-800 border-b-4 border-custom-pink "
            : ""
        }`}
        href="/dashboard"
      >
        <p className={`${
          pagePath == "/dashboard"
            ? "transform -translate-y-1"
            : ""
        }`}>ホーム</p>
      </Link>
      <Link
        className={`py-2 px-4 m-2 duration-200 text-gray-500 hover:text-gray-800 ${
          pagePath == "/dashboard/works"
            ? "!text-gray-800 border-b-4 border-custom-pink "
            : ""
        }`}
        href="/dashboard/works"
      >
        <p className={`${
          pagePath == "/dashboard/works"
            ? "transform -translate-y-1"
            : ""
        }`}>作品</p>
      </Link>
      <Link
        className={`py-2 px-4 m-2 duration-200 text-gray-500 hover:text-gray-800 ${
          pagePath == "/dashboard/edit"
            ? "!text-gray-800 border-b-4 border-custom-pink "
            : ""
        }`}
        href="/dashboard/edit"
      >
        <p className={`${
          pagePath == "/dashboard/edit"
            ? "transform -translate-y-1"
            : ""
        }`}>管理</p>
      </Link>
    </div>
  );
}
