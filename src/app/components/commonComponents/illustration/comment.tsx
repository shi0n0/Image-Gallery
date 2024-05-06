import supabase from "@/app/utils/supabase";
import { useSession } from "next-auth/react";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CommentProps {
  imageId: string;
}

const CommentsComponent = ({ imageId }: CommentProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [text, setText] = useState("");
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
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  useEffect(() => {
    fetchComments();
  }, [imageId]);

  const fetchComments = async () => {
    const { data: commentData, error } = await supabase
      .from("Comment")
      .select("text, userId, postedAt")
      .order("postedAt", { ascending: false })
      .eq("imageId", imageId);

    if (!error && commentData) {
      const enrichedComments = await Promise.all(
        commentData.map(async (comment) => {
          const { data: userData, error: userError } = await supabase
            .from("User")
            .select("name,image")
            .eq("id", comment.userId)
            .single();

          return userError ? comment : { ...comment, user: userData };
        })
      );
      setComments(enrichedComments);
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!text.trim()) {
      console.error("コメントが空白または空です。");
      return;
    }

    const commentData = {
      text: text,
      userId: userId,
      imageId: imageId,
    };

    const { error } = await supabase.from("Comment").insert(commentData);

    if (error) {
      console.error("コメントの投稿に失敗しました:", error.message);
    } else {
      console.log("コメントが投稿されました");
      setText(""); // Reset the textarea
      fetchComments(); // Re-fetch comments to show the new one
    }
  };

  const handleSortChange = (order: "new" | "old") => {
    setSortOrder(order);
    setComments((prevComments) =>
      [...prevComments].sort((a, b) =>
        order === "new"
          ? new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
          : new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
      )
    );
  };

  return (
    <div className="p-5">
      <div className="mb-4">
        <textarea
          className="w-full px-2 pb-2 pt-2 border bg-gray-100 rounded-md resize-none overflow-hidden focus:outline-none focus:ring focus:border-blue-300"
          placeholder="コメントを入力してください"
          value={text}
          onChange={handleTextChange}
          rows={1}
          id="textarea"
        ></textarea>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleCommentSubmit}
        >
          送信
        </button>
      </div>
      <div className="flex mb-4">
        <button
          onClick={() => handleSortChange("new")}
          className={`py-2 px-4 bg-gray-200 ${
            sortOrder === "new" ? "bg-opacity-100" : "bg-opacity-30"
          } text-gray-600 rounded-full ml-2 hover:bg-opacity-100`}
        >
          新しい順
        </button>
        <button
          onClick={() => handleSortChange("old")}
          className={`py-2 px-4 bg-gray-200 ${
            sortOrder === "old" ? "bg-opacity-100" : "bg-opacity-30"
          } text-gray-600 rounded-full ml-2 hover:bg-opacity-100`}
        >
          古い順
        </button>
      </div>
      {comments.map((comment, index) => (
        <div key={index} className="flex p-2">
          <div className="relative aspect-square w-10 h-10 mr-2">
            {comment.user && (
              <Image
                src={comment.user.image}
                alt="ユーザーアイコン"
                fill
                className="rounded-full"
              ></Image>
            )}
          </div>
          <div>
            <div className="flex pb-1">
              <p className="text-sm font-bold mr-1">{comment.user?.name}</p>
              <p className="text-sm opacity-50 font-normal">
                {new Date(comment.postedAt).toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm font-medium">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsComponent;
