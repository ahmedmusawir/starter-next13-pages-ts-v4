import { PostApiResponse } from "@/services/postService";

export interface PostDataSource {
  getPosts: () => Promise<PostApiResponse>;
  getPostSlugs: () => Promise<string[]>;
  getPostBySlug: (slug: string) => Promise<PostData>;
  // searchJobs: (query: JobSearchQuery) => Promise<JobApiResponse>;
}

export interface PostData {
  id: number;
  attributes: Post;
}

export interface Post {
  title: string;
  content: string;
  featuredImage: string;
  featured: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  comments: Comments;
  categories: Categories;
  post_tags: PostTags;
}

export interface Comments {
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserField;
}

export interface UserField {
  data: UserData;
}

export interface UserData {
  id: number;
  attributes: User;
}

export interface User {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage: ProfileImageField;
}

export interface ProfileImageField {
  data?: ProfileImageData;
}

export interface ProfileImageData {
  id: number;
  attributes: ProfileImage;
}

export interface ProfileImage {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  mime: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesField {
  data: CategoriesData;
}

export interface CategoriesData {
  id: number;
  attributes: Categories;
}

export interface Categories {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostTagsField {
  data: PostTagsData;
}

export interface PostTagsData {
  id: number;
  attributes: PostTags;
}

export interface PostTags {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
