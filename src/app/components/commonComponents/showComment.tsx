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
  const [sortOrder, setSortOrder] = useState<'new' | 'old'>('new');


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
          const sortedComments = allCommentData.sort(
            (a, b) =>
              new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
          );
          setComments(sortedComments);
        }
      }
    };

    fetchComments();
  }, [imageId]);

  return (
    <div className="px-5">
      <div className="flex mb-2">
          <button
            onClick={() =>{
              setComments(
                [...comments].sort(
                  (a, b) =>
                    new Date(b.postedAt).getTime() -
                    new Date(a.postedAt).getTime()
                )
              )
            setSortOrder('new');
          }}
          className={`py-2 px-4 bg-gray-200 ${sortOrder === 'new' ? 'bg-opacity-100' : 'bg-opacity-30'} text-gray-600 rounded-full ml-2 hover:bg-opacity-100`}
          >
            新しい順
          </button>
          <button
            onClick={() => {
              setComments(
                [...comments].sort(
                  (a, b) =>
                    new Date(a.postedAt).getTime() -
                    new Date(b.postedAt).getTime()
                )
              )
              setSortOrder('old');
            }}
            className={`py-2 px-4 bg-gray-200 ${sortOrder === 'old' ? 'bg-opacity-100' : 'bg-opacity-30'} text-gray-600 rounded-full ml-2 hover:bg-opacity-100`}
            >
            古い順
          </button>
      </div>
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
