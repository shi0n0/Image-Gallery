import MyHeader from "@/app/components/myComponents/myHeader";
import PaddingContainer from "@/app/components/commonComponents/paddingCotainer";
import TabSwitch from "@/app/components/myComponents/tabSwitch";

export default function Edit() {
  return (
    <div>
      <MyHeader />
      <PaddingContainer>
        <p className="text-2xl mb-5 font-semibold text-gray-700">
          ダッシュボード
        </p>
        <TabSwitch />
      </PaddingContainer>
    </div>
  );
}
