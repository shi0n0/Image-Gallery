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
      if (userId) {
        // ユーザーIDが存在する場合のみクエリを実行
        const { data, error } = await supabase
          .from('Image')
          .select('*')
          .eq('userId', userId);

        if (error) {
          console.error('Error fetching user images:', error);
          console.log(data)
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
            src={image.image_url}
            alt={`User Image ${index}`}
            width={500}
            height={300}
          />
          <p>{image.image_url}</p>
        </div>
      ))}
    </main>
  );
}
