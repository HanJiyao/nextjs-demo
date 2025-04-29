import { useState, useEffect } from 'react';
import { Button, Dropdown } from 'antd';
import { DownOutlined, FieldTimeOutlined, OrderedListOutlined, TeamOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';

export type SortByType = 'lastAccessed' | 'upVotes' | 'numComments' | 'numHearts';
export type FilterByType = 'all' | 'followed';

interface CommunityFilterProps {
  onFilterChange: (filters: {
    sortBy: SortByType;
    timeRange: string;
    filterBy: FilterByType;
  }) => void;
}

export default function CommunityFilter({ onFilterChange }: CommunityFilterProps) {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<SortByType>(searchParams.get("sortBy") as SortByType || "lastAccessed");
  const [timeRange, setTimeRange] = useState(searchParams.get("timeRange") || "all");
  const [filterBy, setFilterBy] = useState(searchParams.get("filterBy") as "all" | "followed" || "all");

  useEffect(() => {
    // 当 URL 参数变化时更新状态
    const sortByParam = searchParams.get("sortBy");
    const timeRangeParam = searchParams.get("timeRange");
    const filterByParam = searchParams.get("filterBy") as "all" | "followed";

    if (sortByParam) setSortBy(sortByParam as SortByType);
    if (timeRangeParam) setTimeRange(timeRangeParam);
    if (filterByParam) setFilterBy(filterByParam);
  }, [searchParams]);

  const handleSortChange = (newSortBy: SortByType) => {
    setSortBy(newSortBy);
    onFilterChange({ sortBy: newSortBy, timeRange, filterBy });
  };

  const handleTimeChange = (value: 'all' | 'today' | 'week' | 'month') => {
    setTimeRange(value);
    onFilterChange({ sortBy, timeRange: value, filterBy });
  };

  const handleFilterChange = (value: FilterByType) => {
    setFilterBy(value);
    onFilterChange({ sortBy, timeRange, filterBy: value });
  };

  const sortItems = [
    { key: 'lastAccessed', label: 'Latest' },
    { key: 'upVotes', label: 'Most Reactions' },
    { key: 'numComments', label: 'Most Comments' },
    { key: 'numHearts', label: 'Most Collected' },
  ];

  const timeItems = [
    { key: 'all', label: 'All Time' },
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
  ];

  const filterItems = [
    { key: 'all', label: 'Everyone' },
    { key: 'followed', label: 'Followed'},
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      <Dropdown
        menu={{
          items: sortItems.map(item => ({
            key: item.key,
            label: item.label,
            onClick: () => handleSortChange(item.key as SortByType),
          })),
        }}
      >
        <Button className="flex items-center gap-1 bg-gray-50 border border-gray-300 hover:bg-gray-100">
          <OrderedListOutlined />
          {sortItems.find(item => item.key === sortBy)?.label}
          <DownOutlined className="text-xs" />
        </Button>
      </Dropdown>

      <Dropdown
        menu={{
          items: timeItems.map(item => ({
            key: item.key,
            label: item.label,
            onClick: () => handleTimeChange(item.key as 'all' | 'today' | 'week' | 'month'),
          })),
        }}
      >
        <Button className="flex items-center gap-1 bg-gray-50 border border-gray-300 hover:bg-gray-100">
          <FieldTimeOutlined />
          {timeItems.find(item => item.key === timeRange)?.label}
          <DownOutlined className="text-xs" />
        </Button>
      </Dropdown>

      <Dropdown
        menu={{
          items: filterItems.map(item => ({
            key: item.key,
            label: item.label,
            onClick: () => handleFilterChange(item.key as FilterByType),
          })),
        }}
      >
        <Button className="flex items-center gap-1 bg-gray-50 border border-gray-300 hover:bg-gray-100">
          <TeamOutlined />
          {filterItems.find(item => item.key === filterBy)?.label}
          <DownOutlined className="text-xs" />
        </Button>
      </Dropdown>
    </div>
  );
}

// const categories = [
//   "All",
//   "Shonen",
//   "Shojo",
//   "Seinen",
//   "Josei",
//   "Isekai",
//   "Fantasy",
//   "Science Fiction",
//   "Horror",
//   "Slice of Life",
//   "Romance",
//   "Mystery",
//   "Historical",
//   "Sports",
//   "Supernatural",
// ]; 