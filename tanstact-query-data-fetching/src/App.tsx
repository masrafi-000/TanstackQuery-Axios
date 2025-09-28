import { useGetPosts } from "./hooks/usePosts";

function App() {
  const { data: posts, isLoading, isError, error } = useGetPosts();

  if (isLoading) return <div>Loding posts...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center gap-1 text-xl">
      {posts?.map((post) => (
        <p key={post.id}> {post.title}</p>
      ))}
    </div>
  );
}

export default App;
