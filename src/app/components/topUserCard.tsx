"use client";

import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TopUserCard() {
  const { data: session } = useSession();
  const [userImages, setUserImages] = useState<
    { id: string; url: string; title: string; userId: string }[]
  >([]);
  const [userProps, setUserProps] = useState<
    { id: string; image: string; name: string }[]
  >([]);
  

  useEffect(() => {
    async function fetchUserImages() {
        const { data:imagesData, error:imagesError } = await supabase
          .from("Image")
          .select("id,url,title,userId")

        const { data:usersData, error:usersError} = await supabase
          .from("User")
          .select("id,image,name");

        if (imagesError) {
          console.error("Error fetching user images:", imagesError);
        } else {
          setUserImages(imagesData);
        }

        if (usersError) {
          console.error("Error fetching data from users:", usersError)
        } else {
          setUserProps(usersData);
        }
        

    }

    fetchUserImages();
  }, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
      {userImages.map((image, index) => {
        const matchingUser = userProps.find((user) => user.id === image.userId);

        return (
          <div key={index} className="bg-white shadow-md">
            <Link href={`illustrations/${image.id}`}>
              <div className="relative rounded-none md:h-0 pb-[75%] overflow-hidden rounded-t-lg">
                <Image
                  src={image.url}
                  alt={`User Image ${index}`}
                  layout="fill"
                  objectFit="cover"
                  quality={50}
                  className="transition duration-300 hover:scale-110"
                />
              </div>
              <div className="relative p-4">
                <p className="text-3xl font-semibold">{image.title}</p>
                <div className="flex justify-end items-center">
                  <Image
                    src={
                      matchingUser?.image ||
                      "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
                    }
                    alt="User Icon"
                    objectFit="cover"
                    className="rounded-none md:rounded-full mr-1"
                    width={40}
                    height={40}
                  />
                  <p className="text-2xl">{matchingUser?.name || "Unknown"}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}