import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import type { CreatePostInput, Post } from "../types/postsTypes";

export const useGetPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: async (): Promise<Post[]> => {
      const response = await apiClient.get("/posts");
      console.log("[useGetPosts] GET /posts status:", response.status);
      console.log("[useGetPosts] data:", response.data);

      return response.data;
    },
    staleTime: 1000 * 60 * 1,
  });
};

export const useCreatePosts = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreatePostInput>({
    mutationFn: async (newPost: CreatePostInput) => {
      const response = await apiClient.post("/posts", newPost);
      return response.data as Post;
    },

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

      queryClient.setQueryData<Post[]>(["posts"], (old) => {
        const optimistic: Post = {
          _id: `optimistic-${Date.now()}`,
          username: newPost.username,
          title: newPost.title,
          description: newPost.description,
          createdAt: new Date().toISOString(),
        };
        return [...(old ?? []), optimistic];
      });

      return { previousPosts };
    },

    onError: (_error, _newPost, context: unknown) => {
      const ctx = context as { previousPosts?: Post[] } | undefined;
      queryClient.setQueryData(["posts"], ctx?.previousPosts);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
