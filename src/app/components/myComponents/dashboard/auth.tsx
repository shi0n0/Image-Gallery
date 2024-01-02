"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
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
          <button
            onClick={() => signOut()}
            className="text-gray-600 hover:text-gray-800 px-4 py-2"
          >
            <p>ログアウト</p>
          </button>
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
              <p>ログイン</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
