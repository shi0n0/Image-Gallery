"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import supabase from "../../../utils/supabase";
import Link from "next/link";
import UploadComment from "./uploadComment";
import ShowComment from "./showComment";

const ImageDetail = () => {
  const getPagePath = usePathname();
  const pagePath = getPagePath.replace("/illustrations/", "");

  const [imageData, setImageData] = useState({
    url: "",
    userId: "",
    title: "",
    description: "",
    width: 0,
    height: 0,
    postedAt: "",
    viewCount: 0,
  });

  const [tagToImageData, setTagToImageData] = useState({
    tagId: "",
  });

  const [tagData, setTagData] = useState<string[]>([]);

  const [userProps, setUserProps] = useState({
    id: "",
    image: "",
    name: "",
  });

  useEffect(() => {
    async function fetchUserImages() {
      if (pagePath) {
        const { data, error } = await supabase
          .from("Image")
          .select(
            "url,userId,title,description,width,height,postedAt,viewCount"
          )
          .eq("id", pagePath);

        if (error) {
          console.error("画像の取得にエラーが発生しました:", error.message);
        } else {
          setImageData(data[0]);
        }

        const { data: tagToImageData, error: tagToImageError } = await supabase
          .from("TagToImage")
          .select("tagId")
          .eq("imageId", pagePath);

        if (tagToImageError) {
          console.error(
            "TagToImageテーブルでエラーが発生しました",
            tagToImageError.message
          );
        } else {
          setTagToImageData(tagToImageData[0]);

          // タグの取得とセット
          if (tagToImageData[0]) {
            const { data: tagData, error: tagError } = await supabase
              .from("Tag")
              .select("tagName")
              .in(
                "id",
                tagToImageData.map((tag) => tag.tagId)
              );

            if (tagError) {
              console.error(
                "Tagテーブルでエラーが発生しました",
                tagError.message
              );
            } else {
              setTagData(tagData.map((tag) => tag.tagName));
            }
          }
        }

        const { data: userData, error: userError } = await supabase
          .from("User")
          .select("id,image,name");

        if (userError) {
          console.error(
            "ユーザーデータの取得にエラーが発生しました:",
            userError.message
          );
        } else {
          setUserProps(userData[0]);
        }

        const newViewCount = imageData.viewCount + 1;

        if (newViewCount) {
          const { error: updateViewCountError } = await supabase
            .from("Image")
            .update({ viewCount: newViewCount })
            .eq("id", pagePath);

          if (updateViewCountError) {
            console.log(
              "ニュービューカウントエラー",
              updateViewCountError.message
            );
          }
        }
      }
    }

    fetchUserImages();
  }, [pagePath, imageData.viewCount]);

  if (!imageData.url) {
    return (
      <div className="p-10">
        イラストを探しています。1分以上この画面が表示されている場合はリロードするか、URLを見直してください。
      </div>
    );
  }

  const originalDateTime = new Date(imageData.postedAt);
  const formattedDate = `${originalDateTime.getFullYear()}年${(
    originalDateTime.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}月${originalDateTime
    .getDate()
    .toString()
    .padStart(2, "0")}日 ${originalDateTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${originalDateTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <div>
      <div className="sm:py-10 sm:px-20 w-full lg:flex bg-gray-100">
        {/* 画像表示部分 */}
        <div className="relative top-0 rounded-md sm:flex sm:justify-center lg:h-fit">
          {/* 画像コンポーネント */}
          <Image
            src={imageData.url}
            alt="ユーザーが投稿した画像"
            quality={80}
            width={imageData.width}
            height={imageData.height}
            className="object-contain sm:min-w-0 lg:max-w-[50vw] sm:rounded-lg"
          />
        </div>
        {/* 詳細情報部分 */}
        <div className="lg:flex sm:ml-4 sm:bg-white lg:w-full lg:h-fit rounded-lg">
          <div className="rounded-lg mt-5 sm:mt-0">
            <div className="p-5">
              {/* 画像タイトル */}
              <p className="text-xl font-bold mb-1">
                {imageData.title || "ダミータイトル"}
              </p>
              {/* 画像説明 */}
              <p className="text-md text-gray-800">
                {imageData.description ||
                  "ディスクリプションの文章がここに入ります"}
              </p>
              {/* 投稿日時 */}
              <p className="text-md text-gray-500">{formattedDate}</p>
              {/* タグの表示 */}
              {tagData && (
                <div className="flex flex-wrap space-x-2">
                  {tagData.map((tag) => (
                    <p
                      className="text-lg text-blue-500 cursor-pointer"
                      key={tag}
                    >
                      #{tag}
                    </p>
                  ))}
                </div>
              )}
              <p className="text-md text-gray-500">
                閲覧回数:{imageData.viewCount}回
              </p>
            </div>

            {/* いいね */}
            <div className="flex items-center space-x-1 p-5">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">いいね</p>
                <span className="text-5xl text-red-500 rounded-lg cursor-pointer">
                  ♡
                </span>
              </div>
            </div>

            {/* ユーザープロフィールへのリンク */}
            {userProps.id && (
              <div className="flex items-center space-x-4 p-5">
                {/* ユーザープロフィールへのリンク */}
                <Link
                  href={`/userprofile/${userProps.id}`}
                  className="flex items-center p-2 hover:bg-gray-800 hover:bg-opacity-5 hover:rounded-lg"
                >
                  {/* ユーザーアイコン */}
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <Image
                      src={userProps.image}
                      alt="ユーザーのアイコン"
                      className="object-cover w-full h-full"
                      quality={30}
                      fill
                    />
                  </div>
                  {/* ユーザー名 */}
                  <p className="text-lg font-semibold px-2">{userProps.name}</p>
                </Link>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  フォローする
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <UploadComment pagePath={pagePath} />
      <ShowComment imageId={pagePath} />
    </div>
  );
};

export default ImageDetail;
