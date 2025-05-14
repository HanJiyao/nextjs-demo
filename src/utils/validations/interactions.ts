import { z } from "zod";

export const updateInteractionSchema = z.object({
  userID: z.string().nonempty("uid-required"),
  mangaID: z.string().nonempty("mangaID-required"),
  userIDOfManga: z.string().nonempty("userIDOfManga-required"),
  option: z.enum(["upvote", "heart", "download"]),
  addAction: z.boolean(),
});

export const fetchUserMangaInteractionsSchema = z.object({
  userID: z.string().nonempty("uid-required"),
});

export const fetchUserMyStatsSchema = z.object({
  userID: z.string().nonempty("uid-required"),
});

export const fetchUserStatsSchema = z.object({
  userID: z.string().nonempty("uid-required"),
});

export const updateFollowedUsersSchema = z.object({
  userID: z.string().nonempty("userID is required"),
  userIDToFollow: z.string().nonempty("userIDToFollow is required"),
  shouldFollow: z.boolean(),
});

export const fetchUserMangaInteractionsDetailsSchema = z.object({
  uid: z.string(),
  type: z.enum(["heartedManga", "upvotedManga"]),
});

export const updateEmojiReactionSchema = z.object({
  userID: z.string().min(1, "User ID is required"),
  mangaID: z.string().min(1, "Manga ID is required"),
  userIDOfManga: z.string().min(1, "Manga Owner ID is required"),
  emoji: z.string().min(1, "Emoji is required"),
  addReaction: z.boolean(),
});

export const reportMangaSchema = z.object({
  mangaID: z.string().nonempty("Manga ID is required"),
  reportType: z.string().nonempty("report type is required"),
  description: z.string().optional(),
  userID: z.string().nonempty("User ID is required"),
});

export const addNotificationSchema = z.object({
  type: z.enum(["daily_checkin", "like", "comment", "follow"]),
  message: z.string().nonempty("Message is required"),
  link: z.string().nonempty("Link is required"),
  read: z.boolean(),
});

export const getNotificationsSchema = z.object({
  userID: z.string().nonempty("User ID is required"),
});

export const getNotificationResultSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const getOneNotificationSchema = z.object({
  userID: z.string().nonempty("User ID is required"),
  notificationId: z.string().nonempty("Notification ID is required"),
});
