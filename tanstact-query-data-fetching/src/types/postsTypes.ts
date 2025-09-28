export interface Post {
  _id: string;
  username: string;
  title: string;
  description: string;
  createdAt: string;
  __v?: number;
}

export type CreatePostInput = Pick<Post, "username" | "title" | "description">;
