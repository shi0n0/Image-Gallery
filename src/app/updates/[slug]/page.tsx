"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function UpdateDetailPage() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const href = segments[2];
  // ここで将来的にフェッチしたデータを表示します
  // 今は仮のデータを直接表示

  const updatesDetail = [
    {
      id: "1",
      title: "ダークモード",
      category: "新機能",
      description:
        "より快適な夜間視聴体験のために、ダークモードに切り替えることができるようになりました。",
      content: `
        ユーザーの皆様へ、
  
        この度は、私たちのウェブサイトに新たにダークモード機能を導入いたしました。この機能を利用することで、夜間や光の少ない場所でも目に優しい視聴体験を提供します。ユーザーの皆様がより快適にサイトをご利用いただけるよう、画面の明るさを自動的に調整します。
  
        ダークモードは、ユーザー設定メニューから簡単に切り替えることが可能です。是非お試しください。
      `,
      date: "2024年3月20日",
      href: "darkmode",
    },
    {
      id: "2",
      title: "検索機能の改善",
      category: "改善",
      description:
        "より正確な結果とより速い応答時間を提供するために、検索が強化されました。",
      content: `
        ユーザーの皆様へ、
  
        ご利用の皆様からの貴重なフィードバックをもとに、私たちは検索機能の大幅な改善を行いました。これにより、より関連性の高い検索結果を速やかに表示できるようになります。また、検索処理のスピードも向上し、待ち時間を大幅に削減しました。
  
        これらの改善により、皆様の情報検索がよりスムーズかつ効率的に行えるようになりました。今後とも快適にご利用いただけるよう努めてまいります。
      `,
      date: "2024年4月5日",
      href: "search-system",
    },
    {
      id: "3",
      title: "桜の花見特集ページ開設",
      category: "開設",
      description:
        "春の訪れと共に、桜の花見に最適なスポットを紹介する特集ページを開設しました。",
      content: `
        ユーザーの皆様へ、
  
        日本の春の風物詩である桜の季節がやってまいりました。この美しい季節を皆様と共有するために、桜の花見に最適なスポットを紹介する特集ページを新たに開設いたしました。
  
        各地の名所や隠れた名スポット、花見のための便利なヒントや、桜にちなんだイベント情報など、花見を楽しむための様々な情報をご紹介しています。美しい桜の下で、素敵な時間をお過ごしください。
      `,
      date: "2024年3月1日",
      href: "sakura",
    },
    {
      id: "4",
      title: "新年の挨拶カード機能追加",
      category: "新機能",
      description:
        "新年のご挨拶に、オリジナルの挨拶カードを作成して送ることができる新機能をリリースしました。",
      content: `
        ユーザーの皆様へ、
  
        新しい年を迎えるにあたり、大切な人への思いを形にできる挨拶カード作成機能を追加いたしました。この機能では、様々なデザインテンプレートをベースに、個性溢れる挨拶カードを簡単に作成し、デジタルまたは印刷してお届けすることができます。
  
        新年の始まりに、心温まるメッセージをお送りください。皆様の創造性を発揮して、素敵なカードを作成してみてはいかがでしょうか。
      `,
      date: "2023年12月20日",
      href: "new-year",
    },
  ];

  const updateDetail = updatesDetail.find((detail) => detail.href === href);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        {updateDetail ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {updateDetail.title}
            </h1>
            <p className="text-sm text-blue-600 mb-2">
              {updateDetail.category}
            </p>
            <p className="text-sm text-gray-500 mb-6">{updateDetail.date}</p>
            <p className="text-gray-600 whitespace-pre-line">
              {updateDetail.content}
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-900 mb-4">
              アップデート情報が見つかりません。
            </p>
            <Link href="/updates" passHref>
              <div className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                更新情報へ戻る
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
