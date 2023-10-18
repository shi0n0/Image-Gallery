import Link from "next/link";

export default function TabSwitch() {
  return (
    <div className="w-full mb-5">
      <Link className="rounded-full py-2 px-4 m-2 duration-150 hover:bg-gray-200" href="/dashboard">TOP</Link>
      <Link className="rounded-full py-2 px-4 m-2 duration-150 hover:bg-gray-200" href="/dashboard/works">WORKS</Link>
    </div>
  );
}
