import React, { ReactNode } from "react";

interface MasonryGridCustomProps {
  children?: ReactNode;
  className?: string;
}

const MasonryGridCustom: React.FC<MasonryGridCustomProps> = ({
  children,
  className,
}) => {
  return <div className={`${className} w-full`}>{children}</div>;
};

export default MasonryGridCustom;
