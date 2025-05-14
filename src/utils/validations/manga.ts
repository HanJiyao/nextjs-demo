import { z } from "zod";

export const mangaDownloadInputSchema = z.object({
  galleryItems: z.array(
    z.object({
      id: z.string().nonempty("id-required"),
      fileDocURLCloud: z.string().url("url-invalid").optional(),
    })
  ),
});

export const uploadImageSchema = z.object({
  secondaryFolderName: z.string(),
  imageData: z.instanceof(File),
  id: z.string(),
  isReplace: z.boolean(),
  type: z.string(),
});

export const uploadImageResponseSchema = z.object({
  data: z.object({
    url: z.string(),
    filePath: z.string(),
  }),
  success: z.boolean(),
});

export const uploadMangaSchema = z.object({
  mangaDraftId: z.string(),
  file: z.instanceof(File),
  name: z.string().optional(),
  description: z.string().optional(),
});

export const MangaSchema = z.object({
  id: z.string(),
  canvasSizeArr: z.array(z.number()).optional(),
  categories: z.array(z.string()).optional(),
  dailyUpVotes: z.number().optional(),
  description: z.string().optional(),
  documentURL: z.string().optional(),
  editorsChoice: z.boolean().optional().default(false),
  firstCreated: z.date().optional(),
  imageURL: z.string().optional(),
  isPosted: z.boolean().optional(),
  lastAccessed: z.date().optional(),
  name: z.string().optional(),
  numComments: z.number().optional().default(0),
  numDerived: z.number().optional().default(0),
  numDownloads: z.number().optional().default(0),
  numHearts: z.number().optional().default(0),
  postTime: z.date().optional(),
  refTemplateTrackingID: z.string().optional(),
  templateTrackingID: z.array(z.string()).optional(),
  timeLastUpvote: z.date().optional(),
  uid: z.string().optional(),
  upVotes: z.number().optional().default(0),
});

export const uploadMangaResponseSchema = z.object({
  data: MangaSchema,
  success: z.boolean(),
});

export const removeMangaSchema = z.object({
  secondaryFolderName: z.string(),
  id: z.string(),
});

export const removeImagePathSchema = z.object({
  id: z.string(),
});

export const removeMangaPathSchema = z.object({
  id: z.string(),
});

export const removeMangaQuerySchema = z.object({
  secondaryFolderName: z.string(),
});

// const CategorySchema = z.enum([
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
//   "Adventure",
//   "Comedy",
//   "Mecha",
//   "Yaoi",
//   "Yuri",
//   "Anthology",
// ]);

export const addDocumentToRootSchema = z.object({
  uid: z.string().nonempty("User ID is required"),
  galleryItem: z.object({
    id: z.string().uuid(),
    name: z.string().nonempty("Gallery item name is required"),
    lastAccessed: z.string().nonempty("Last accessed timestamp is required"),
    firstCreated: z.string().nonempty("First created timestamp is required"),
    galleryDesc: z.string().optional(),
    categories: z.array(z.string()),
    templateTrackingID: z.array(z.string()).optional(),
    refTemplateTrackingID: z.string().optional(),
    canvasWidth: z.number(),
    canvasHeight: z.number(),
  }),
  imageURL: z.string().url("Valid image URL is required"),
  documentURL: z.string().url("Valid document URL is required"),
  isDocNeeded: z.boolean().optional().default(true),
});

export const deleteDocumentFromRootSchema = z.object({
  documentID: z.string().nonempty("Document ID is required"),
});

export const checkDocumentSchema = z.object({
  documentID: z.string().nonempty("Document ID is required"),
});

export const checkDocumentsSchema = z.object({
  documentIDs: z.array(z.string()).nonempty("Document IDs are required"),
});

export const saveMangaSchema = z.object({
  userID: z.string().nonempty("User ID is required"),
  galleryItem: z.object({
    id: z.string().uuid("Invalid UUID for gallery item ID"),
    name: z.string().nonempty("Gallery item name is required"),
    lastAccessed: z.string().nonempty("Last accessed date is required"),
    firstCreated: z.string().nonempty("First created date is required"),
    galleryDesc: z.string().optional(),
    categories: z.array(z.string()),
    canvasWidth: z.number(),
    canvasHeight: z.number(),
  }),
});

export const postMangaSchema = z.object({
  galleryItems: z
    .array(
      z.object({
        id: z.string().uuid("Invalid UUID for gallery item ID"),
      })
    )
    .nonempty("Gallery items are required"),
  postOrHide: z.boolean(),
});

export const updateDerivedMangaCountsSchema = z.object({
  originalMangaID: z.string().nonempty("Original Manga ID is required"),
  originalCreatorID: z.string().nonempty("Original Creator ID is required"),
  derivedMangaID: z.string().nonempty("Derived Manga ID is required"),
  derivedUserID: z.string().nonempty("Derived User ID is required"),
});

export const reqSingleMangaItemSchema = z.object({
  mangaID: z.string().nonempty("Manga ID is required"),
});

export const fetchMangaDocumentsSchema = z.object({
  categories: z.array(z.string()).optional(),
  name: z.string().optional(),
  userID: z.string().optional(),
  currentUserID: z.string().optional(),
  sortedBy: z
    .enum(["lastAccessed", "upVotes", "numComments", "numHearts"])
    .default("lastAccessed"),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  lastDocumentID: z.string().optional().nullable(),
  pageSize: z.number().int().default(100),
  nextButton: z.enum(["prev", "next"]).default("prev"),
  fetchAll: z.boolean().default(false),
  templateTrackingID: z.string().optional(),
  filterByFollowed: z.enum(["all", "followed"]).default("all"),
  filterByEditorsChoice: z.boolean().default(false),
});

export const getUnsplashImagesSchema = z.object({
  query: z.string().optional(),
  page: z.number().int().optional().default(1),
});

const ImageURLsSchema = z.object({
  raw: z.string(),
  full: z.string(),
  regular: z.string(),
  small: z.string(),
  thumb: z.string(),
});

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  portfolio_url: z.string().nullable(),
});

const UnsplashImageSchema = z.object({
  id: z.string(),
  urls: ImageURLsSchema,
  user: UserSchema,
  description: z.string().nullable(),
  alt_description: z.string().nullable(),
});

export const SearchResponseSchema = z.object({
  total: z.number(),
  total_pages: z.number(),
  results: z.array(UnsplashImageSchema),
});

export const imagesWebSearchResponseSchema = z.object({
  success: z.boolean(),
  data: SearchResponseSchema,
});

export const saveImagesWebSchema = z.object({
  secondaryFolderName: z.string(),
  sourceMangaId: z.string(),
  imageUrl: z.string(),
});

export const saveImagesWebResponseSchema = z.object({
  data: z.object({
    url: z.string(),
    filePath: z.string(),
  }),
  success: z.boolean(),
});
