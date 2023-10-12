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
type StrapiQuery = {
  populate: string[];
  filters: { [key: string]: any };
};

// SEARCH & FILTER ALL POSTS
export const searchPosts = async (
  query: FiltersState
): Promise<PostApiResponse> => {
  const strapiQuery: StrapiQuery = {
    populate: ["categories", "post_tags"],
    filters: {},
  };

  // Add Boolean Query Filters
  if (query.isFeatured) strapiQuery.filters["isFeatured"] = { $eq: true };

  // Add Inclusion Query Filters for Categories
  // strapiQuery.filters["categories"] = { $in: query.categoryTerms };

  if (query.categoryTerms && query.categoryTerms.length) {
    strapiQuery.filters["categories"] = { $in: query.categoryTerms };
    console.log("Cat Terms in Data Layer:", query.categoryTerms);
  }

  // Add Inclusion Query Filters for Post Tags
  strapiQuery.filters["post_tags"] = { $in: query.postTagTerms };

  // Add Full Text Search Query
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

  if (query.searchTerm) {
    const searchFields = [
      "title",
      "content",
      "slug",
      "categories.name",
      "post_tags.name",
    ];

    strapiQuery["filters"]["$or"] = searchFields.map((field): SearchField => {
      const searchField: SearchField = {};

      if (!field.includes(".")) {
        searchField[field] = { $containsi: query.searchTerm };
      } else {
        const [level1, level2] = field.split(".");
        const nestedSearchField: NestedSearchField = {};
        nestedSearchField[level2] = { $containsi: query.searchTerm };
        searchField[level1] = nestedSearchField;
      }
      return searchField;
    });
  }

  console.log("query in Data Layer:", query);

  // const strapiQueryStr = qs.stringify(strapiQuery, { encodeValuesOnly: true });
  // const response = await postService.getAll(strapiQueryStr);
  const query1 = qs.stringify(
    {
      filters: {
        categories: {
          id: {
            $in: [3],
          },
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const response = await postService.getAll(query1);

  return response;
};
