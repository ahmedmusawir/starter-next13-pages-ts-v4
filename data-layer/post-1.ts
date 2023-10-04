import qs from "qs";
import postService, { PostApiResponse } from "@/services/postService";
import { PostData } from "./post-entities";

// GETS ALL POSTS
export const getPosts = async (): Promise<PostApiResponse> => {
  const query = qs.stringify(
    {
      populate: [
        "comments",
        "comments.user",
        "comments.user.profileImage",
        "categories",
        "post_tags",
      ],
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    }
  );

  const response = await postService.getAll(query);

  return response;
};
