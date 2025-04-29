import { z } from "zod";

export const commentSchema = z.object({
    comment: z.string().min(1, "Comment is required"),
  });

export type Category = {
    name: string;
    confidence: number;
    severity: number;
};

export const imageSchema = z.object({
  imageData: z.string().nonempty("Image data is required."),
})
