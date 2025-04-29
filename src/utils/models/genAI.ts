import { z } from "zod";

export const GenAIImageOutputSchema = z.object({
  id: z.string(),
  filePath: z.string(),
  prompt: z.string(),
  imageURL: z.string().url(),
  imageCategory: z.string(),
  isAI: z.boolean(),
});

const ImageCategory = z.enum(["backgrounds", "characters"]);

// const pollinationTags = z.enum([
//   "background",
//   "whiteBackground",
//   "age",
//   "gender",
// ]);

export const generateTextToImageBodySchema = z.object({
  prompt: z.string().optional(),
  selectedTags: z.array(z.string()).optional(),
  secondaryFolderName: ImageCategory.optional(),
  sourceMangaId: z.string().optional(),
});

export const generateTextToImageResponseSchema = z.object({
  success: z.boolean(),
  data: GenAIImageOutputSchema,
});

export const inpaintSchema = z.object({
  uploadId: z.string().optional().optional(),
  imagePath: z.string().optional().optional(),
  mask: z.string().describe("Base64 encoded mask image").optional(),
  prompt: z.string().describe("Inpainting prompt description").optional(),
  strength: z.number().min(0).max(1).describe("Inpainting strength").optional(),
  batchSize: z
    .number()
    .int()
    .positive()
    .describe("Number of images to generate")
    .optional(),
  removeBG: z.boolean().describe("Remove background flag").optional(),
});

const timestampSchema = z.object({
  _seconds: z.number(),
  _nanoseconds: z.number(),
});

const uploadDataSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  filePath: z.string().optional(),
  sourceMangaId: z.string().optional(),
  imageCategory: z.string().optional().nullable().optional(), // undefined in JS is nullable in Zod
  fileSize: z.number().optional(),
  mimeType: z.string().optional(),
  uploadedAt: timestampSchema.optional(),
  updatedAt: timestampSchema.optional(),
  isActive: z.boolean().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  userId: z.string().optional(),
  isAi: z.boolean().optional(),
  aiService: z.string().optional(),
  seed: z.number().optional(),
  prompt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  fileUrl: z.string().optional(),
});

export const inpaintResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(uploadDataSchema),
});
