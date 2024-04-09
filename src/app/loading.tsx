import React from 'react';

interface LoadingProps {
  text?: string;
}

export default function Loading({ text = "ページを読み込んでいます..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <div className="w-16 h-16 mb-4">
        <div className="w-full h-full border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-lg font-semibold text-blue-500">{text}</p>
    </div>
  );
}
