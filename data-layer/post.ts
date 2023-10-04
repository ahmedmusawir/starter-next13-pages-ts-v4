import qs from "qs";
import postService, { PostApiResponse } from "@/services/postService";
import { PostData } from "./post-entities";

// GETS ALL POSTS
export const getPosts = async (): Promise<PostApiResponse> => {
  const query = qs.stringify(
    {
      populate: [
        // "comments",
        // "comments.user",
        // "comments.user.profileImage",
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

// GETS ONLY ALL POST SLUGS AS AN ARRAY OF STRINGS
export const getPostSlugs = async (): Promise<string[]> => {
  const query = qs.stringify({ fields: ["slug"] }, { encodeValuesOnly: true });

  const response = await postService.getAll(query);

  const slugs = response.data.map((slug) => slug.attributes.slug);

  return slugs;
};

// GETS SINGLE POST BY IT'S SLUG
export const getPostBySlug = async (slug: string): Promise<PostData> => {
  const query = qs.stringify(
    {
      populate: [
        "comments",
        "comments.user",
        "comments.user.profileImage",
        "categories",
        "post_tags",
      ],

      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const rawCompany = await postService.getOneBySlug(query);

  return rawCompany;
};
