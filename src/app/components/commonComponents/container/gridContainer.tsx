import React, { ReactNode } from 'react';

interface PaddingContainerProps {
  children: ReactNode;
}

const GridContainer: React.FC<PaddingContainerProps> = ({ children }) => {

  return(
    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 sm:gap-2 sm:px-2 lg:px-10">
      {children}
    </div>
  )
}

export default GridContainer;