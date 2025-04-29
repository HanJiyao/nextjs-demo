import { z } from "zod";
// import { folderTypes } from "@/utils/files";

// Manga Draft
const PointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

// const CsvSchema = z.object({
//   index: z.number(),
//   frame: z.number(),
//   x: z.number(),
//   y: z.number(),
// });

const CropParamsSchema = z.object({
  x: z.number().optional(),
  y: z.number().optional(),
  rotation: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  scaleX: z.number().optional(),
  scaleY: z.number().optional(),
});

const EffectTypeSchema = z.enum([
  "original",
  "lineArt",
  "comic",
  "posterize",
  "sepiaTone",
  "threshold",
  "colorInvert",
]);

export const InpaintImageSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  filePath: z.string().optional(),
  sourceMangaId: z.string().optional(),
  imageCategory: z.string().nullable().optional(),
  fileSize: z.number().optional(),
  mimeType: z.string().optional(),
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

export const InpaintImagesSchema = z.array(InpaintImageSchema);

export const InpaintMetadataSchema = z.object({
  base: InpaintImageSchema,
  images: InpaintImagesSchema.optional(),
});

export const RemoveBgMetadataSchema = z.object({
  base: InpaintImageSchema,
});

export const GraphicSchema = z.object({
  textAlign: z.string().optional(),
  imageData: z.string().optional(),
  points: z.array(PointSchema).optional(),
  textRotation: z.number().optional(),
  speechType: z.string().optional(),
  numPeaks: z.number().optional(),
  content: z.string().optional(),
  imageURL: z.string().optional(),
  imagePath: z.string().optional(),
  id: z.string(),
  name: z.string().optional(),
  zIndex: z.number().optional(),
  borderColor: z.string().optional(),
  fillColor: z.string().optional(),
  borderSize: z.number().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  poseScaleX: z.number().optional(),
  poseScaleY: z.number().optional(),
  poseRotation: z.number().optional(),
  csv: z.string().optional(),
  csvData: z.array(z.object({ x: z.number(), y: z.number() })).optional(),
  csv3D: z.string().optional(),
  poseX: z.number().optional(),
  poseY: z.number().optional(),
  scaleX: z.number().optional(),
  scaleY: z.number().optional(),
  skewX: z.number().optional(),
  skewY: z.number().optional(),
  rotation: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  poseVersion: z.number().optional(),
  isTextContent: z.boolean().optional(),
  cornerRadius: z.number().optional(),
  text: z.string().optional(),
  textPadding: z.number().optional(),
  isHidden: z.boolean().optional(),
  isClipped: z.boolean().optional(),
  isTail: z.boolean().optional(),
  tailWidth: z.number().optional(),
  tailHeight: z.number().optional(),
  tailAngle: z.number().optional(),
  textDescription: z.string().optional(),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  justify: z.enum(["left", "center", "right"]).optional(),
  verticalAlign: z.enum(["top", "middle", "bottom"]).optional(),
  fontSize: z.number().optional(),
  fontColor: z.string().optional(),
  fontFamily: z.string().optional(),
  fontStyle: z.string().optional(),
  poseRefData: z.string().optional(),
  poseRefURL: z.string().optional(),
  imageGraphicID: z.array(z.string()).optional(),
  poseImageGraphicID: z.string().optional(),
  parentId: z.string().optional(),
  uploadId: z.string().optional(),
  characterImagePath: z.string().optional(),
  generatedImagePath: z.string().optional(),
  crop: CropParamsSchema.optional(),
  effect: EffectTypeSchema.optional(),
  inpaint: InpaintMetadataSchema.optional(),
  removeBg: RemoveBgMetadataSchema.optional(),
});

export const SettingsConfigSchema = z.object({
  apiURL: z.string().optional(),
  frameMargin: z.number().optional(),
  frameBorderColor: z.string().optional(),
  theme: z.string().optional(),
  imageData: z.string().optional(),
  textRotation: z.number().optional(),
  textFieldSize: z.number().optional(),
  frameBorderThickness: z.number().optional(),
  gridEnabled: z.boolean().optional(),
  canvasWidth: z.number().optional(),
  frameSpacing: z.number().optional(),
  textFieldFont: z.string().optional(),
  textFieldFillColor: z.string().optional(),
  textFieldTextColor: z.string().optional(),
  canvasHeight: z.number().optional(),
  textFieldBorderThickness: z.number().optional(),
  frameFillColor: z.string().optional(),
  tailWidth: z.number().optional(),
  textFieldBorderColor: z.string().optional(),
  fontStyle: z.string().optional(),
});

