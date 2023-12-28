import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          ページが見つかりません
        </h1>
        <p className="text-gray-600 mb-8">
          申し訳ありませんが、お探しのページは存在しないようです。
        </p>
        <Link href="/">
          <p className="text-blue-500 hover:underline">ホームに戻る</p>
        </Link>
      </div>
    </div>
  );
}
