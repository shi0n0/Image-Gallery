"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <nav className="bg-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href={"/"} passHref>
            <p className="text-2xl font-bold rounded text-white bg-custom-pink px-3 py-1">
              ImageGallery
            </p>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href={"/"}>
              <p className={`text-gray-600 hover:text-gray-800 px-4 py-2 ${pagePath == '/' ? "border-b-4 border-custom-pink" : ""}`}>
                ホーム
              </p>
            </Link>
            <Link href={"/upload"}>
              <p className={`text-gray-600 hover:text-gray-800 px-4 py-2 ${pagePath == '/upload' ? "border-b-4 border-custom-pink" : ""}`}>
                投稿する
              </p>
            </Link>
            <Link href={"/settings"}>
            <p className={`text-gray-600 hover:text-gray-800 px-4 py-2 ${pagePath == '/settings' ? "border-b-4 border-custom-pink" : ""}`}>
                設定
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
