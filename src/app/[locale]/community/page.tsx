"use client";
import { useState, useRef, useEffect, useContext } from "react";
import {
  Flex,
  // Skeleton,
  // Divider,
  Card,
  Button,
  Input,
  // FloatButton,
  // Badge,
  // Popover,
  // Spin,
} from "antd";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useCommunityMangas } from "@/hooks/useCommunityMangas";
// import MasonryGridItem from "@/components/Common/MasonryGrid/MasonryGridItem";
import SearchBar from "@/components/SearchBar";
import {
  LeftOutlined,
  RightOutlined,
  // BellOutlined,
  GiftOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import CommunityFilter from "@/components/Community/CommunityFilter";
// import CheckInModal from "@/components/Community/CheckInModal";
// import NotificationList from "@/components/Notification/NotificationList";
// import { useQuery } from "@tanstack/react-query";
// import { MangaService } from "@/client";
import { ThemeContext } from "@/contexts/theme";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
// import { useQueryClient } from "@tanstack/react-query";
// import Image from "next/image";
import { Typography } from "antd";
import { useUser } from "@/lib/firebase/getUser";

const { Title } = Typography;

interface Note {
  id?: string;
  userId: string;
  createdAt: string;
  content: string;
  fileUrl?: string;
}

export default function CommunityPage() {
  const t = useTranslations("community");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [sortBy, setSortBy] = useState("lastAccessed");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [filterBy, setFilterBy] = useState<"all" | "followed">("all");
  const [timeRange, setTimeRange] = useState<string | null>(null);
  // const [showCheckIn, setShowCheckIn] = useState(false);
  // const [hasAutoOpened, setHasAutoOpened] = useState(false);
  // const [notificationCount, setNotificationCount] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);
  // const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [noteContent, setNoteContent] = useState("");

  // const { data, fetchNextPage, hasNextPage, isLoading } =
  //   useCommunityMangas({
  //     categories: selectedCategories.includes("All") ? [] : selectedCategories,
  //     searchQuery,
  //     sortBy,
  //     filterByFollowed: filterBy,
  //     timeRange,
  //     pageSize: 24,
  //     filterByEditorsChoice: false,
  //   });

  // const { data: editorsChoiceData } = useQuery({
  //   queryKey: ["editors-choice-mangas"],
  //   queryFn: () =>
  //     MangaService.fetchMappedMangaDocuments({
  //       requestBody: {
  //         filterByEditorsChoice: true,
  //         pageSize: 3,
  //       },
  //     }),
  // });

  // const editorsPicks = editorsChoiceData?.data || [];
  // const allPosts = data?.pages.flatMap((page: MangaPage) => page.data) || [];

  // const { data: userData } = useQuery({
  //   queryKey: ["user-stats", user?.uid],
  //   queryFn: () => UserService.getCurrentUser(),
  //   enabled: !!user?.uid,
  // });

  // const { data: notifications = [] } = useQuery({
  //   queryKey: ["notifications", user?.uid],
  //   queryFn: async () => {
  //     const response = await InteractionsService.getNotifications({
  //       userId: user?.uid || "",
  //     });
  //     return response.notifications || [];
  //   },
  //   enabled: !!user?.uid,
  // });

  // useEffect(() => {
  //   const unreadCount = notifications.filter((n: { read: boolean }) => !n.read).length;
  //   setNotificationCount(unreadCount);
  // }, [notifications]);

  // const handleClick = (item) => {
  //   router.push(`/community/mangas/${item.id}`);
  // };

  const user = useUser();

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const categories = [
    "All",
    "Shonen",
    "Shojo",
    "Seinen",
    "Josei",
    "Isekai",
    "Fantasy",
    "Science Fiction",
    "Horror",
    "Slice of Life",
    "Romance",
    "Mystery",
    "Historical",
    "Sports",
    "Supernatural",
  ];

  const updateQueryParams = (
    params: Record<string, string | undefined | null>
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    // 从 URL 参数中恢复所有状态
    const categoryParam = searchParams.get("categories");
    const sortByParam = searchParams.get("sortBy");
    const filterByParam = searchParams.get("filterBy") as "all" | "followed";
    const timeRangeParam = searchParams.get("timeRange");
    // const searchQueryParam = searchParams.get("searchQuery");

    // 设置类别
    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","));
    }

    // 设置其他过滤器状态
    if (sortByParam) {
      setSortBy(sortByParam);
    }
    if (filterByParam) {
      setFilterBy(filterByParam);
    }
    if (timeRangeParam) {
      setTimeRange(timeRangeParam);
    }
    // if (searchQueryParam) {
    //   setSearchQuery(searchQueryParam);
    // }
  }, [searchParams]); // 依赖于 searchParams

  // 更新过滤器时的函数
  const updateFilters = (updates: {
    categories?: string[];
    sortBy?: string;
    filterBy?: "all" | "followed";
    timeRange?: string | null;
  }) => {
    const newParams = {
      categories: updates.categories?.includes("All")
        ? undefined
        : updates.categories?.join(","),
      sortBy: updates.sortBy || sortBy,
      filterBy: updates.filterBy || filterBy,
      timeRange: updates.timeRange || timeRange,
    };

    updateQueryParams(newParams);
  };

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push("/login?redirect=/community");
  //     return;
  //   }

  //   if (
  //     userData?.award_taken_time &&
  //     !hasAutoOpened &&
  //     searchParams.get("showCheckIn") === "true"
  //   ) {
  //     const lastCheckIn = new Date(
  //       userData.award_taken_time._seconds
  //         ? userData.award_taken_time._seconds * 1000
  //         : userData.award_taken_time
  //     );
  //     const today = new Date();

  //     const lastCheckInDate = new Date(
  //       lastCheckIn.getFullYear(),
  //       lastCheckIn.getMonth(),
  //       lastCheckIn.getDate()
  //     );
  //     const todayDate = new Date(
  //       today.getFullYear(),
  //       today.getMonth(),
  //       today.getDate()
  //     );
  //     const hasClaimedToday = lastCheckInDate.getTime() === todayDate.getTime();

  //     if (!hasClaimedToday) {
  //       setShowCheckIn(true);
  //     }
  //     setHasAutoOpened(true);

  //     setTimeout(() => {
  //       router.replace("/community");
  //     }, 0);
  //   }
  // }, [searchParams, hasAutoOpened, router]);

  // const handleCloseCheckIn = () => {
  //   setShowCheckIn(false);
  // };

  // const handleOpenCheckIn = () => {
  //   setShowCheckIn(true);
  // };

  // const markAllAsReadMutation = useMutation({
  //   mutationFn: async () => {
  //     if (!user?.uid) return;
  //     return await InteractionsService.markNotificationsRead({
  //       userId: user.uid,
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["notifications", user?.uid] });
  //   },
  // });
  const { data } = useQuery({
    queryKey: ["testNotes"],
    queryFn: async () => {
      const response = await fetch("/api/testNote");
      return response.json();
    },
  });
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    console.log(data);
    setNotes(data?.notes || []);
  }, [data]);

  const createNote = useMutation({
    mutationFn: async (newNote: Note) => {
      console.log("Create Note", newNote);
      const response = await fetch("/api/testNote", {
        method: "POST",
        body: JSON.stringify({ newNote }),
      });
      return response.json();
    },
    onSuccess: () => {
      console.log("Note created successfully");
      queryClient.invalidateQueries({ queryKey: ["testNotes"] });
    },
  });

  const deleteNote = useMutation({
    mutationFn: async (noteId: string) => {
      const response = await fetch("/api/testNote", {
        method: "DELETE",
        body: JSON.stringify({ noteId }),
      });
      return response.json();
    },
    onSuccess: () => {
      console.log("Note deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["testNotes"] });
    },
  });

  return (
    <Flex
      gap="small"
      vertical
      className={`w-full h-full pt-4 px-4 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <SearchBar
        className="w-full"
        placeholder={t("search")}
        // onSearch={setSearchQuery}
      />
      <div className="flex justify-end">
        <CommunityFilter
          onFilterChange={({
            sortBy: newSortBy,
            timeRange: newTimeRange,
            filterBy: newFilterBy,
          }: {
            sortBy: string;
            timeRange: string | null;
            filterBy: "all" | "followed";
          }) => {
            updateFilters({
              sortBy: newSortBy,
              filterBy: newFilterBy,
              timeRange: newTimeRange,
            });
          }}
        />
      </div>
      <div className="relative w-full">
        {showLeftButton && (
          <Button
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 !rounded-full shadow-md ${
              isDarkMode
                ? "bg-gray-800/80 hover:bg-gray-700/80"
                : "bg-white/80 hover:bg-gray-50/80"
            } border-none`}
            icon={
              <LeftOutlined
                className={isDarkMode ? "text-gray-200" : "text-gray-700"}
              />
            }
            onClick={() => scroll("left")}
          />
        )}

        <div
          ref={scrollContainerRef}
          className={`w-full overflow-x-auto scrollbar-none px-8 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
          onScroll={handleScroll}
        >
          <div className="flex gap-2 pb-2 whitespace-nowrap">
            {categories.map((category) => (
              <Button
                key={category}
                className={`!m-0 whitespace-nowrap ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-200"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  setSelectedCategories((prev) => {
                    let newCategories;
                    if (category === "All") {
                      newCategories = ["All"];
                    } else {
                      if (prev.includes("All")) {
                        newCategories = [category];
                      } else {
                        newCategories = prev.includes(category)
                          ? prev.filter((c) => c !== category)
                          : [...prev, category];

                        newCategories =
                          newCategories.length === 0 ? ["All"] : newCategories;
                      }
                    }

                    // 更新 URL 参数
                    updateFilters({
                      categories: newCategories.includes("All")
                        ? undefined
                        : newCategories,
                    });

                    return newCategories;
                  });
                }}
                style={
                  selectedCategories.includes(category) ||
                  (category === "All" && selectedCategories.length === 0)
                    ? { backgroundColor: isDarkMode ? "#374151" : "#e5e7eb" }
                    : {}
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {showRightButton && (
          <Button
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 !rounded-full shadow-md ${
              isDarkMode
                ? "bg-gray-800/80 hover:bg-gray-700/80"
                : "bg-white/80 hover:bg-gray-50/80"
            } border-none`}
            icon={
              <RightOutlined
                className={isDarkMode ? "text-gray-200" : "text-gray-700"}
              />
            }
            onClick={() => scroll("right")}
          />
        )}
      </div>

      <Card
        className={`w-full h-full ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div
          className="image-gallery w-full py-4 h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin"
          id="image-gallery"
        >
          <Title level={3} className="text-center">
            User [{user?.displayName}] Test
          </Title>
          <div className="flex gap-2 mb-4">
            <Input.TextArea
              rows={1}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <Button
              onClick={() =>
                createNote.mutate({
                  userId: user?.uid ?? "",
                  createdAt: new Date().toISOString(),
                  content: noteContent,
                })
              }
            >
              Create Note
            </Button>
          </div>
          {notes
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((note) => (
              <div
                key={note.id}
                className="grid grid-cols-4 gap-4 items-center my-2"
              >
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => note.id && deleteNote.mutate(note.id)}
                />
                <p className="text-gray-500">{note.createdAt}</p>
                <Title level={3} className="!mb-0">
                  {note.content}
                </Title>
                {note.fileUrl && (
                  <div className="flex justify-center">
                    <Image
                      src={note.fileUrl}
                      alt={note.content}
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </div>
            ))}
          {/* Editors Choice Section */}
          {/* {editorsPicks.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-12 px-4 max-w-[1000px] mx-auto">
                {editorsPicks.map((item: { id: string; imageURL: string; name: string }) => (
                  <div
                    key={item.id}
                    className="relative group overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <MasonryGridItem
                      item={item}
                      // onClick={() => handleClick(item)}
                    >
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={item.imageURL}
                          alt={item.name}
                          loading="lazy"
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-sm font-medium truncate">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                    </MasonryGridItem>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* {isLoading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <Spin size="large" />
            </div>
          ) : (
            <InfiniteScroll
              dataLength={allPosts.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<Skeleton.Button active block className="h-12 m-auto" />}
              endMessage={<Divider plain>{t("thatsAll")}</Divider>}
              scrollableTarget="image-gallery"
            >
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                {allPosts.map((item: { id: string; imageURL: string; name: string }) => (
                  <div key={item.id} className="break-inside-avoid">
                    <MasonryGridItem
                      item={item}
                      // onClick={() => handleClick(item)}
                    >
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={item.imageURL}
                          alt={item.name}
                          crossOrigin="anonymous"
                          loading="lazy"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </MasonryGridItem>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          )} */}
        </div>
      </Card>

      <div className="flex justify-end p-4">
        <Button
          type="primary"
          icon={<GiftOutlined />}
          // onClick={handleOpenCheckIn}
        >
          Daily Check-in
        </Button>
      </div>

      {/* <CheckInModal open={showCheckIn} onClose={handleCloseCheckIn} /> */}

      {/* <Popover
        content={<NotificationList onCheckIn={() => setShowCheckIn(true)} />}
        title="Notifications"
        trigger="click"
        placement="topRight"
        className="w-80"
        onOpenChange={(visible) => {
          setIsOpen(visible);
          if (!visible) {
            markAllAsReadMutation.mutate();
            setNotificationCount(0);
          }
        }}
      >
        <FloatButton
          icon={
            <Badge count={notificationCount} size="small">
              <BellOutlined style={{ fontSize: "20px" }} />
            </Badge>
          }
          type={notificationCount > 0 ? "primary" : "default"}
          style={{
            right: 48,
            bottom: 36,
            backgroundColor: notificationCount > 0 ? "#ff4d4f" : "#fff",
            color: notificationCount > 0 ? "#fff" : "#000",
          }}
        />
      </Popover> */}
    </Flex>
  );
}
