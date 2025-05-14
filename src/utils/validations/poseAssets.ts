import { z } from "zod";

export const addPoseAssetsSchema = z.object({
  id: z.string(),
  key: z.string(),
  csv: z.string(),
  csvData: z.array(
    z.object({
      x: z.number(),
      y: z.number()
    })
  ),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  poseX: z.number(),
  poseY: z.number(),
  poseScaleX: z.number(),
  poseScaleY: z.number(),
  poseRotation: z.number(),
  draggable: z.boolean(),
  scaleX: z.number(),
  scaleY: z.number(),
  skewX: z.number(),
  skewY: z.number(),
  rotation: z.number(),
  clipX: z.number(),
  clipY: z.number(),
  clipWidth: z.number(),
  clipHeight: z.number(),
  offsetX: z.number(),
  offsetY: z.number()
});

export const deletePoseAssetsSchema = z.object({
  ids: z.array(z.string())
}); 