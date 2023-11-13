import supabase from "@/app/utils/supabase";
import { useState, useEffect } from "react";

export default function ShowComment({ imageId }: { imageId: any }) {
  const [comments, setComments] = useState<{
    text: string;
    userId: string;
    postedAt: string;
  }[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("Comment")
        .select("text, userId, postedAt")
        .eq("imageId", imageId);

      if (error) {
        console.log("コメント読み込み時にエラーが発生しました");
      } else {
        if (data) {
          setComments(data);
        }
      }
    };

    fetchComments();
  }, [imageId]);

  return (
    <div>
      <h2>コメント一覧</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <p>テキスト: {comment.text}</p>
            <p>ユーザーID: {comment.userId}</p>
            <p>投稿日時: {comment.postedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
