"use client"

import { useEffect, useState } from 'react';
import supabase from './utils/supabase';
import Image from 'next/image';
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  const [userImages, setUserImages] = useState<{ image_url: string }[]>([]);
  const userId = session?.user?.id

  useEffect(() => {
    async function fetchUserImages() {
      const { data, error } = await supabase
        .from('Image')
        .select('image_url')
        .eq('user_id', userId); // ユーザーIDに基づいてフィルタリング

      if (error) {
        console.error('Error fetching user images:', error);
      } else {
        setUserImages(data);
      }
    }

    fetchUserImages();
  }, [userId]);

  return (
    <main>
      {userImages.map((image, index) => (
        <div key={index}>
          <Image
            src={image.image_url}
            alt={`User Image ${index}`}
            width={500}
            height={300}
          />
        </div>
      ))}
    </main>
  );
}
