"use client";
// Sidebar.tsx
import React, { useState, useEffect } from "react";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const shouldOpenSidebar = event.clientX <= 40;

      const shouldCloseSidebar = event.clientX > 1000;

      if (shouldOpenSidebar || shouldCloseSidebar) {
        setIsSidebarOpen(shouldOpenSidebar);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      {/* オーバーレイ */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 transition-opacity duration-300 ease-in-out"
          onClick={handleMouseLeave} // オーバーレイをクリックするとサイドバーが閉じるように
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-white w-52 z-50 transition-transform transform duration-300 text-center ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-60"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p>要素を追加</p>
      </div>
    </div>
  );
};

export default Sidebar;
