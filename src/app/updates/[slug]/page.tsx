export default function UpdateDetailPage() {
  // ここで将来的にフェッチしたデータを表示します
  // 今は仮のデータを直接表示
  const updateDetail = {
    title: "新機能：ダークモード",
    date: "2024年3月20日",
    content: `
      ユーザーの皆様へ、

      この度、ウェブサイトにダークモードの切り替え機能を追加いたしました。
      夜間や暗い場所での視聴がより快適になります。
      
      ダークモードは、画面右上のメニューからいつでも切り替え可能です。
      皆様のご利用をお待ちしております。
    `,
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{updateDetail.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{updateDetail.date}</p>
        <p className="text-gray-600 whitespace-pre-line">{updateDetail.content}</p>
      </div>
    </div>
  );
}
