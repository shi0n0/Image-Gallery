"use client";

import TopUserCard from "../components/commonComponents/topPage/topPageCard";
import TopPageSlider from "../components/commonComponents/topPage/topPageSlider";

export default function Home() {
  return (
    <div>
      <TopPageSlider />
      <TopUserCard />
    </div>
  );
}
