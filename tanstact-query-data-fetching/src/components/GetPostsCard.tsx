import type { Post } from "../types/postsTypes";

interface GetPostsCardProps {
  post: Post;
}

export const GetPostsCard = ({ post }: GetPostsCardProps) => {
  return (
    <div className="border rounded-lg p-4 mb-3 shadow">
      <div className="text-sm text-gray-600">
        {new Date(post.createdAt).toLocaleString()}
      </div>
      <div className="font-bold">{post.title}</div>
      <div className="text-gray-800">{post.description}</div>
      <div className="text-xs text-gray-500">by {post.username}</div>
    </div>
  );
};
