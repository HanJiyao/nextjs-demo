import React from "react";
import type { ForumItem } from "@/utils/models/forumConstants";
import {
  StarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const MasonryGridItem = ({
  item,
  onClick,
}: {
  item: ForumItem;
  onClick?: (item: ForumItem) => void;
  onHeartClick?: (id: string) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="break-inside mb-6 rounded-xl overflow-hidden relative group shadow-md hover:shadow-xl transition-shadow duration-300 bg-transparent">
      <div className="relative aspect-[3/4]">
        <button
          className="w-full h-full"
          onClick={() => onClick && onClick(item)}
        >
          {item.imageDataImage && (
            <Image
              src={item.imageDataImage}
              alt={item.name}
              width={600}
              height={800}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              priority
              crossOrigin="anonymous"
            />
          )}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <StarOutlined className="text-lg" />
                {item.hearts || 0}
              </span>
              <span className="flex items-center gap-1">
                <MessageOutlined className="text-lg" />
                {item.commentsCount || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasonryGridItem;
