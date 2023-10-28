"use client";

import TopUserCard from "./components/commonComponents/topPageCard";
import TopPageSlider from "./components/commonComponents/topPageSlider";

export default function Home() {
  return (
    <div>
      <TopPageSlider />
      <div className="p-10 pb-0">
        <p className="text-2xl mb-5 font-semibold text-gray-700 inline-block border-b-4 border-custom-pink">
          最近投稿されたイラスト
        </p>
      </div>
      <TopUserCard />
    </div>
  );
}
