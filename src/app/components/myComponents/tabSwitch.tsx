import Link from "next/link";

export default function TabSwitch() {
  return (
    <>
      <Link href="/dashboard">TOP</Link>
      <Link href="/dashboard/works">WORKS</Link>
    </>
  );
}
