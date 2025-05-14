export interface CategoryObject {
  key: string;
  apiType: string;
  order: number;
}

export const categories: {
  [key: string]: CategoryObject;
} = {
  shonen: { key: "shonen", apiType: "Shonen", order: 1 },
  shojo: { key: "shojo", apiType: "Shojo", order: 2 },
  seinen: { key: "seinen", apiType: "Seinen", order: 3 },
  josei: { key: "josei", apiType: "Josei", order: 4 },
  isekai: { key: "isekai", apiType: "Isekai", order: 5 },
  fantasy: { key: "fantasy", apiType: "Fantasy", order: 6 },
  "science fiction": {
    key: "scienceFiction",
    apiType: "Science Fiction",
    order: 7,
  },
  horror: { key: "horror", apiType: "Horror", order: 8 },
  sliceOfLife: { key: "sliceOfLife", apiType: "Slice Of Life", order: 9 },
  romance: { key: "romance", apiType: "Romance", order: 10 },
  mystery: { key: "mystery", apiType: "Mystery", order: 11 },
  historical: { key: "historical", apiType: "Historical", order: 12 },
  sports: { key: "sports", apiType: "Sports", order: 13 },
  supernatural: { key: "supernatural", apiType: "Supernatural", order: 14 },
  adventure: { key: "adventure", apiType: "Adventure", order: 15 },
  comedy: { key: "comedy", apiType: "Comedy", order: 16 },
  mecha: { key: "mecha", apiType: "Mecha", order: 17 },
  yaoi: { key: "yaoi", apiType: "Yaoi", order: 18 },
  yuri: { key: "yuri", apiType: "Yuri", order: 19 },
  anthology: { key: "anthology", apiType: "Anthology", order: 20 },
};

export const categoriesList = Object.values(categories).sort(
  (a: CategoryObject, b: CategoryObject) => a.order - b.order
);

export const categoryStringList = categoriesList.map(
  (item: CategoryObject) => item.apiType
);

export interface BaseForumItem {
  id: string;
  name: string;
  imageDataImage: string | null;
  lastAccessed: Date | string;
  firstCreated: Date | string;
  isFavorite?: boolean;
  description: string;
  categories: Set<string>;
  isFolder?: boolean;
  isFolderOpened?: boolean;
  isDocumentModified?: boolean;
  canvasSizeArr: number[];
  fileDocURLCloud: string | null;
  upVotes?: number;
  hearts?: number;
  derives?: number;
  commentsCount?: number;
  numDownloads?: number;
  userID: string | null;
  userName: string | null;
  userBio: string | null;
  userprofileimage: string | null;
  isUpvoted?: boolean;
  isHearted?: boolean;
  isPosted?: boolean;
  isPinned?: boolean;
  hasTemplateBeenModified?: boolean | null;
  templateTrackingID?: string[] | null;
  refTemplateTrackingID?: string | null;
}

export type ForumItem = BaseForumItem & { children?: ForumItem[] };
