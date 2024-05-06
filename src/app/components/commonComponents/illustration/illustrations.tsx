"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import supabase from "../../../utils/supabase";
import Link from "next/link";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "@/app/loading";
import CommentsComponent from "./comment";
import { error } from "console";

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

  const [isLiked, setIsLiked] = useState(false);

  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    async function fetchUserImages() {
      const now = new Date().getTime();

      // ローカルストレージから最終閲覧時刻を取得
      const lastViewedString = localStorage.getItem(`lastViewed-${pagePath}`);
      const lastViewed = lastViewedString
        ? new Date(lastViewedString).getTime()
        : null;
      // 最終閲覧時刻から10分が経過しているか確認
      const tenMinutes = 1000 * 60 * 10;

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
      }
      if (!lastViewed || now - lastViewed > tenMinutes) {
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
          } else {
            console.log("カウントしました");
          }
        }

        // 現在の時刻をローカルストレージに保存
        localStorage.setItem(
          `lastViewed-${pagePath}`,
          new Date(now).toISOString()
        );
      }

      const checkIfLiked = async () => {
        const { data: likeData, error } = await supabase
          .from("Like")
          .select("*")
          .eq("imageId", pagePath)
          .eq("userId", userProps.id);

        if (error) {
          console.error(
            "いいねの状態の確認でエラーが発生しました:",
            error.message
          );
        } else if (likeData && likeData.length > 0) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      };

      // 画像に対するいいねの数を取得する関数
      const fetchLikeCount = async () => {
        const { data, error } = await supabase
          .from("Like")
          .select("*", { count: "exact" })
          .eq("imageId", pagePath);

        if (error) {
          console.error("いいね回数の取得に失敗しました:", error.message);
        } else {
          setLikeCount(data.length); // いいねの数を設定
        }
      };

      checkIfLiked();
      fetchLikeCount();
    }

    fetchUserImages();
  }, [pagePath, userProps.id, imageData.viewCount]);

  if (!imageData.url) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading text="画像を探しています"></Loading>
      </div>
    );
  }

  const toggleLike = async () => {
    if (isLiked) {
      // クリック時、いいねがすでにされている場合、いいねを解除する
      const { error: unlikeError } = await supabase
        .from("Like")
        .delete()
        .match({ imageId: pagePath, userId: userProps.id });

      if (unlikeError) {
        console.log("いいねの削除でエラーが発生しました:", unlikeError.message);
      } else {
        console.log("いいねを削除しました");
      }
    } else {
      // クリック時、いいねがついていない場合はいいねを追加
      const { error: likeError } = await supabase
        .from("Like")
        .insert({ imageId: pagePath, userId: userProps.id });

      if (likeError) {
        console.log("いいねの保存でエラーが発生しました:", likeError.message);
      } else {
        console.log("いいねの保存が完了しました");
      }
    }
    setIsLiked(!isLiked);
  };

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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 画像表示部分 */}
        <div className="col-span-2">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <Image
              src={imageData.url}
              alt="ユーザーが投稿した画像"
              width={imageData.width}
              height={imageData.height}
              className="object-cover w-full"
            />
          </div>
        </div>

        {/* 詳細情報部分 */}
        <div className="col-span-1 h-fit top-20 sticky">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <p className="text-xl font-bold mb-1">{imageData.title}</p>
            <p className="text-gray-800">{imageData.description}</p>
            <p className="text-gray-500">{formattedDate}</p>

            {/* タグの表示 */}
            <div className="flex flex-wrap gap-2 my-2">
              {tagData.map((tag) => (
                <span
                  className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-sm"
                  key={tag}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-gray-500">閲覧回数: {imageData.viewCount}回</p>

            {/* いいねとコメント */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-center">
                <button
                  className="text-red-500 text-lg focus:outline-none focus:ring focus:border-blue-300"
                  onClick={toggleLike}
                >
                  {isLiked ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      className="transition transform duration-100 scale-125"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faHeartRegular} size="lg" />
                  )}
                </button>
                <p className="text-sm text-gray-600 mt-1">{likeCount} いいね</p>
              </div>
            </div>
          </div>

          {/* ユーザープロフィール */}
          <div className="bg-white shadow-lg rounded-lg p-4 mt-4 flex items-center">
            <Link href={`/userprofile/${userProps.id}`} className="flex">
              <Image
                src={userProps.image}
                alt="ユーザーのアイコン"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-2">
                <p className="font-semibold">{userProps.name}</p>
                <p className="text-gray-600 text-sm">フォロー数〇〇人</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* コメントセクション */}
      <CommentsComponent imageId={pagePath} />
    </div>
  );
};

export default ImageDetail;
