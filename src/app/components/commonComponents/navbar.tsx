"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  text: string;
}

interface UserLinkProps {
  href: string;
  src: string;
}

export default function Navbar() {
  const { data: session } = useSession();
  const userImage = session?.user?.image || 'https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href={"/"} passHref>
            <p className="text-2xl font-bold">
              ImageGallery
            </p>
          </Link>
          <div className="flex items-center space-x-4">
            <NavLink href={"/"} text="ホーム" />
            <NavLink href={"/upload"} text="投稿する" />
            <NavLink href="/settings" text="設定" />
            {session && <UserLink href="/myprofile" src={userImage} />}
            {!session && <UserLink href="/myprofile" src={userImage} />}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, text }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <p className="text-gray-600 hover:text-gray-800 px-4 py-2">{text}</p>
    </Link>
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
