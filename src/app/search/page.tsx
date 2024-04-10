"use client";

import { useSearchParams } from "next/navigation";
import supabase from "../utils/supabase";
import Image from "next/image";
import SearchBar from "../components/commonComponents/navigation/seachBar";
import PaddingContainer from "../components/commonComponents/container/paddingCotainer";
import GridContainer from "../components/commonComponents/container/gridContainer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Loading from "../loading";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const search = searchParams.get("keyword");
  const [imageData, setImageData] = useState<
    { id: string; url: string; title: string; userId: string }[]
  >([]);
  const [userData, setUserData] = useState<
    { id: string; image: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetchedImageData, error: imageError } = await supabase
        .from("Image")
        .select("*")
        .filter("title", "ilike", `%${search}%`);

      if (fetchedImageData) {
        setImageData(fetchedImageData);

        const userIds = fetchedImageData.map((item) => item.userId);
        const { data: fetchedUserData, error: userError } = await supabase
          .from("User")
          .select("*")
          .in("id", userIds);

        if (fetchedUserData) {
          setUserData(fetchedUserData);
        }
      }
    };

    fetchData();
  }, [search]);

  return (
    <PaddingContainer>
      <div className="flex justify-center">
        <SearchBar initialValue={search || ""} />
      </div>
      <div className="text-center my-4">
        {search && imageData.length > 0 && (
          <h1 className="text-xl md:text-2xl font-light my-4">
            <span className="font-bold">{search}</span>を含むイラストが
            <span className="font-bold">{imageData.length}件</span>
            見つかりました
          </h1>
        )}
        {imageData.length === 0 && (
          <div className="h-[60vh]">
            <h1 className="text-xl md:text-2xl font-light my-4">
              <span className="font-bold">{search}</span>
              を含むイラストが見つかりませんでした
            </h1>
          </div>
        )}
      </div>

      <GridContainer>
        {imageData &&
          imageData.map((item) => {
            const user = userData.find((user) => user.id === item.userId);

            return (
              <div
                key={item.id}
                className="bg-white rounded-sm my-4 mx-1 hover:"
              >
                <div className="relative aspect-square aspect-h-9">
                  <Link href={`illustrations/${item.id}`}>
                    <Image
                      src={item.url}
                      alt="検索結果の画像"
                      className="rounded-md object-cover hover:opacity-90 duration-100"
                      fill
                    />
                  </Link>
                </div>
                <div className="py-1 px-2">
                  <h2 className="text-base font-bold truncate mb-1">
                    {item.title}
                  </h2>
                  <div className="flex justify-between">
                    {user && (
                      <Link href={`/userprofile/${user.id}`}>
                        <div className="flex items-center">
                          <Image
                            src={
                              user.image ||
                              "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png"
                            }
                            alt="ユーザーアイコン"
                            objectFit="cover"
                            className="w-6 h-6 rounded-full"
                            width={20}
                            height={20}
                          />
                          <p className="text-gray-600 text-sm ml-1 hover:text-black truncate">
                            {user.name || "Unknown"}
                          </p>
                        </div>
                      </Link>
                    )}
                    <button>
                      <FontAwesomeIcon icon={faHeart} size="xl" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </GridContainer>
    </PaddingContainer>
  );
}
