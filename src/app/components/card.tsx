"use client"

import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import Image from 'next/image';
import { useSession } from "next-auth/react";

export default function Card() {
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
    <div>
      {userImages.map((image, index) => (
        <div key={index} className='relative w-96 h-80'>
          <Image
            src={image.url}
            alt={`User Image ${index}`}
            fill
          />
          <p>{image.title}</p>
        </div>
      ))}
    </div>
  );
}
