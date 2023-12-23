import MyHeader from "@/app/components/myComponents/myHeader";
import PaddingContainer from "@/app/components/commonComponents/container/paddingCotainer";
import TabSwitch from "@/app/components/myComponents/tabSwitch";

export default function Edit() {
  return (
    <div>
      <MyHeader />
      <PaddingContainer>
        <p className="text-2xl mb-5 m-4 sm:m-0 font-semibold text-gray-700">
          ダッシュボード
        </p>
        <TabSwitch />
      </PaddingContainer>
    </div>
  );
}
