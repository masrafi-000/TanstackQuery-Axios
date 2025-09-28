import { useState, type ChangeEvent, type FormEvent } from "react";
import { useCreatePosts } from "../hooks/usePosts";

export function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const { mutate, isPending, isError, error, isSuccess } = useCreatePosts();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ title, body: "this is body" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <button type="submit" disabled={isPending}>
          Create
        </button>
      </form>

      {isSuccess && <p>✅ Post created!</p>}
      {isError && <p>❌ {error?.message}</p>}
    </>
  );
}
