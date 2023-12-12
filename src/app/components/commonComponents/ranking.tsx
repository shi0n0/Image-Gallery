import supabase from "@/app/utils/supabase";
import PaddingContainer from "./paddingCotainer";

export default async function Ranking() {
  const { data, error } = await supabase
    .from("Image")
    .select("id, url, title, description, userId, viewCount")
    .order("viewCount", { ascending: false });

  if (error) {
    console.error("ランキング情報を取得中にエラーが発生:", error.message);
  } else {
    // ランキング情報をマップして表示
    return (
      <PaddingContainer>
        {data.map((imageData, index) => (
          <div key={imageData.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={imageData.url} alt={imageData.description} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{imageData.title}</div>
              <p className="text-gray-700 text-base">作者: {imageData.userId}</p>
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
  }
}
