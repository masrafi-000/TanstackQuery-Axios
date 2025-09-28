import { useForm } from "react-hook-form";
import { useCreatePosts } from "../hooks/usePosts";
import type { CreatePostInput } from "../types/postsTypes";

export default function CreatePostForm() {
  const { register, handleSubmit, reset } = useForm<CreatePostInput>();
  const { mutate, isPending } = useCreatePosts();

  const onSubmit = (data: CreatePostInput) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-4 p-10 w-100 h-auto border border-red-100 rounded-2xl shadow-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="border-2 outline-none border-green-900 rounded-lg px-2 py-1 focus:outline-none focus:border-green-700 placeholder:text-gray-500 placeholder:text-lg "
        {...register("username")}
        placeholder="Username"
      />
      <input
        className="border-2 outline-none border-green-900 rounded-lg px-2 py-1 focus:outline-none focus:border-green-700 placeholder:text-gray-500 placeholder:text-lg "
        {...register("title")}
        placeholder="Title"
      />
      <textarea
        className="border-2 outline-none border-green-900 rounded-lg px-2 py-1 focus:outline-none focus:border-green-700 placeholder:text-gray-500 placeholder:text-lg "
        {...register("description")}
        placeholder="Description"
      />
      <button
        disabled={isPending}
        className="text-white bg-green-950 p-2 rounded-xl hover:bg-green-900 transform transition-all hover:scale-105 disabled:opacity-60"
        type="submit"
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
