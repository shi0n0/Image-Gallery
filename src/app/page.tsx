"use client";

import TopUserCard from "./components/commonComponents/topPageCard";
import TopPageSlider from "./components/commonComponents/topPageSlider";

export default function Home() {
  return (
    <div>
      <TopPageSlider />
      <TopUserCard />
    </div>
  );
}
