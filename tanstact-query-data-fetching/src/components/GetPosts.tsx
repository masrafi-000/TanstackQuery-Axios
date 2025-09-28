import { useGetPosts } from "../hooks/usePosts";
import { GetPostsCard } from "./GetPostsCard";

export const GetPosts = () => {
  const { data: posts, isLoading, isError, error } = useGetPosts();
  console.log(
    "[GetPosts] isLoading:",
    isLoading,
    "isError:",
    isError,
    "error:",
    error
  );
  console.log("[GetPosts] posts:", posts);

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="w-full max-w-xl">
      {posts?.map((post) => (
        <GetPostsCard key={post._id} post={post} />
      ))}
    </div>
  );
};
