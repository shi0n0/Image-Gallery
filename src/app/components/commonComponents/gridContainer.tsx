import React, { ReactNode } from 'react';

interface PaddingContainerProps {
  children: ReactNode;
}

const GridContainer: React.FC<PaddingContainerProps> = ({ children }) => {

  return(
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-10">
      {children}
    </div>
  )
}

export default GridContainer;