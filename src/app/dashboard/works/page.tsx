"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import ProfileCard from "../../components/myComponents/myProfileCard";
import MyHeader from "../../components/myComponents/myHeader";

export default function Works() {
  const { data: session } = useSession();

  return (
    <div>
      <MyHeader />
      <ProfileCard />
    </div>
  );
}
