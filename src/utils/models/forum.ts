import { z } from "zod";
import { categoryStringList } from "@/utils/models/forumConstants"; 

const categorySchema = z.string().refine(
  (value) => categoryStringList.includes(value),
  (value) => ({ message: `${value} is not a valid category` })
);

const AnyObject = z.record(z.any());

export const forumItem2Schema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  imageDataImage: z.string().nullable(),
  lastAccessed: z.date(),
  firstCreated: z.date(),
  isFavorite: z.boolean().default(false),
  description: z.string(),
  categories: z.set(categorySchema),
  isFolder: z.boolean(),
  imageURL: z.string(),
  isFolderOpened: z.boolean().default(false),
  isDocumentModified: z.boolean().default(false),
  canvasSizeArr: z.array(z.number()).length(2),
  fileDocURLCloud: z.string().nullable(),
  upVotes: z.number().int().default(0),
  hearts: z.number().int().default(0),
  derives: z.number().int().default(0),
  commentsCount: z.number().int().default(0),
  numDownloads: z.number().int().default(0),
  children: z.array(AnyObject).default([]),
  userID: z.string().nullable(),
  userName: z.string().nullable(),
  userBio: z.string().nullable(),
  userprofileimage: z.string().nullable(),
  isUpvoted: z.boolean().default(false),
  isHearted: z.boolean().default(false),
  isPosted: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  hasTemplateBeenModified: z.boolean().nullable(),
  templateTrackingID: z.array(z.string()).nullable(),
  refTemplateTrackingID: z.string().nullable(),
});

export const forumItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  imageDataImage: z.string().nullable(),
  lastAccessed: z.date(),
  firstCreated: z.date(),
  isFavorite: z.boolean().default(false),
  description: z.string(),
  categories: z.set(categorySchema),
  isFolder: z.boolean(),
  imageURL: z.string(),
  children: z.array(forumItem2Schema).default([]),
  isFolderOpened: z.boolean().default(false),
  isDocumentModified: z.boolean().default(false),
  canvasSizeArr: z.array(z.number()).length(2),
  fileDocURLCloud: z.string().nullable(),
  upVotes: z.number().int().default(0),
  hearts: z.number().int().default(0),
  derives: z.number().int().default(0),
  commentsCount: z.number().int().default(0),
  numDownloads: z.number().int().default(0),
  userID: z.string().nullable(),
  userName: z.string().nullable(),
  userBio: z.string().nullable(),
  userprofileimage: z.string().nullable(),
  isUpvoted: z.boolean().default(false),
  isHearted: z.boolean().default(false),
  isPosted: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  hasTemplateBeenModified: z.boolean().nullable(),
  templateTrackingID: z.array(z.string()).nullable(),
  refTemplateTrackingID: z.string().nullable(),
});

export const studioItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  imageDataImage: z.string().nullable(),
  lastAccessed: z.date(),
  firstCreated: z.date(),
  isFavorite: z.boolean().default(false),
  description: z.string(),
  categories: z.set(categorySchema),
  isFolder: z.boolean(),
  imageURL: z.string(),
  children: z.array(forumItem2Schema).default([]),
  isFolderOpened: z.boolean().default(false),
  isDocumentModified: z.boolean().default(false),
  canvasSizeArr: z.array(z.number()).length(2),
  fileDocURLCloud: z.string().nullable(),
  upVotes: z.number().int().default(0),
  hearts: z.number().int().default(0),
  derives: z.number().int().default(0),
  commentsCount: z.number().int().default(0),
  numDownloads: z.number().int().default(0),
  userID: z.string().nullable(),
  userName: z.string().nullable(),
  userBio: z.string().nullable(),
  userprofileimage: z.string().nullable(),
  isUpvoted: z.boolean().default(false),
  isHearted: z.boolean().default(false),
  isPosted: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  hasTemplateBeenModified: z.boolean().nullable(),
  templateTrackingID: z.array(z.string()).nullable(),
  refTemplateTrackingID: z.string().nullable(),
  documentURL: z.string(),
  postTime: z.date(),
  numComments: z.number().int().default(0),
  numHearts: z.number().int().default(0),
  trendScore: z.string(),
  uid: z.string(),
});

export const forumItemResponseSchema: z.ZodSchema = z.object({
  data: forumItemSchema,
  success: z.boolean(),
});

export const forumItemsSchema: z.ZodSchema = z.object({
  data: z.array(forumItemSchema),
  success: z.boolean(),
});

export const studioItemResponseSchema: z.ZodSchema = z.object({
  data: studioItemSchema,
  success: z.boolean(),
});

export const studioItemsSchema: z.ZodSchema = z.object({
  data: z.array(studioItemSchema),
  success: z.boolean(),
});
