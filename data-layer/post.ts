import qs from "qs";
import postService, { PostApiResponse } from "@/services/postService";
import { PostData } from "./post-entities";
import { FiltersState } from "@/global-interfaces";

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

// POST SEARCH AND FILTERS

export const searchPosts = async (
  query: FiltersState
): Promise<PostApiResponse> => {
  let categoryTermsArray: string[] = [];
  if (query.categoryTerms) {
    if (typeof query.categoryTerms === "string") {
      categoryTermsArray = (query.categoryTerms as string).split(","); // Convert comma-separated string to array
    } else {
      categoryTermsArray = query.categoryTerms as string[];
    }
  }

  type BasicFilter = {
    $containsi?: string;
    $eq?: boolean | string;
    $in?: string[];
    $gte?: number;
    $lte?: number;
  };

  type SearchField = {
    [key: string]: string | BasicFilter | NestedSearchField;
  };

  type NestedSearchField = {
    [key: string]: BasicFilter;
  };

  const searchFields: SearchField[] = [];

  if (query.searchTerm) {
    const fields = [
      "title",
      "content",
      "slug",
      "categories.name",
      "post_tags.name",
    ];

    fields.forEach((field) => {
      if (!field.includes(".")) {
        searchFields.push({ [field]: { $containsi: query.searchTerm } });
      } else {
        const [level1, level2] = field.split(".");
        const nestedSearchField: NestedSearchField = {
          [level2]: { $containsi: query.searchTerm },
        };
        searchFields.push({ [level1]: nestedSearchField });
      }
    });
  }

  const strapiQuery = {
    populate: ["categories", "post_tags"],
    filters: {
      ...(query.isFeatured && { isFeatured: { $eq: true } }),
      ...(categoryTermsArray.length && {
        categories: { id: { $in: categoryTermsArray.map(Number) } },
      }),
      ...(query.postTagTerms?.length && {
        post_tags: { id: { $in: query.postTagTerms.map(Number) } },
      }),
      ...(searchFields.length > 0 && { $or: searchFields }),
    },
  };

  console.log("query in Data Layer:", query);

  const strapiQueryStr = qs.stringify(strapiQuery, { encodeValuesOnly: true });
  console.log("Final Query String in post.ts:", strapiQueryStr);
  const response = await postService.getAll(strapiQueryStr);

  return response;
};
