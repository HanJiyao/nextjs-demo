// import { MangaService } from "@/client";
// import { useQuery } from "@tanstack/react-query";

// type FetchMangaSchema = {
//   isFavorite?: boolean;
//   categories?: Array<string>;
//   name?: string;
//   userID?: string;
//   sortedBy?: "lastAccessed" | "upVotes";
//   fromDate?: string;
//   toDate?: string;
//   lastDocumentID?: string;
//   pageSize?: number;
//   nextButton?: "prev" | "next";
//   fetchAll?: boolean;
//   templateTrackingID?: string;
// };

// export const useMangas = (params: FetchMangaSchema) => {
//   return useQuery({
//     queryKey: ["manga", params],
//     queryFn: () =>
//       MangaService.fetchMappedMangaDocuments({
//         requestBody: { ...params },
//       }),
//   });
// };
