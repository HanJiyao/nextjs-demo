import * as userValidations from "@/utils/validations/user";
import * as mangaValidations from "@/utils/validations/manga";
import * as commentValidations from "@/utils/validations/comment";
import * as creditValidations from "@/utils/validations/credits";
import * as interactionValidations from "@/utils/validations/interactions";
import * as moderationValidations from "@/utils/validations/moderation";
import * as poseAssetsValidations from "@/utils/validations/poseAssets";

const validations = {
  ...userValidations,
  ...mangaValidations,
  ...commentValidations,
  ...creditValidations,
  ...interactionValidations,
  ...moderationValidations,
  ...poseAssetsValidations,
};

export default validations;
