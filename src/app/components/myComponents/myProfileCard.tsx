import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfileCard() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [userImages, setUserImages] = useState<
    { id: string; url: string; title: string; userId: string }[]
  >([]);

  useEffect(() => {
    async function fetchUserImages() {
      if (!userId) return;

      const { data, error } = await supabase
        .from("Image")
        .select("id, url, title, userId")
        .eq("userId", userId);

      if (error) {
        console.error("ユーザー画像の取得エラー:", error);
      } else {
        setUserImages(data);
      }
    }

    fetchUserImages();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {userImages.map((image, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 hover:scale-105"
        >
          <Link href={`illustrations/${image.id}`}>
            <div className="relative pb-[65%]">
              <Image
                src={image.url}
                alt={`User Image ${index}`}
                layout="fill"
                objectFit="cover"
                quality={75}
              />
            </div>
          </Link>
          <div className="p-4">
            <p className="text-xl font-semibold">{image.title}</p>
            <Link href={`/userprofile/${image.userId}`}>
              <div className="flex items-center mt-2">
                <Image
                  src={session?.user?.image || "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"}
                  alt="User Icon"
                  objectFit="cover"
                  className="rounded-full mr-2"
                  width={40}
                  height={40}
                />
                <p className="text-lg">{session?.user?.name}</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
