// app/updates/page.tsx
"use client";

import Link from "next/link";

const updatesData = [
  {
    id: "1",
    title: "ダークモード",
    category: "新機能",
    description: "より快適な夜間視聴体験のために、ダークモードに切り替えることができるようになりました。",
    date: "2024年3月20日",
    href: "darkmode",
  },
  {
    id: "2",
    title: "検索機能の改善",
    category: "改善",
    description: "より正確な結果とより速い応答時間を提供するために、検索が強化されました。",
    date: "2024年4月5日",
    href: "search-system",
  },
  {
    id: "3",
    title: "桜の花見特集ページ開設",
    category: "開設",
    description: "春の訪れと共に、桜の花見に最適なスポットを紹介する特集ページを開設しました。",
    date: "2024年3月1日",
    href: "sakura",
  },
  {
    id: "4",
    title: "新年の挨拶カード機能追加",
    category: "新機能",
    description: "新年のご挨拶に、オリジナルの挨拶カードを作成して送ることができる新機能をリリースしました。",
    date: "2023年12月20日",
    href: "new-year",
  },
];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          アップデート・お知らせ
        </h1>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {updatesData.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
              // onClickに絞り込みのロジックを追加
            >
              {category.category}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {updatesData.map((update) => (
            <Link href={`/updates/${update.href}`} key={update.id} passHref>
              <div className="block bg-white p-6 rounded-lg shadow hover:shadow-md active:scale-95 transition duration-200 ease-in-out mb-4">
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-900">{update.title}</h2>
                  <p className="text-blue-600">{update.category}</p> {/* カテゴリを表示 */}
                  <p className="mt-2 text-gray-600">{update.description}</p>
                  <p className="mt-4 text-sm text-gray-500">{update.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
