import { FiltersState } from "@/global-interfaces";
import { PostApiResponse } from "@/services/postService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiPosts = createApi({
  reducerPath: "apiPosts",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostApiResponse, FiltersState>({
      query: (filters) => {
        console.log("Filters in apiPost:", filters);
        // Construct your query based on the filters
        let query = "post-search?";

        if (filters.searchTerm) {
          query += `searchTerm=${filters.searchTerm}&`;
        }

        if (filters.isFeatured) {
          query += "isFeatured=true&";
        }

        if (filters.categoryTerms?.length) {
          query += `categoryTerms=${filters.categoryTerms.join(",")}&`;
        }

        // if (filters.categoryTerms?.length) {
        //   query += `categories=${filters.categoryTerms.join(",")}&`;
        // }
        // if (filters.categoryTerms?.length) {
        //   query += `categoryTerms=${filters.categoryTerms}&`;
        // }

        if (filters.postTagTerms?.length) {
          query += `tags=${filters.postTagTerms.join(",")}&`;
        }

        return query;
      },
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery } = apiPosts;
