"use client";

import TopUserCard from "../components/commonComponents/topPage/topPageCard";
import TopPageSlider from "../components/commonComponents/topPage/topPageSlider";
import TopPageMiniBanner from "../components/commonComponents/topPage/topPageMiniBanner";

export default function Home() {
  return (
    <div>
      <TopPageSlider />
      <div className="flex justify-center items-center space-x-4">
        <TopPageMiniBanner href="/ranking" title="ランキングはコチラ！" />
        <TopPageMiniBanner href="/updates" title="更新情報はコチラ！" />
      </div>
      <TopUserCard />
    </div>
  );
}
