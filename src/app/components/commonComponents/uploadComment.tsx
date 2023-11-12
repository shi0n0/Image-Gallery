import supabase from "@/app/utils/supabase";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";

interface ImagePath {
  pagePath: string;
}

const UploadComment = ({ pagePath }: ImagePath) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [text, setText] = useState('');

  const commentData = {
    text: text,
    userId: userId,
    imageId: pagePath,
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleCommentSubmit = async () => {
    const { error } = await supabase.from('Comment').insert(commentData);

    if (error) {
      console.error('コメントの投稿に失敗しました:', error.message);
    } else {
      console.log('コメントが投稿されました');
    }
  };

  return (
    <div className="p-5">
      <p className="text-xl font-bold mb-4">コメント</p>
      <textarea
        className="w-full h-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="コメントを入力してください"
        value={text}
        onChange={handleTextChange}
      ></textarea>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleCommentSubmit}
      >
        送信
      </button>
    </div>
  );
};

export default UploadComment;
