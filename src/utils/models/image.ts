import { z } from "zod";

export const removeBackgroundSchema = z.object({
  imagePath: z.string().optional(),
  uploadId: z.string().optional(),
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

export const removeBackgroundResponseSchema = z.object({
  success: z.boolean(),
  data: uploadDataSchema,
});

export const generateImageSchema = z
  .object({
    pose: z.string(),
    poseID: z.string(),
    ref: z.string(),
    seed: z.number(),
    apiURL: z.string(),
    isAmiadaptor: z.boolean().optional().default(false),
    width: z.number().optional().default(896),
    height: z.number().optional().default(1024),
    cfg: z.number().optional().default(3.5),
    steps: z.number().optional().default(20),
  })
  .strict();

export const generateImageResponseSchema = z
  .object({
    success: z.boolean(),
    data: z.object({
      id: z.string(),
      filePath: z.string(),
      imageURL: z.string().url(),
    }),
  })
  .strict();

export type GenerateImageRequest = z.infer<typeof generateImageSchema>;
export type GenerateImageResponse = z.infer<typeof generateImageResponseSchema>;

export const getGeneratedImagesSchema = z.object({
  sourcePaths: z.array(z.string()),
});

export const getGeneratedImagesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      sourcePath: z.string(),
      signedUrl: z.string().url(),
    })
  ),
  message: z.string(),
});

export const detectPoseSchema = z.object({
  image_path: z.string(),
  image_base64: z.string(),
});

export const detectPoseResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(z.tuple([z.number(), z.number()])),
});

export type RemoveBackgroundRequest = z.infer<typeof removeBackgroundSchema>;
export type RemoveBackgroundResponse = z.infer<
  typeof removeBackgroundResponseSchema
>;
