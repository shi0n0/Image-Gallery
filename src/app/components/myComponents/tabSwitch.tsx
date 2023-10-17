import Link from "next/link";

export default function TabSwitch() {
  return (
    <>
      <p className="text-2xl mb-5 font-semibold text-gray-700">
        ダッシュボード
      </p>
      <Link href="/dashboard">TOP</Link>
      <Link href="/dashboard/works">WORKS</Link>
    </>
  );
}
