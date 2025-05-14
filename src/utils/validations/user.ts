import { z } from "zod";

const LoginHistorySchema = z.object({
  login_time: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  logout_time: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  duration: z.number(),
});

export const userSchema = z.object({
  upvotedManga: z.array(z.string()),
  heartedManga: z.array(z.string()),
  commentedManga: z.array(z.string()),
  followedUsers: z.array(z.string()),
  paid: z.boolean(),
  userID: z.string(),
  username: z.string(),
  email: z.string().email(),
  bio: z.string(),
  profileimage: z.string().url(),
  coverImage: z.string().url(),
  isAuthorisedForTesting: z.boolean(),
  emailVerificationAfterLoginSent: z.boolean(),
  dateOfFirstLogin: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  dateOfAuthorisation: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  credits: z.number().int(),
  plan: z.enum(["free", "paid"]),
  extra_credits: z.number().int(),
  plan_buy_time: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  daily_award_taken: z.boolean(),
  award_taken_time: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  login_times: z.number().int(),
  last_login_time: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  last_logout_time: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  login_history: z.array(LoginHistorySchema),
  categories: z.array(z.string()),
});

export const userUpdateSchema = z.object({
  username: z
    .string()
    .min(3, "username-min-length")
    .max(30, "username-max-length")
    .nonempty("username-required")
    .optional(),
  defaultprofileimage: z
    .string()
    .url("profile-image-url-invalid")
    .nonempty("profile-image-required")
    .optional(),
  bio: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export const deleteUserSchema = z.object({
  uid: z.string().nonempty("uid-required"),
});

export const getUserProfileSchema = z.object({
  uid: z.string().nonempty("uid-required"),
});