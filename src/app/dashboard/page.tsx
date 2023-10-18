import Link from "next/link";
import MyHeader from "../components/myComponents/myHeader";
import TabSwitch from "../components/myComponents/tabSwitch";
import PaddingContainer from "../components/commonComponents/paddingCotainer";
import Stats from "../components/myComponents/Stats";
import Top3Content from "../components/myComponents/top3Content";
import CurrentIllust from "../components/myComponents/currentIllust";

export default function Home() {
  return (
    <>
      <MyHeader />
      <PaddingContainer>
        <p className="text-2xl mb-5 font-semibold text-gray-700">
          ダッシュボード
        </p>
        <TabSwitch />
        <div className="flex gap-4">
          <Stats />
          <Top3Content />
        </div>
        <CurrentIllust />
      </PaddingContainer>
    </>
  );
}
