"use client"

import { useEffect, useState } from 'react';
import supabase from './utils/supabase';
import Image from 'next/image';
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  const [userImages, setUserImages] = useState<{ url: string, title: string }[]>([]);
  const userId = session?.user?.id

  useEffect(() => {
    async function fetchUserImages() {
      if (userId) {
        // ユーザーIDが存在する場合のみクエリを実行
        const { data, error } = await supabase
          .from('Image')
          .select('url,title')
          .eq('userId', userId);

        if (error) {
          console.error('Error fetching user images:', error);
        } else {
          setUserImages(data);
        }
      }
    }

    fetchUserImages();
  }, [userId]);

  return (
    <main>
      {userImages.map((image, index) => (
        <div key={index}>
          <Image
            src={image.url}
            alt={`User Image ${index}`}
            width={500}
            height={300}
          />
          <p>{image.title}</p>
        </div>
      ))}
    </main>
  );
}