export const SettingsConfig2Schema = z.object({
  apiURL: z.string().optional(),
  frameMargin: z.number().optional(),
  frameBorderColor: z.string().optional(),
  theme: z.string().optional(),
  imageData: z.string().optional(),
  textRotation: z.number().optional(),
  textFieldSize: z.number().optional(),
  frameBorderThickness: z.number().optional(),
  gridEnabled: z.boolean().optional(),
  canvasWidth: z.number().optional(),
  frameSpacing: z.number().optional(),
  textFieldFont: z.string().optional(),
  textFieldFillColor: z.string().optional(),
  textFieldTextColor: z.string().optional(),
  canvasHeight: z.number().optional(),
  textFieldBorderThickness: z.number().optional(),
  frameFillColor: z.string().optional(),
  tailWidth: z.number().optional(),
  textFieldBorderColor: z.string().optional(),
  fontStyle: z.string().optional(),
});

// st AnyObject = z.record(z.any());

// const GalleryItem2Schema = z.object({
//   id: z.string(),
//   firstCreated: z.date().optional(),
//   name: z.string(),
//   children: z.array(AnyObject).default([]),
//   lastAccessed: z.date().optional(),
//   isFavorite: z.boolean().optional(),
//   galleryDesc: z.string().optional(),
//   categories: z.array(z.string()).optional(),
//   isPosted: z.boolean().optional(),
//   isFolder: z.boolean().optional(),
//   parentID: z.string().optional(),
//   canvasWidth: z.number(),
//   canvasHeight: z.number(),
//   fileDocURLCloud: z.string().optional(),
//   upVotes: z.number().optional(),
//   settings: SettingsConfigSchema.optional(),
//   graphics: z.array(GraphicSchema).optional(),
// });

// const GalleryItemSchema = z.object({
//   id: z.string(),
//   firstCreated: z.date().optional(),
//   name: z.string(),
//   lastAccessed: z.date().optional(),
//   isFavorite: z.boolean().optional(),
//   galleryDesc: z.string().optional(),
//   categories: z.array(z.string()).optional(),
//   isPosted: z.boolean().optional(),
//   isFolder: z.boolean().optional(),
//   parentID: z.string().optional(),
//   parent: GalleryItem2Schema.optional(),
//   children: z.array(GalleryItem2Schema).optional(),
//   canvasWidth: z.number(),
//   canvasHeight: z.number(),
//   fileDocURLCloud: z.string().optional(),
//   upVotes: z.number().optional(),
//   settings: SettingsConfigSchema.optional(),
//   graphics: z.array(GraphicSchema).optional(),
// });

export const MangaDraftSchema = z.object({
  id: z.string(),
  mangaId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  imageDataURL: z.string().optional(),
  fileDocURLCloud: z.string().optional(),
  thumbnailPath: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  galleryDesc: z.string().optional(),
  categories: z.array(z.string()).optional(),
  isPosted: z.boolean().optional(),
  isFolder: z.boolean().optional(),
  parentID: z.string().optional(),
  canvasWidth: z.number(),
  canvasHeight: z.number(),
  graphics: z.array(GraphicSchema),
  firstCreated: z.date().optional(),
  lastAccessed: z.date().optional(),
  isFavorite: z.boolean().optional(),
  upVotes: z.number().optional(),
  fileDocURLLocal: z.string().optional(),
  documentURL: z.string().optional(),
  settings: z
    .object({
      apiURL: z.string().optional(),
      frameMargin: z.number().optional(),
      frameBorderColor: z.string().optional(),
      theme: z.string().optional(),
      imageData: z.string().optional(),
      textRotation: z.number().optional(),
      textFieldSize: z.number().optional(),
      frameBorderThickness: z.number().optional(),
      gridEnabled: z.boolean().optional(),
      canvasWidth: z.number().optional(),
      frameSpacing: z.number().optional(),
      textFieldFont: z.string().optional(),
      textFieldFillColor: z.string().optional(),
      textFieldTextColor: z.string().optional(),
      canvasHeight: z.number().optional(),
      textFieldBorderThickness: z.number().optional(),
      frameFillColor: z.string().optional(),
      tailWidth: z.number().optional(),
      textFieldBorderColor: z.string().optional(),
      fontStyle: z.string().optional(),
    })
    .optional(),
});

export const createMangaDraftBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  galleryDesc: z.string().optional(),
  categories: z.array(z.string()).optional(),
  isPosted: z.boolean().optional(),
  isFolder: z.boolean().optional(),
  parentID: z.string().optional(),
  canvasWidth: z.number(),
  canvasHeight: z.number(),
  settings: SettingsConfigSchema.optional(),
  graphics: z.array(GraphicSchema).optional(),
});

export const duplicateMangaDraftBodySchema = z.object({
  ids: z.array(z.string()),
});

export const getMangaDraftsQuerySchema = z.object({
  isFavorite: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  sortedBy: z.enum(["lastAccessed", "upVotes"]).optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  lastDocumentID: z.string().optional(),
  pageSize: z.number().optional(),
  nextButton: z.enum(["prev", "next"]).optional(),
  fetchAll: z.boolean().optional(),
  templateTrackingID: z.string().optional(),
});

