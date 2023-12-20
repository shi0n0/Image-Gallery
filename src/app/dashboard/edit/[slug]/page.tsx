import PaddingContainer from "@/app/components/commonComponents/container/paddingCotainer";
import EditCard from "@/app/components/myComponents/editCard";
import MyHeader from "@/app/components/myComponents/myHeader";

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
