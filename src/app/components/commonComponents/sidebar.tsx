"use client"

import React, { useState } from 'react';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=''>
      <button onClick={toggleSidebar}>
        <Image
          src="/bars-solid.svg"
          alt='サイドバー'
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default Sidebar;

