import { PostApiResponse } from "./services/postService";

export interface RootState {
  posts: PostsState;
  postsFilters: FiltersState;
}

export interface FiltersState {
  searchTerm?: string;
  isFeatured?: boolean;
  categoryTerms?: string[];
  postTagTerms?: string[];
}

export interface PostsState {
  posts: PostApiResponse;
  status: "idle" | "loading" | "failed";
}

export interface AxiosError {
  response?: {
    status?: number;
    data?: any;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage: {
    url: string;
  };
}
