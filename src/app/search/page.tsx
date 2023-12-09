"use client";

import { useSearchParams } from "next/navigation";
import supabase from "../utils/supabase";
import Image from "next/image";
import SearchBar from "../components/commonComponents/seachBar";
import PaddingContainer from "../components/commonComponents/paddingCotainer";
import GridContainer from "../components/commonComponents/gridContainer";

export default async function SearchResult() {
  const searchParams = useSearchParams();
  const search = searchParams.get("keyword");

  const { data, error } = await supabase
    .from("Image")
    .select("*")
    .filter("title", "ilike", `%${search}%`);

  return (
    <PaddingContainer>
      <SearchBar />
      <GridContainer>
        {data &&
          data.map((item) => (
            <div key={item.id} className="bg-white rounded-sm shadow-md my-4">
              <div className="relative aspect-square aspect-h-9">
                <Image
                  src={item.url}
                  alt="検索結果"
                  objectFit="cover"
                  className="rounded-t-sm"
                  fill
                />
              </div>
              <div className="py-1 px-2">
                <h2 className="text-sm font-bold truncate">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2 truncate">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
      </GridContainer>
    </PaddingContainer>
  );
}
