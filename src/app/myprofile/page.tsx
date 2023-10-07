"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import ProfileCard from "../components/profileCard";
import DragDrop from "../components/dragDrop";

export default function MyProfile() {
  const { data: session } = useSession();

  return (
    <div>
      <DragDrop />
      <ProfileCard />
    </div>
  );
}
