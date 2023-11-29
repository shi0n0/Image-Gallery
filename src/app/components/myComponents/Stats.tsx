import supabase from "@/app/utils/supabase";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Stats() {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;

  let totalViewCount = 0;

  const { count, error:commentError } = await supabase
    .from("Comment")
    .select("*", { count: "exact", head: true })
    .match({ userId: userId });

  if (count) {
    console.log("コメント数:", count);
  } else {
    console.error("コメントのカウントに失敗しました:",commentError?.message)
  }

  const { data, error:viewCountError } = await supabase
  .from("Image")
  .select("viewCount")
  .eq("userId",userId)

  if (data){
    totalViewCount = data.map(item => item.viewCount).reduce((acc, count) => acc + count, 0);
  } else {
    console.error("閲覧回数取得でエラーが発生しました:",viewCountError.message)
  }


  return (
    <div className="bg-white rounded-xl w-1/3 h-80">
      <div className="bg-gray-100 rounded-t-lg py-3 px-5 font-semibold text-xl">
        合計リアクション数
      </div>
      <div className="py-3 px-5 font-semibold">
        <p className="text-xl">
          👀 閲覧数
          <br />
          {totalViewCount}回
        </p>
        <p className="text-xl">
          ❤️ いいね
          <br />
          〇〇回
        </p>
        <p className="text-xl">
          ⭐︎ お気に入り
          <br />
          〇〇回
        </p>
        <p className="text-xl">
          ✍️ コメント
          <br />
          {count}回
        </p>
      </div>
    </div>
  );
}
