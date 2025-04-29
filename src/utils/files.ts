export const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL ||
  "https://firebasestorage.googleapis.com/v0/b/miko12.appspot.com/o";

export const getMediaFileUrl = (path?: string) => {
  if (!path) {
    return null;
  }
  return `${STORAGE_URL}/${encodeURIComponent(path)}?alt=media`;
};

export const uploadImageFolderTypes = ["characters", "backgrounds"];

export const folderTypes = [
  ...uploadImageFolderTypes,
  "manga_thumbs",
  "manga_screenshots",
];

export const createNewPathFromSource = (
  newId: string,
  userId: string,
  imagePath: string
) => {
  if (imagePath) {
    // Create new path
    const pathSplit = imagePath.replace(/^\/+/, "").split("/");
    const secondaryFolderName = pathSplit[pathSplit.length - 2];
    const fileName = pathSplit[pathSplit.length - 1];
    const fileNameSplit = fileName.split(".");
    const fileEnding = fileNameSplit[fileNameSplit.length - 1];

    const targetPath = `Users/${userId}/${secondaryFolderName}/${newId}.${fileEnding}`;
    return targetPath;
  }
  return imagePath;
};
