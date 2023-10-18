import { PostApiResponse } from "./services/postService";

export interface RootState {
  posts: PostsState;
  postsFilters: FiltersState;
  auth: AuthState;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  loginModalOpen: boolean;
}

export interface FiltersState {
  searchTerm?: string;
  isFeatured?: boolean;
  categoryTerms?: string[];
  postTagTerms?: string[];
  currentPage: number;
  postsPerPage: number;
}

export interface PostsState {
  posts: PostApiResponse;
  status: "published" | "draft" | "review";
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
