import Link from "next/link"
import MyHeader from "../components/myComponents/myHeader"
import TabSwitch from "../components/myComponents/tabSwitch"

export default function Home() {

  return(
    <>
      <MyHeader />
      <p>ダッシュボード</p>
      <TabSwitch></TabSwitch>
    </>
  )
}