export const getMangaDraftPathSchema = z.object({
  id: z.string(),
});

export const updateMangaDraftPathSchema = z.object({
  id: z.string(),
});

export const deleteMangaDraftPathSchema = z.object({
  id: z.string(),
});

export const deleteBulkMangaDraftQuerySchema = z.object({
  ids: z.array(z.string()),
});

export const updateMangaDraftBodySchema = z.object({
  name: z.string().optional(),
  isFavorite: z.boolean().optional(),
  description: z.string().optional(),
  galleryDesc: z.string().optional(),
  categories: z.array(z.string()).optional(),
  isPosted: z.boolean().optional(),
  isFolder: z.boolean().optional(),
  parentID: z.string().optional(),
  canvasWidth: z.number().optional(),
  canvasHeight: z.number().optional(),
  settings: SettingsConfigSchema.optional(),
  graphics: z.array(GraphicSchema).optional(),
});

export const getMangaDraftSchema = z.object({
  success: z.boolean(),
  data: MangaDraftSchema,
});

export const getMangaDraftsSchema = z.object({
  success: z.boolean(),
  data: z.array(MangaDraftSchema),
});

export const duplicateMangaDraftSchema = z.object({
  data: z.array(z.string()),
  success: z.boolean(),
});

export const deleteBulkMangaDraftSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export const createMangaDraftSchema = z.object({
  success: z.boolean(),
  data: MangaDraftSchema,
});

export const updateMangaDraftSchema = z.object({
  success: z.boolean(),
  data: MangaDraftSchema,
});

export const deleteMangaDraftSchema = z.object({
  success: z.boolean(),
});

export const getGalleryItemSchema = z.object({
  success: z.boolean(),
  data: MangaDraftSchema,
});

export const createGalleryItemSchema = z.object({
  success: z.boolean(),
  data: MangaDraftSchema,
});

export const updateGalleryItemSchema = z.object({
  success: z.boolean(),
  data: MangaDraftSchema,
});

export const deleteGalleryItemchema = z.object({
  success: z.boolean(),
});

const ImageCategory = z.enum([
  "characters",
  "backgrounds",
  "manga_thumbs",
  "manga_screenshots",
]);

export const UploadsSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  stageId: z.string().optional(),
  filePath: z.string().min(1),
  sourceMangaId: z.string().nullable(),
  imageCategory: ImageCategory,
  fileSize: z.number().int().positive(),
  mimeType: z.string().min(1),
  uploadedAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  tags: z.array(z.string()).optional(),
});

export type Uploads = z.infer<typeof UploadsSchema>;

// Workaround to get all images[i] files
export const uploadMangaImagesSchema = z
  .object({
    secondaryFolderName: z.string(),
    sourceMangaId: z.string().optional(),
  })
  .catchall(z.instanceof(File));

export const uploadMangaImagesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(UploadsSchema),
  message: z.string(),
});

export const getMangaImagesSchema = z.object({
  sourceMangaId: z.string().optional(),
  imageCategory: z.string().optional(),
  limit: z.string().transform(Number).optional().default("20"),
  lastId: z.string().optional(),
});

export const UploadsSchemaOutput = z.object({
  id: z.string(),
  name: z.string(),
  filePath: z.string(),
  sourceMangaId: z.string().nullable(),
  referenceMangaIds: z.array(z.string()),
  imageCategory: z.string(),
  fileSize: z.number(),
  mimeType: z.string(),
  uploadedAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean(),
  width: z.number(),
  height: z.number(),
  tags: z.array(z.string()),
  signedUrl: z.string().nullable(),
  error: z.string().optional(),
});

export const getMangaImagesResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    uploads: z.array(UploadsSchemaOutput),
    pagination: z.object({
      hasMore: z.boolean(),
      lastId: z.string().nullable(),
    }),
  }),
});

export const updateMangaImageSchema = z.object({
  name: z.string().optional(),
  imageCategory: z.string().optional(),
  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateMangaImageResponseSchema = z.object({
  success: z.boolean(),
  data: UploadsSchemaOutput,
  message: z.string(),
});

export const deleteMangaImagesSchema = z.object({
  ids: z.array(z.string()),
});

export const deleteMangaImagesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.string(),
      success: z.boolean(),
      message: z.string().optional(),
      error: z.string().optional(),
    })
  ),
  message: z.string(),
});

export const getUploadsSignedSchema = z.object({
  ids: z.array(z.string()).optional(),
  paths: z.array(z.string()).optional(),
});

const uploadsSignedUrlSchema = z.object({
  path: z.string(),
  signedUrl: z.string().nullable(),
  success: z.boolean(),
  error: z.string().optional(),
});

