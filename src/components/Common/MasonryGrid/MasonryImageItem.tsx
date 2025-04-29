import React from "react";
import { Checkbox } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import Image from "next/image";

interface ImageGridItem {
  id: string;
  url: string | null;
  name?: string;
  width?: number;
  height?: number;
}

const MasonryImageItem = ({
  item,
  onClick,
  isSelectMode,
  onSelect,
  isSelected,
  className,
}: {
  item: ImageGridItem;
  onClick?: (item: ImageGridItem) => void;
  isSelectMode?: boolean;
  onSelect?: (id: string, item?: ImageGridItem) => void;
  isSelected?: boolean;
  className?: string;
}) => {
  const handleItemClick = () => {
    if (isSelectMode) {
      onSelect?.(item.id, item);
    } else {
      onClick?.(item);
    }
  };

  return (
    <div
      className={`break-inside mb-4 overflow-hidden relative group bg-gray-100 ${className}`}
    >
      <button type="button" className="w-full h-full" onClick={handleItemClick}>
        {/* Image Container */}
        <div className="aspect-auto">
          {/* Checkbox for Select Mode */}
          {isSelectMode && (
            <div className="absolute top-2 left-2 z-10">
              <Checkbox checked={isSelected} />
            </div>
          )}

          {item.url ? (
            <Image
              src={item.url}
              alt={item.name || item.url}
              width={item.width || 150}
              height={item.height || 225}
              className="w-full h-auto object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-[225px] flex flex-col justify-center content-center">
              <PictureOutlined
                className="m-auto"
                style={{ fontSize: "32px", color: "#bfbfbf" }}
              />
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default MasonryImageItem;
