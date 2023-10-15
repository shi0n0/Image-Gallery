"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import ProfileCard from "../../components/myComponents/myProfileCard";
import DragDrop from "../../components/myComponents/myHeader";

export default function MyProfile() {
  const { data: session } = useSession();

  return (
    <div>
      <DragDrop />
      <ProfileCard />
    </div>
  );
}
