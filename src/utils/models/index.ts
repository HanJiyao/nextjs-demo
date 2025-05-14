import * as user from "@/utils/models/user";
import * as forum from "@/utils/models/forum";
import * as genAI from "@/utils/models/genAI";
import * as mangaGalleryItems from "@/utils/models/mangaGalleryItems";
import * as image from "@/utils/models/image";

const models = {
  ...user,
  ...forum,
  ...mangaGalleryItems,
  ...image,
  ...genAI,
};

export default models;
