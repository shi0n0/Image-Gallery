"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabSwitch() {
  const getPagePath = usePathname();
  const pagePath = getPagePath.replace("/illustrations/", "");

  return (
    <div className="w-full mb-5">
      <Link
        className={`rounded-full py-2 px-4 m-2 duration-200 text-gray-500 hover:text-gray-800 ${
          pagePath == "/dashboard" ? "!text-gray-800 bg-gray-200" : ""
        }`}
        href="/dashboard"
      >
        ホーム
      </Link>
      <Link
        className={`rounded-full py-2 px-4 m-2 duration-200 text-gray-500 hover:text-gray-800 ${
          pagePath == "/dashboard/works" ? "!text-gray-800 bg-gray-200" : ""
        }`}
        href="/dashboard/works"
      >
        作品
      </Link>
      <Link
        className={`rounded-full py-2 px-4 m-2 duration-200 text-gray-500 hover:text-gray-800 ${
          pagePath == "/dashboard/edit"
            ? "!text-gray-800 bg-gray-200"
            : ""
        }`}
        href="/dashboard/edit"
      >
        管理
      </Link>
    </div>
  );
}
