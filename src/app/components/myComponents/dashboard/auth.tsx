"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react"; 
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Auth() {
  const { data: session } = useSession();

  return (
    <div className="z-20">
      <div className="flex items-center flex-col text-center p-3">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="ユーザーアイコン"
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
        {session && (
          <>
            <p className="text-3xl">{session.user?.name}</p>
            <p>ユーザーID:{session.user?.id}</p>
            <button
              onClick={() => signOut()}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" // Enhanced styling for logout button
            >
              <LogOut className="mr-2 -ml-1 h-5 w-5" /> {/* Adding a logout icon */}
              ログアウト
            </button>
          </>
        )}
        {!session && (
          <div>
            <FontAwesomeIcon
              icon={faUser}
              className="text-gray-800 text-5xl bg-gray-400 p-3 rounded-full aspect-square"
            />
            <p className="text-5xl font-medium">名無し</p>

            <p>
              ログインすると「いいね」「お気に入り」などの機能が開放されます👏
            </p>
            <button
              onClick={() => signIn()}
              className="text-gray-600 hover:text-gray-800 px-4 py-2"
            >
              ログイン
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
