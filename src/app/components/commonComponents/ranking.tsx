import supabase from "@/app/utils/supabase";
import PaddingContainer from "./paddingCotainer";

export default async function Ranking() {
  const { data, error } = await supabase
    .from("Image")
    .select("id, url, title, description, userId, viewCount")
    .order("viewCount", { ascending: false });

  if (error) {
    console.error("ランキング情報を取得中にエラーが発生:", error.message);
    return null;
  }

  // dataがnullでない場合にユーザー情報を取得
  if (data) {
    const { data: userData, error: userError } = await supabase
      .from("User")
      .select("name, image")
      .eq("id", data[0]?.userId); // Optional Chainingを使用してnullチェック

    if (userError) {
      console.error("ユーザー情報を取得中にエラーが発生:", userError.message);
      return null;
    }

    // ランキング情報をマップして表示
    return (
      <PaddingContainer>
        {data.map((imageData, index) => (
          <div key={imageData.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={imageData.url} alt={imageData.description} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{imageData.title}</div>
              <p className="text-gray-700 text-base">作者: {userData[0]?.name}</p>
              <p className="text-gray-700 text-base">ランキング: {index + 1}位</p>
            </div>
            <div className="px-6 py-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                #カテゴリ
              </span>
            </div>
          </div>
        ))}
      </PaddingContainer>
    );
  } else {
    return null; // dataがnullの場合は何も表示しないか、適切な処理を追加
  }
}
