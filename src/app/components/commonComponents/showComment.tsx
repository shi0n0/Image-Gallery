import supabase from "@/app/utils/supabase";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ShowComment({ imageId }: { imageId: any }) {
  const [comments, setComments] = useState<
    {
      text: string;
      userId: string;
      postedAt: string;
      user?: {
        name: string;
        image: string;
      };
    }[]
  >([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data: commentData, error: commentError } = await supabase
        .from("Comment")
        .select("text, userId, postedAt")
        .eq("imageId", imageId);

      if (commentError) {
        console.log("コメント読み込み時にエラーが発生しました");
      } else {
        if (commentData) {
          const allCommentData = await Promise.all(
            commentData.map(async (comment) => {
              const { data: userData, error: userError } = await supabase
                .from("User")
                .select("name,image")
                .eq("id", comment.userId)
                .single();

              if (userError) {
                console.log("ユーザーデータの取得時にエラーが発生しました");
                return comment;
              }

              return { ...comment, user: userData };
            })
          );

          setComments(allCommentData);
        }
      }
    };

    fetchComments();
  }, [imageId]);

  return (
    <div className="p-5">
      {comments.map((comment, index) => (
        <div key={index} className="flex p-2">
          <div className="relative aspect-square w-10 h-10 mr-2">
            {comment.user && (
              <Image
                src={comment.user?.image}
                alt="ユーザーアイコン"
                fill
                className="rounded-full"
              ></Image>
            )}
          </div>
          <div>
            <p className="text-sm font-bold">{comment.user?.name}</p>
            <p className="font-light">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
