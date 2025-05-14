import { z } from "zod";

export const getCommentsSchema = z.object({
  documentID: z.string().nonempty("Document ID is required"),
});

export const addCommentSchema = z.object({
  documentID: z.string().nonempty("Document ID is required"),
  uid: z.string().nonempty("User ID is required"),
  description: z.string().nonempty("Comment description is required"),
  parentCommentID: z.string().optional(), // Optional
});

export const updateCommentSchema = z.object({
  documentId: z.string(),
  commentId: z.string(),
  replyId: z.string().optional(),
  newDescription: z.string(),
  isReply: z.boolean().default(false),
});

export const deleteCommentSchema = z.object({
  documentID: z.string().nonempty("Document ID is required"),
  commentID: z.string().nonempty("Comment ID is required"),
  parentCommentID: z.string().optional(), // Optional
});

export const loadUpvotedCommentsSchema = z.object({
  uid: z.string().nonempty("User ID is required"),
});

export const upvoteCommentSchema = z.object({
  forumItemID: z.string().nonempty("Forum Item ID is required"),
  commentID: z.string().nonempty("Comment ID is required"),
  userID: z.string().nonempty("User ID is required"),
  parentCommentID: z.string().optional(), // Optional for nested comments
});

export const getRepliesSchema = z.object({
  documentID: z.string().nonempty("Document ID is required"),
  commentID: z.string().nonempty("Comment ID is required"),
});

export const getCommentsAndUserInfoSchema = z.object({
  documentID: z.string().nonempty("Document ID is required"),
  lastDocumentID: z.string().optional(),
  pageSize: z.number().min(1).default(20),
  isSortByUpVote: z.boolean().default(false),
});

// Validation schema for query parameters
export const fetchCommentsSchema = z.object({
  documentID: z.string().nonempty("Document ID is required"),
  lastDocumentID: z.string().optional(), // Optional for pagination
  pageSize: z.number().min(1).default(5), // Default page size is 5
  isSortByUpVote: z.boolean().default(false), // Default sorting by createdAt
  isNext: z.string().optional(), // Optional direction: "next" or "back"
});

export const addReplySchema = z.object({
  documentID: z.string().nonempty("Document ID is required"),
  commentID: z.string().nonempty("Comment ID is required"),
  uid: z.string().nonempty("User ID is required"),
  description: z.string().nonempty("Reply description is required"),
});

export const updateCommentReactionSchema = z.object({
  documentId: z.string().min(1, "Document ID is required"),
  commentId: z.string().min(1, "Comment ID is required"),
  replyId: z.string().optional(),
  userId: z.string().min(1, "User ID is required"),
  emoji: z.string().min(1, "Emoji is required"),
  addReaction: z.boolean(),
  isReply: z.boolean().optional(),
});

export const reportCommentSchema = z.object({
  documentId: z.string(),
  commentId: z.string(),
  replyId: z.string().optional(),
  userId: z.string(),
  reportType: z.enum([
    "SPAM",
    "HARASSMENT",
    "HATE_SPEECH",
    "INAPPROPRIATE",
    "OTHER",
  ]),
  description: z.string().optional(),
  isReply: z.boolean().default(false),
});