export const getUploadsSignedUrlResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(uploadsSignedUrlSchema),
  message: z.string(),
});

export const TemplateUploads = z.object({
  id: z.string(),
  file: z.instanceof(File),
});

// Manga Template
export const MangaTemplateSchema = z.object({
  id: z.string(),
  mangaId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  imageDataURL: z.string().optional(),
  fileDocURLCloud: z.string().optional(),
  thumbnailPath: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  galleryDesc: z.string().optional(),
  categories: z.array(z.string()).optional(),
  isPosted: z.boolean().optional(),
  isFolder: z.boolean().optional(),
  parentID: z.string().optional(),
  canvasWidth: z.number(),
  canvasHeight: z.number(),
  settings: SettingsConfigSchema.optional(),
  graphics: z.array(GraphicSchema),
  firstCreated: z.date().optional(),
  lastAccessed: z.date().optional(),
  isFavorite: z.boolean().optional(),
  upVotes: z.number().optional(),
  fileDocURLLocal: z.string().optional(),
  documentURL: z.string().optional(),
  mangaDraftId: z.string(),
  uploads: TemplateUploads.optional(),
});

export const getMangaTemplatePathSchema = z.object({
  id: z.string(),
});

export const getMangaTemplatesQuerySchema = z.object({
  isFavorite: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  sortedBy: z.enum(["lastAccessed", "upVotes"]).optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  lastDocumentID: z.string().optional(),
  pageSize: z.number().optional(),
  nextButton: z.enum(["prev", "next"]).optional(),
  fetchAll: z.boolean().optional(),
  templateTrackingID: z.string().optional(),
});

export const updateMangaTemplatePathSchema = z.object({
  id: z.string(),
});

export const deleteMangaTemplatePathSchema = z.object({
  id: z.string(),
});

export const deleteBulkMangaTemplateQuerySchema = z.object({
  ids: z.array(z.string()),
});

export const updateMangaTemplateBodySchema = z.object({
  name: z.string().optional(),
  isFavorite: z.boolean().optional(),
  description: z.string().optional(),
  galleryDesc: z.string().optional(),
  categories: z.array(z.string()).optional(),
  isPosted: z.boolean().optional(),
  isFolder: z.boolean().optional(),
  parentID: z.string().optional(),
  canvasWidth: z.number().optional(),
  canvasHeight: z.number().optional(),
  settings: SettingsConfigSchema.optional(),
  graphics: z.array(GraphicSchema).optional(),
});

export const getMangaTemplateSchema = z.object({
  success: z.boolean(),
  data: MangaTemplateSchema,
});

export const getMangaTemplatesSchema = z.object({
  success: z.boolean(),
  data: z.array(MangaTemplateSchema),
});

// export const inheritMangaTemplateBodySchema = z.object({
//   mangaTemplateId: z.string(),
//   graphics: z.array(GraphicSchema).optional(),
// });

// const arrayIndexField = (prefix: string, schema: z.ZodTypeAny) =>
//   z
//     .record(z.string().regex(new RegExp(`^${prefix}\\[\\d+\\]$`)), schema)
//     .refine(
//       (obj) => {
//         const indices = Object.keys(obj)
//           .map((key) => parseInt(key.match(/\[(\d+)\]$/)?.[1] || "-1"))
//           .sort((a, b) => a - b);
//         return indices.every((val, idx) => val === idx);
//       },
//       {
//         message: `Array indices for ${prefix} must be sequential starting from 0`,
//       }
//     );

export const inheritMangaTemplateBodySchema = z
  .object({
    mangaTemplateId: z.string(),
    graphics: z.string().optional(),
    // // Dynamic string fields (formGraphicId[0], formGraphicId[1], ...)
    // ...arrayIndexField("formGraphicId", z.string()).shape,
    // // Dynamic file fields (form[0], form[1], ...)
    // ...arrayIndexField("form", z.instanceof(File)).shape,
  })
  .catchall(z.union([z.instanceof(File), z.string()]));

export const inheritMangaTemplateSchema = z.object({
  data: z.object({ id: z.string() }),
  success: z.boolean(),
});

export const deleteBulkMangaTemplateSchema = z.object({
  message: z.string(),
  success: z.boolean(),
});

export const createMangaTemplateBodySchema = z.object({
  mangaDraftId: z.string(),
  file: z.instanceof(File),
  name: z.string().optional(),
  description: z.string().optional(),
});

export const createMangaTemplateSchema = z.object({
  success: z.boolean(),
  data: MangaTemplateSchema,
});

export const updateMangaTemplateSchema = z.object({
  success: z.boolean(),
  data: MangaTemplateSchema,
});

export const deleteMangaTemplateSchema = z.object({
  success: z.boolean(),
});
