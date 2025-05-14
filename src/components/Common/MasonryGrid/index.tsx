import React, { ReactNode } from "react";

interface MasonryGridProps {
  children?: ReactNode;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children }) => {
  return <div className="masonry w-full px-4">{children}</div>;
};

export default MasonryGrid;
