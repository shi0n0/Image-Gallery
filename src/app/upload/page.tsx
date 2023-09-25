
export default function Profile() {

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">画像をアップロード</h1>
      <div className="mb-4">
        <input
          type="file"
          className="border p-2"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="タイトル"
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="概要"
          className="border p-2 w-full h-24"
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        送信
      </button>
    </div>
  );
}