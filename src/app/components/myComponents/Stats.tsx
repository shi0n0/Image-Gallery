export default function Stats() {
  return (
    <div className="bg-white rounded-xl w-1/3 h-80">
      <div className="bg-gray-100 rounded-t-lg py-3 px-5 font-semibold text-xl">
        合計リアクション数
      </div>
      <div className="py-3 px-5 font-semibold">
        <p className="text-xl">
          👀 視聴数
          <br />
          〇〇〇回
        </p>
        <p className="text-xl">
          ❤️ いいね
          <br />
          〇〇回
        </p>
        <p className="text-xl">
          ⭐︎ お気に入り
          <br />
          〇〇回
        </p>
        <p className="text-xl">
          ✍️ コメント
          <br />
          〇〇回
        </p>
      </div>
    </div>
  );
}
