import CreatePostForm  from "./components/CreatePost";
import { GetPosts } from "./components/GetPosts";

function App() {
 

  return (
    <div className="p-10 flex  items-start gap-10  text-xl">
      <CreatePostForm />
      <GetPosts />
    </div>
  );
}

export default App;
