import PaddingContainer from "@/app/components/commonComponents/paddingCotainer";
import EditCard from "@/app/components/myComponents/editCard";
import MyHeader from "@/app/components/myComponents/myHeader";
import TabSwitch from "@/app/components/myComponents/tabSwitch";

export default function EditFile() {
  return (
    <div>
      <MyHeader />
      <PaddingContainer>
        <EditCard />
      </PaddingContainer>
    </div>
  );
}
