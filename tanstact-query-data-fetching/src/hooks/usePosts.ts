import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import type { Posts } from "../types/postsTypes";

export const useGetPosts = () => {
  return useQuery<Posts[], Error>({
    queryKey: ["posts"],
    queryFn: async (): Promise<Posts[]> => {
      const response = await apiClient.get("/posts");

      return response.data;
    },
    staleTime: 1000 * 60 * 1,
  });
};

export const useCreatePosts = () => {
  const queryClient = useQueryClient();

 return useMutation<Posts, Error, Omit<Posts, "id">>({ 
    mutationFn: async (newPost: Omit<Posts, "id">) => {
      const response = await apiClient.post("/posts", newPost);
      return response.data;
    },

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<Posts[]>(["posts"]);

      queryClient.setQueryData<Posts[]>(["posts"], (old) => [
        ...(old ?? []),
        { ...newPost, id: Date.now() },
      ]);

      return { previousPosts };
    },

    onError: (_error, _newPost, context: unknown) => {
      const ctx = context as { previousPosts?: Posts[] } | undefined;
      queryClient.setQueryData(["posts"], ctx?.previousPosts);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
