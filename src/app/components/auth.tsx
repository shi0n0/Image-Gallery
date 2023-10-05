"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Auth() {
  const { data: session } = useSession();

  return (
    <div className="z-20">
      <div className="flex items-center flex-col text-center p-3">
        <Image
          src={
            session?.user?.image ||
            "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
          }
          alt="ユーザーアイコン"
          width={100}
          height={100}
          className="rounded-full"
        />
        <p className="text-5xl font-medium">{session?.user?.name || "名無し"}</p>
      {session && 
      <button
      onClick={() => signOut()}
      className="text-gray-600 hover:text-gray-800 px-4 py-2"
      >
        <p>ログアウト</p>
      </button>}
      {!session && (
        <div>
            <p>ログインすると「いいね」「お気に入り」などの機能が開放されます👏</p>
          <button
            onClick={() => signIn()}
            className="text-gray-600 hover:text-gray-800 px-4 py-2"
          >
            <p>ログイン</p>
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
