import PaddingContainer from "./paddingCotainer";

export default function Ranking() {

  return(
    <PaddingContainer>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src="/ImageGallery.png" alt="イラストの説明" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">イラストのタイトル</div>
    <p className="text-gray-700 text-base">
      作者: イラストの作者名
    </p>
    <p className="text-gray-700 text-base">
      ランキング: 1位
    </p>
  </div>
  <div className="px-6 py-4">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#カテゴリ</span>
  </div>
</div>

    </PaddingContainer>
  )
}
