import { z } from "zod";

export const creditsDeductSchema = z.object({
  userID: z.string().nonempty("uid-required"),
  deductNum: z.number().positive().default(1),
});

export const grantCreditsOnPurchaseSchema = z.object({
  userID: z.string().nonempty("uid-required"),
  plan: z.string().nonempty("plan-required"),
});

// const planMapping = {
//   starter_plan: "explorer_plan",
//   premium_plan: "creator_plan",
//   advanced_plan: "studio_plan",
// };

// const extraCreditsMapping = {
//   starter_plan: 3000,
//   premium_plan: 10000,
//   advanced_plan: 20000,
// };

export const incrementLoginTimesSchema = z.object({
  userID: z.string().nonempty("userID is required"),
});

export const updateLastLoginTimeSchema = z.object({
  userID: z.string().nonempty("userID is required"),
});

export const updateLastLogoutTimeSchema = z.object({
  userID: z.string().nonempty("userID is required"),
});

export const addLoginHistorySchema = z.object({
  userID: z.string().nonempty("User ID is required"),
});

export const configureRevenueCatSchema = z.object({
  userID: z.string().optional(),
});

export const checkAndGrantBenefitsSchema = z.object({});

export const dailyCheckinSchema = z.object({
  userID: z.string().nonempty("userID is required"),
});
