import Link from "next/link";
import MyHeader from "../components/myComponents/myHeader";
import TabSwitch from "../components/myComponents/tabSwitch";
import PaddingContainer from "../components/commonComponents/paddingCotainer";

export default function Home() {
  return (
    <>
      <MyHeader />
      <PaddingContainer>
        <p className="text-2xl mb-5 font-semibold text-gray-700">
          ダッシュボード
        </p>
        <TabSwitch />
      </PaddingContainer>
    </>
  );
}
