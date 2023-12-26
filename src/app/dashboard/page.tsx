import MyHeader from "../components/myComponents/dashboard/myHeader";
import TabSwitch from "../components/myComponents/dashboard/tabSwitch";
import PaddingContainer from "../components/commonComponents/container/paddingCotainer";
import Stats from "../components/myComponents/dashboard/Stats";
import Top3Content from "../components/myComponents/dashboard/top3Content";
import CurrentIllust from "../components/myComponents/dashboard/currentIllust";

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
