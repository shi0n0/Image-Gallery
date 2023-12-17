"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./seachBar";
import Sidebar from "./leftbar";

interface NavLinkProps {
  href: string;
  text: string;
}

interface UserLinkProps {
  href: string;
  src: string;
}

export default function Navbar() {
  const pagePath = usePathname();
  const { data: session } = useSession();
  const userImage =
    session?.user?.image ||
    "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png";

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 font-sans">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-2">
        <Sidebar />
          <Link href={"/"} passHref>
            <p className="text-2xl font-bold rounded text-white bg-custom-pink px-3 py-1">
              ImageGallery
            </p>
          </Link>
          {pagePath !== "/search" && <SearchBar initialValue="" />}
          <div className="hidden sm:flex items-center space-x-4">
            <Link href={"/upload"}>
              <p
                className={`text-gray-600 hover:text-gray-800 ${getNavLinkStyles(
                  "/upload",
                  pagePath
                )}`}
              >
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className="p-3 mx-2 rounded-full duration-150 hover:bg-gray-100 active:text-custom-pink active:duration-0"
                />
              </p>
            </Link>
            {session && <UserLink href="/dashboard" src={userImage} />}
            {!session && <UserLink href="/dashboard" src={userImage} />}
          </div>
        </div>
      </div>
    </nav>
  );
}

function UserLink({ href, src }: UserLinkProps) {
  return (
    <Link href={href} passHref>
      <p className="relative">
        <Image
          src={src}
          alt="ユーザーアイコン"
          width={40}
          height={40}
          className="rounded-full transition duration-300 transform hover:scale-110"
        />
      </p>
    </Link>
  );
}

function getNavLinkStyles(linkPath: string, currentPath: string): string {
  return linkPath === currentPath
    ? "text-gray-800 border-b-4 border-custom-pink px-4 py-1"
    : "px-4 py-1";
}
