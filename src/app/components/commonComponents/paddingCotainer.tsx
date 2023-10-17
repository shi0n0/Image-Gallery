import React, { ReactNode } from 'react';

interface PaddingContainerProps {
  children: ReactNode;
}

const PaddingContainer: React.FC<PaddingContainerProps> = ({ children }) => {
  return (
    <div className='p-10'>
      {children}
    </div>
  );
};

export default PaddingContainer;
