"use client";

import { useState } from "react";

export default function HeaderPopUp() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-fit h-fit">
      <label
          htmlFor="fileInput"
          className="px-4 py-3.5 text-white bg-black rounded-full cursor-pointer opacity-10 transition-opacity duration-150 hover:opacity-50"
        ></label>
      <button onClick={openPopup}>ポップアップを開く</button>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closePopup}></div>
          <div className="bg-gray-100 w-2/3 p-6 rounded-lg shadow-xl text-center relative z-50">
            <p className="text-6xl text-red-600">⚠️</p>
            <p className="text-lg mb-1">ヘッダーを更新すると前のヘッダーは完全に削除されます！</p>
            <p className="text-sm mb-3">前のヘッダーが必要な方は右クリックから新規ページで画像を開くからダウンロードしてください</p>
            <div className="flex gap-1 justify-center">
              <button>更新する</button>
              <button onClick={closePopup}>キャンセル</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
