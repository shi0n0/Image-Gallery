"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

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
  const router = useRouter();
  const userImage =
    session?.user?.image ||
    "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${searchKeyword}`);
  };;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };
  const toggleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 font-sans">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-2">
          <Link href={"/"} passHref className="px-3">
            <p className="text-2xl font-bold rounded text-white bg-custom-pink px-3 py-1">
              ImageGallery
            </p>
          </Link>
          <form className="flex-grow max-w-2xl mx-auto">
            <div className="relative w-full">
              <form onSubmit={handleSearch}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <input type="submit" value="検索" />

                {/* Linkコンポーネントを使用して次のページに検索ワードを渡す */}
                <Link href={`/search?keyword=${searchKeyword}`}>
                  <a>検索結果を表示</a>
                </Link>
              </form>
            </div>
          </form>
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
          <div className="sm:hidden px-4">
            <button onClick={toggleMobileMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div>
            <div
              className="sm:hidden w-screen h-screen fixed transition-transform transform translate-x-0 z-2 bg-black opacity-20"
              onClick={toggleMobileMenuClose}
            ></div>
            <div className="sm:hidden bg w-2/3 h-screen fixed top-0 right-0 bg-white transition-transform transform translate-x-0 z-50">
              <div className="sm:hidden flex items-center justify-end px-4 py-5">
                <button onClick={toggleMobileMenuClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center space-y-4 py-4">
                <Link href={"/"} onClick={toggleMobileMenuClose}>
                  <p
                    className={`text-gray-600 hover:text-gray-800 ${getNavLinkStyles(
                      "/",
                      pagePath
                    )}`}
                  >
                    ホーム
                  </p>
                </Link>
                <Link href={"/upload"} onClick={toggleMobileMenuClose}>
                  <p
                    className={`text-gray-600 hover:text-gray-800 ${getNavLinkStyles(
                      "/upload",
                      pagePath
                    )}`}
                  >
                    投稿する
                  </p>
                </Link>
                <Link href={"/settings"} onClick={toggleMobileMenuClose}>
                  <p
                    className={`text-gray-600 hover:text-gray-800 ${getNavLinkStyles(
                      "/settings",
                      pagePath
                    )}`}
                  >
                    設定
                  </p>
                </Link>
                {session && <UserLink href="/dashboard" src={userImage} />}
                {!session && <UserLink href="/dashboard" src={userImage} />}
              </div>
            </div>
          </div>
        )}
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
