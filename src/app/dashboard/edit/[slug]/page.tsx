import PaddingContainer from "@/app/components/commonComponents/container/paddingCotainer";
import EditCard from "@/app/components/myComponents/edit/editCard";
import MyHeader from "@/app/components/myComponents/dashboard/myHeader";

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
