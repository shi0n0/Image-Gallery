import MyHeader from "../components/myComponents/myHeader";
import TabSwitch from "../components/myComponents/tabSwitch";
import PaddingContainer from "../components/commonComponents/container/paddingCotainer";
import Stats from "../components/myComponents/Stats";
import Top3Content from "../components/myComponents/top3Content";
import CurrentIllust from "../components/myComponents/currentIllust";

export default function Home() {
  return (
    <>
      <MyHeader />
      <PaddingContainer>
        <p className="text-2xl mb-5 m-4 sm:m-0 font-semibold text-gray-700">
          ダッシュボード
        </p>
        <TabSwitch />
        <div className="w-full sm:flex gap-4 justify-between">
          <Stats />
          <Top3Content />
        </div>
        <CurrentIllust />
      </PaddingContainer>
    </>
  );
}
